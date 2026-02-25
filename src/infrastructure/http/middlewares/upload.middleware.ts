import multer from 'multer';
import { Request } from 'express';
import { env } from '@/infrastructure/config/env';

const MAX_SIZE_BYTES = env.UPLOAD_MAX_SIZE_MB * 1024 * 1024;

/**
 * Multer middleware using memory storage.
 *
 * Only accepts application/pdf files. The size limit is read from the
 * UPLOAD_MAX_SIZE_MB environment variable (default 10 MB).
 */
export const uploadMiddleware = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_SIZE_BYTES },
  fileFilter: (_req: Request, file, cb) => {
    if (file.mimetype !== 'application/pdf') {
      cb(new Error('Only PDF files are accepted'));
      return;
    }
    cb(null, true);
  },
});
