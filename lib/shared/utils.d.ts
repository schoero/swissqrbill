/**
 * Checks whether the given iban is a QR-IBAN or not.
 * @param iban The IBAN to be checked.
 * @returns `true` if the given IBAN is a QR-IBAN and `false` otherwise.
 */
export declare function isQRIBAN(iban: string): boolean;
/**
 * Validates the given IBAN.
 * @param iban The IBAN to be checked.
 * @returns `true` if the checksum of the given IBAN is valid and `false` otherwise.
 */
export declare function isIBANValid(iban: string): boolean;
/**
 * Formats the given IBAN according the specifications to be easily readable.
 * @param iban The IBAN to be formatted.
 * @returns The formatted IBAN.
 */
export declare function formatIBAN(iban: string): string;
/**
 * Checks whether the given reference is a QR-Reference or not.
 * @param reference The Reference to be checked.
 * @returns `true` if the given reference is a QR-Reference and `false` otherwise.
 * @remarks The QR-Reference is a 27 digits long string containing only digits. The last digit is the checksum.
 */
export declare function isQRReference(reference: string): boolean;
/**
 * Validates the given QR-Reference.
 * @param reference The reference to be checked.
 * @returns `true` if the given reference is valid and `false` otherwise.
 */
export declare function isQRReferenceValid(reference: string): boolean;
/**
 * Checks whether the given reference is a SCOR-Reference or not.
 * @param reference The Reference to be checked.
 * @returns `true` if the given reference is a SCOR-Reference and `false` otherwise.
 * @remarks The SCOR-Reference is an alphanumeric string beginning with 'RF' and containing a 2 digit checksum and a max 21 digits long reference.
 */
export declare function isSCORReference(reference: string): boolean;
/**
 * Validates the given SCOR-Reference.
 * @param reference The reference to be checked.
 * @returns `true` if the given reference is valid and `false` otherwise.
 */
export declare function isSCORReferenceValid(reference: string): boolean;
/**
 * Calculates the checksum according to the ISO 11649 standard.
 * @param reference The max 21 digits long reference (without the "RF" and the 2 digit checksum) whose checksum should be calculated.
 * @returns The calculated checksum as 2 digit string.
 */
export declare function calculateSCORReferenceChecksum(reference: string): string;
/**
 * Calculates the checksum according the specifications.
 * @param reference The 26 digits long reference (without the checksum) whose checksum should be calculated.
 * @returns The calculated checksum.
 */
export declare function calculateQRReferenceChecksum(reference: string): string;
/**
 * Formats the given QR-Reference according the specifications to be easily readable.
 * @param reference The QR-Reference to be formatted.
 * @returns The formatted QR-Reference.
 */
export declare function formatQRReference(reference: string): string;
/**
 * Formats the given SCOR-Reference according the specifications to be easily readable.
 * @param reference The SCOR-Reference to be formatted.
 * @returns The formatted SCOR-Reference.
 */
export declare function formatSCORReference(reference: string): string;
/**
 * Detects the type of the given reference and formats it according the specifications to be easily readable.
 * @param reference The reference to be formatted.
 * @returns The formatted reference.
 */
export declare function formatReference(reference: string): string;
/**
 * Formats the given amount according the specifications to be easily readable.
 * @param amount containing the amount to be formatted.
 * @returns The formatted amount.
 */
export declare function formatAmount(amount: number): string;
/**
 * Converts millimeters to points.
 * @param millimeters The millimeters you want to convert to points.
 * @returns The converted millimeters in points.
 */
export declare function mm2pt(millimeters: number): number;
/**
 * Converts points to millimeters.
 * @param points The points you want to convert to millimeters.
 * @returns The converted points in millimeters.
 */
export declare function pt2mm(points: number): number;
/**
 * Converts millimeters to pixels.
 * @param millimeters The millimeters you want to convert to pixels.
 * @returns The converted millimeters in pixels.
 */
export declare function mm2px(millimeters: number): number;
/**
 * Converts pixels to millimeters.
 * @param pixels containing the pixels you want to convert to millimeters.
 * @returns The converted pixels in millimeters.
 */
export declare function px2mm(pixels: number): number;
/**
 * Detects the type of the given reference.
 * @param reference The reference to get the type of.
 * @returns The type of the given reference.
 */
export declare function getReferenceType(reference: string | undefined): "NON" | "QRR" | "SCOR";
