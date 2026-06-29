/* ═══════════════════════════════════════════
   Arbiter LE — Application Logic
═══════════════════════════════════════════ */

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

/* ── Login ─────────────────────────────── */
async function doLogin() {
  const input  = document.getElementById('login-user').value.trim();
  const p      = document.getElementById('login-pass').value;
  const errEl  = document.getElementById('login-error');
  const btnEl  = document.getElementById('btn-login');

  if (!input || !p) { errEl.textContent = 'Please enter your email and password.'; return; }

  errEl.textContent = '';
  btnEl.textContent = 'Verifying…';
  btnEl.disabled = true;

  // ── Supabase Auth ──────────────────────────────────────────────────────
  const { data: authData, error: authError } = await _sb.auth.signInWithPassword({ email: input, password: p });

  if (authError || !authData.user) {
    errEl.textContent = 'Invalid credentials. Contact your administrator if you need access.';
    btnEl.textContent = 'SIGN IN';
    btnEl.disabled = false;
    return;
  }

  await mountOfficerSession(authData.user.id);
  btnEl.textContent = 'SIGN IN';
  btnEl.disabled = false;
}

async function doForgotPassword(e) {
  e.preventDefault();
  const email  = document.getElementById('login-user').value.trim();
  const errEl  = document.getElementById('login-error');
  const link   = document.getElementById('forgot-link');

  if (!email) {
    errEl.textContent = 'Enter your department email above, then click "Forgot password?"';
    errEl.style.color = 'var(--gold)';
    return;
  }

  link.textContent = 'Sending…';
  link.style.pointerEvents = 'none';
  errEl.textContent = '';

  const { error } = await _sb.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.origin + '/?reset=1'
  });

  link.textContent = 'Forgot password?';
  link.style.pointerEvents = '';

  if (error) {
    errEl.textContent = 'Could not send reset email. Contact support@arbiterle.com.';
    errEl.style.color = '';
  } else {
    errEl.textContent = 'Reset link sent — check your email.';
    errEl.style.color = 'var(--gold)';
  }
}

async function mountOfficerSession(authUid) {
  const { data: rows, error } = await _sb.from('officers').select('*').eq('auth_uid', authUid).limit(1);
  if (error || !rows || rows.length === 0) {
    document.getElementById('login-error').textContent = 'Account not found. Contact your administrator.';
    await _sb.auth.signOut();
    return;
  }
  const o = rows[0];
  currentUser = { id: o.badge_number, name: o.name, rank: o.rank, role: o.role, track: o.track || 'patrol', badge: o.badge_number, email: o.email };
  USERS[o.badge_number] = { ...currentUser };

  if (o.role === 'admin') {
    showScreen('screen-admin');
    await loadAllDataForAdmin();
    renderAdminDashboard();
  } else {
    // Load this officer's saved completion history BEFORE rendering the
    // dashboard — otherwise completionData is empty and every module shows
    // "not started," with only modules finished in the current session
    // appearing. (loadOfficerCompletions was defined but never called.)
    await loadOfficerCompletions(o.badge_number);
    document.getElementById('officer-name-display').textContent  = o.name;
    document.getElementById('officer-badge-display').textContent = 'Badge #' + o.badge_number;
    document.getElementById('module-officer-name').textContent   = o.name;
    document.getElementById('scenario-officer-name').textContent = o.name;
    document.getElementById('quiz-officer-name').textContent     = o.name;
    document.getElementById('debrief-officer-name').textContent  = o.name;
    showOfficerDashboard();
  }
}
document.getElementById('login-pass').addEventListener('keydown', e => { if (e.key==='Enter') doLogin(); });
document.getElementById('login-user').addEventListener('keydown', e => { if (e.key==='Enter') document.getElementById('login-pass').focus(); });

/* ── Password recovery ──────────────────────
   Reset emails land on /?reset=1 with Supabase recovery tokens in
   the URL hash. In that state the user arrives already signed in
   (recovery session) — we must show the set-new-password screen
   instead of silently mounting their dashboard. */
const _recoveryLanding = /[?&]reset=1/.test(window.location.search)
                      || /type=recovery/.test(window.location.hash);
const _recoveryLinkError = /error_description=([^&]+)/.exec(window.location.hash);

async function doSetNewPassword() {
  const p1    = document.getElementById('reset-pass-1').value;
  const p2    = document.getElementById('reset-pass-2').value;
  const errEl = document.getElementById('reset-error');
  const btnEl = document.getElementById('btn-reset');

  if (!p1 || !p2)    { errEl.textContent = 'Enter your new password in both fields.'; return; }
  if (p1 !== p2)     { errEl.textContent = 'Passwords do not match.'; return; }
  if (p1.length < 8) { errEl.textContent = 'Password must be at least 8 characters.'; return; }

  errEl.textContent = '';
  btnEl.textContent = 'Updating…';
  btnEl.disabled = true;

  const { data, error } = await _sb.auth.updateUser({ password: p1 });

  btnEl.textContent = 'Update Password';
  btnEl.disabled = false;

  if (error || !data || !data.user) {
    errEl.textContent = 'Could not update password — the reset link may have expired. Return to sign in and request a new one.';
    return;
  }

  // Clean recovery tokens out of the URL, then enter the app normally.
  window.history.replaceState(null, '', window.location.pathname);
  document.getElementById('reset-pass-1').value = '';
  document.getElementById('reset-pass-2').value = '';
  await mountOfficerSession(data.user.id);
}

function backToLogin(e) {
  e.preventDefault();
  window.history.replaceState(null, '', window.location.pathname);
  showScreen('screen-login');
}

document.getElementById('reset-pass-2').addEventListener('keydown', e => { if (e.key==='Enter') doSetNewPassword(); });
document.getElementById('reset-pass-1').addEventListener('keydown', e => { if (e.key==='Enter') document.getElementById('reset-pass-2').focus(); });

/* ── Department-gated reference content ────
   Glossary entries and admin citation sections tagged data-dept
   render only on that department's platform. Cross-agency
   confidentiality: one agency's orders must never appear on
   another agency's site. Untagged elements are shared. */
(function gateDepartmentContent() {
  const sub = (typeof ACTIVE_DEPARTMENT !== 'undefined' && ACTIVE_DEPARTMENT) ? ACTIVE_DEPARTMENT.subdomain : null;
  document.querySelectorAll('[data-dept]').forEach(el => {
    if (el.getAttribute('data-dept') !== sub) el.remove();
  });
  const goBtn = document.getElementById('cite-filter-go');
  if (goBtn && sub) goBtn.textContent = sub.toUpperCase() + ' Orders';
})();

/* ── Co-branded login ──────────────────────
   Lead the login/reset screens with the active agency's own patch
   and name; keep a small "Powered by Arbiter LE" mark beneath. All
   driven from ACTIVE_DEPARTMENT, so every agency (and every future
   one) is branded with no per-screen markup. */
(function brandLoginForDepartment() {
  const d = (typeof ACTIVE_DEPARTMENT !== 'undefined') ? ACTIVE_DEPARTMENT : null;
  if (!d) return;
  document.querySelectorAll('.login-header .shield img').forEach(img => {
    if (d.badge) { img.src = d.badge; img.alt = d.name + ' badge'; }
  });
  document.querySelectorAll('.login-header h1').forEach(h => {
    h.textContent = d.displayName || d.name;
  });
  document.querySelectorAll('.login-card').forEach(card => {
    if (card.nextElementSibling && card.nextElementSibling.classList.contains('powered-by')) return;
    const tag = document.createElement('div');
    tag.className = 'powered-by';
    tag.innerHTML = 'Powered by <strong>Arbiter LE</strong>';
    card.insertAdjacentElement('afterend', tag);
  });
})();

/* ── Session restore on page load ──────────
   _sb is null only on unrecognized subdomains (config.js shows
   an error card there) — skip auth bootstrap in that case. */
if (_sb) {
  (async () => {
    if (_recoveryLanding) {
      if (_recoveryLinkError) {
        // Expired or already-used link — Supabase puts the reason in the hash.
        window.history.replaceState(null, '', window.location.pathname);
        document.getElementById('login-error').textContent =
          'That reset link is no longer valid. Enter your email and click "Forgot password?" for a new one.';
        showScreen('screen-login');
      } else {
        showScreen('screen-reset');
      }
      return; // never auto-mount the dashboard on a recovery landing
    }
    const { data: { session } } = await _sb.auth.getSession();
    if (session) await mountOfficerSession(session.user.id);
  })();

  _sb.auth.onAuthStateChange((event, session) => {
    if (event === 'PASSWORD_RECOVERY') {
      showScreen('screen-reset');
    }
    if (event === 'SIGNED_OUT') {
      currentUser = null;
      showScreen('screen-login');
    }
  });
}

async function doLogout() {
  stopAllTimers();
  currentUser = null;
  previewTrackOverride = null;
  if (_sb) await _sb.auth.signOut();
  document.getElementById('login-user').value = '';
  document.getElementById('login-pass').value = '';
  document.getElementById('login-error').textContent = '';
  showScreen('screen-login');
}


/* ── Officer Tabs ───────────────────────── */
function officerTab(tab, e) {
  document.querySelectorAll('.officer-tab').forEach(t => t.classList.remove('active'));
  e.target.classList.add('active');
  document.getElementById('officer-tab-modules').classList.toggle('hidden', tab !== 'modules');
  document.getElementById('officer-tab-progress').classList.toggle('hidden', tab !== 'progress');
  if (tab === 'progress') renderProgressTable();
}

function renderProgressTable() {
  if (!currentUser) return;
  const uid  = currentUser.id;
  const done = completionData[uid] || {};
  const rows = MODULES.map(m => {
    const rec = done[m.id];
    if (!rec) return null;
    const score = rec.bestScore || rec.score || 0;
    const pillClass = score >= 90 ? 'high' : score >= 70 ? 'mid' : score >= 50 ? 'low' : 'fail';
    const attemptsUsed = rec.attempts || 1;
    const dateStr = rec.date ? new Date(rec.date).toLocaleDateString('en-US', {month:'short', day:'numeric', year:'numeric'}) : '—';
    return `<tr>
      <td><strong>${m.title}</strong></td>
      <td><span style="font-size:10px;text-transform:uppercase;letter-spacing:1px;color:var(--steel)">${m.category}</span></td>
      <td><span class="score-pill ${pillClass}">${score}%</span></td>
      <td style="text-align:center">${attemptsUsed} / 3</td>
      <td style="text-align:center;color:var(--text-muted)">${rec.time || '—'}</td>
      <td style="color:var(--text-muted);font-size:12px">${dateStr}</td>
    </tr>`;
  }).filter(Boolean);
  const tbody = document.getElementById('progress-table-body');
  if (!tbody) return;
  if (rows.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6"><div class="prog-empty">No modules completed yet. Complete your first module to see your progress here.</div></td></tr>';
  } else {
    tbody.innerHTML = rows.join('');
  }
}

/* ── Quiz Resume ────────────────────────── */
function RESUME_KEY() { return currentUser ? deptKey('quiz_resume_' + currentUser.id) : null; }

function saveQuizState() {
  const key = RESUME_KEY();
  if (!key || !currentModule) return;
  localStorage.setItem(key, JSON.stringify({
    moduleId: currentModule.id,
    moduleTitle: currentModule.title,
    questionIndex: currentQuizIdx,
    correctCount: quizCorrect,
    quizTotal: quizTotal,
    secondsElapsed: quizSeconds
  }));
}

