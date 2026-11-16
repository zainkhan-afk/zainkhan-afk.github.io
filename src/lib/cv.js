import fs from "fs";
import path from "path";

export const CV_PATH = "/cv.pdf";
export const CV_FILENAME = "Zainullah-Khan-CV.pdf";

// Checked at build time: CV links render only once public/cv.pdf exists
export function hasCV() {
  return fs.existsSync(path.join(process.cwd(), "public", "cv.pdf"));
}
