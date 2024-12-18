import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { connectToDatabase, getData } from './mongoService';

const app = express();
app.use(bodyParser.json());

(async () => {
    try {
        // Connect to the database before starting the server
        await connectToDatabase();
        console.log('Database connected successfully.');

        // Define routes after database connection is established
        app.get('/2', (req: Request, res: Response) => {
            res.send('Welcome to the Node.js service!');
        });

        app.get('/3', async (req: Request, res: Response) => {
            try {
                const data = await getData();
                res.status(200).json(data);
            } catch (error) {
                console.error('Error fetching data:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });

        const PORT = Number(process.env.PORT) || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('Failed to connect to the database:', err);
        process.exit(1);
    }
})();