function clearQuizState() {
  const key = RESUME_KEY();
  if (key) localStorage.removeItem(key);
}

function checkResumeBanner() {
  const key = RESUME_KEY();
  if (!key) return;
  const saved = localStorage.getItem(key);
  const bannerEl = document.getElementById('officer-resume-banner');
  if (!bannerEl) return;
  // Quiz resume takes priority; if no quiz, check scenario pause
  if (!saved) {
    checkScenarioPauseBanner();
    return;
  }
  const state = JSON.parse(saved);
  const mod = MODULES.find(m => m.id === state.moduleId);
  if (!mod) { bannerEl.style.display = 'none'; checkScenarioPauseBanner(); return; }
  const qNum = state.questionIndex + 1;
  bannerEl.style.display = 'block';
  bannerEl.innerHTML = `
    <div class="resume-banner">
      <p>You have an unfinished quiz — <strong>${mod.title}</strong> — paused at question ${qNum} of ${state.quizTotal}. Pick up where you left off.</p>
      <div class="resume-banner-btns">
        <button class="btn-dismiss-resume" onclick="dismissResume()">Dismiss</button>
        <button class="btn-resume" onclick="resumeQuiz()">Resume Quiz →</button>
      </div>
    </div>`;
}

function resumeQuiz() {
  const key = RESUME_KEY();
  if (!key) return;
  const saved = localStorage.getItem(key);
  if (!saved) return;
  const state = JSON.parse(saved);
  const mod = MODULES.find(m => m.id === state.moduleId);
  if (!mod) return;
  currentModule  = mod;
  currentQuizIdx = state.questionIndex;
  quizCorrect    = state.correctCount;
  quizTotal      = state.quizTotal;
  quizSeconds    = state.secondsElapsed || 0;
  const questions = activeQuestions(currentModule);
  showScreen('screen-quiz');
  window.scrollTo(0, 0);
  document.getElementById('quiz-module-label').textContent = currentModule.category;
  document.getElementById('quiz-title-label').textContent  = currentModule.title + ' — Knowledge Check';
  document.getElementById('quiz-officer-name').textContent = currentUser.name;
  stopAllTimers();
  quizTimer = setInterval(() => {
    quizSeconds++;
    document.getElementById('quiz-timer-display').textContent = formatTime(quizSeconds);
  }, 1000);
  renderQuestion();
}

function dismissResume() {
  clearQuizState();
  const bannerEl = document.getElementById('officer-resume-banner');
  if (bannerEl) bannerEl.style.display = 'none';
}

// Save progress and return to the dashboard mid-quiz. Mirrors pauseScenario().
// Backing out does not record an attempt — only finishQuiz() does that.
function pauseQuiz() {
  saveQuizState();
  stopAllTimers();
  showScreen('screen-officer');
  renderOfficerDashboard();
  checkResumeBanner();
}

/* ── Scenario Pause / Resume ───────────── */
function PAUSE_KEY() { return currentUser ? deptKey('scenario_pause_' + currentUser.id) : null; }

function pauseScenario() {
  const key = PAUSE_KEY();
  if (!key || !currentModule) return;
  localStorage.setItem(key, JSON.stringify({
    moduleId:             currentModule.id,
    nodeId:               currentNodeId,
    scenarioPath:         scenarioPath,
    scenarioTotalDecisions: scenarioTotalDecisions,
    useScenario2:         currentModule._activeScenario === currentModule.scenario2,
    useSupervisorScenario: currentModule._activeScenario === currentModule.supervisorScenario
  }));
  stopAllTimers();
  showScreen('screen-officer');
  renderOfficerDashboard();
  checkResumeBanner();
}

function clearScenarioPause() {
  const key = PAUSE_KEY();
  if (key) localStorage.removeItem(key);
}

function checkScenarioPauseBanner() {
  const key    = PAUSE_KEY();
  const saved  = key && localStorage.getItem(key);
  const banner = document.getElementById('officer-resume-banner');
  if (!saved || !banner) return;
  const state = JSON.parse(saved);
  const mod   = MODULES.find(m => m.id === state.moduleId);
  if (!mod) { clearScenarioPause(); return; }
  const decisionsLeft = state.scenarioTotalDecisions - state.scenarioPath.length;
  banner.style.display = 'block';
  banner.innerHTML = `
    <div class="resume-banner">
      <p>You paused a scenario — <strong>${mod.title}</strong> — ${decisionsLeft > 0 ? decisionsLeft + ' decision' + (decisionsLeft !== 1 ? 's' : '') + ' remaining' : 'ready for debrief'}. Pick up where you left off.</p>
      <div class="resume-banner-btns">
        <button class="btn-dismiss-resume" onclick="dismissScenarioPause()">Dismiss</button>
        <button class="btn-resume" onclick="resumeScenario()">Resume Scenario →</button>
      </div>
    </div>`;
}

function dismissScenarioPause() {
  clearScenarioPause();
  const banner = document.getElementById('officer-resume-banner');
  if (banner) banner.style.display = 'none';
}

function resumeScenario() {
  const key   = PAUSE_KEY();
  const saved = key && localStorage.getItem(key);
  if (!saved) return;
  const state = JSON.parse(saved);
  const mod   = MODULES.find(m => m.id === state.moduleId);
  if (!mod) { clearScenarioPause(); return; }
  clearScenarioPause();
  currentModule = mod;
  currentModule._activeScenario = state.useSupervisorScenario && mod.supervisorScenario ? mod.supervisorScenario
    : (state.useScenario2 && mod.scenario2 ? mod.scenario2 : mod.scenario);
  scenarioPath           = state.scenarioPath || [];
  scenarioTotalDecisions = state.scenarioTotalDecisions;
  scenarioDecisionCount  = scenarioPath.length;
  showScreen('screen-scenario');
  window.scrollTo(0, 0);
  const scen = currentModule._activeScenario;
  document.getElementById('scenario-location-label').textContent = scen.location;
  document.getElementById('scenario-title-label').textContent    = scen.title;
  const feBadge = document.getElementById('field-exp-badge');
  if (feBadge) feBadge.style.display = scen.fieldExperience ? 'inline-flex' : 'none';
  renderScenarioNode(state.nodeId);
}

/* ── Officer Dashboard ─────────────────── */
function showOfficerDashboard() {
  stopAllTimers();
  showScreen('screen-officer');
  renderOfficerDashboard();
  checkResumeBanner();
}

function renderOfficerDashboard() {
  if (!currentUser) return;
  renderTrackToggle('track-toggle-dash');
  const uid  = currentUser.id;
  const done = completionData[uid] || {};
  const completed = Object.values(done).filter(r => r.passed).length;
  const total     = MODULES.length;
  const overdue   = MODULES.filter(m => {
    if (done[m.id] && done[m.id].passed) return false;
    const sched = getModuleSchedule(m.weekNumber);
    return sched.status === 'overdue' || sched.status === 'buffer' || sched.status === 'due-soon';
  }).length;
  document.getElementById('stat-assigned').textContent  = total;
  document.getElementById('stat-completed').textContent = completed;
  document.getElementById('stat-overdue').textContent   = overdue;
  const scores = Object.values(done).filter(r => r.passed).map(d => d.bestScore || d.score);
  document.getElementById('stat-score').textContent = scores.length ? Math.round(scores.reduce((a,b)=>a+b,0)/scores.length)+'%' : '—';
  document.getElementById('overall-progress').style.width = Math.round((completed/total)*100)+'%';
  document.getElementById('modules-grid').innerHTML = MODULES.map(m => {
    const rec    = done[m.id];
    const isPassed = rec && rec.passed;
    const isFailed = rec && !rec.passed;
    const isRemediation = rec && rec.remediation;

    let statusLabel, statusClass, btnLabel, btnClass, scoreStr, disabled, onclick;

    if (isPassed) {
      statusLabel = 'Complete';  statusClass = 'complete';
      btnLabel = '✓ Review Module'; btnClass = 'btn-module completed-btn';
      scoreStr = `Score: ${rec.bestScore}%`;
      disabled = ''; onclick = `onclick="startModule('${m.id}')"`;
    } else if (isRemediation) {
      statusLabel = 'Remediation'; statusClass = 'remediation';
      btnLabel = 'Supervisor Review Required'; btnClass = 'btn-module';
      scoreStr = `Best: ${rec.bestScore}% — 3/3 attempts used`;
      disabled = 'disabled'; onclick = '';
    } else if (isFailed) {
      const remaining = 3 - rec.attempts;
      statusLabel = `${rec.attempts}/3 Attempts`; statusClass = 'failed';
      btnLabel = `Retake — Attempt ${rec.attempts + 1} of 3 →`; btnClass = 'btn-module';
      scoreStr = `Best: ${rec.bestScore}% — ${remaining} attempt${remaining!==1?'s':''} left`;
      disabled = ''; onclick = `onclick="startModule('${m.id}')"`;
    } else {
      const available = isModuleAvailable(m);
      if (!available) {
        const openDate = getModuleOpenDate(m.weekNumber);
        const openFmt  = openDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        statusLabel = `Opens ${openFmt}`; statusClass = 'locked-status';
        btnLabel = '🔒 Not Yet Available'; btnClass = 'btn-module locked-btn';
        scoreStr = `Est. ${m.duration}`;
        disabled = 'disabled'; onclick = '';
      } else {
        const sched = getModuleSchedule(m.weekNumber);
        statusLabel = sched.label; statusClass = sched.class;
        btnLabel = 'Start Module →'; btnClass = 'btn-module';
        scoreStr = `Est. ${m.duration}`;
        disabled = ''; onclick = `onclick="startModule('${m.id}')"`;
      }
    }

    const isAvail    = isModuleAvailable(m);
    const canStart   = isAvail && !isRemediation;
    const cardClick  = canStart ? `onclick="startModule('${m.id}')"` : '';
    const cardClass  = canStart ? 'module-card' : (isAvail ? 'module-card locked' : 'module-card locked locked-future');
    const btnOnclick = canStart ? `onclick="event.stopPropagation();startModule('${m.id}')"` : '';
    return `
      <div class="${cardClass}" ${cardClick}>
        <div class="module-card-top">
          <div class="module-category">${m.category}</div>
          <h3>${m.title}</h3>
          <p>${m.description}</p>
        </div>
        <div class="module-card-bottom">
          <div class="module-meta">
            <span class="badge-status ${statusClass}">${statusLabel}</span>
            <small style="margin-top:6px;display:block;color:var(--text-muted)">${scoreStr}</small>
          </div>
          <button class="${btnClass}" ${disabled} ${btnOnclick}>${btnLabel}</button>
        </div>
      </div>`;
  }).join('');
}

/* ── Module Reading ─────────────────────── */
function browseModulesAsAdmin() {
  showOfficerDashboard();
  // Show the back-to-admin button when admin is browsing officer view
  const backBtn = document.getElementById('btn-back-admin');
  if (backBtn) backBtn.style.display = 'inline-block';
}

