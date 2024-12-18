"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoService_1 = require("./mongoService");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
(async () => {
    try {
        // Connect to the database before starting the server
        await (0, mongoService_1.connectToDatabase)();
        console.log('Database connected successfully.');
        // Define routes after database connection is established
        app.get('/2', (req, res) => {
            res.send('Welcome to the Node.js service!');
        });
        app.get('/3', async (req, res) => {
            try {
                const data = await (0, mongoService_1.getData)();
                res.status(200).json(data);
            }
            catch (error) {
                console.error('Error fetching data:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
        const PORT = Number(process.env.PORT) || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    }
    catch (err) {
        console.error('Failed to connect to the database:', err);
        process.exit(1);
    }
})();
