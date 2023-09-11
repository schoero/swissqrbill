/**
 * Checks whether there is enough space for th given width and height on the current page of the given PDF document.
 * @param doc The PDF document
 * @param xPosition The x position in pt from where the check will be performed
 * @param yPosition The y position in pt from where the check will be performed
 * @param width The width to be checked in pt
 * @param height The height to be checked in pt
 * @returns Whether the space is sufficient or not
 */
export function isSpaceSufficient(doc: PDFKit.PDFDocument, xPosition: number, yPosition: number, width: number, height: number): boolean {

  if(!doc.page){
    return false;
  }

  return (
    Math.round(xPosition + width) <= Math.round(doc.page.width) &&
    Math.round(doc.y + height) <= Math.round(doc.page.height) &&
    Math.round(yPosition + height) <= Math.round(doc.page.height)
  );
}