function startModule(moduleId) {
  currentModule = MODULES.find(m => m.id === moduleId);
  if (!currentModule) return;

  // Safety gate: officers cannot start locked modules
  if (!isModuleAvailable(currentModule)) return;

  stopAllTimers();
  moduleSeconds = 0;
  showScreen('screen-module');
  window.scrollTo(0, 0);
  document.getElementById('module-category-label').textContent = currentModule.category;
  document.getElementById('module-title-label').textContent    = currentModule.title;

  // Admin preview banner — show when admin opens a module not yet open to officers
  const banner = document.getElementById('admin-preview-banner');
  const isLockedForOfficers = new Date() < getModuleOpenDate(currentModule.weekNumber);
  if (banner) {
    if (isLockedForOfficers && currentUser && currentUser.role === 'admin') {
      const openFmt = getModuleOpenDate(currentModule.weekNumber)
        .toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
      banner.textContent = `🔒 Admin Preview — This module opens for officers on ${openFmt}`;
      banner.style.display = 'block';
    } else {
      banner.style.display = 'none';
    }
  }

  renderTrackToggle('track-toggle-module');
  renderModuleContent();
  moduleTimer = setInterval(() => {
    moduleSeconds++;
    document.getElementById('module-timer-display').textContent = formatTime(moduleSeconds);
  }, 1000);
}

function renderModuleContent() {
  const id = currentModule.id;

  // Data-driven path — modules that carry their own reading content (e.g. EGPD).
  // MTPD modules have no contentHtml property, so the hardcoded branches below
  // remain their source of truth (live module lock — do not edit).
  if (activeContentHtml(currentModule)) {
    document.getElementById('module-content-body').innerHTML = activeContentHtml(currentModule);
    return;
  }

  // Fallback — scenario-first module page for any module without a dedicated
  // reading branch or contentHtml (prevents a blank/stale reading page).
  document.getElementById('module-content-body').innerHTML = `
    <div class="content-block">
      <h4>Scenario</h4>
      <h2>${currentModule.scenario ? currentModule.scenario.title : currentModule.title}</h2>
      <p>This module is scenario-based. Work through each decision point as you would on the street — your choices are evaluated against your department's policy and the controlling law presented during the exercise. A debrief and assessment follow.</p>
      <button class="btn-launch" onclick="startScenario('${currentModule.id}')">Proceed to Scenario Exercise →</button>
    </div>
  `;
}

/* ═══════════════════════════════════════
   SCENARIO ENGINE
═══════════════════════════════════════ */
function startScenario(moduleId) {
  currentModule = MODULES.find(m => m.id === moduleId);
  if (!currentModule || !activeScenario(currentModule)) return;
  stopAllTimers();
  scenarioPath = [];
  scenarioDecisionCount  = 0;
  // Supervisors get the command-lens scenario where one exists; otherwise pick
  // the alternate (scenario2) on retake, else the standard patrol scenario.
  const uid  = currentUser ? currentUser.id : null;
  const prev = uid && completionData[uid] && completionData[uid][moduleId];
  if (effectiveTrack() === 'supervisor' && currentModule.supervisorScenario) {
    currentModule._activeScenario = currentModule.supervisorScenario;
  } else if (prev && currentModule.scenario2) {
    currentModule._activeScenario = currentModule.scenario2;
  } else {
    currentModule._activeScenario = currentModule.scenario;
  }
  scenarioTotalDecisions = currentModule._activeScenario.totalDecisions;
  showScreen('screen-scenario');
  window.scrollTo(0, 0);
  const scen = currentModule._activeScenario || currentModule.scenario;
  document.getElementById('scenario-location-label').textContent = scen.location;
  document.getElementById('scenario-title-label').textContent    = scen.title;
  const feBadge = document.getElementById('field-exp-badge');
  if (feBadge) feBadge.style.display = scen.fieldExperience ? 'inline-flex' : 'none';
  renderScenarioNode('start');
}

function renderScenarioNode(nodeId) {
  const scen  = currentModule._activeScenario || currentModule.scenario;
  const nodes = scen.nodes;
  currentNode   = nodes[nodeId];
  currentNodeId = nodeId;
  if (!currentNode) return;

  if (currentNode.type === 'debrief') { showDebrief(); return; }

  const body = document.getElementById('scenario-body');

  if (currentNode.type === 'scene') {
    updateStepIndicator(0);
    body.innerHTML = `
      <div class="scene-card">
        <div class="scene-card-header">
          <div class="scene-meta-item"><strong>${scen.nodes.start.time}</strong>Hours</div>
          <div class="scene-meta-item"><strong>${scen.nodes.start.weather}</strong>Conditions</div>
          <div class="scene-meta-item"><strong>${scen.nodes.start.unit}</strong>Assignment</div>
          <div class="scene-meta-item"><strong>${scen.location.split(',')[0]}</strong>Location</div>
        </div>
        <div class="scene-card-body">
          ${currentNode.narrative.map(p => `<p>${p}</p>`).join('')}
        </div>
      </div>
      <div style="display:flex;justify-content:flex-end">
        <button class="btn-continue" onclick="renderScenarioNode('${currentNode.next}')">Proceed to Situation →</button>
      </div>`;
    return;
  }

  if (currentNode.type === 'decision') {
    updateStepIndicator(currentNode.decisionNumber);
    const opts = currentNode.options.map((o, i) => `
      <button class="decision-option" id="dopt-${i}" onclick="selectDecision(${i})">
        <span class="opt-num">${i+1}</span>
        <div class="opt-body"><div class="opt-text">${o.text}</div></div>
      </button>`).join('');
    body.innerHTML = `
      <div class="scene-card" style="margin-bottom:18px">
        <div class="scene-card-body">
          ${currentNode.situation.split('\n').map(p => `<p>${p}</p>`).join('')}
        </div>
      </div>
      <div class="decision-panel">
        <div class="decision-label">Decision Point ${currentNode.decisionNumber} of ${scenarioTotalDecisions}</div>
        <div class="decision-question">${currentNode.question}</div>
        <div class="decision-options">${opts}</div>
      </div>`;
    return;
  }

  if (currentNode.type === 'consequence') {
    const legalHtml = currentNode.legal ? `
      <div class="legal-note">
        <div class="legal-label">Legal Reference</div>
        <p>${currentNode.legal}</p>
      </div>` : '';
    body.innerHTML = `
      <div class="consequence-card ${currentNode.outcomeClass}">
        <div class="consequence-banner">${currentNode.outcomeClass==='outcome-good'?'✓':currentNode.outcomeClass==='outcome-bad'?'✗':'→'} ${currentNode.outcomeLabel}</div>
        <div class="consequence-body">
          <h3>${currentNode.heading}</h3>
          ${currentNode.narrative.map(p=>`<p>${p}</p>`).join('')}
          ${legalHtml}
        </div>
      </div>
      <div style="display:flex;justify-content:flex-end">
        <button class="btn-continue" onclick="renderScenarioNode('${currentNode.next}')">Continue →</button>
      </div>`;
  }
}

function selectDecision(idx) {
  const option = currentNode.options[idx];
  // Mark chosen
  document.querySelectorAll('.decision-option').forEach((el,i) => {
    el.disabled = true;
    if (i===idx) el.classList.add('chosen');
  });
  // Record path
  scenarioPath.push({
    decisionNumber: currentNode.decisionNumber,
    question:       currentNode.question,
    choiceText:     option.shortLabel || option.text,
    quality:        option.quality,
    outcomeClass:   currentNode.outcomeClass,
  });
  // Brief pause then navigate
  setTimeout(() => renderScenarioNode(option.next), 300);
}

function updateStepIndicator(decisionNum) {
  const ind = document.getElementById('scenario-step-indicator');
  if (decisionNum === 0) {
    ind.innerHTML = 'Opening Scene';
  } else {
    ind.innerHTML = `Decision <strong>${decisionNum}</strong> of <strong>${scenarioTotalDecisions}</strong>`;
  }
}

