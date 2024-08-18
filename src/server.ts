import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Interface for the device-endpoint mapping
interface DeviceEndpoints {
    [deviceId: string]: string;
}

// In-memory storage for device endpoints
const deviceEndpoints: DeviceEndpoints = {};

// Root route to handle GET requests to "/"
app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the Device Endpoint API');
});

// Endpoint to set the endpoint link for a device
app.post('/set-endpoint', (req: Request, res: Response) => {
    const { deviceId, endpoint } = req.body;

    if (!deviceId || !endpoint) {
        return res.status(400).json({ message: 'Device ID and endpoint are required' });
    }

    deviceEndpoints[deviceId] = endpoint;
    res.status(200).json({ message: `Endpoint set for device ${deviceId}` });
});

// Endpoint to get the endpoint link for a device
app.get('/get-endpoint/:deviceId', (req: Request, res: Response) => {
    const deviceId = req.params.deviceId;

    const endpoint = deviceEndpoints[deviceId];
    if (!endpoint) {
        return res.status(404).json({ message: 'Device ID not found' });
    }

    res.status(200).json({ endpoint });
});

// Endpoint to send the endpoint link to a device ID (simulating a device request)
app.post('/send-endpoint', (req: Request, res: Response) => {
    const { deviceId } = req.body;

    if (!deviceId) {
        return res.status(400).json({ message: 'Device ID is required' });
    }

    const endpoint = deviceEndpoints[deviceId];
    if (!endpoint) {
        return res.status(404).json({ message: 'Device ID not found' });
    }

    // Simulating sending the endpoint to the device
    res.status(200).json({ message: `Endpoint sent to device ${deviceId}`, endpoint });
});

// Endpoint to get a JSON of all device IDs and their endpoint links
app.get('/all-endpoints', (req: Request, res: Response) => {
    res.status(200).json(deviceEndpoints);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
