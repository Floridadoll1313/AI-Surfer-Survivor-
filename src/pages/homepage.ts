import { Router, Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

// Home page - serves React app or standalone HTML
router.get('/', (req: Request, res: Response) => {
  if (process.env.NODE_ENV === 'production') {
    res.sendFile(path.join(__dirname, 'client', 'index.html'));
  } else {
    res.sendFile(path.join(__dirname, 'Public', 'index.html'));
  }
});

// Island page - standalone version
router.get('/island-standalone', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'Public', 'Island.html'));
});

// API endpoint
router.get('/api/info', (req: Request, res: Response) => {
  res.json({
    name: 'OTD AI Surfer Survivor Console',
    version: '1.0.0',
    status: 'running'
  });
});

export default router;