/* ── Debrief Legal Summaries ────────────── */
function getDebriefLegalSummary() {
  // Data-driven path — modules that carry their own debrief summary (e.g. EGPD).
  if (currentModule && currentModule.debriefHtml) return currentModule.debriefHtml;
  const id = currentModule ? currentModule.id : 'search-seizure';
  /* SMOKE-ALLOW-DEPT-NAMES:start
     KNOWN TECH DEBT: these per-topic summaries are MTPD's verbatim policy text,
     still inline in the shared engine pending migration into MTPD module data
     (debriefHtml), the way EGPD already does it. They are keyed by MTPD's BARE
     module ids (e.g. 'use-of-force'); EGPD namespaces its ids ('egpd-use-of-force')
     so this content can never serve another agency. ANY NEW DEPARTMENT MUST
     namespace its module ids or provide its own debriefHtml — the cross-department
     id-collision guard in _dev/smoke-departments.js enforces that no two
     departments share a module id, which keeps this block MTPD-only.
     Migrating this into module data (under live-module-lock sign-off) removes
     the allowlist entirely. */
  if (id === 'search-seizure') return `
    <h3>Key Legal Principles — Search & Seizure</h3>
    <p><strong>Pennsylvania vehicle searches (MTPD ALO 1.2):</strong> Probable cause alone does not justify a warrantless vehicle search in Pennsylvania. You need both probable cause AND exigent circumstances. This is stricter than the federal standard and applies to every stop in this jurisdiction.</p>
    <p><strong>Consent searches (MTPD ALO 1.2):</strong> Use the Search and Seizure Consent Form (Attachment D) or have consent recorded on camera. If neither is used, document in detail how consent was given, your demeanor, whether weapons were drawn, and the subject\'s apparent condition.</p>
    <p><strong>Probable cause documentation</strong> must contain specific, articulable facts — not conclusions. Courts evaluate whether a reasonable officer with your training and experience would reach the same conclusion from those facts.</p>
    <p><strong>K9 deployment</strong> requires an independent lawful basis to extend the stop beyond its original purpose (Rodriguez v. United States, 2015). Document your timeline and the basis for extended detention.</p>
    <p><strong>No crime scene exception (MTPD ALO 1.2):</strong> There is no crime scene exception to the search warrant requirement. Secure the scene. Get the warrant.</p>
    <p><strong>Documentation of inconclusive stops</strong> is never optional. Every stop that generates observations — even those ending without arrest — deserves complete CAD documentation for intelligence and legal protection.</p>`;
  if (id === 'use-of-force') return `
    <h3>Key Legal Principles — Use of Force</h3>
    <p><strong>Graham v. Connor (1989)</strong> is the controlling standard for every use of force. Force must be objectively reasonable based on: severity of the crime, immediacy of the threat, and active resistance or evasion. All three factors must appear explicitly in your report.</p>
    <p><strong>MTPD Order 1.3 — Force Continuum:</strong> MTPD uses an eight-level continuum. Levels may be skipped given circumstances — but every level applied must be documented and justified. Force ends immediately when resistance ceases.</p>
    <p><strong>MTPD ALO 1.3 — Prohibited techniques:</strong> Carotid restraints and all choke holds or neck restraints are specifically and strictly prohibited — except when an officer or another is in imminent fear of death or serious bodily injury and no other alternative exists.</p>
    <p><strong>MTPD ALO 1.3 — Reporting:</strong> Use of Force Report must be completed before you end your shift. It is a separate internal document — never attach it to your incident report. Supervisor must be notified to scene. EMS required when injury is known, suspected, or alleged.</p>
    <p><strong>Pennsylvania Act 57 of 2020</strong> created a statewide database of officer separation and disciplinary records — documented use-of-force history, including final discipline for excessive force, follows an officer between departments. Thorough, accurate reporting protects you. When in doubt, file the report.</p>
    <p><strong>Conclusory reports fail.</strong> "Feared for my safety" is a conclusion. "Subject advancing at approximately 25 feet, flashlight raised at shoulder height, non-responsive to verbal commands" is documentation that survives scrutiny.</p>`;
  if (id === 'report-writing') return `
    <h3>Key Legal Principles — Report Writing</h3>
    <p><strong>Contemporaneous documentation</strong> is the standard. Write as soon as safely possible. Review body camera footage before writing — your report should match the footage exactly.</p>
    <p><strong>MTPD ALO 1.3 — Use of Force Report is a separate document.</strong> It shall not be attached to your incident or supplemental report. It is an internal management document, completed before end of shift, released only with the Chief\'s authorization. Confusing these two documents is a policy violation.</p>
    <p><strong>Factual language, not conclusions.</strong> "Resisted arrest" is a conclusion. "Subject tensed both arms, pulled away from grip, and rotated body toward officer" is a fact. Facts survive cross-examination. Conclusions do not.</p>
    <p><strong>Your report is your sworn account.</strong> It cannot be written by your partner for your observations. Each officer documents what they personally witnessed, from their own perspective.</p>
    <p><strong>Every use of force narrative</strong> must include: the subject\'s specific action, the officer\'s specific response, the sequence and timeline, and the Graham three-factor analysis. Missing any element creates exposure for both the officer and the case.</p>
    <p><strong>Inconclusive stops deserve documentation.</strong> Observations that aren\'t recorded don\'t exist for future probable cause, corroboration, or intelligence. If you observed it, document it.</p>`;
  if (id === 'crisis-intervention') return `
    <h3>Key Legal Principles — Crisis Intervention</h3>
    <p><strong>PA Mental Health Procedures Act (50 P.S. § 7302)</strong> authorizes a 302 involuntary examination when a person poses a clear and present danger based on a recent overt act, attempt, or threat. Prior history alone does not establish current criteria. Document the specific basis precisely.</p>
    <p><strong>MTPD ALO 5.4</strong> requires officers to consider and employ de-escalation whenever it is safe and feasible, and <strong>PA Act 59 of 2020</strong> mandates annual statewide de-escalation training. This is a documented requirement, not optional guidance. Document your de-escalation efforts with the same care you document force.</p>
    <p><strong>The approach is the intervention.</strong> Authoritative commands trigger escalation in mental health crisis — calm, low-key contact is both tactically and legally the correct first response. Your demeanor is part of your tactics.</p>
    <p><strong>Escalation spikes are self-limiting.</strong> When a subject reaches a peak of agitation, reducing your own energy and creating space is more effective than additional commands. Wait for the spike to pass before re-engaging.</p>
    <p><strong>Voluntary action over forced intervention.</strong> Voluntary weapon surrender and voluntary evaluation, achieved through rapport, are almost always preferable outcomes — legally and tactically. Document every step that led to a voluntary resolution.</p>`;
  if (id === 'domestic-violence') return `
    <h3>Key Legal Principles — Domestic Violence Response</h3>
    <p><strong>MTPD ALO 4.13 — Mandatory arrest:</strong> When probable cause exists for a qualifying DV offense between household members, arrest of the primary aggressor is mandatory. Officer observations plus a consistent victim statement establish probable cause. Victim preference does not control and is not a required element.</p>
    <p><strong>MTPD ALO 4.13 — Mandatory firearms seizure:</strong> When a DV arrest is made and the subject is subject to a protective order prohibiting firearm possession, officers shall seize any firearms at the scene. Document each firearm on a Property Record Form per ALO 3.05/3.06 before end of shift.</p>
    <p><strong>MTPD ALO 4.13 — Victim notifications:</strong> Following a DV arrest, provide the DV resource card, advise the victim of arraignment timeline, bail conditions, shelter services, and PFA availability. Document completion of notifications in your report narrative.</p>
    <p><strong>MTPD ALO 4.13 — Never release instead of transport:</strong> Once arrested, a DV subject goes to arraignment. There is no circumstance — victim request, officer convenience, or subject cooperation — that authorizes releasing a DV arrestee instead of transporting them to the issuing authority.</p>
    <p><strong>MTPD ALO 4.13 — DV narrative checklist:</strong> Your report narrative must address all 12 items when applicable, including observed injuries, reported-but-unobserved injuries (noted as such), evidence of a crime, arrest made or detailed explanation of why not, children present and their location, and previous incidents known to the officer.</p>
    <p><strong>PFA enforcement:</strong> A PFA violation is a criminal offense. Presence at a protected location or any contact with the protected party is independently chargeable. The protected party cannot waive the order\'s protections on the subject\'s behalf.</p>`;
  if (id === 'vehicle-pursuits') return `
    <h3>Key Legal Principles — Motor Vehicle Pursuits</h3>
    <p><strong>MTPD ALO 4.02 — Immediate notification:</strong> Upon initiating a pursuit, immediately notify communications of your unit, nature of the offense, direction, speed, and vehicle description. Supervisor notification and authorization are required from the moment a vehicle fails to stop.</p>
    <p><strong>MTPD ALO 4.02 — Two-unit maximum:</strong> Hard limit — two patrol units in any pursuit. A third unit may not join regardless of operational rationale. Stop sticks are the authorized alternative for containment and interdiction, deployed by a unit not in pursuit with supervisor authorization.</p>
    <p><strong>MTPD ALO 4.02 — PIT maneuvers prohibited:</strong> Absolute prohibition. No supervisor authorization, offense severity, or circumstance authorizes a PIT maneuver under MTPD policy.</p>
    <p><strong>MTPD ALO 4.02 — Termination criteria:</strong> Terminate when danger outweighs apprehension need; when suspect identity is known and later arrest is feasible; when the offense is a summary violation; or when a superior orders termination. These factors must be evaluated continuously — not just at initiation.</p>
    <p><strong>Continuous evaluation obligation:</strong> Pursuit authorization at initiation does not mean indefinite authorization to continue. Every change in road conditions, speed, traffic, and known suspect information must re-trigger your evaluation. A pursuit that was appropriate to initiate may be appropriate to terminate 60 seconds later.</p>
    <p><strong>Post-pursuit documentation:</strong> Every pursuit requires documentation — terminated or completed. Supervisor completes a Pursuit Review Form within 24 hours. Document every decision, notification, and basis for termination as it occurred.</p>`;
  if (id === 'leadership') return `
    <h3>Key Legal Principles — Leadership & Supervision</h3>
    <p><strong>Terry v. Ohio (1968) — Reasonable Articulable Suspicion:</strong> An investigative stop requires individualized, reasonable articulable suspicion of criminal activity. Group presence in a location does not supply the basis for individual stops. Senior officers who understand and apply this standard protect the department from civil liability and train junior officers correctly by example.</p>
    <p><strong>18 Pa. C.S. § 3503 — Criminal Trespass:</strong> A lawful trespass enforcement requires posted signage, a fenced boundary designed to exclude intruders, or direct prior communication to the subject that entry is not permitted. Responding to a "loitering" call without assessing whether these elements are present leads to unlawful enforcement action.</p>
    <p><strong>MTPD ALO 1.01 — Chain of Command:</strong> Senior officers carry responsibility for modeling professional standards in every patrol contact. Corrections to junior officer conduct should occur privately and directly — not in the field in front of the public or other personnel. The standard is consistency: making the same call whether the chief is on scene or not.</p>
    <p><strong>Leadership principle — documented supervisory work:</strong> Every patrol-level leadership action you take — a correction, a teaching moment, a policy-grounded decision — is evidence of supervisory readiness. The officers who advance to sergeant are not the ones who waited for the badge. They are the ones who were already leading without it.</p>`;
  if (id === 'traffic-stops') return `
    <h3>Key Legal Principles — Traffic Stops & Vehicle Contacts</h3>
    <p><strong>Pennsylvania v. Mimms (1977):</strong> Officers may order the driver of a lawfully stopped vehicle to exit as a matter of course — no additional justification required. The authority is categorical and attaches to the lawful stop itself.</p>
    <p><strong>Maryland v. Wilson (1997):</strong> Mimms extends to all passengers. All occupants of a lawfully stopped vehicle may be ordered out without individualized suspicion. Use this authority when officer safety requires it — it does not require a separate justification.</p>
    <p><strong>Rodriguez v. United States (2015):</strong> A stop cannot be extended beyond the time reasonably required to complete its purpose without independent reasonable suspicion. However, Rodriguez does not restrict action on probable cause that independently develops during the lawful stop\'s execution. Know the distinction — confusing the two leads to either unlawful extensions or abandoned probable cause.</p>
    <p><strong>Commonwealth v. Alexander (2020) — PA Vehicle Searches (overruled <em>Gary</em>):</strong> A warrantless vehicle search in Pennsylvania requires both probable cause and exigent circumstances; a warrant is the default. Under <strong>Commonwealth v. Barr (2021)</strong>, the odor of marijuana alone no longer establishes probable cause but remains a factor in the totality of the circumstances. Document the basis specifically — vague probable cause documentation is the most common suppression vulnerability in vehicle search cases.</p>
    <p><strong>Consent vs. Probable Cause:</strong> These are independent legal bases. When you have probable cause, consent is irrelevant — a subject\'s objection does not vitiate probable cause under the automobile exception. Document the objection as context, but proceed on your legal basis. Stopping a lawful search because a subject objects is a legal and tactical error.`;
  if (id === 'emotional-intelligence') return `
    <h3>Key Legal Principles — Emotional Intelligence</h3>
    <p><strong>Trauma-informed approach:</strong> DV victims who present as hostile or uncooperative are not being difficult — they are displaying normal trauma responses including fear, shame, prior negative law enforcement experiences, and self-protective behavior. Misreading these responses leads to missed evidence, failed prosecutions, and victims who don\'t call before the next incident escalates.</p>
    <p><strong>MTPD ALO 4.13 — Victim notification requirements:</strong> At every DV contact, officers shall provide information about available legal remedies, victim advocate services, and the PFA process. This is not optional and is not contingent on whether the victim appears cooperative. The information must be provided regardless of victim response.</p>
    <p><strong>Pennsylvania Protection From Abuse Act — 23 Pa. C.S. § 6102:</strong> Emergency PFA orders can be obtained outside of business hours through the on-call magisterial district judge. Victim advocates can assist with filing. Officers should know this process and communicate it accurately — false reassurance about custody timelines destroys victim trust and reduces future cooperation with law enforcement.</p>
    <p><strong>Supplemental reporting obligation:</strong> Evidence and injuries identified during follow-up contacts must be documented in a supplemental report. A bruise documented three days after the incident with a specific account from the victim is admissible evidence. An undocumented injury is a gap in the prosecution record. The follow-up contact is part of the investigation.</p>`;
  if (id === 'evidence-chain-of-custody') return `
    <h3>Key Legal Principles — Evidence &amp; Chain of Custody</h3>
    <p><strong>Document before you touch.</strong> In-place documentation — photograph and note exact position — is the foundation of an unassailable chain. A photograph taken after an item is moved cannot establish its original position. This is one of the most common and preventable suppression vulnerabilities in physical evidence cases.</p>
    <p><strong>MTPD ALO 3.05/3.06 — Property Record Form required before end of shift.</strong> Every item of evidence or property collected requires a completed Property Record Form before end of shift. No exceptions. The form documents every transfer in the chain — who had it, when, why it moved, and where. Incomplete forms are the second most common chain of custody challenge.</p>
    <p><strong>Packaging rules are evidence rules.</strong> All physical evidence is packaged in paper, sealed with evidence tape, and initialed with date across the seal. Biological evidence in plastic containers decomposes — a destroyed DNA sample cannot be recovered. Packaging is labeled with the RMS incident number, item number, and hazard warnings. Proper packaging is part of the chain.</p>
    <p><strong>Suppression standard:</strong> Courts ask whether there is a reasonable probability the evidence was not altered or substituted. Your documentation — in-place photos, Property Record Form, unbroken custody notes — is what answers that question. If you cannot answer it, neither can the prosecutor.</p>
    <p><strong>Temporary locker, not patrol car.</strong> Evidence stored in a patrol car, a locker room, or on an officer\'s desk is evidence with a gap in its chain. Temporary evidence lockers are the authorized interim storage for all items pending property room access.`;
  if (id === 'officer-wellness') return `
    <h3>Key Legal Principles — Officer Wellness</h3>
    <p><strong>Secondary traumatic stress is a documented occupational injury.</strong> The law enforcement profession carries documented elevated risk for PTSD, STS, and occupational depression. Officers experiencing STS are not weak — they are responding to repeated exposure to human trauma. Early recognition and resource access prevent the compounding harm of untreated occupational trauma.</p>
    <p><strong>MTPD Peer Support Program</strong> provides confidential, non-clinical support from trained peer counselors — fellow officers. Peer support contacts are confidential within program policy limits and do not affect fitness-for-duty status. Contacting peer support is not a disciplinary action. It is the correct first step for an officer experiencing stress short of acute crisis.</p>
    <p><strong>Employee Assistance Program (EAP)</strong> provides free access to licensed mental health professionals, outside the department chain of command, for officers and immediate family. EAP contacts are not reported to supervisors. Confidentiality limits apply when there is imminent risk of harm to self or others, disclosure of a serious criminal offense, or a court order requiring disclosure.</p>
    <p><strong>Warning signs require action, not silence.</strong> Emotional numbing, behavioral changes, increased substance use, social withdrawal, and statements of hopelessness are recognized indicators of STS or PTSD. Your obligation is not to diagnose — it is to notice, say something directly, and point toward resources. Officers who intervene early save careers and lives.</p>
    <p><strong>A culture of silence is a liability.</strong> Departments that discourage wellness conversation carry the human and institutional cost of officers who deteriorate until a critical incident forces action. Officers who model help-seeking and peer support change the culture — and that change belongs to every officer who chooses it.`;
  if (id === 'de-escalation') return `
    <h3>Key Legal Principles — De-escalation</h3>
    <p><strong>MTPD ALO 5.4</strong> requires officers to consider and employ de-escalation techniques when safe and feasible before applying force, and <strong>Pennsylvania Act 59 of 2020</strong> mandates annual statewide training in de-escalation. This is a documented requirement, not guidance. Officers who bypass available de-escalation when time and safety permitted face scrutiny in policy review and civil proceedings.</p>
    <p><strong>Graham v. Connor (1989) — de-escalation dimension:</strong> Pennsylvania courts have applied the objective reasonableness standard to ask not only whether the force used was reasonable, but whether the officer took reasonable steps to avoid the need for force. Document specific de-escalation efforts — the technique used, how the subject responded, and what change in circumstances closed the de-escalation window.</p>
    <p><strong>MTPD ALO 5.4 — Documentation requirement:</strong> When de-escalation is employed, officers shall document the specific techniques used, the subject\'s response, and the reason de-escalation was or was not continued. "De-escalation was attempted" is not documentation. "Officer created distance, used calm verbal contact by name for approximately four minutes, subject began to lower voice and make eye contact" — that is documentation.</p>
    <p><strong>PA Mental Health Procedures Act — 50 P.S. § 7302:</strong> When a contact involves a person in possible acute psychiatric distress, de-escalation is both tactically and legally the correct first approach. A 302 involuntary examination requires a recent overt act, attempt, or threat establishing clear and present danger. Document the specific factual basis — and document de-escalation efforts that preceded any 302 initiation.</p>
    <p><strong>De-escalation does not eliminate force authority.</strong> The authority to use objectively reasonable force is not suspended during de-escalation. When a subject creates an imminent threat — regardless of prior de-escalation attempts — force options are live. Document the specific change in circumstances that required the transition. The record of your de-escalation effort protects you when force eventually becomes necessary.`;
  /* SMOKE-ALLOW-DEPT-NAMES:end */
  return '<h3>Key Legal Principles</h3><p>Review the legal references presented during the scenario before proceeding to the assessment.</p>';
}

