import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * Captures the card element at 3× scale for crisp 300dpi-equivalent output.
 */
async function captureCard(cardElement: HTMLElement): Promise<HTMLCanvasElement> {
  return html2canvas(cardElement, {
    scale: 3,
    useCORS: true,
    allowTaint: true,
    backgroundColor: null,
    logging: false,
    imageTimeout: 15000,
  });
}

/**
 * Triggers a browser file download with the given blob and filename.
 */
function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

/**
 * Exports the alumni card as a high-resolution PNG.
 * Transparent background is preserved where applicable.
 */
export async function exportCardAsPNG(
  cardElement: HTMLElement,
  alumniName: string
): Promise<void> {
  try {
    const canvas = await captureCard(cardElement);
    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const safeName = alumniName.replace(/\s+/g, '-').toLowerCase();
        downloadBlob(blob, `impactx-alumni-card-${safeName}.png`);
      },
      'image/png'
    );
  } catch (err) {
    console.error('[cardExport] PNG export failed:', err);
    throw err;
  }
}

/**
 * Exports the alumni card as a JPEG — optimised for social sharing (LinkedIn, Twitter).
 * Uses quality 0.95 for best balance of size and fidelity.
 */
export async function exportCardAsJPG(
  cardElement: HTMLElement,
  alumniName: string
): Promise<void> {
  try {
    const canvas = await captureCard(cardElement);

    // Fill transparent pixels with the card dark background before JPEG encoding
    const jpegCanvas = document.createElement('canvas');
    jpegCanvas.width = canvas.width;
    jpegCanvas.height = canvas.height;
    const ctx = jpegCanvas.getContext('2d')!;
    ctx.fillStyle = '#03040C';
    ctx.fillRect(0, 0, jpegCanvas.width, jpegCanvas.height);
    ctx.drawImage(canvas, 0, 0);

    jpegCanvas.toBlob(
      (blob) => {
        if (!blob) return;
        const safeName = alumniName.replace(/\s+/g, '-').toLowerCase();
        downloadBlob(blob, `impactx-alumni-card-${safeName}.jpg`);
      },
      'image/jpeg',
      0.95
    );
  } catch (err) {
    console.error('[cardExport] JPG export failed:', err);
    throw err;
  }
}

/**
 * Exports the alumni card as a PDF document (A4 landscape, card centred).
 * Suitable for printing or attaching to a CV.
 */
export async function exportCardAsPDF(
  cardElement: HTMLElement,
  alumniName: string
): Promise<void> {
  try {
    const canvas = await captureCard(cardElement);
    const imgData = canvas.toDataURL('image/png');

    // A4 landscape: 297 × 210 mm
    const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
    const pageWidth = pdf.internal.pageSize.getWidth();   // 297 mm
    const pageHeight = pdf.internal.pageSize.getHeight(); // 210 mm

    // Card aspect ratio: 856:540 ≈ 1.585
    const cardAspect = canvas.width / canvas.height;
    const cardW = pageWidth * 0.75; // 75% of page width
    const cardH = cardW / cardAspect;
    const x = (pageWidth - cardW) / 2;
    const y = (pageHeight - cardH) / 2;

    // Add subtle background page colour matching site palette
    pdf.setFillColor(3, 4, 12); // #03040C
    pdf.rect(0, 0, pageWidth, pageHeight, 'F');

    pdf.addImage(imgData, 'PNG', x, y, cardW, cardH);

    // Footer text
    pdf.setFontSize(8);
    pdf.setTextColor(200, 169, 106); // #C8A96A
    pdf.text('ImpactX Global — Verified Alumni Credential', pageWidth / 2, pageHeight - 8, {
      align: 'center',
    });

    const safeName = alumniName.replace(/\s+/g, '-').toLowerCase();
    pdf.save(`impactx-alumni-card-${safeName}.pdf`);
  } catch (err) {
    console.error('[cardExport] PDF export failed:', err);
    throw err;
  }
}
