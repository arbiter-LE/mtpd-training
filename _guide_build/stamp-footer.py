#!/usr/bin/env python3
"""Stamp a running footer onto a guide PDF — build-time tool, not deployed.

Chrome's CLI --print-to-pdf path can't inject headers/footers (the CDP
Page.printToPDF path could, but it hangs on recent Chrome). So we add the
footer here as a post-process: a left label and a right-aligned "Page X of Y",
in the bottom margin, matching the old CDP footer style (8pt, slate #5a7a92).
The cover (page 1) is left clean.

Usage:
    python3 stamp-footer.py <input.pdf> "<left label>" [output.pdf]
If output is omitted, the input is stamped in place.
"""
import io
import sys
from pypdf import PdfReader, PdfWriter
from reportlab.pdfgen import canvas

PAGE_W, PAGE_H = 612.0, 792.0          # US Letter in points (8.5 x 11)
SIDE = 36.0                            # 0.5in side margin
BASELINE = 30.0                        # ~0.42in up from the bottom edge
GRAY = (90 / 255, 122 / 255, 146 / 255)  # #5a7a92


def make_overlay(left_text, page_no, total):
    buf = io.BytesIO()
    c = canvas.Canvas(buf, pagesize=(PAGE_W, PAGE_H))
    c.setFillColorRGB(*GRAY)
    c.setFont("Helvetica", 8)
    c.drawString(SIDE, BASELINE, left_text)
    right = f"Page {page_no} of {total}"
    c.drawRightString(PAGE_W - SIDE, BASELINE, right)
    c.showPage()
    c.save()
    buf.seek(0)
    return PdfReader(buf).pages[0]


def main():
    if len(sys.argv) < 3:
        sys.exit("usage: stamp-footer.py <input.pdf> \"<left label>\" [output.pdf]")
    src = sys.argv[1]
    label = sys.argv[2]
    out = sys.argv[3] if len(sys.argv) > 3 else src

    reader = PdfReader(src)
    total = len(reader.pages)
    writer = PdfWriter()

    for i, page in enumerate(reader.pages):
        if i > 0:  # leave the cover clean
            page.merge_page(make_overlay(label, i + 1, total))
        writer.add_page(page)

    # write to a buffer first so in-place stamping is safe
    tmp = io.BytesIO()
    writer.write(tmp)
    with open(out, "wb") as f:
        f.write(tmp.getvalue())
    print(f"stamped {total} pages -> {out}")


if __name__ == "__main__":
    main()