/* ── Debrief ────────────────────────────── */
function showDebrief() {
  showScreen('screen-debrief');
  window.scrollTo(0, 0);

  // Attach consequence quality from the nodes we traversed
  // The path was built during selectDecision — but we need outcome from the consequence nodes
  // Re-walk to get consequence info
  const scen = currentModule._activeScenario || currentModule.scenario;
  const nodes = scen.nodes;
  const legalNotes = [];

  const steps = scenarioPath.map((step, i) => {
    const qualityClass = step.quality === 'good' ? 'step-good' : step.quality === 'bad' || step.quality === 'risky' ? 'step-bad' : 'step-neutral';
    const qualityLabel = step.quality === 'good' ? 'Sound Decision' : step.quality === 'bad' ? 'Error Identified' : step.quality === 'risky' ? 'High Risk' : 'Noted';
    return `
      <div class="debrief-step ${qualityClass}">
        <div class="debrief-step-header">
          <span class="step-num">Decision ${step.decisionNumber}</span>
          <span class="step-outcome-badge">${qualityLabel}</span>
        </div>
        <div class="debrief-step-body">
          <div class="step-choice">You chose: <span>${step.choiceText}</span></div>
        </div>
      </div>`;
  }).join('');

  // Collect all legal notes from traversed consequence nodes
  Object.values(nodes).forEach(n => {
    if (n.type === 'consequence' && n.legal) legalNotes.push(n.legal);
  });

  const goodDecisions = scenarioPath.filter(s => s.quality === 'good').length;
  const totalDecisions = scenarioPath.length;
  const allGood = goodDecisions === totalDecisions;

  document.getElementById('debrief-body').innerHTML = `
    <div class="debrief-header">
      <div class="debrief-icon">${allGood ? '✅' : '📋'}</div>
      <h2>Scenario Complete</h2>
      <p>${allGood ? 'You navigated this scenario with sound legal judgment. Proceed to the knowledge assessment.' : 'Review the decisions below before proceeding to the knowledge assessment.'}</p>
    </div>
    <div class="debrief-timeline">
      <h3>Your Decision Record</h3>
      ${steps}
    </div>
    <div class="debrief-legal-summary">
      ${getDebriefLegalSummary()}
    </div>
    <div class="debrief-actions">
      <button class="btn-review-module" onclick="startModule('${currentModule.id}')">← Review Module</button>
      <button class="btn-proceed-quiz" onclick="startQuiz('${currentModule.id}')">Proceed to Knowledge Assessment →</button>
    </div>
  `;
}

/* ── Quiz ───────────────────────────────── */
/* ── Role-aware content (supervisor track) ──
   Supervisors (currentUser.track === 'supervisor') get the module's own
   supervisor reading addendum + quiz set when the module provides them.
   Everyone else — and any module without supervisor variants — falls back
   to the standard patrol content. One resolver, used at every read site. */
// The track whose content is currently served. Admins can override their
// own track via the "Viewing as" toggle (previewTrackOverride); everyone
// else — including admins who haven't touched the toggle — uses their real
// track, so Halteman/Mascio still get the graded supervisor track by default.
function effectiveTrack() {
  if (!currentUser) return null;
  if (currentUser.role === 'admin' && previewTrackOverride) return previewTrackOverride;
  return currentUser.track || 'patrol';
}
function activeQuestions(m) {
  return (effectiveTrack() === 'supervisor' && m && m.supervisorQuestions)
    ? m.supervisorQuestions
    : (m ? m.questions : []);
}
function activeContentHtml(m) {
  return (effectiveTrack() === 'supervisor' && m && m.supervisorContentHtml)
    ? m.supervisorContentHtml
    : (m ? m.contentHtml : '');
}
function activeScenario(m) {
  return (effectiveTrack() === 'supervisor' && m && m.supervisorScenario)
    ? m.supervisorScenario
    : (m ? m.scenario : null);
}

// Admin-only "Viewing as" toggle. Renders a Patrol/Supervisor segmented
// control into containerId (hidden for non-admins), highlighting the
// effective track. Flipping it re-renders whatever the admin is viewing.
function renderTrackToggle(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  // Only for admins, and only where the active department declares the
  // supervisor track in the registry (features.supervisorTrack). Branch on
  // the declared capability, never on the subdomain.
  const deptHasSupervisorTrack = !!(ACTIVE_DEPARTMENT && ACTIVE_DEPARTMENT.features && ACTIVE_DEPARTMENT.features.supervisorTrack);
  if (!currentUser || currentUser.role !== 'admin' || !deptHasSupervisorTrack) { el.style.display = 'none'; return; }
  const cur = effectiveTrack();
  el.style.display = '';
  el.innerHTML =
    '<span class="track-toggle-label">Viewing as</span>' +
    '<div class="track-seg">' +
      '<button class="track-opt' + (cur === 'patrol' ? ' active' : '') + '" onclick="setPreviewTrack(\'patrol\')">Patrol</button>' +
      '<button class="track-opt' + (cur === 'supervisor' ? ' active' : '') + '" onclick="setPreviewTrack(\'supervisor\')">Supervisor</button>' +
    '</div>';
}

function setPreviewTrack(track) {
  previewTrackOverride = track;
  // Re-render whatever admin is currently looking at.
  const onModule = document.getElementById('screen-module').classList.contains('active');
  if (onModule && currentModule) {
    renderModuleContent();
    renderTrackToggle('track-toggle-module');
  }
  renderTrackToggle('track-toggle-dash');
}

function startQuiz(moduleId) {
  stopAllTimers();
  currentModule  = MODULES.find(m => m.id === moduleId);
  if (!currentModule || !activeQuestions(currentModule).length) return;
  currentQuizIdx = 0;
  quizCorrect    = 0;
  quizAnswered   = false;
  quizSeconds    = 0;
  quizTotal      = activeQuestions(currentModule).length;
  showScreen('screen-quiz');
  window.scrollTo(0, 0);
  document.getElementById('quiz-module-label').textContent = currentModule.category;
  document.getElementById('quiz-title-label').textContent  = currentModule.title + ' — Assessment';
  quizTimer = setInterval(() => { quizSeconds++; document.getElementById('quiz-timer-display').textContent = formatTime(quizSeconds); }, 1000);
  renderQuestion();
}

