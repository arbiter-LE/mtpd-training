#!/usr/bin/env python3
"""Build Arbiter LE LinkedIn personal-profile background banner (1584x396).

Brand: navy-dominant field, gold as the single decisive accent (seal + rule),
steel for secondary text. Bottom-left kept clear for the headshot/name card.
Source seal: assets (gold) at 200px, upscaled with LANCZOS on a 2x supersampled
canvas, then the whole thing downsampled for crisp text.
"""
from PIL import Image, ImageDraw, ImageFont
import os, math

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SEAL = os.path.join(ROOT, "_guide_build", "arbiter-seal-gold.png")
OUT  = os.path.join(ROOT, "_marketing", "brand", "linkedin-banner.png")

S = 2                      # supersample factor
W, H = 1584 * S, 396 * S   # working canvas

# ---- brand palette ----
NAVY      = (10, 24, 40)    # #0a1828
NAVY_BR   = (22, 39, 58)    # lighter navy for gradient far corner
NAVY_DK   = (6, 15, 24)     # #060f18 deepest
GOLD      = (200, 144, 42)  # #c8902a
GOLD_HI   = (224, 168, 48)  # #e0a830
INK       = (233, 240, 246) # off-white wordmark
STEEL     = (138, 171, 204) # #8aabcc chrome-mut
STEEL_DK  = (90, 122, 146)  # muted

def lerp(a, b, t):
    return tuple(round(a[i] + (b[i] - a[i]) * t) for i in range(3))

# ---- diagonal navy gradient (deep top-left -> lighter bottom-right) ----
base = Image.new("RGB", (W, H), NAVY)
px = base.load()
maxd = (W - 1) + (H - 1)
for y in range(H):
    for x in range(0, W, 1):
        t = (x + y) / maxd
        px[x, y] = lerp(NAVY_DK, NAVY_BR, t)

# soft radial glow behind the seal (gold, very low opacity)
glow = Image.new("L", (W, H), 0)
gd = glow.load()
cx, cy = int(1372 * S), int(198 * S)
R = int(320 * S)
for y in range(max(0, cy - R), min(H, cy + R)):
    for x in range(max(0, cx - R), min(W, cx + R)):
        d = math.hypot(x - cx, y - cy)
        if d < R:
            gd[x, y] = int(38 * (1 - d / R) ** 2)
gold_layer = Image.new("RGB", (W, H), GOLD_HI)
base = Image.composite(gold_layer, base, glow)

img = base.convert("RGBA")
draw = ImageDraw.Draw(img)

# ---- fonts ----
def font(path, size):
    return ImageFont.truetype(path, size * S)
FDIR = "/System/Library/Fonts/Supplemental/"
f_word = font(FDIR + "Georgia Bold.ttf", 74)
f_tag  = font(FDIR + "Georgia.ttf", 17)
f_url  = font(FDIR + "Georgia.ttf", 14)

def text_tracked(d, xy, s, fnt, fill, tracking):
    """Draw text with extra letter spacing (px in final units). Returns width."""
    x, y = xy[0] * S, xy[1] * S
    tk = tracking * S
    for ch in s:
        d.text((x, y), ch, font=fnt, fill=fill)
        w = d.textlength(ch, font=fnt)
        x += w + tk
    return (x - xy[0] * S) / S - tracking

def tracked_width(d, s, fnt, tracking):
    w = sum(d.textlength(ch, font=fnt) for ch in s) / S
    return w + tracking * (len(s) - 1)

# ---- seal on the right, centered vertically ----
SEAL_D = 282  # final px
SEAL_CX = 1372
seal = Image.open(SEAL).convert("RGBA").resize((SEAL_D * S, SEAL_D * S), Image.LANCZOS)
sx, sy = int((SEAL_CX - SEAL_D / 2) * S), int((198 - SEAL_D / 2) * S)
img.alpha_composite(seal, (sx, sy))

# ---- text block, centered in the SAFE BAND between the profile photo and seal ----
# Profile photo (bottom-left circle) reaches ~x=440 at its widest; keep everything right of it.
TZL, TZR = 488, 1180      # text zone left / right bounds
word = "ARBITER LE"
tag  = "SCENARIO-BASED TRAINING FOR LAW ENFORCEMENT"
url  = "ARBITERLE.COM"

word_w = draw.textlength(word, font=f_word) / S
tag_w  = tracked_width(draw, tag, f_tag, 3)
url_w  = tracked_width(draw, url, f_url, 5)

# horizontally center the block on the band's midpoint
midx = (TZL + TZR) / 2
word_x = midx - word_w / 2
tag_x  = midx - tag_w / 2
url_x  = midx - url_w / 2

# eyebrow url (quiet gold), wordmark, gold rule, steel tagline — vertically centered
text_tracked(draw, (url_x, 104), url, f_url, GOLD_HI, 5)

word_y = 136
draw.text((word_x * S, word_y * S), word, font=f_word, fill=INK)

rule_y = 228
draw.rectangle([word_x * S, rule_y * S, (word_x + word_w) * S, (rule_y + 2) * S], fill=GOLD)

text_tracked(draw, (tag_x, 246), tag, f_tag, STEEL, 3)

# ---- thin gold vertical divider between text and seal ----
DIVX = 1210
draw.rectangle([DIVX * S, 116 * S, (DIVX + 1) * S, 280 * S], fill=(*GOLD, 150))

# ---- downsample to final size ----
final = img.convert("RGB").resize((1584, 396), Image.LANCZOS)
os.makedirs(os.path.dirname(OUT), exist_ok=True)
final.save(OUT, "PNG")
print("wrote", OUT, final.size)
