import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(cors());
app.use(express.json());

// Get Content
app.get('/api/content', async (req, res) => {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf-8');
        res.json(JSON.parse(data));
    } catch (error) {
        res.status(500).json({ error: 'Failed to read data' });
    }
});

// Update Content
app.post('/api/content', async (req, res) => {
    try {
        await fs.writeFile(DATA_FILE, JSON.stringify(req.body, null, 2));
        res.json({ success: true, message: 'Content updated' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save data' });
    }
});

// Upload Endpoint (Mock for now, returns the URL provided)
app.post('/api/upload', (req, res) => {
    // straightforward implementation for now
    res.json({ url: req.body.url });
});

app.listen(PORT, () => {
    console.log(`CMS Server running on http://localhost:${PORT}`);
});