function renderQuestion() {
  const q = activeQuestions(currentModule)[currentQuizIdx];
  quizAnswered = false;
  quizSelectedIdx = null;
  const primaryBtn = document.getElementById('btn-next-q');
  primaryBtn.disabled    = true;              // enabled once an option is selected
  primaryBtn.textContent = 'Submit Answer';   // becomes Next/Submit Assessment after commit
  document.getElementById('quiz-progress-bar').style.width = Math.round((currentQuizIdx/quizTotal)*100)+'%';
  document.getElementById('quiz-q-counter').textContent    = `Question ${currentQuizIdx+1} of ${quizTotal}`;
  document.getElementById('quiz-score-running').textContent = `Score: ${quizCorrect} / ${currentQuizIdx}`;
  const opts = q.options.map((o,i) => `
    <button class="answer-option" onclick="selectAnswer(${i})" id="opt-${i}">
      <span class="opt-letter">${String.fromCharCode(65+i)}</span>
      <span class="opt-text">${o}</span>
    </button>`).join('');
  document.getElementById('question-card').innerHTML = `
    <div class="q-label">Question ${currentQuizIdx+1} of ${quizTotal}</div>
    <div class="q-scenario">${q.scenario}</div>
    <div class="q-text">${q.text}</div>
    <div class="answer-options">${opts}</div>
    <div id="answer-feedback"></div>`;
}

// Clicking an option only SELECTS it — nothing is revealed or scored yet, and
// the officer can change the selection as many times as they like before
// committing. (Officer feedback: locking on first click was frustrating.)
function selectAnswer(idx) {
  if (quizAnswered) return; // already committed — options are locked
  quizSelectedIdx = idx;
  const q = activeQuestions(currentModule)[currentQuizIdx];
  for (let i=0; i<q.options.length; i++) {
    const el = document.getElementById('opt-'+i);
    if (el) el.classList.toggle('selected', i === idx);
  }
  document.getElementById('btn-next-q').disabled = false; // Submit now available
}

// Commit the selected answer: lock the options, reveal correct/incorrect, show
// feedback, and score. Scoring happens here and only here, so changing your
// pick before Submit can never inflate the grade.
function submitAnswer() {
  if (quizAnswered || quizSelectedIdx === null) return;
  quizAnswered = true;
  const idx = quizSelectedIdx;
  const q = activeQuestions(currentModule)[currentQuizIdx];
  const isCorrect = (idx === q.correct);
  if (isCorrect) quizCorrect++;
  for (let i=0; i<q.options.length; i++) {
    const el = document.getElementById('opt-'+i);
    el.disabled = true;
    el.classList.remove('selected');
    if (i===idx) el.classList.add(isCorrect ? 'correct' : 'incorrect');
    else if (i===q.correct && !isCorrect) el.classList.add('reveal-correct');
  }
  const fb = document.getElementById('answer-feedback');
  fb.className = 'answer-feedback ' + (isCorrect ? 'correct-fb' : 'incorrect-fb');
  fb.textContent = (isCorrect ? '✓ ' : '✗ ') + q.feedback;
  const btn = document.getElementById('btn-next-q');
  btn.textContent = currentQuizIdx === quizTotal-1 ? 'Submit Assessment →' : 'Next Question →';
  btn.disabled = false;
  document.getElementById('quiz-score-running').textContent = `Score: ${quizCorrect} / ${currentQuizIdx+1}`;
  saveQuizState();
}

// The primary quiz button is two-stage: it submits the chosen answer, then
// (once committed) advances to the next question or finishes the assessment.
function quizPrimaryAction() {
  if (!quizAnswered) submitAnswer();
  else nextQuestion();
}

function nextQuestion() {
  if (!quizAnswered) return;
  currentQuizIdx++;
  if (currentQuizIdx >= quizTotal) finishQuiz();
  else renderQuestion();
}

async function finishQuiz() {
  stopAllTimers();
  clearQuizState();
  const pct     = Math.round((quizCorrect / quizTotal) * 100);
  const passed  = pct >= 70;
  const timeStr = formatTime(quizSeconds);
  const uid     = currentUser.id;
  const modId   = currentModule.id;

  if (!completionData[uid]) completionData[uid] = {};
  const prev     = completionData[uid][modId] || { attempts: 0, passed: false, bestScore: 0, scores: [] };
  const attempts = prev.attempts + 1;
  const bestScore = Math.max(prev.bestScore || 0, pct);
  const scores    = [...(prev.scores || []), pct];
  const remediation = !passed && attempts >= 3;

  completionData[uid][modId] = {
    attempts, passed, bestScore, scores, remediation,
    score: pct, time: timeStr,
    date: new Date().toISOString().split('T')[0],
    correct: quizCorrect, total: quizTotal,
  };

  // Persist to Supabase — await so we can warn the officer on failure
  const { error: saveError } = await saveCompletionToSupabase(uid, modId, completionData[uid][modId]);
  // On failure, stash the record locally so it isn't lost — it'll be retried
  // on the next load (flushPendingCompletions) rather than forcing a retake.
  if (saveError) queuePendingCompletion(uid, modId, completionData[uid][modId]);

  showScreen('screen-results');

  // Attempt dots (3 slots)
  const dots = Array.from({ length: 3 }, (_, i) => {
    let cls = 'remaining';
    if (i < attempts - 1) cls = 'used-fail'; // previous attempts all failed (if they\'re retaking they failed before)
    if (i === attempts - 1) cls = passed ? 'used-pass' : 'used-fail';
    return `<div class="attempt-dot ${cls}"></div>`;
  }).join('');
  document.getElementById('attempt-dots').innerHTML = dots;

  document.getElementById('results-pct').textContent = pct + '%';
  document.getElementById('results-pass-label').textContent = passed ? 'PASS' : 'FAIL';
  document.getElementById('results-ring').className  = 'results-score-ring ' + (passed ? 'pass' : 'fail');
  document.getElementById('res-correct').textContent = quizCorrect;
  document.getElementById('res-total').textContent   = quizTotal;
  document.getElementById('res-time').textContent    = timeStr;

  if (passed) {
    document.getElementById('results-icon').textContent    = '✅';
    document.getElementById('results-heading').textContent = 'Assessment Passed';
    document.getElementById('results-sub').textContent     = `Passed on attempt ${attempts} of 3. Score recorded.`;
    document.getElementById('results-action').innerHTML    = `<button class="btn-dashboard" onclick="showOfficerDashboard()">Return to Dashboard</button>`;
  } else if (remediation) {
    document.getElementById('results-icon').textContent    = '⚠️';
    document.getElementById('results-heading').textContent = 'Maximum Attempts Reached';
    document.getElementById('results-sub').textContent     = `Best score: ${bestScore}%. A passing score of 70% is required.`;
    document.getElementById('results-action').innerHTML    = `
      <div class="remediation-notice">
        <p>You have used all three attempts. This module has been flagged in the admin panel. Your supervisor must review your record and authorize a retake before you can proceed.</p>
      </div>
      <button class="btn-dashboard" onclick="showOfficerDashboard()">Return to Dashboard</button>`;
  } else {
    const remaining = 3 - attempts;
    document.getElementById('results-icon').textContent    = '📋';
    document.getElementById('results-heading').textContent = `Attempt ${attempts} of 3 — Not Passed`;
    document.getElementById('results-sub').textContent     = `A score of 70% or higher is required. You have ${remaining} attempt${remaining !== 1 ? 's' : ''} remaining.`;
    document.getElementById('results-action').innerHTML    = `
      <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
        <button class="btn-dashboard" onclick="showOfficerDashboard()">Return to Dashboard</button>
        <button class="btn-retake" onclick="retakeQuiz()">Retake — Attempt ${attempts + 1} of 3 →</button>
      </div>`;
  }

  // If the Supabase write was rejected (e.g. auth_uid not linked), warn the officer.
  // This prevents a silent failure where the officer sees "passed" but nothing is recorded.
  if (saveError) {
    const warn = document.createElement('div');
    warn.className = 'save-warning';
    warn.innerHTML = '<p>⚠️ Your score could not reach the server, but it has been saved on this device and will sync automatically the next time you sign in here. If it still shows as incomplete after your next sign-in, notify your supervisor.</p>';
    const actionEl = document.getElementById('results-action');
    if (actionEl) actionEl.after(warn);
  }
}

function retakeQuiz() {
  startQuiz(currentModule.id);
}

/* ── Admin ──────────────────────────────── */
function renderAdminDashboard() {
  // Hide "Back to Admin" button — we\'re on admin screen now
  const backBtn = document.getElementById('btn-back-admin');
  if (backBtn) backBtn.style.display = 'none';
  // Show admin\'s real name/rank in header
  if (currentUser) {
    const nameEl = document.getElementById('admin-name-display');
    const rankEl = document.getElementById('admin-rank-display');
    if (nameEl) nameEl.textContent = currentUser.name || 'Administrator';
    if (rankEl) rankEl.textContent = currentUser.rank || 'Command Staff';
  }
  renderAdminStats(); renderAdminTable(); renderAdminModules();
}

/* Platform/support accounts (health-check bot, preview logins,
   Arbiter LE staff admins) are excluded from every admin view —
   agency command staff should only see their own personnel.
   Covered: known badges, the ADMIN-<DEPT> badge convention
   (e.g. ADMIN-EGPD), and any @arbiterle.com email. */
const PLATFORM_BADGES = ['healthcheck', 'PREVIEW'];
function isPlatformAccount(badge) {
  if (PLATFORM_BADGES.includes(badge) || badge.startsWith('ADMIN-')) return true;
  const email = USERS[badge]?.email;
  return !!email && email.toLowerCase().endsWith('@arbiterle.com');
}
function rosterBadges() {
  return Object.keys(USERS).filter(k => USERS[k].role !== undefined && !isPlatformAccount(k));
}

function renderAdminStats() {
  const statsEl = document.getElementById('admin-stats-row');
  // If the data load failed, say so plainly. An empty/0% dashboard is
  // indistinguishable from "nobody trained" — the worst thing a chief can see.
  if (adminDataError) {
    if (statsEl) statsEl.innerHTML =
      '<div class="stat-card" style="flex:1;border-top-color:#8b2635">' +
        '<div class="stat-label" style="color:#8b2635">Records Unavailable</div>' +
        '<div style="font-size:13px;color:var(--text-muted);margin-top:6px;line-height:1.5">' +
          'Could not load officer records from the server. Check your connection and refresh the page. ' +
          'If this continues, contact support@arbiterle.com.</div>' +
      '</div>';
    return;
  }
  const officers = rosterBadges();
  let compliant=0, overdueCount=0, totalComps=0, totalScores=[];
  officers.forEach(uid => {
    const done = completionData[uid]||{};
    const doneCount = Object.keys(done).length;
    totalComps += doneCount;
    const allPassed = MODULES.every(m => done[m.id] && done[m.id].passed);
    if (allPassed) compliant++;
    const anyOverdue = MODULES.some(m => {
      if (done[m.id] && done[m.id].passed) return false;
      const s = getModuleSchedule(m.weekNumber);
      return s.status === 'overdue' || s.status === 'buffer';
    });
    if (anyOverdue) overdueCount++;
    Object.values(done).forEach(r => totalScores.push(r.score));
  });
  const avgScore = totalScores.length ? Math.round(totalScores.reduce((a,b)=>a+b,0)/totalScores.length) : 0;
  const compDenom = officers.length * MODULES.length;
  const compRate = compDenom ? Math.round((totalComps/compDenom)*100) : 0;
  document.getElementById('admin-stats-row').innerHTML = `
    <div class="stat-card"><div class="stat-label">Total Officers</div><div class="stat-value">${officers.length}</div></div>
    <div class="stat-card"><div class="stat-label">Fully Compliant</div><div class="stat-value success">${compliant}</div></div>
    <div class="stat-card"><div class="stat-label">Overdue</div><div class="stat-value accent">${overdueCount}</div></div>
    <div class="stat-card"><div class="stat-label">Completion Rate</div><div class="stat-value">${compRate}%</div></div>
    <div class="stat-card"><div class="stat-label">Avg Score</div><div class="stat-value">${avgScore ? avgScore+'%' : '—'}</div></div>`;
}

