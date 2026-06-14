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
function RESUME_KEY() { return currentUser ? 'mtpd_quiz_resume_' + currentUser.id : null; }

function saveQuizState() {
  const key = RESUME_KEY();
  if (!key || !currentModule) return;
  localStorage.setItem(key, JSON.stringify({
    moduleId: currentModule.id,
    moduleTitile: currentModule.title,
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

/* ── Scenario Pause / Resume ───────────── */
function PAUSE_KEY() { return currentUser ? 'mtpd_scenario_pause_' + currentUser.id : null; }

function pauseScenario() {
  const key = PAUSE_KEY();
  if (!key || !currentModule) return;
  localStorage.setItem(key, JSON.stringify({
    moduleId:             currentModule.id,
    nodeId:               currentNodeId,
    scenarioPath:         scenarioPath,
    scenarioTotalDecisions: scenarioTotalDecisions,
    useScenario2:         currentModule._activeScenario === currentModule.scenario2
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
  currentModule._activeScenario = state.useScenario2 && mod.scenario2 ? mod.scenario2 : mod.scenario;
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

  if (id === 'search-seizure') {
    document.getElementById('module-content-body').innerHTML = `
      <div class="content-block">
        <h4>Scenario</h4>
        <h2>You stop a vehicle on Route 29 in Marlborough Township. The driver is nervous. You smell marijuana. What happens next will be decided — and scrutinized — based on your training, your judgment, and your documentation.</h2>
        <p>This module covers what the Fourth Amendment requires of you at every decision point — and what it doesn\'t protect you from if you get it wrong in court or on paper.</p>
      </div>
      <div class="content-block">
        <h4>Core Principle</h4>
        <h2>The Fourth Amendment & Probable Cause in Pennsylvania</h2>
        <p>The Fourth Amendment protects persons against unreasonable searches and seizures. Pennsylvania provides additional protection under Article I, Section 8 of the Pennsylvania Constitution — in some circumstances, state courts apply stronger protections than the federal floor.</p>
        <p>The foundational rule: <strong>warrantless searches are presumptively unreasonable.</strong> Exceptions exist, but the burden is always on the government to justify the search — and that justification lives or dies in your documentation.</p>
        <div class="case-law-box">
          <div class="case-title">Terry v. Ohio, 392 U.S. 1 (1968)</div>
          <p>Officers may conduct a brief investigatory stop based on reasonable, articulable suspicion that criminal activity is afoot. A protective frisk for weapons requires separate justification — officer safety grounded in specific, articulable facts, not a general hunch.</p>
        </div>
        <div class="case-law-box">
          <div class="case-title">Commonwealth v. Enimpah, 630 Pa. 357 (2014)</div>
          <p>Pennsylvania courts have recognized that the odor of marijuana may establish probable cause to search a vehicle, evaluated under the totality of circumstances. Critically, courts scrutinize whether the officer\'s testimony is specific, credible, and grounded in documented observations — not conclusions.</p>
        </div>
        <div class="case-law-box">
          <div class="case-title">Rodriguez v. United States, 575 U.S. 348 (2015)</div>
          <p>A traffic stop may not be extended — even briefly — for a dog sniff beyond the time needed to complete the purpose of the stop, without independent reasonable suspicion. Timeline documentation is essential whenever K9 is involved.</p>
        </div>
      </div>
      <div class="content-block">
        <h4>MTPD Order 1.2 — Limits of Authority</h4>
        <h2>Pennsylvania gives you less than you might think on vehicle searches.</h2>
        <p>The federal automobile exception allows a warrantless vehicle search based on probable cause alone. <strong>Pennsylvania does not.</strong> Under the Pennsylvania Constitution, probable cause alone — without accompanying exigent circumstances — does not justify a warrantless vehicle search. This is a stricter standard than the federal floor, and it applies to every stop you make in this jurisdiction.</p>
        <div class="sop-box">
          <div class="sop-title">MTPD Order 1.2 — Vehicle Searches</div>
          <p>"Probable Cause to search, without any accompanying exigent circumstances, does not justify a warrantless search of a vehicle." Warrantless vehicle searches are permitted only via: consent, plain view, officer safety frisk of passenger compartment, or exigent circumstances — and exigency cannot be created by officer action.</p>
        </div>
        <div class="sop-box">
          <div class="sop-title">MTPD Order 1.2 — Consent Searches</div>
          <p>When a subject grants consent to search, officers shall use the department\'s <strong>Search and Seizure Consent Form (Attachment D)</strong> or ensure consent is recorded by mobile vehicle camera. If neither is used, the officer must provide a detailed written explanation in the incident report of how consent was given, the officer\'s demeanor, whether weapons were drawn, and the subject\'s apparent condition. Undocumented consent is legally vulnerable consent.</p>
        </div>
        <div class="sop-box">
          <div class="sop-title">MTPD Order 1.2 — Crime Scene Searches</div>
          <p>"There is no crime scene exception to the search warrant requirement." When first on scene, your job is to preserve and secure — not to search. Warrantless entry of a residence is permitted only for consent, probable cause with specific exigent circumstances, or hot pursuit. When in doubt, secure the scene and get the warrant.</p>
        </div>
        <div class="sop-box">
          <div class="sop-title">MTPD Order 1.2 — Inventory Searches</div>
          <p>Inventory searches shall be conducted on all vehicles placed in the department\'s impound lot and must be documented on the Vehicle Inventory Report form. Officers shall <strong>not</strong> conduct an inventory search when the sole purpose is to find evidence of a crime — this circumvents the warrant requirement. If evidence is discovered during an inventory search, <strong>stop the inventory and secure a search warrant before continuing.</strong></p>
        </div>
      </div>
      <div class="content-block">
        <h4>Recognized Exceptions to the Warrant Requirement</h4>
        <ul class="key-points">
          <li><strong>Consent</strong> — Must be voluntary, not the product of coercion. Use the Consent Form or document thoroughly in your report.</li>
          <li><strong>Automobile Exception (PA)</strong> — Requires probable cause AND exigent circumstances. Odor alone may establish PC — but you still need exigency in Pennsylvania.</li>
          <li><strong>Search Incident to Lawful Arrest</strong> — Limited to the person and the area within their immediate control at the time of arrest.</li>
          <li><strong>Plain View</strong> — You are lawfully present, the item is visible, and its incriminating character is immediately apparent.</li>
          <li><strong>Exigent Circumstances</strong> — Hot pursuit, imminent destruction of evidence, or immediate threat to safety. Cannot be manufactured by the officer.</li>
          <li><strong>Inventory Search</strong> — Must follow MTPD policy, use the Vehicle Inventory Report form, and cannot be used as a pretext search.</li>
        </ul>
      </div>
      <div class="content-block">
        <h4>The Documentation Standard</h4>
        <h2>Vague reports lose cases. Specific reports build them.</h2>
        <p>Courts do not evaluate your instincts. They evaluate whether a reasonable officer, with your specific training and experience, facing the specific facts you documented, would conclude that criminal activity was afoot. Generic conclusions cannot answer that question. Specific, articulable observations can.</p>
        <p>"Appeared nervous" carries no legal weight. "Driver would not maintain eye contact, hands were visibly trembling on the steering wheel, and responses were delayed approximately two seconds" — that\'s a probable cause foundation.</p>
        <div class="sop-box">
          <div class="sop-title">MTPD Order 2.1 — MDVARS Mandatory Recording</div>
          <p>In-car video recording (MDVARS) is mandatory for all vehicle stops, pedestrian stops, vehicle searches, and any other significant law enforcement activity. The system auto-activates when emergency lights are activated or speed exceeds 75 mph. Officers must inform subjects their conversation is being recorded: <em>"I am Officer _____ of the Law Enforcement Training Platform. For documentation purposes this event is being recorded."</em></p>
          <p>Erasing, altering, or interfering with any MDVARS recording is strictly prohibited. All recordings are retained a minimum of 90 days. A court order or subpoena is required for release to non-criminal justice entities.</p>
        </div>
        <button class="btn-launch" onclick="startScenario('search-seizure')">Proceed to Scenario Exercise →</button>
      </div>
    `;
    return;
  }

  if (id === 'use-of-force') {
    document.getElementById('module-content-body').innerHTML = `
      <div class="content-block">
        <h4>Scenario</h4>
        <h2>You respond to a domestic disturbance on Sumneytown Pike. The subject is advancing toward you, flashlight raised. Every decision you make in the next thirty seconds — and how you document it afterward — will be evaluated against a federal standard.</h2>
        <p>This module covers the Graham v. Connor objective reasonableness standard, Pennsylvania's 2020 police reform acts (Acts 57 and 59), and what separates a defensible use of force report from one that ends a career.</p>
      </div>
      <div class="content-block">
        <h4>Core Principle</h4>
        <h2>Objective Reasonableness — The Graham Standard</h2>
        <p>Every use of force by a law enforcement officer is evaluated under the standard established in <em>Graham v. Connor</em> (1989): was the force objectively reasonable, judged from the perspective of a reasonable officer on scene, based on the facts and circumstances known at the time?</p>
        <p>The analysis is not about what you felt. It is about what a reasonable officer would have done given the same facts.</p>
        <div class="case-law-box">
          <div class="case-title">Graham v. Connor, 490 U.S. 386 (1989)</div>
          <p>The Supreme Court established three factors courts must consider: (1) the severity of the crime at issue, (2) whether the subject poses an immediate threat to the safety of officers or others, and (3) whether the subject is actively resisting arrest or attempting to evade by flight. These three factors must appear — explicitly and factually — in every use of force report.</p>
        </div>
        <div class="case-law-box">
          <div class="case-title">Pennsylvania Acts 57 &amp; 59 of 2020</div>
          <p>Pennsylvania's 2020 reform package raised the stakes of every use of force record. Act 57 created a statewide database of officer separation and disciplinary records — including final discipline for excessive force — that follows an officer between departments for the rest of a career. Act 59 mandates annual training in use of force and de-escalation techniques. Neither changes the Graham standard, but both make thorough, accurate documentation the only safe practice. When in doubt, document.</p>
        </div>
      </div>
      <div class="content-block">
        <h4>MTPD Order 1.3 — Use of Force Continuum</h4>
        <h2>Eight levels. Know where you are and why.</h2>
        <p>Your department operates under an eight-level use of force continuum. The continuum does not require sequential progression — levels may be skipped given the circumstances. But every level applied must be documented and justified.</p>
        <ul class="key-points">
          <li><strong>Level 1 — Verbal Control</strong> — Advice, persuasion, admonitions, orders. Volume and tone are tools. Profanity and disrespectful conduct are never acceptable.</li>
          <li><strong>Level 2 — Escort</strong> — Physical maneuvering with reluctance but no real resistance. Should not result in pain or injury to the subject.</li>
          <li><strong>Level 3 — Chemical Agents (OC)</strong> — Authorized when facing threat of assault, combative actions, or to effect arrest on a non-compliant individual when lower levels have been exhausted or would be ineffective.</li>
          <li><strong>Level 4 — Control and Compliance</strong> — Takedowns, holds, come-alongs. <strong>Carotid restraints and all choke holds or neck restraints are specifically and strictly prohibited</strong> — except when an officer or another person is in imminent fear of death or serious bodily injury and no other alternative is available.</li>
          <li><strong>Level 5 — Unarmed Striking</strong> — Fists, hands, elbows, knees, feet. Applied where higher force is not necessary and lower force has been ineffective.</li>
          <li><strong>Level 6 — K-9</strong> — Only department-certified dogs and handlers, or bona fide mutual aid K-9 units.</li>
          <li><strong>Level 7 — Striking Implement</strong> — Batons and authorized implements. Applied to quell physical confrontations where higher force is not warranted.</li>
          <li><strong>Level 8 — Deadly Force</strong> — Only when legally justified, only as a last resort, only when lower levels have been ineffective or inappropriate. Applied with the understanding that the death of another human may result.</li>
        </ul>
        <div class="sop-box">
          <div class="sop-title">MTPD Order 1.3 — Core Policy</div>
          <p>"They shall never use a greater degree of force than that which is lawful, reasonable, and necessary for the specific situation."</p>
          <p>"The use of physical force will end immediately when resistance ceases, when resistance has been overcome, or when the arrest has been accomplished."</p>
        </div>
      </div>
      <div class="content-block">
        <h4>MTPD Order 1.3 — Reporting Requirements</h4>
        <h2>The report is required. And it has rules.</h2>
        <p>Officers must complete a Use of Force Report (Attachment A, MTPD Order 1.3) whenever they discharge a firearm, take action resulting in injury or death, use or are alleged to have used physical force, apply Level 3 force, or apply force in excess of Level 4.</p>
        <div class="sop-box">
          <div class="sop-title">MTPD Order 1.3 — UoF Report Rules</div>
          <p><strong>Timing:</strong> The Use of Force Report must be completed <strong>prior to the officer concluding their shift</strong> during which the use of force occurred. If injured and unable to report, the supervisor submits a written report before end of shift.</p>
          <p><strong>Separation:</strong> The Use of Force Report is strictly an internal management document. It <strong>shall not be attached to regular incident or supplemental reports</strong> and shall not be released to any person or entity outside the department without specific permission of the Chief of Police.</p>
          <p><strong>Supervisor notification:</strong> When a Use of Force Report is required, the shift supervisor shall be notified to respond to the scene if not already present.</p>
          <p><strong>Medical attention:</strong> After any use of force, officers shall arrange for EMS examination and transport when injury is known, suspected, or alleged — regardless of whether the subject claims injury.</p>
        </div>
      </div>
      <div class="content-block">
        <h4>Documentation That Survives Scrutiny</h4>
        <h2>Your report is your force decision on paper. Make it hold up.</h2>
        <p>A use of force report is not a summary — it is a factual reconstruction of a decision-making process under stress. Courts, internal affairs, the DA\'s office, and civil attorneys will read it looking for one thing: can this officer articulate, using specific facts, why a reasonable officer in the same position would have made the same call?</p>
        <p><strong>What fails:</strong> "Subject was aggressive and I feared for my safety." That is a conclusion, not documentation.<br>
        <strong>What survives:</strong> "Subject advancing approximately 25 feet, aluminum flashlight raised at shoulder height, yelling, non-responsive to verbal commands. Severity: domestic disturbance, potential assault in progress. Immediate threat: improvised impact weapon, closing distance. Resistance: active advance. Officer issued verbal commands and created distance. Subject complied. No weapon deployed."</p>
        <p>The difference is the difference between a report that protects you and one that doesn\'t.</p>
        <button class="btn-launch" onclick="startScenario('use-of-force')">Proceed to Scenario Exercise →</button>
      </div>
    `;
    return;
  }

  if (id === 'report-writing') {
    document.getElementById('module-content-body').innerHTML = `
      <div class="content-block">
        <h4>Scenario</h4>
        <h2>You\'ve made the arrest. The foot pursuit is over. The subject is on his way to Montgomery County lockup. Now comes the part that determines whether the case holds — or falls apart in a preliminary hearing six weeks from now.</h2>
        <p>This module covers the professional and legal standards for police report writing: when to write, what to include, and the specific difference between documentation that builds cases and documentation that destroys them.</p>
      </div>
      <div class="content-block">
        <h4>Core Principle</h4>
        <h2>The Report Is the Evidence</h2>
        <p>Police reports are sworn accounts of an officer\'s personal observations. They are the primary evidentiary document in a criminal case. They are reviewed by prosecutors, dissected by defense counsel, compared frame-by-frame against body camera footage, and read aloud in front of judges and juries.</p>
        <p>A report that is vague, conclusory, or inconsistent with available evidence does not just weaken a case — it undermines the officer\'s credibility on everything else they\'ve ever documented.</p>
        <div class="case-law-box">
          <div class="case-title">The Documentation Standard</div>
          <p>Pennsylvania courts require that use of force and probable cause documentation contain specific, articulable facts — not legal conclusions. "Resisted arrest" is a conclusion. "Subject tensed both arms, pulled away from my grip, and rotated his body toward me" is a fact. Facts survive cross-examination. Conclusions do not.</p>
        </div>
        <div class="case-law-box">
          <div class="case-title">Contemporaneous Documentation</div>
          <p>Reports should be written as close to the incident as safely possible. Memory degrades rapidly under stress — specific details, sequences, and exact words fade within hours. When body camera footage is available, review it before writing. Your report should match the footage exactly because it should be based on the same sequence of events.</p>
        </div>
        <div class="sop-box">
          <div class="sop-title">MTPD Order 1.3 — Use of Force Report Is a Separate Document</div>
          <p>The Use of Force Report (Attachment A, ALO 1.3) is an internal management document. It <strong>shall not be attached to your regular incident or supplemental report</strong> — ever. It shall not be released outside the department without the Chief of Police\'s specific authorization. It must be completed <strong>before you end your shift.</strong></p>
          <p>This separation matters: your incident report documents what happened for the case file. Your Use of Force Report documents your force decision for internal review. Confusing the two — or attaching them — creates evidentiary problems and policy violations.</p>
        </div>
      </div>
      <div class="content-block">
        <h4>What Every Use of Force Report Must Include</h4>
        <ul class="key-points">
          <li><strong>The subject\'s specific action</strong> — What did they do, physically? Which body part moved, in which direction, with what speed or force?</li>
          <li><strong>The officer\'s specific response</strong> — What force was applied? In what sequence? To what body part?</li>
          <li><strong>The outcome</strong> — Did the subject comply? Was injury assessed? Was medical attention provided?</li>
          <li><strong>The timeline</strong> — When did each action occur in the sequence? Timestamps matter when footage is reviewed.</li>
          <li><strong>The Graham factors</strong> — Severity of crime, immediacy of threat, active resistance. All three must appear explicitly.</li>
        </ul>
      </div>
      <div class="content-block">
        <h4>Factual vs. Conclusory Language</h4>
        <h2>The difference between winning and losing a suppression hearing is often one paragraph.</h2>
        <p>Defense attorneys are trained to find the gap between what your report says and what actually happened. Vague language creates gaps. Specific language closes them.</p>
        <p><strong>Conclusory (fails):</strong> "Subject resisted arrest and force was necessary."<br>
        <strong>Factual (holds up):</strong> "As I attempted to apply handcuffs, subject tensed both arms, pulled away from my grip, and rotated his upper body toward me. I applied a forward leg sweep, bringing subject to a controlled ground position. Subject ceased active resistance upon impact. Handcuffs applied."</p>
        <p>Every word in the second version answers a question a defense attorney would ask. That\'s the standard.</p>
        <div class="sop-box">
          <div class="sop-title">MTPD Order 4.13 — Domestic Violence Narrative Checklist</div>
          <p>Every DV incident report narrative shall include, when applicable and available: (1) victim\'s second permanent address and close personal friend\'s contact; (2) relationship between victim and accused; (3) date/time of incident and whether accused appeared intoxicated; (4) what weapons were used or threatened; (5) description of injuries observed by officer; (6) description of injuries reported by victim but not observed — noted as not observed; (7) documentation of evidence tending to establish a crime was committed; (8) whether arrest was made or reason for electing not to arrest; (9) crimes charged; (10) if arrested and arraigned — bail set and any bail conditions; (11) names and ages of any children present and their relocation addresses; (12) notation of previous incidents known to officer or reported by victim.</p>
          <p>If probable cause existed but officer elected not to arrest: the narrative must contain a <strong>detailed explanation</strong> of the reasons. "Did not arrest" is not documentation.</p>
        </div>
        <div class="sop-box">
          <div class="sop-title">MTPD Order 3.05/3.06 — Evidence Documentation</div>
          <p>Every time evidence or property is received, a <strong>Property Record Form</strong> must be completed before end of shift. The form documents chain of custody at every transaction — who had it, when, why it moved, and where. All physical evidence is packaged in paper, sealed with evidence tape, and initialed with date across the tape seal. Packaging is labeled with the RMS incident number, item number, and any hazard warnings. Evidence stored in temporary lockers until property room is accessible.</p>
        </div>
        <div class="sop-box">
          <div class="sop-title">MTPD Order 3.04 — Report Submission</div>
          <p>All reports shall be completed <strong>prior to end of tour of duty</strong> and submitted to the shift bin for supervisory approval, unless otherwise authorized by the shift supervisor. This applies to incident reports, arrest reports, use of force reports, and supplemental reports. Reports not submitted before end of shift require supervisor authorization — not officer discretion.</p>
        </div>
        <button class="btn-launch" onclick="startScenario('report-writing')">Proceed to Scenario Exercise →</button>
      </div>
    `;
    return;
  }

  if (id === 'crisis-intervention') {
    document.getElementById('module-content-body').innerHTML = `
      <div class="content-block">
        <h4>Scenario</h4>
        <h2>A mother calls because her son hasn\'t taken his medication in two days, said he didn\'t want to be here anymore, and won\'t answer her calls. He\'s at his house on Main Street. You\'re first on scene.</h2>
        <p>This module covers Crisis Intervention Team (CIT) principles, the Pennsylvania Mental Health Procedures Act, de-escalation techniques specific to mental health encounters, and the legal framework for 302 involuntary examinations.</p>
      </div>
      <div class="content-block">
        <h4>Core Principle</h4>
        <h2>Mental Health Calls Are Different — and the Law Reflects That</h2>
        <p>Individuals in mental health crisis do not respond to commands, authority, or force the way non-crisis individuals do. What triggers compliance in a standard encounter frequently triggers flight-or-fight in someone experiencing acute psychiatric distress. The approach that works on a combative suspect can transform a distressed person into a dangerous situation.</p>
        <p>Pennsylvania law and department policy recognize this. MTPD ALO 5.4 requires officers to consider and employ de-escalation techniques in all situations where it is safe and feasible to do so, and PA Act 59 of 2020 mandates annual statewide training in de-escalation. This is not optional guidance — it is a documented requirement.</p>
        <div class="case-law-box">
          <div class="case-title">Pennsylvania Mental Health Procedures Act — 50 P.S. § 7302</div>
          <p>A 302 involuntary examination may be initiated by a law enforcement officer when a person poses a clear and present danger to themselves or others based on a recent overt act, attempt, or threat. The officer must document the specific factual basis — a general mental health crisis or prior psychiatric history alone does not satisfy the standard. When criteria are met, document precisely. When they aren\'t, don\'t force the standard.</p>
        </div>
        <div class="case-law-box">
          <div class="case-title">PA Act 59 of 2020 &amp; MTPD ALO 5.4 — De-escalation</div>
          <p>Pennsylvania Act 59 of 2020 mandates annual de-escalation training for municipal officers — including techniques for interacting with individuals whose behavior indicates mental illness, intellectual disability, or autism. MTPD ALO 5.4 makes the operational requirement explicit: officers shall consider and employ de-escalation techniques where safe and feasible. In mental health encounters, your approach itself — your tone, distance, pace, and language — is part of your tactical and legal decision-making. Document de-escalation efforts as carefully as you document force.</p>
        </div>
      </div>
      <div class="content-block">
        <h4>CIT Principles for Initial Contact</h4>
        <ul class="key-points">
          <li><strong>Slow down</strong> — Time is almost always your ally in a mental health call. A 20-minute contact that builds rapport is more likely to resolve safely than a 2-minute intervention that escalates to force.</li>
          <li><strong>Reduce your energy</strong> — Match your tone and pace to the outcome you want. Calm approach invites calm response. Authoritative commands invite fight-or-flight.</li>
          <li><strong>Use the person\'s name</strong> — It humanizes the interaction and signals that you are there as a person, not a threat.</li>
          <li><strong>Offer choices, not commands</strong> — "Would you be willing to talk to me for a minute?" is more effective than "Come over here." Autonomy reduces threat response.</li>
          <li><strong>Position for safety without appearing tactical</strong> — Know where your partner is. Know the exits. Don\'t make your safety positioning visible in your demeanor.</li>
        </ul>
      </div>
      <div class="content-block">
        <h4>The 302 Process</h4>
        <h2>Know the standard. Document to it. Don\'t overreach it.</h2>
        <p>A 302 involuntary examination is a significant legal intervention — it removes a person\'s liberty without their consent. The criteria exist for a reason, and courts have scrutinized 302 initiations that weren\'t grounded in documented specific facts.</p>
        <p>The standard requires a <strong>recent overt act, attempt, or threat</strong> establishing clear and present danger. Past psychiatric history supports context — it does not, by itself, establish current criteria. A statement like "I don\'t want to be here anymore," combined with medication non-compliance and a 2-day crisis episode, begins to build the standard. Document every element you observed. Let the facts carry the 302, not your general assessment that the situation seemed serious.</p>
        <div class="sop-box">
          <div class="sop-title">MTPD Order 4.07 — Juvenile Detention Rules</div>
          <p>Juveniles shall not be detained in any lockup or cell that houses adults. When secure detention of a juvenile is necessary, it is limited to identification, investigation, processing, and transfer — and may <strong>not exceed six hours</strong> in any case. Juveniles held in secure detention must be separated from adult offenders by sight and sound and under continuous visual supervision of a sworn officer at all times.</p>
          <p>Fingerprints and photographs shall be taken of any juvenile alleged to have committed an act designated as a misdemeanor or felony. Juvenile records are kept separate from adult records and are not disclosed to the public without Chief of Police authorization.</p>
        </div>
        <div class="sop-box">
          <div class="sop-title">MTPD Order 3.02 — Temporary Detention</div>
          <p>All detainees in the temporary holding area shall be thoroughly searched prior to entry regardless of any prior field search. Males, females, and juveniles under arrest must be separated by sight and sound using separate rooms or areas. All firearms must be secured in designated lock boxes before entry into any temporary detention area. Detainees may not be left unsupervised for more than <strong>10 minutes</strong> under any circumstances, and must be physically secured during any period of non-supervision.</p>
        </div>
        <button class="btn-launch" onclick="startScenario('crisis-intervention')">Proceed to Scenario Exercise →</button>
      </div>
    `;
    return;
  }

  if (id === 'domestic-violence') {
    document.getElementById('module-content-body').innerHTML = `
      <div class="content-block">
        <h4>Scenario</h4>
        <h2>A 911 hang-up from a residence on Upper Ridge Road. A neighbor heard shouting and breaking glass. When you arrive, the door opens before you knock — and the story becomes anything but simple.</h2>
        <p>This module covers mandatory arrest authority under MTPD ALO 4.13, PFA enforcement, victim notification requirements, mandatory firearms seizure, and the documentation standard that makes or breaks a DV prosecution.</p>
      </div>
      <div class="content-block">
        <h4>Core Principle</h4>
        <h2>Victim Preference Does Not Control Your Arrest Decision</h2>
        <p>Domestic violence calls are among the highest-risk, most legally complex incidents you handle. The victim is frequently in a protective relationship with the offender. Pressure to de-arrest, minimize, or "let the couple work it out" is common. Pennsylvania law and MTPD policy exist precisely to remove that pressure from the officer and place the decision where it belongs: on the evidence.</p>
        <p>If you have probable cause — based on your own observations, victim statement, or witness statement — arrest of the primary aggressor is mandatory. You do not need the victim\'s consent. You do not need supervisor pre-authorization. You need probable cause.</p>
        <div class="case-law-box">
          <div class="case-title">Pennsylvania Domestic Violence Law — 23 Pa. C.S. § 6102</div>
          <p>Pennsylvania\'s Protection From Abuse Act defines domestic violence and establishes civil and criminal remedies. A Protection From Abuse (PFA) order is an enforceable court order — violation is a criminal offense, not merely a civil matter. When you encounter a subject who has violated an active PFA order by being present at a protected person\'s location or making contact, that violation is an independently chargeable offense.</p>
        </div>
        <div class="case-law-box">
          <div class="case-title">Lautenberg Amendment — 18 U.S.C. § 922(g)(9)</div>
          <p>A federal firearm disability is imposed on any person convicted of a qualifying domestic violence misdemeanor or subject to a qualifying protective order. When a DV arrest subject is prohibited from firearm possession under a court order, officers are not only authorized but required under ALO 4.13 to seize any firearms present. This is both a state policy obligation and a federal law enforcement responsibility.</p>
        </div>
      </div>
      <div class="content-block">
        <h4>MTPD ALO 4.13 — Mandatory Arrest Authority</h4>
        <h2>When probable cause exists, the decision is made for you.</h2>
        <p>MTPD Order 4.13 establishes mandatory arrest protocols for domestic violence incidents. Officers shall arrest the primary aggressor when probable cause exists based on their observations or statements of witnesses or the victim. The policy covers incidents of Simple Assault, Harassment, and other qualifying offenses between household members or intimate partners.</p>
        <div class="sop-box">
          <div class="sop-title">MTPD ALO 4.13 — Approach Protocol</div>
          <p>Officers responding to domestic disturbance calls shall approach the scene <strong>without lights or sirens within one block of the reported location.</strong> DV calls present unique officer safety risks. Arrival without warning allows for tactical assessment before contact and does not alert subjects who may escalate or flee. This is a required protocol, not a suggestion.</p>
        </div>
        <div class="sop-box">
          <div class="sop-title">MTPD ALO 4.13 — Mandatory Arrest Standard</div>
          <p>In every domestic violence incident where officers have probable cause to believe Simple Assault or a related qualifying offense has been committed between household members or intimate partners, <strong>officers shall arrest the primary aggressor.</strong> Victim consent is not a required element. If probable cause exists but an officer elects not to arrest, the report narrative must contain a <strong>detailed explanation of the specific reasons</strong> — "No arrest made" is not documentation.</p>
        </div>
        <div class="sop-box">
          <div class="sop-title">MTPD ALO 4.13 — Mandatory Firearms Seizure</div>
          <p>When a person is arrested for a domestic violence offense and is subject to a court order prohibiting firearm possession (PFA or similar), <strong>officers shall seize any firearms present</strong> at the scene. Each seized firearm must be documented on a Property Record Form per ALO 3.05/3.06 before end of shift, with make, model, serial number, and chain of custody documented from the moment of seizure.</p>
        </div>
        <div class="sop-box">
          <div class="sop-title">MTPD ALO 4.13 — Victim Notification Requirements</div>
          <p>Following a DV arrest, officers shall provide the victim with the department\'s domestic violence resource card. Officers shall advise the victim of: the arraignment timeline, any bail conditions that are set, the existence and availability of shelter services, and their right to pursue a civil Protection From Abuse order. Completion of victim notifications shall be documented in the incident report narrative.</p>
        </div>
      </div>
      <div class="content-block">
        <h4>The 12-Item DV Narrative Checklist</h4>
        <h2>Every DV incident report narrative shall address each applicable item.</h2>
        <ul class="key-points">
          <li><strong>Victim\'s second permanent address</strong> and a close personal friend\'s contact information.</li>
          <li><strong>Relationship</strong> between victim and accused.</li>
          <li><strong>Date and time of the incident</strong> and whether the accused appeared intoxicated.</li>
          <li><strong>Weapons</strong> used or threatened.</li>
          <li><strong>Injuries observed by the officer</strong> — specific and descriptive.</li>
          <li><strong>Injuries reported by the victim but not observed</strong> — note clearly as "not observed."</li>
          <li><strong>Evidence establishing a crime was committed</strong> — what you observed that supports probable cause.</li>
          <li><strong>Whether arrest was made</strong> — or detailed explanation of why not.</li>
          <li><strong>Crimes charged.</strong></li>
          <li><strong>Bail set and conditions</strong> if the subject was arraigned.</li>
          <li><strong>Names and ages of any children present</strong> and their relocation address.</li>
          <li><strong>Previous incidents</strong> known to the officer or reported by the victim.</li>
        </ul>
      </div>
      <div class="content-block">
        <h4>PFA Enforcement</h4>
        <h2>A PFA order is a court order. Violation is a crime.</h2>
        <p>When you respond to a DV call and learn that a final or temporary PFA order is in effect, verify it through JNET/CLEAN. Presence of the subject at a protected location — or any contact with the protected party — is a criminal violation of the court order, independently chargeable regardless of whether any new physical violence occurred.</p>
        <p>Do not accept a subject\'s claim that "she invited me here" as a defense to a PFA violation. Under Pennsylvania law, the protected party cannot waive the order\'s protections on the subject\'s behalf. If the protected party invited contact in violation of the PFA, that may be relevant to prosecution — but it does not eliminate the officer\'s authority or obligation to address the violation.</p>
        <div class="sop-box">
          <div class="sop-title">MTPD ALO 4.13 — Never Release Instead of Transport</div>
          <p>When a person is arrested and must be taken to a district judge for arraignment, officers shall <strong>never release the defendant instead of taking them to the issuing authority.</strong> This prohibition applies regardless of circumstances — officer workload, victim request, or subject cooperation. An arrested DV subject goes to arraignment. Period.</p>
        </div>
        <button class="btn-launch" onclick="startScenario('domestic-violence')">Proceed to Scenario Exercise →</button>
      </div>
    `;
    return;
  }

  if (id === 'vehicle-pursuits') {
    document.getElementById('module-content-body').innerHTML = `
      <div class="content-block">
        <h4>Scenario</h4>
        <h2>A traffic stop on Route 29 at 0114 hours. Defective taillight. The driver looks at you in the mirror — and goes. In the next 90 seconds, every decision you make will be measured against policy, civil liability, and the safety of every person on those roads.</h2>
        <p>This module covers MTPD ALO 4.02 pursuit authorization, required communications, termination criteria, prohibited tactics, stop stick deployment, and mandatory post-pursuit reporting.</p>
      </div>
      <div class="content-block">
        <h4>Core Principle</h4>
        <h2>The Right to Pursue Is Not the Obligation to Continue</h2>
        <p>Vehicle pursuits represent one of the highest-risk activities in law enforcement — for officers, the public, and the fleeing subject. The legal authority to pursue a fleeing vehicle does not mean that continuing the pursuit is always the correct decision. MTPD ALO 4.02 exists to ensure that pursuit decisions are evaluated against documented criteria, not adrenaline.</p>
        <p>Pursuits are authorized when the need to apprehend immediately outweighs the danger created by the pursuit. That calculus changes in real time — and officers are required to keep evaluating it throughout every pursuit.</p>
        <div class="case-law-box">
          <div class="case-title">Scott v. Harris, 550 U.S. 372 (2007)</div>
          <p>The Supreme Court held that officers do not violate the Fourth Amendment by taking action to end a dangerous high-speed pursuit that threatens innocent lives, even when that action creates a risk of serious injury to the fleeing suspect. However, the Court noted that the legality of pursuit tactics is always evaluated against the totality of the circumstances — including whether the pursuit itself was appropriate. This decision is frequently cited in pursuit-related civil litigation.</p>
        </div>
        <div class="case-law-box">
          <div class="case-title">County of Sacramento v. Lewis, 523 U.S. 833 (1998)</div>
          <p>The Supreme Court established that in high-speed pursuits, officers are liable under the Fourteenth Amendment\'s substantive due process clause only if their conduct shocks the conscience. However, the Court also noted that where officers have time to deliberate — including about whether to initiate or continue a pursuit — a different standard may apply. Documented decision-making is your protection.</p>
        </div>
      </div>
      <div class="content-block">
        <h4>MTPD ALO 4.02 — Pursuit Authorization</h4>
        <h2>Know the policy before the stop — because there is no time to look it up at 80 mph.</h2>
        <div class="sop-box">
          <div class="sop-title">MTPD ALO 4.02 — Immediate Notification Requirements</div>
          <p>Upon initiating a pursuit, officers shall <strong>immediately</strong> notify communications of: their unit number, the nature of the offense prompting the pursuit, current direction of travel, approximate speed, and vehicle description. Supervisor notification and authorization are required. This communication is mandatory from the moment a vehicle fails to stop — not after the pursuit is established.</p>
        </div>
        <div class="sop-box">
          <div class="sop-title">MTPD ALO 4.02 — Two-Unit Maximum</div>
          <p>A maximum of <strong>two patrol units</strong> shall participate in any vehicle pursuit. Additional patrol units shall not join the pursuit. This is a hard limit, not a guideline subject to supervisor override. If containment or road interdiction is needed, <strong>stop stick deployment</strong> is the authorized tactic — carried out by a unit not actively in pursuit, with supervisor authorization.</p>
        </div>
        <div class="sop-box">
          <div class="sop-title">MTPD ALO 4.02 — PIT Maneuvers Prohibited</div>
          <p>Precision Immobilization Technique (PIT) maneuvers are <strong>strictly prohibited</strong> under MTPD ALO 4.02. This prohibition is absolute — there is no circumstance, supervisor authorization level, or offense severity that authorizes a PIT maneuver under this policy. Stop sticks are the authorized alternative for vehicle interdiction.</p>
        </div>
        <div class="sop-box">
          <div class="sop-title">MTPD ALO 4.02 — Termination Criteria</div>
          <p>Officers and supervisors shall terminate a pursuit when: (1) the danger to officers or the public outweighs the need for immediate apprehension; (2) the suspect\'s identity is known and arrest can be accomplished by other means; (3) the offense is a summary violation and apprehension can be made at a later time; or (4) a superior officer orders termination. Termination must be documented with the specific basis for the decision.</p>
        </div>
      </div>
      <div class="content-block">
        <h4>Continuous Evaluation Factors</h4>
        <h2>Every 30 seconds of a pursuit, these factors must be re-evaluated.</h2>
        <ul class="key-points">
          <li><strong>Nature of the offense</strong> — A summary violation weights strongly toward termination when identity is known. A violent felony weights toward continuation.</li>
          <li><strong>Suspect identity</strong> — Once identity is confirmed and a later arrest is feasible, continuation must be re-justified.</li>
          <li><strong>Road and traffic conditions</strong> — Residential roads, pedestrian presence, intersections, and weather all change the calculus in real time.</li>
          <li><strong>Time of day</strong> — Late night pursuits on residential roads carry different risk profiles than pursuits on open roads.</li>
          <li><strong>Available units</strong> — Two-unit maximum means you\'re already at capacity when backup arrives. Communicate, coordinate, contain.</li>
          <li><strong>Your speed and the subject\'s speed</strong> — Gap closing means reduced reaction time for both the officer and any person or vehicle in the path.</li>
        </ul>
      </div>
      <div class="content-block">
        <h4>Post-Pursuit Reporting</h4>
        <h2>Termination is as important to document as initiation.</h2>
        <p>Every vehicle pursuit — whether it ends in apprehension or termination — requires documentation. The officer documents the basis for initiation, all notifications made, the basis and time of termination, and the last known location and direction of travel. The on-duty supervisor is required to complete a Pursuit Review Form within 24 hours of any pursuit.</p>
        <p>Incomplete pursuit documentation is a department liability exposure and creates gaps in the record that will be exploited if a civil action follows. Document every decision as it was made — because "I was evaluating the factors" is not documentation.</p>
        <div class="sop-box">
          <div class="sop-title">MTPD ALO 4.02 — Stop Stick Authorization</div>
          <p>Stop sticks (tire deflation devices) may be deployed in front of a fleeing vehicle only with supervisor authorization and only by a unit <strong>not actively participating in the pursuit.</strong> The deploying unit must provide the pursuing unit with precise deployment location. Stop stick deployment is the department-authorized alternative to additional pursuit units and PIT maneuvers — use it as intended.</p>
        </div>
        <button class="btn-launch" onclick="startScenario('vehicle-pursuits')">Proceed to Scenario Exercise →</button>
      </div>
    `;
    return;
  }

  if (id === 'leadership') {
    document.getElementById('module-content-body').innerHTML = `
      <div class="content-block">
        <h4>Leading from the Patrol Level</h4>
        <p>Leadership in law enforcement doesn\'t begin at sergeant. It begins the moment a senior officer makes a decision that a junior officer watches and files away. Every call you handle, every interaction with a complainant, every use of discretion — someone is learning from it.</p>
        <p>Effective patrol-level leaders do three things consistently: they set the standard by example, they communicate clearly under pressure, and they take ownership of outcomes instead of deflecting accountability.</p>
      </div>
      <div class="content-block">
        <h4>Decision-Making Under Pressure</h4>
        <p>The hallmark of a supervisory mindset is not speed — it\'s clarity. Before acting on a high-stress call, effective leaders apply a simple filter: <em>What is the right outcome here, and what\'s the fastest responsible path to it?</em> This separates reactive officers from supervisory candidates.</p>
        <p>Research from the Police Executive Research Forum (PERF) identifies the top predictor of officer promotion as demonstrated judgment during ambiguous situations — not seniority, not test scores alone.</p>
        <div class="case-law-box">
          <div class="case-title">Terry v. Ohio, 392 U.S. 1 (1968)</div>
          <p>An investigative stop requires individualized reasonable articulable suspicion of criminal activity. Presence in a location — even in a group — does not supply the basis for individual stops. Leaders who understand this standard make better decisions faster, and teach the officers around them to do the same. A supervisor who bypasses this standard to clear a call fast exposes the department to civil liability and trains junior officers to do the same.</p>
        </div>
      </div>
      <div class="content-block">
        <h4>Accountability vs. Blame</h4>
        <p>Accountability means owning the outcome of your decisions — good or bad. Blame is pointing outward. The distinction matters on every call, but it matters most when something goes wrong. Officers who demonstrate accountability without being prompted earn supervisory trust faster than any other quality.</p>
        <p>When correcting a junior officer, the method matters as much as the correction itself. Public corrections damage working relationships and shut down the learning. Private, direct, one-on-one feedback — delivered without condescension — is the model that builds rather than breaks.</p>
        <div class="sop-box">
          <div class="sop-title">MTPD ALO 1.01 — Chain of Command</div>
          <p>All officers are expected to operate within the chain of command and to support supervisory decisions in the field. Officers who identify concerns with a directive shall address them through proper channels — not in the field in front of personnel or the public. Senior officers carry responsibility for modeling this standard in every patrol contact.</p>
        </div>
      </div>
      <div class="content-block">
        <h4>18 Pa. C.S. § 3503 — Criminal Trespass</h4>
        <p>For a lawful trespass warning to support enforcement, property must be posted with conspicuous signage, fenced in a manner designed to exclude intruders, or the subject must have received direct communication that entry is not permitted. Officers responding to "loitering" complaints must assess whether the trespass statute\'s elements are actually met before taking enforcement action — understanding this law before arriving on scene is part of patrol-level leadership.</p>
        <button class="btn-launch" onclick="startScenario('leadership')">Proceed to Scenario Exercise →</button>
      </div>
    `;
    return;
  }

  if (id === 'traffic-stops') {
    document.getElementById('module-content-body').innerHTML = `
      <div class="content-block">
        <h4>Authority to Stop and Order Occupants Out</h4>
        <p>A traffic stop is a seizure under the Fourth Amendment. Its lawfulness depends on reasonable articulable suspicion of a traffic violation or equipment violation — a low threshold, but one that must exist. Once a lawful stop is initiated, established case law grants officers specific authority over vehicle occupants.</p>
        <div class="case-law-box">
          <div class="case-title">Pennsylvania v. Mimms, 434 U.S. 106 (1977)</div>
          <p>An officer may order the driver of a lawfully stopped vehicle to exit the vehicle as a matter of course — no additional justification required. The government\'s interest in officer safety outweighs the de minimis intrusion of requiring the driver to stand outside.</p>
        </div>
        <div class="case-law-box">
          <div class="case-title">Maryland v. Wilson, 519 U.S. 408 (1997)</div>
          <p>Mimms extends to passengers. Officers may order all occupants of a lawfully stopped vehicle to exit without articulating individualized justification. This authority exists independent of suspicion — it attaches to the lawful stop itself.</p>
        </div>
      </div>
      <div class="content-block">
        <h4>Extensions Beyond the Stop\'s Purpose</h4>
        <p>The duration of a traffic stop must be reasonably related to the purpose that justified it — checking documents, running plates, writing the citation. Any extension of the stop beyond that purpose requires independent reasonable suspicion of criminal activity.</p>
        <div class="case-law-box">
          <div class="case-title">Rodriguez v. United States, 575 U.S. 348 (2015)</div>
          <p>A stop prolonged beyond the time reasonably required to complete its mission — even by a de minimis amount — violates the Fourth Amendment absent reasonable suspicion of separate criminal activity. Officers may not delay return of documents or add investigative steps unrelated to the stop\'s purpose without articulable suspicion. However, Rodriguez does not restrict action on probable cause that develops during the lawful stop.</p>
        </div>
      </div>
      <div class="content-block">
        <h4>Probable Cause and the Automobile Exception in Pennsylvania</h4>
        <p>Pennsylvania does <strong>not</strong> follow the broad federal automobile exception. In <em>Commonwealth v. Alexander</em> (2020) the Pennsylvania Supreme Court overruled <em>Commonwealth v. Gary</em> (2014) and held that, under Article I, Section 8 of the Pennsylvania Constitution, a warrantless vehicle search requires <strong>both probable cause and exigent circumstances</strong> — obtaining a warrant is the default. Under <em>Commonwealth v. Barr</em> (2021), the odor of marijuana alone no longer establishes probable cause, though it remains a factor in the totality of the circumstances. Probable cause still requires specific, articulable facts supporting a reasonable belief that contraband or evidence of a crime is in the vehicle.</p>
        <p>Odor of marijuana from a vehicle has consistently been recognized by Pennsylvania courts as establishing probable cause. Document the odor specifically: where you detected it, its strength, the moment of detection, and any corroborating factors. Vague documentation creates suppression exposure at the preliminary hearing.</p>
        <div class="sop-box">
          <div class="sop-title">Probable Cause Documentation Standard</div>
          <p>When conducting a warrantless vehicle search, your report must establish the basis for probable cause with specificity — not conclusions. "Detected an odor of marijuana" is a conclusion. "Upon approaching the driver\'s window, detected a strong odor consistent with raw marijuana emanating from the vehicle interior" is documentation. The difference determines whether your evidence survives a suppression motion.</p>
        </div>
        <button class="btn-launch" onclick="startScenario('traffic-stops')">Proceed to Scenario Exercise →</button>
      </div>
    `;
    return;
  }

  if (id === 'emotional-intelligence') {
    document.getElementById('module-content-body').innerHTML = `
      <div class="content-block">
        <h4>What Emotional Intelligence Actually Means in the Field</h4>
        <p>Emotional intelligence (EI) is not a soft skill. In law enforcement, it is a tactical skill. It is the ability to read what is happening emotionally in an interaction — in the subject, in bystanders, and in yourself — and adjust your approach to get the outcome the situation actually requires.</p>
        <p>Psychologist Daniel Goleman identifies five components of EI: self-awareness, self-regulation, motivation, empathy, and social skill. In patrol work, self-regulation and empathy are the two that show up on every difficult call.</p>
      </div>
      <div class="content-block">
        <h4>Self-Regulation Under Pressure</h4>
        <p>Self-regulation is the ability to manage your own emotional response before it manages you. A subject who is hostile, irrational, or disrespectful is not targeting you personally — they are responding to fear, pain, trauma, or intoxication. Officers who respond to hostility with matching hostility escalate situations that could have been contained. Officers who absorb the first 10 seconds of aggression without matching it change the trajectory of the call.</p>
        <p>This is not passive. Self-regulation is an active choice made in real time. It requires awareness that you are being triggered and the discipline to respond from your training rather than your reaction.</p>
      </div>
      <div class="content-block">
        <h4>Empathy as a Tactical Tool</h4>
        <p>Empathy in law enforcement does not mean agreement. It means accurate perception of another person\'s emotional state — and using that perception to inform your approach. A DV victim who presents as hostile is not hostile toward you; she is protecting herself from a system that has failed her before. A subject in mental health crisis is not being difficult; he is terrified. Reading the actual situation — not the surface presentation — leads to better outcomes with less force.</p>
        <div class="case-law-box">
          <div class="case-title">IACP Research — Victim Cooperation and Officer Demeanor</div>
          <p>International Association of Chiefs of Police research consistently finds that officer demeanor in the first 60 seconds of a victim contact is the strongest predictor of whether that victim will cooperate with the criminal justice process. Victims who experience the initial contact as controlling, skeptical, or dismissive are significantly less likely to provide statements, testify, or seek protective orders. The officer\'s emotional approach is not separate from the investigation — it is part of it.</p>
        </div>
      </div>
      <div class="content-block">
        <h4>Trauma-Informed Contact</h4>
        <p>Domestic violence victims, assault victims, and survivors of chronic abuse often present behaviors that officers misread as uncooperativeness: hostility, minimization, recantation, or refusal to engage. These responses are normal trauma responses — not indicators of deception. A trauma-informed approach means understanding this, adjusting your pace and your language, and giving the person space to engage on their terms rather than yours.</p>
        <div class="sop-box">
          <div class="sop-title">MTPD ALO 4.13 — Follow-Up Victim Contacts</div>
          <p>Follow-up welfare checks on DV victims should prioritize safety assessment and victim engagement over documentation efficiency. Officers shall provide information about the victim advocate program and PFA process at every contact. A victim who leaves the contact better informed and feeling respected is more likely to cooperate with prosecution and more likely to call for help before the next incident escalates.</p>
        </div>
        <button class="btn-launch" onclick="startScenario('emotional-intelligence')">Proceed to Scenario Exercise →</button>
      </div>
    `;
    return;
  }

  if (id === 'evidence-chain-of-custody') {
    document.getElementById('module-content-body').innerHTML = `
      <div class="content-block">
        <h4>Scenario</h4>
        <h2>You\'re first on scene at a residential burglary. There\'s a crowbar on the porch, a shoeprint in the mud, and a victim telling you the suspect left 20 minutes ago. What you do with that evidence in the next 10 minutes will determine whether it ever reaches a jury.</h2>
        <p>This module covers chain of custody requirements under Pennsylvania Rules of Criminal Procedure, MTPD evidence packaging standards, in-place documentation, and the specific handling decisions that create — or destroy — a suppression vulnerability.</p>
      </div>
      <div class="content-block">
        <h4>Core Principle</h4>
        <h2>Chain of Custody Is Unbroken or It Is Broken</h2>
        <p>Chain of custody is the documented, unbroken record of every person who handled a piece of evidence — from the moment you first touched it to its admission at trial. A gap anywhere in that chain gives defense counsel the argument that the evidence was tampered with, contaminated, or substituted. Courts have suppressed otherwise compelling physical evidence because an officer couldn\'t account for where it was for two hours.</p>
        <p>Your job is to make the chain unbreakable. That starts with the first decision you make on scene: document before you touch.</p>
        <div class="case-law-box">
          <div class="case-title">Pennsylvania Rules of Criminal Procedure — Rule 648</div>
          <p>Pennsylvania requires that physical evidence introduced at trial be authenticated — its connection to the crime must be established through testimony. Chain of custody documentation is the foundation of authentication for physical evidence. Officers who maintain complete custody records protect the admissibility of every item they collect.</p>
        </div>
        <div class="case-law-box">
          <div class="case-title">Chain of Custody Challenge Standard</div>
          <p>Pennsylvania courts ask whether there is a reasonable probability the evidence was not altered or substituted. When an officer cannot account for evidence between the time of collection and submission to the property room, defense counsel can argue tampering or contamination. Your documentation — not your memory — is what answers that challenge at trial.</p>
        </div>
      </div>
      <div class="content-block">
        <h4>The Five Steps — Every Time</h4>
        <h2>These are not suggestions. They are the chain.</h2>
        <ul class="key-points">
          <li><strong>Step 1 — Document in place.</strong> Photograph and note the exact location of every item before moving it. Position, orientation, and spatial relationship to other items may be critical later. A photo taken after you moved it is not the same evidence.</li>
          <li><strong>Step 2 — Collect with minimal contact.</strong> Use gloves. Use appropriate collection tools. Contamination of DNA or fingerprint evidence cannot be undone. If you\'re not certain how to collect it, secure the scene and call for resources.</li>
          <li><strong>Step 3 — Package appropriately.</strong> Per MTPD ALO 3.05/3.06, all physical evidence is packaged in paper — biological evidence requires breathability that plastic prevents. Seal with evidence tape. Initial across the seal with date. Label with the RMS incident number, item number, and any hazard designation.</li>
          <li><strong>Step 4 — Complete the Property Record Form before end of shift.</strong> Every evidence item requires a Property Record Form documenting who collected it, when, where it was collected, how it was packaged, and custody from that moment forward. No exceptions.</li>
          <li><strong>Step 5 — Secure in temporary locker until property room access.</strong> Temporary evidence lockers are the authorized interim storage. Evidence does not sit in a patrol car, a locker room, or a desk. If the property room is inaccessible, the locker is the chain\'s next link — document the transfer.</li>
        </ul>
      </div>
      <div class="content-block">
        <h4>Suppression Vulnerabilities — How Chains Break</h4>
        <h2>Defense attorneys are looking for one of four things.</h2>
        <div class="sop-box">
          <div class="sop-title">MTPD Order 3.05/3.06 — Evidence Handling</div>
          <p>Evidence or property received by MTPD requires a Property Record Form completed before end of shift. The form documents every transaction in the chain — who had it, when, why it moved, and where it went. Every unsealed package must be noted. Every transfer requires documentation. The form is the chain — treat it as evidence itself.</p>
        </div>
        <p><strong>Gap in custody</strong> — any period the evidence cannot be accounted for. Prevent it by completing your Property Record Form while memory is fresh and securing items in designated lockers immediately.</p>
        <p><strong>Improper packaging</strong> — plastic bags for biological evidence allow decomposition and create defense challenges to DNA integrity. Use paper. Always paper for biologicals.</p>
        <p><strong>Failure to document in-place</strong> — a photograph of evidence after it has been moved cannot establish its original position. In-place documentation before first touch is non-negotiable.</p>
        <p><strong>Seal integrity failures</strong> — unsealed or re-sealed packaging creates an argument for tampering. If a package must be opened for testing, document every person present, the condition of the seal before opening, and the reason for opening.</p>
        <button class="btn-launch" onclick="startScenario('evidence-chain-of-custody')">Proceed to Scenario Exercise →</button>
      </div>
    `;
    return;
  }

  if (id === 'officer-wellness') {
    document.getElementById('module-content-body').innerHTML = `
      <div class="content-block">
        <h4>Scenario</h4>
        <h2>Your partner is one of the best you\'ve worked with — sharp, calm, and reliable. In the last six weeks, he\'s called in three times, snapped at dispatch twice, and told you the job "just doesn\'t bother him anymore." Something\'s wrong. What do you do?</h2>
        <p>This module covers secondary traumatic stress, the MTPD peer support program, EAP services, the difference between performance management and wellness intervention, and the specific warning signs that require action — not silence.</p>
      </div>
      <div class="content-block">
        <h4>Core Principle</h4>
        <h2>Secondary Traumatic Stress Is a Physiological Reality</h2>
        <p>Secondary traumatic stress (STS) — sometimes called vicarious trauma or compassion fatigue — is not weakness. It is a documented psychological and physiological response to repeated exposure to the trauma of others. Law enforcement officers are among the highest-risk populations for STS, PTSD, and occupational depression. The culture of silence around these conditions kills officers — and it is the culture you have the authority to change.</p>
        <p>The research is unambiguous: law enforcement officers die by suicide at rates significantly higher than line-of-duty deaths. The threat is real, it affects experienced officers as much as new ones, and it is preventable with early recognition and access to appropriate support.</p>
        <div class="case-law-box">
          <div class="case-title">Secondary Traumatic Stress — Recognized Symptom Profile</div>
          <p>STS presents differently from acute PTSD but is equally serious. Recognized indicators include emotional numbing ("the job doesn\'t bother me anymore"), social withdrawal, increased cynicism or irritability, sleep disruption, increased alcohol use, intrusive thoughts, hypervigilance off-duty, and unexplained physical symptoms. Many officers experiencing STS are the last to recognize it in themselves — which is why peer recognition matters more than self-identification.</p>
        </div>
      </div>
      <div class="content-block">
        <h4>MTPD Resources — What\'s Available and How It Works</h4>
        <div class="sop-box">
          <div class="sop-title">MTPD Peer Support Program</div>
          <p>The MTPD peer support program connects officers experiencing stress, trauma, or personal difficulty with trained peer counselors — fellow officers who have completed peer support training and are authorized to provide confidential, non-clinical support. Peer support contacts are confidential within the limits described in the program policy. Contacting peer support is not a disciplinary matter and does not affect fitness-for-duty status. It is the correct first step for officers experiencing stress who are not in acute crisis.</p>
        </div>
        <div class="sop-box">
          <div class="sop-title">Employee Assistance Program (EAP)</div>
          <p>The department\'s EAP provides free, confidential access to licensed mental health professionals for officers and their immediate family members. EAP services are provided by an independent contractor outside the department\'s chain of command — participation is not reported to supervisors. Sessions are limited per policy year; officers requiring ongoing care can be referred to long-term resources through EAP. Confidentiality limitations apply when there is an imminent risk of harm to self or others, disclosure of a serious criminal offense, or a court order requiring disclosure.</p>
        </div>
        <div class="sop-box">
          <div class="sop-title">Confidentiality Limits — What the Program Can and Cannot Protect</div>
          <p>Both peer support and EAP operate under confidentiality protections — but those protections have defined limits. Mandatory disclosure applies when: there is an imminent risk of harm to the officer or another person; there is disclosure of a serious criminal offense; or a court order requires disclosure. Officers should understand these limits before contact. Knowing them prevents surprises and allows officers to make informed decisions about what to disclose and to whom.</p>
        </div>
      </div>
      <div class="content-block">
        <h4>Warning Signs — What Requires Action</h4>
        <h2>Silence is not a brotherhood value. Recognition is.</h2>
        <ul class="key-points">
          <li><strong>Emotional numbing or detachment</strong> — "Nothing bothers me anymore" is not resilience. It is a warning sign. An officer who has stopped being affected by serious incidents has not gotten stronger — their nervous system has adapted in a way that will eventually break through in a more destructive form.</li>
          <li><strong>Behavioral changes</strong> — Increased absences, poor judgment on calls, aggression, withdrawal from family or coworkers, or a pattern of risk-taking behavior that wasn\'t previously present.</li>
          <li><strong>Increased substance use</strong> — Alcohol as a coping mechanism is the most common self-medication pattern in law enforcement. It is also the most reliable predictor of accelerating decline if not addressed early.</li>
          <li><strong>Statements suggesting hopelessness</strong> — Any statement suggesting the officer does not see a future, does not care what happens to them, or has been making final arrangements requires immediate action. Don\'t rationalize it. Ask directly. Contact peer support or EAP without delay.</li>
        </ul>
        <p>Your obligation as a fellow officer is not to diagnose — it is to notice, to say something directly, and to point toward resources. You may be the only person who sees it early enough to matter.</p>
        <button class="btn-launch" onclick="startScenario('officer-wellness')">Proceed to Scenario Exercise →</button>
      </div>
    `;
    return;
  }

  if (id === 'de-escalation') {
    document.getElementById('module-content-body').innerHTML = `
      <div class="content-block">
        <h4>Scenario</h4>
        <h2>A call for a disorderly person at the township park. When you arrive, a man in his 40s is pacing, yelling at no one in particular, and refuses to acknowledge your presence. Bystanders are backing away. You\'re alone for the next four minutes.</h2>
        <p>This module covers the Graham v. Connor framework as it applies to force avoidance, MTPD ALO 5.4 de-escalation requirements, the Pennsylvania Mental Health Procedures Act § 7302, and CIT protocols for high-tension contacts.</p>
      </div>
      <div class="content-block">
        <h4>Core Principle</h4>
        <h2>De-escalation Is Not Passivity — It Is a Legal Requirement and a Tactical Skill</h2>
        <p>MTPD ALO 5.4 requires officers to consider and employ de-escalation techniques in all situations where it is safe and feasible to do so before applying physical force, and Pennsylvania Act 59 of 2020 mandates annual statewide training in de-escalation. This is not a recommendation — it is a documented policy requirement. Officers who skip de-escalation when time and safety permitted are not only making a tactical error; they are creating policy violations and legal exposure for themselves and the department.</p>
        <p>De-escalation is not about backing down. It is about deploying your most effective tools first. Verbal skills, tactical positioning, time, and tone are tools. In most encounters involving a non-compliant or agitated person, they are more effective than physical force — and they build the documented record that protects you if force eventually becomes necessary.</p>
        <div class="case-law-box">
          <div class="case-title">Graham v. Connor, 490 U.S. 386 (1989) — De-escalation Dimension</div>
          <p>Graham established objective reasonableness as the standard for every use of force. Pennsylvania courts have applied this standard to ask not only whether the force used was reasonable, but whether the officer took reasonable steps to avoid the need for force. An officer who bypasses available de-escalation when time and safety permitted will face scrutiny under this standard in any resulting civil or criminal proceeding.</p>
        </div>
        <div class="case-law-box">
          <div class="case-title">Pennsylvania Mental Health Procedures Act — 50 P.S. § 7302</div>
          <p>When a contact involves a person who may be experiencing acute psychiatric distress, § 7302 provides authority for involuntary examination when there is a recent overt act, attempt, or threat establishing clear and present danger. The officer\'s approach — particularly whether de-escalation was employed first — is part of the record when a 302 is initiated. Document de-escalation efforts with the same specificity you document any other use of authority.</p>
        </div>
      </div>
      <div class="content-block">
        <h4>MTPD ALO 5.4 — De-escalation Policy</h4>
        <div class="sop-box">
          <div class="sop-title">MTPD Order 5.4 — When De-escalation Is Required</div>
          <p>Officers shall consider and employ de-escalation techniques in all situations where it is safe and feasible to do so before applying physical force. The determination of safety and feasibility is made by the officer on scene, based on the totality of circumstances — but it must be a genuine assessment, not a conclusion reached after the decision to use force was already made. When de-escalation is employed, officers shall document the specific techniques used, the subject\'s response, and the reason de-escalation was or was not continued.</p>
        </div>
        <div class="sop-box">
          <div class="sop-title">MTPD Order 5.4 — Core De-escalation Techniques</div>
          <p>Authorized and expected de-escalation techniques include: creating distance and slowing the pace of the encounter; using calm, non-threatening verbal communication; giving the subject space to make voluntary choices; reducing the number of officers present when safe; using a designated primary contact officer while others maintain supporting positions; and requesting CIT-trained personnel or mental health resources when available and appropriate.</p>
        </div>
      </div>
      <div class="content-block">
        <h4>CIT Protocols for High-Tension Contacts</h4>
        <h2>The tactical framework doesn\'t change. Your tools do.</h2>
        <ul class="key-points">
          <li><strong>Create time and space.</strong> Distance is your greatest asset. A subject who cannot close with you cannot harm you. Tactical positioning that creates space also reduces the subject\'s perception of threat — lowering the probability of escalation.</li>
          <li><strong>Lower your energy to lower theirs.</strong> Calm, even tone. Slow pace. No sudden movements. The officer\'s nervous system sets the ceiling for the encounter — if you are escalating, the encounter will escalate with you.</li>
          <li><strong>Use the person\'s name when known.</strong> Names humanize the contact and signal that you are addressing a specific person, not a threat to be managed.</li>
          <li><strong>One officer speaks.</strong> Multiple simultaneous voices create sensory overload for someone in acute distress. Designate the contact officer. Others hold position and monitor.</li>
          <li><strong>Validate before directing.</strong> "I can see you\'re upset" is not agreement — it is acknowledgment that reduces defensive arousal and opens the window for compliance. Validation comes before direction.</li>
          <li><strong>Know your escalation thresholds.</strong> De-escalation is not infinite. If the subject closes distance aggressively, displays a weapon, or takes an action creating imminent threat, your force options are live. Document the specific change in circumstances that closed the de-escalation window.</li>
        </ul>
        <button class="btn-launch" onclick="startScenario('de-escalation')">Proceed to Scenario Exercise →</button>
      </div>
    `;
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
  if (!currentModule || !currentModule.scenario) return;
  stopAllTimers();
  scenarioPath = [];
  scenarioDecisionCount  = 0;
  // Pick alternate scenario on retake if available
  const uid  = currentUser ? currentUser.id : null;
  const prev = uid && completionData[uid] && completionData[uid][moduleId];
  if (prev && currentModule.scenario2) {
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

// Admin-only "Viewing as" toggle. Renders a Patrol/Supervisor segmented
// control into containerId (hidden for non-admins), highlighting the
// effective track. Flipping it re-renders whatever the admin is viewing.
function renderTrackToggle(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  // Only for admins, and only where this department actually has supervisor
  // content (e.g. EGPD) — otherwise the toggle would be a no-op (e.g. MTPD).
  const deptHasSupervisorTrack = MODULES.some(m => m.supervisorContentHtml);
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
  document.getElementById('btn-next-q').disabled    = true;
  document.getElementById('btn-next-q').textContent = currentQuizIdx === quizTotal-1 ? 'Submit Assessment →' : 'Next Question →';
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

function selectAnswer(idx) {
  if (quizAnswered) return;
  quizAnswered = true;
  const q = activeQuestions(currentModule)[currentQuizIdx];
  const isCorrect = (idx === q.correct);
  if (isCorrect) quizCorrect++;
  for (let i=0; i<q.options.length; i++) {
    const el = document.getElementById('opt-'+i);
    el.disabled = true;
    if (i===idx) el.classList.add(isCorrect ? 'correct' : 'incorrect');
    else if (i===q.correct && !isCorrect) el.classList.add('reveal-correct');
  }
  const fb = document.getElementById('answer-feedback');
  fb.className = 'answer-feedback ' + (isCorrect ? 'correct-fb' : 'incorrect-fb');
  fb.textContent = (isCorrect ? '✓ ' : '✗ ') + q.feedback;
  document.getElementById('btn-next-q').disabled = false;
  document.getElementById('quiz-score-running').textContent = `Score: ${quizCorrect} / ${currentQuizIdx+1}`;
  saveQuizState();
}

function nextQuestion() {
  if (!quizAnswered) return;
  currentQuizIdx++;
  if (currentQuizIdx >= quizTotal) finishQuiz();
  else renderQuestion();
}

function finishQuiz() {
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

  // Persist to Supabase
  saveCompletionToSupabase(uid, modId, completionData[uid][modId]);

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
  const compRate = Math.round((totalComps/(officers.length*MODULES.length))*100);
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
    const compRate = Math.round((completions.length/officers.length)*100);
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
  const compRate = Math.round((totalComps / (totalOfficers * MODULES.length)) * 100);
  const allScores = officers.flatMap(uid => Object.values(completionData[uid] || {}).map(r => r.score));
  const avgScore = allScores.length ? Math.round(allScores.reduce((a,b)=>a+b,0)/allScores.length) : 0;

  const moduleHeaders = MODULES.map(m => `<th style="padding:8px 6px;font-size:9px;letter-spacing:1px;text-transform:uppercase;color:#3c6478;white-space:nowrap;max-width:70px;overflow:hidden;text-overflow:ellipsis">Wk${m.weekNumber}</th>`).join('');

  const win = window.open('', '_blank', 'width=1100,height=800');
  win.document.write(`<!DOCTYPE html>
<html>
<head>
  <title>MTPD Training Compliance Report — ${dateStr}</title>
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
      <h1>Law Enforcement Training Platform</h1>
      <h2>Officer Training Compliance Report</h2>
    </div>
    <div class="report-meta">
      <strong>Generated:</strong> ${dateStr}<br/>
      <strong>Time:</strong> ${timeStr}<br/>
      <strong>Generated by:</strong> MTPD Training Platform<br/>
      <strong>Program Start:</strong> June 1, 2026
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
    <span>MTPD Training Platform — ${dateStr}</span>
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
const FEEDBACK_KEY = 'mtpd_feedback_v1';

function openFeedbackModal() {
  // Re-render the form cleanly
  document.getElementById('feedback-form-body').innerHTML = `
    <div class="feedback-form-group">
      <label>Category</label>
      <select id="feedback-category">
        <option value="legal">Legal Reference / Case Law</option>
        <option value="sop">MTPD Order / SOP</option>
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
  // Save to localStorage
  const stored = JSON.parse(localStorage.getItem(FEEDBACK_KEY) || '[]');
  stored.unshift(entry);
  localStorage.setItem(FEEDBACK_KEY, JSON.stringify(stored));
  // Try Supabase
  try {
    await _sb.from('feedback').insert(entry);
  } catch(e) { /* localStorage fallback already saved */ }
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

function renderAdminFeedback() {
  const listEl = document.getElementById('admin-feedback-list');
  if (!listEl) return;
  const stored = JSON.parse(localStorage.getItem(FEEDBACK_KEY) || '[]');
  if (stored.length === 0) {
    listEl.innerHTML = '<div class="feedback-empty">No feedback submitted yet. Officers can flag content issues while reading any module.</div>';
    return;
  }
  listEl.innerHTML = stored.map(f => {
    const dt = f.submitted_at ? new Date(f.submitted_at).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric',hour:'2-digit',minute:'2-digit'}) : '—';
    const catLabel = {legal:'Legal Reference',sop:'MTPD Order / SOP',scenario:'Scenario',quiz:'Quiz Question',content:'Content Accuracy',other:'Other'}[f.category] || f.category;
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
