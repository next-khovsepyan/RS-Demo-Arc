import multer from 'multer';
import path from 'path';
const uploadPath = path.join(__dirname, '../public/uploads');

export function getHeaderValue(headers: any, key: string): string {
  const value = headers[key];
  if (Array.isArray(value)) {
    return value[0] || ''; 
  }
  return value || '';
}
export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});