function renderAdminTable() {
  const filterVal = document.getElementById('filter-status').value;
  const officers  = rosterBadges();
  const rows = officers.map(uid => {
    const user = USERS[uid];
    const done = completionData[uid]||{};
    const doneCount = Object.keys(done).length;
    const scores    = Object.values(done).map(r=>r.score);
    const avgScore  = scores.length ? Math.round(scores.reduce((a,b)=>a+b,0)/scores.length) : null;
    const hasOverdue     = MODULES.some(m => {
      if (done[m.id] && done[m.id].passed) return false;
      const s = getModuleSchedule(m.weekNumber);
      return s.status === 'overdue' || s.status === 'buffer';
    });
    const hasRemediation = Object.values(done).some(r => r.remediation);
    const isComplete     = doneCount===MODULES.length && Object.values(done).every(r => r.passed);
    const statusStr  = isComplete ? 'complete' : hasRemediation ? 'remediation' : hasOverdue ? 'overdue' : 'pending';
    const statusLabel = isComplete ? 'Complete' : hasRemediation ? 'Remediation' : hasOverdue ? 'Overdue' : 'In Progress';
    if (filterVal!=='all' && filterVal!==statusStr) return null;
    const dates = Object.values(done).map(r=>r.date).filter(Boolean).sort().reverse();
    const scoreClass = avgScore!==null ? (avgScore>=90?'high':avgScore>=70?'mid':'low') : '';
    const attemptsNote = Object.entries(done)
      .filter(([,r]) => r.attempts > 1)
      .map(([id,r]) => {
        const mod = MODULES.find(m => m.id === id);
        return `${mod ? mod.title.split(' ')[0] + ' ' + mod.title.split(' ')[1] : id}: ${r.attempts}/3 attempts`;
      }).join(', ');
    return `<tr ${hasRemediation ? 'style="background:rgba(139,38,53,.08)"' : ''}>
      <td><strong>${user.name}</strong><br/><small style="color:var(--text-muted)">${user.rank}</small></td>
      <td>${user.badge}</td>
      <td>${MODULES.length}</td>
      <td>${doneCount} / ${MODULES.length}${attemptsNote ? `<br/><small style="color:var(--text-muted);font-size:10px">${attemptsNote}</small>` : ''}</td>
      <td class="score-cell ${scoreClass}">${avgScore!==null ? avgScore+'%' : '—'}</td>
      <td>${dates[0]||'—'}</td>
      <td><span class="badge-status ${statusStr}">${statusLabel}</span></td>
    </tr>`;
  }).filter(Boolean);
  document.getElementById('admin-table-body').innerHTML = rows.join('')||`<tr><td colspan="7" style="text-align:center;color:var(--text-muted);padding:24px">No records match the current filter.</td></tr>`;
}

function renderAdminModules() {
  const officers = rosterBadges();
  document.getElementById('admin-modules-body').innerHTML = MODULES.map(m => {
    const completions = officers.filter(uid => completionData[uid]?.[m.id]);
    const scores = completions.map(uid => completionData[uid][m.id].score);
    const avgScore = scores.length ? Math.round(scores.reduce((a,b)=>a+b,0)/scores.length) : null;
    const compRate = officers.length ? Math.round((completions.length/officers.length)*100) : 0;
    const scoreClass = avgScore ? (avgScore>=90?'high':avgScore>=70?'mid':'low') : '';
    return `<tr>
      <td><strong>${m.title}</strong></td>
      <td><span style="color:var(--accent);font-size:11px;text-transform:uppercase;letter-spacing:1px">${m.category}</span></td>
      <td>${officers.length}</td>
      <td>${compRate}%</td>
      <td class="score-cell ${scoreClass}">${avgScore!==null ? avgScore+'%' : '—'}</td>
      <td><span class="badge-status ${getModuleSchedule(m.weekNumber).class}">${getModuleSchedule(m.weekNumber).label}</span></td>
    </tr>`;
  }).join('');
}

function printComplianceReport() {
  const officers = rosterBadges();
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
  const timeStr = now.toLocaleTimeString('en-US', { hour:'2-digit', minute:'2-digit' });

  // Build per-officer rows
  const rows = officers.map(uid => {
    const user = USERS[uid];
    const done = completionData[uid] || {};
    const doneCount = Object.keys(done).length;
    const scores = Object.values(done).map(r => r.score);
    const avgScore = scores.length ? Math.round(scores.reduce((a,b)=>a+b,0)/scores.length) : null;
    const allPassed = MODULES.every(m => done[m.id] && done[m.id].passed);
    const hasOverdue = MODULES.some(m => {
      if (done[m.id] && done[m.id].passed) return false;
      const s = getModuleSchedule(m.weekNumber);
      return s.status === 'overdue' || s.status === 'buffer';
    });
    const hasRemediation = Object.values(done).some(r => r.remediation);
    const status = allPassed ? 'COMPLETE' : hasRemediation ? 'REMEDIATION' : hasOverdue ? 'OVERDUE' : 'IN PROGRESS';
    const statusColor = allPassed ? '#1a7a40' : hasRemediation ? '#8b2635' : hasOverdue ? '#c8902a' : '#3c6478';
    const dates = Object.values(done).map(r => r.date).filter(Boolean).sort().reverse();
    const moduleDetail = MODULES.map(m => {
      const rec = done[m.id];
      if (!rec) return `<td style="color:#aaa;text-align:center">—</td>`;
      const color = rec.passed ? '#1a7a40' : '#c8902a';
      return `<td style="text-align:center;color:${color};font-weight:600">${rec.score}%${rec.attempts > 1 ? `<br/><span style="font-size:9px;font-weight:400">${rec.attempts} attempts</span>` : ''}</td>`;
    }).join('');
    return `
      <tr style="background:${hasRemediation ? '#fff5f5' : '#fff'};border-bottom:1px solid #dde8f0">
        <td style="padding:10px 14px;font-weight:700">${user.name}</td>
        <td style="padding:10px 14px;color:#666">${user.badge}</td>
        <td style="padding:10px 14px;color:#666">${user.rank}</td>
        <td style="padding:10px 14px;text-align:center;font-weight:600">${doneCount} / ${MODULES.length}</td>
        <td style="padding:10px 14px;text-align:center;font-weight:700;color:${avgScore >= 90 ? '#1a7a40' : avgScore >= 70 ? '#2d6fa3' : avgScore !== null ? '#c8902a' : '#aaa'}">${avgScore !== null ? avgScore + '%' : '—'}</td>
        <td style="padding:10px 14px;text-align:center">${dates[0] || '—'}</td>
        <td style="padding:10px 14px;text-align:center;font-weight:700;color:${statusColor}">${status}</td>
        ${moduleDetail}
      </tr>`;
  }).join('');

  // Summary stats
  const totalOfficers = officers.length;
  const compliant = officers.filter(uid => {
    const done = completionData[uid] || {};
    return MODULES.every(m => done[m.id] && done[m.id].passed);
  }).length;
  const totalComps = officers.reduce((sum, uid) => sum + Object.keys(completionData[uid] || {}).length, 0);
  const _compDenom = totalOfficers * MODULES.length;
  const compRate = _compDenom ? Math.round((totalComps / _compDenom) * 100) : 0;
  const allScores = officers.flatMap(uid => Object.values(completionData[uid] || {}).map(r => r.score));
  const avgScore = allScores.length ? Math.round(allScores.reduce((a,b)=>a+b,0)/allScores.length) : 0;

  const moduleHeaders = MODULES.map(m => `<th style="padding:8px 6px;font-size:9px;letter-spacing:1px;text-transform:uppercase;color:#3c6478;white-space:nowrap;max-width:70px;overflow:hidden;text-overflow:ellipsis">Wk${m.weekNumber}</th>`).join('');

  // Brand the report from the active department — never hardcode an agency.
  // A printed compliance report is a client-facing artifact the chief keeps.
  const _dept = (typeof ACTIVE_DEPARTMENT !== 'undefined' && ACTIVE_DEPARTMENT) ? ACTIVE_DEPARTMENT : null;
  const deptName = _dept ? (_dept.displayName || _dept.shortName || _dept.name) : 'Department';
  const programStart = _dept && _dept.scheduleStart
    ? new Date(_dept.scheduleStart).toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' })
    : '—';

  const win = window.open('', '_blank', 'width=1100,height=800');
  win.document.write(`<!DOCTYPE html>
<html>
<head>
  <title>${deptName} Training Compliance Report — ${dateStr}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 12px; color: #1a2a3a; background: #fff; padding: 32px 40px; }
    .report-header { display: flex; align-items: flex-start; justify-content: space-between; border-bottom: 3px solid #3c6478; padding-bottom: 18px; margin-bottom: 24px; }
    .dept-info h1 { font-size: 20px; font-weight: 800; color: #0a1828; letter-spacing: 1px; text-transform: uppercase; }
    .dept-info h2 { font-size: 13px; font-weight: 400; color: #3c6478; letter-spacing: 2px; text-transform: uppercase; margin-top: 4px; }
    .report-meta { text-align: right; font-size: 11px; color: #666; line-height: 1.7; }
    .report-meta strong { color: #1a2a3a; }
    .stats-row { display: flex; gap: 16px; margin-bottom: 24px; }
    .stat-box { flex: 1; border: 1px solid #dde8f0; border-top: 3px solid #3c6478; border-radius: 6px; padding: 14px 16px; }
    .stat-label { font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase; color: #888; margin-bottom: 6px; }
    .stat-value { font-size: 26px; font-weight: 800; color: #1a2a3a; }
    .stat-value.green { color: #1a7a40; }
    .stat-value.gold { color: #c8902a; }
    .section-title { font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #3c6478; font-weight: 700; margin-bottom: 10px; border-bottom: 1px solid #dde8f0; padding-bottom: 6px; }
    table { width: 100%; border-collapse: collapse; font-size: 11px; }
    thead { background: #e4eef5; }
    th { text-align: left; font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase; color: #3c6478; padding: 10px 14px; font-weight: 700; border-bottom: 2px solid #3c6478; }
    tr:nth-child(even) { background: #f7fafc; }
    .report-footer { margin-top: 32px; padding-top: 14px; border-top: 1px solid #dde8f0; display: flex; justify-content: space-between; font-size: 10px; color: #aaa; }
    .signature-block { margin-top: 40px; display: flex; gap: 60px; }
    .sig-line { border-top: 1px solid #333; width: 220px; padding-top: 6px; font-size: 10px; color: #555; }
    @media print {
      body { padding: 20px 24px; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  <div class="report-header">
    <div class="dept-info">
      <h1>${deptName}</h1>
      <h2>Officer Training Compliance Report</h2>
    </div>
    <div class="report-meta">
      <strong>Generated:</strong> ${dateStr}<br/>
      <strong>Time:</strong> ${timeStr}<br/>
      <strong>Generated by:</strong> ${deptName} Training Platform<br/>
      <strong>Program Start:</strong> ${programStart}
    </div>
  </div>

  <div class="stats-row">
    <div class="stat-box">
      <div class="stat-label">Total Officers</div>
      <div class="stat-value">${totalOfficers}</div>
    </div>
    <div class="stat-box">
      <div class="stat-label">Fully Compliant</div>
      <div class="stat-value green">${compliant}</div>
    </div>
    <div class="stat-box">
      <div class="stat-label">Completion Rate</div>
      <div class="stat-value">${compRate}%</div>
    </div>
    <div class="stat-box">
      <div class="stat-label">Avg Score</div>
      <div class="stat-value ${avgScore >= 90 ? 'green' : avgScore >= 70 ? '' : 'gold'}">${avgScore ? avgScore + '%' : '—'}</div>
    </div>
    <div class="stat-box">
      <div class="stat-label">Total Modules</div>
      <div class="stat-value">${MODULES.length}</div>
    </div>
  </div>

  <div class="section-title">Officer Compliance — Detail</div>
  <table>
    <thead>
      <tr>
        <th>Officer</th>
        <th>Badge</th>
        <th>Rank</th>
        <th style="text-align:center">Completed</th>
        <th style="text-align:center">Avg Score</th>
        <th style="text-align:center">Last Activity</th>
        <th style="text-align:center">Status</th>
        ${moduleHeaders}
      </tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>

  <div style="margin-top:10px;font-size:9px;color:#aaa">
    Module columns show score % for completed modules. Multiple attempts noted where applicable.
  </div>

  <div class="signature-block">
    <div>
      <div class="sig-line">Supervisor Signature / Date</div>
    </div>
    <div>
      <div class="sig-line">Reviewing Officer / Date</div>
    </div>
  </div>

  <div class="report-footer">
    <span>Law Enforcement Training Platform — Confidential Training Record</span>
    <span>${deptName} Training Platform — ${dateStr}</span>
  </div>

  <script>window.onload = function() { window.print(); }<\/script>
</body>
</html>`);
  win.document.close();
}

