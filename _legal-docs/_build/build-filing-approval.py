#!/usr/bin/env python3
"""Render the PA Dept. of State filing-approval notice into a faithful PDF record.
Source: email "Department of State Business Filing System - Business Filing Approved",
from no_reply@pa.gov, received 2026-06-04. Content reproduced verbatim."""
import os
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (SimpleDocTemplate, Paragraph, Spacer, Table,
                                TableStyle, HRFlowable)

OUT = os.path.join(os.path.dirname(__file__), "..", "corporate",
                   "2026-06-04-arbiter-le-certificate-of-organization-filing-approval.pdf")
OUT = os.path.abspath(OUT)

NAVY = colors.HexColor("#182535")
STEEL = colors.HexColor("#5A7A92")
HAIR = colors.HexColor("#C4D6E4")

ss = getSampleStyleSheet()
caption = ParagraphStyle("caption", parent=ss["Normal"], fontName="Helvetica-Oblique",
                         fontSize=8, textColor=STEEL, leading=11)
h1 = ParagraphStyle("h1", parent=ss["Title"], fontName="Helvetica-Bold",
                    fontSize=15, textColor=NAVY, alignment=1, spaceAfter=2)
sub = ParagraphStyle("sub", parent=ss["Normal"], fontName="Helvetica",
                     fontSize=9, textColor=STEEL, alignment=1, spaceAfter=10)
body = ParagraphStyle("body", parent=ss["Normal"], fontName="Helvetica",
                      fontSize=10, textColor=colors.HexColor("#1a1a1a"), leading=15, spaceAfter=8)
label = ParagraphStyle("label", parent=ss["Normal"], fontName="Helvetica-Bold",
                       fontSize=9.5, textColor=NAVY, leading=14)
val = ParagraphStyle("val", parent=ss["Normal"], fontName="Helvetica",
                     fontSize=9.5, textColor=colors.black, leading=14)
note = ParagraphStyle("note", parent=ss["Normal"], fontName="Helvetica",
                      fontSize=8.5, textColor=STEEL, leading=12)

doc = SimpleDocTemplate(OUT, pagesize=letter, topMargin=0.9*inch, bottomMargin=0.9*inch,
                        leftMargin=1*inch, rightMargin=1*inch,
                        title="Arbiter LE LLC — Certificate of Organization Filing Approval")
f = []
f.append(Paragraph("SAVED RECORD — Commonwealth of Pennsylvania, Department of State", caption))
f.append(Paragraph("Business Filing System — Approval Notice", caption))
f.append(Spacer(1, 14))
f.append(HRFlowable(width="100%", thickness=1, color=HAIR, spaceAfter=14))

f.append(Paragraph("Initial Business Filing Approval", h1))
f.append(Paragraph("Bureau of Corporations and Charitable Organizations", sub))
f.append(Paragraph("Approval date: 06/04/2026", body))

rows = [
    ("Entity / Record Name:", "Arbiter LE LLC"),
    ("Entity / Record Type:", "Domestic Limited Liability Company"),
    ("Entity / Record ID:", "0015534221"),
    ("Document Type:", "Certificate of Organization — Limited Liability Company"),
    ("Document ID:", "0015534221"),
    ("File Date:", "06/03/2026"),
]
data = [[Paragraph(k, label), Paragraph(v, val)] for k, v in rows]
t = Table(data, colWidths=[1.7*inch, 4.6*inch])
t.setStyle(TableStyle([
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("TOPPADDING", (0, 0), (-1, -1), 3),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
    ("LINEBELOW", (0, 0), (-1, -2), 0.4, HAIR),
]))
f.append(t)
f.append(Spacer(1, 14))

f.append(Paragraph(
    "Congratulations! The above referenced document has been accepted for filing by the "
    "Department of State, Bureau of Corporations and Charitable Organizations. To access the "
    "filed documents, go to file.dos.pa.gov. The documents can be found in the &ldquo;My Work "
    "Queue&rdquo; section and will remain available for 60 days.", body))

f.append(Spacer(1, 16))
f.append(HRFlowable(width="100%", thickness=0.6, color=HAIR, spaceAfter=8))
f.append(Paragraph(
    "<b>Record note (not part of the State notice):</b> This PDF reproduces the Department of "
    "State approval email (subject &ldquo;Department of State Business Filing System - Business "
    "Filing Approved,&rdquo; from no_reply@pa.gov, received 2026-06-04). It is the approval "
    "notice, not the stamped Certificate of Organization itself. The official stamped certificate "
    "is downloadable from file.dos.pa.gov (&ldquo;My Work Queue&rdquo;) for 60 days from the "
    "06/03/2026 file date &mdash; i.e., through approximately 2026-08-02. Download it and save it "
    "alongside this file before that window closes.", note))

doc.build(f)
print("wrote", OUT)