function adminTab(tab, e) {
  document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
  e.target.classList.add('active');
  document.getElementById('admin-tab-compliance').classList.toggle('hidden', tab!=='compliance');
  document.getElementById('admin-tab-modules').classList.toggle('hidden', tab!=='modules');
  document.getElementById('admin-tab-citations').classList.toggle('hidden', tab!=='citations');
  document.getElementById('admin-tab-feedback').classList.toggle('hidden', tab!=='feedback');
  if (tab === 'feedback') renderAdminFeedback();
}

function filterCitations(type, btn) {
  document.querySelectorAll('.cite-filter').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.cite-table tbody tr').forEach(row => {
    if (type === 'all' || row.dataset.type === type) {
      row.classList.remove('cite-hidden');
    } else {
      row.classList.add('cite-hidden');
    }
  });
  // Hide module sections that have no visible rows when filtered
  document.querySelectorAll('.cite-module-section').forEach(section => {
    const visible = section.querySelectorAll('tbody tr:not(.cite-hidden)').length;
    section.style.display = visible === 0 ? 'none' : '';
  });
}


/* ── Feedback ───────────────────────────── */
const FEEDBACK_KEY = deptKey('feedback_v1');

function openFeedbackModal() {
  const deptShort = (typeof ACTIVE_DEPARTMENT !== 'undefined' && ACTIVE_DEPARTMENT && ACTIVE_DEPARTMENT.shortName) ? ACTIVE_DEPARTMENT.shortName : 'Department';
  // Re-render the form cleanly
  document.getElementById('feedback-form-body').innerHTML = `
    <div class="feedback-form-group">
      <label>Category</label>
      <select id="feedback-category">
        <option value="legal">Legal Reference / Case Law</option>
        <option value="sop">${deptShort} Order / SOP</option>
        <option value="scenario">Scenario Issue</option>
        <option value="quiz">Quiz Question</option>
        <option value="content">Content Accuracy</option>
        <option value="other">Other</option>
      </select>
    </div>
    <div class="feedback-form-group">
      <label>Description</label>
      <textarea id="feedback-text" placeholder="Describe the issue clearly. Include the module name and what specifically needs correction." maxlength="800"></textarea>
    </div>
    <div class="feedback-actions">
      <button class="btn-feedback-cancel" onclick="closeFeedbackModal()">Cancel</button>
      <button class="btn-feedback-submit" id="btn-feedback-submit" onclick="submitFeedback()">Submit →</button>
    </div>`;
  document.getElementById('feedback-modal-overlay').classList.add('open');
}

function closeFeedbackModal() {
  document.getElementById('feedback-modal-overlay').classList.remove('open');
}

/* ── Platform policy / disclaimer ───────────── */
function openPolicyModal() {
  document.getElementById('policy-modal-overlay').classList.add('open');
}

function closePolicyModal() {
  document.getElementById('policy-modal-overlay').classList.remove('open');
}

async function submitFeedback() {
  const cat  = document.getElementById('feedback-category').value;
  const text = (document.getElementById('feedback-text').value || '').trim();
  if (!text) { document.getElementById('feedback-text').focus(); return; }
  const btn = document.getElementById('btn-feedback-submit');
  if (btn) { btn.disabled = true; btn.textContent = 'Submitting…'; }
  const entry = {
    badge_number: currentUser ? currentUser.id : 'unknown',
    module_id:    currentModule ? currentModule.id : 'general',
    module_title: currentModule ? currentModule.title : 'General',
    category:     cat,
    feedback:     text,
    submitted_at: new Date().toISOString()
  };
  // Local backup first — a flag is never lost even if the network drops
  const stored = JSON.parse(localStorage.getItem(FEEDBACK_KEY) || '[]');
  stored.unshift(entry);
  localStorage.setItem(FEEDBACK_KEY, JSON.stringify(stored));
  // Persist to Supabase so the administrator can actually see it. Surface
  // failures instead of swallowing them — otherwise an officer is told the
  // flag was received when it never reached us (the original bug).
  let saveError = null;
  try {
    const { error } = await _sb.from('feedback').insert(entry);
    saveError = error;
  } catch(e) { saveError = e; }
  if (saveError) {
    console.warn('ALE: feedback save failed —', saveError.message || saveError);
    if (btn) { btn.disabled = false; btn.textContent = 'Submit →'; }
    let err = document.getElementById('feedback-error');
    if (!err) {
      err = document.createElement('div');
      err.id = 'feedback-error';
      err.style.cssText = 'margin:0 0 12px;padding:10px 12px;border-radius:6px;background:rgba(139,38,53,.12);color:#8b2635;font-size:13px;line-height:1.4';
      document.getElementById('feedback-form-body').prepend(err);
    }
    err.textContent = '⚠ Your flag could not be submitted. Check your connection and tap Submit again. If it keeps failing, email your training administrator directly.';
    return;
  }
  // Show success
  document.getElementById('feedback-form-body').innerHTML = `
    <div class="feedback-success-msg">
      <div class="fs-icon">✓</div>
      <p>Feedback submitted. The training administrator will review your flag.</p>
    </div>
    <div class="feedback-actions" style="justify-content:center;margin-top:16px">
      <button class="btn-feedback-cancel" onclick="closeFeedbackModal()">Close</button>
    </div>`;
}

async function renderAdminFeedback() {
  const listEl = document.getElementById('admin-feedback-list');
  if (!listEl) return;
  listEl.innerHTML = '<div class="feedback-empty">Loading flags…</div>';
  // Read from Supabase so flags submitted on ANY device show up here — the
  // old localStorage-only read meant an admin only saw flags filed on their
  // own browser, and never an officer's or the chief's.
  let rows = [];
  let banner = '';
  try {
    const { data, error } = await _sb.from('feedback')
      .select('*').order('submitted_at', { ascending: false });
    if (error) throw error;
    rows = data || [];
  } catch(e) {
    console.warn('ALE: feedback load failed —', e.message || e);
    rows = JSON.parse(localStorage.getItem(FEEDBACK_KEY) || '[]');
    banner = '<div class="feedback-empty" style="color:#8b2635;margin-bottom:12px">Couldn\'t reach the server — showing locally cached flags only. Some flags may be missing.</div>';
  }
  if (rows.length === 0) {
    listEl.innerHTML = banner || '<div class="feedback-empty">No feedback submitted yet. Officers can flag content issues while reading any module.</div>';
    return;
  }
  listEl.innerHTML = banner + rows.map(f => {
    const dt = f.submitted_at ? new Date(f.submitted_at).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric',hour:'2-digit',minute:'2-digit'}) : '—';
    const deptShort = (typeof ACTIVE_DEPARTMENT !== 'undefined' && ACTIVE_DEPARTMENT && ACTIVE_DEPARTMENT.shortName) ? ACTIVE_DEPARTMENT.shortName : 'Department';
    const catLabel = {legal:'Legal Reference',sop:deptShort+' Order / SOP',scenario:'Scenario',quiz:'Quiz Question',content:'Content Accuracy',other:'Other'}[f.category] || f.category;
    return `<div class="feedback-item">
      <div class="feedback-item-header">
        <div class="feedback-item-meta"><strong>${f.module_title || f.module_id}</strong> &nbsp;·&nbsp; Badge ${f.badge_number} &nbsp;·&nbsp; ${dt}</div>
        <span class="feedback-cat-badge">${catLabel}</span>
      </div>
      <div class="feedback-item-body">${f.feedback}</div>
    </div>`;
  }).join('');
}


/* ── Glossary ───────────────────────────── */
var _glossaryActiveTab = 'all';

function openGlossary() {
  document.getElementById('glossary-overlay').classList.add('open');
  document.getElementById('glossary-search-input').value = '';
  filterGlossary('');
}

function closeGlossary() {
  document.getElementById('glossary-overlay').classList.remove('open');
}

function glossaryTab(tab, btn) {
  _glossaryActiveTab = tab;
  document.querySelectorAll('.glossary-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  filterGlossary(document.getElementById('glossary-search-input').value || '');
}

function filterGlossary(query) {
  const q = query.toLowerCase().trim();
  document.querySelectorAll('.glossary-entry').forEach(entry => {
    const catMatch = _glossaryActiveTab === 'all' || entry.dataset.cat === _glossaryActiveTab;
    const searchMatch = !q || (entry.dataset.search || '').includes(q) ||
      entry.querySelector('.glossary-term').textContent.toLowerCase().includes(q) ||
      entry.querySelector('.glossary-def').textContent.toLowerCase().includes(q);
    entry.classList.toggle('hidden', !(catMatch && searchMatch));
  });
}

/* ── Utilities ──────────────────────────── */
function formatTime(secs) {
  return `${Math.floor(secs/60).toString().padStart(2,'0')}:${(secs%60).toString().padStart(2,'0')}`;
}
function stopAllTimers() {
  if (moduleTimer) { clearInterval(moduleTimer); moduleTimer=null; }
  if (quizTimer)   { clearInterval(quizTimer);   quizTimer=null;   }
}
