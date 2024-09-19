const express = require("express");
const app = express();
const webpush = require('web-push');
const cors = require("cors")
import { PRIVATE_KEY, PUBLIC_KEY } from '../keys.js';

const port = 3000;

const apiKeys = {
    publicKey: PUBLIC_KEY,
    privateKey: PRIVATE_KEY
}

// If user wants to get in touch with the notification sender
webpush.setVapidDetails(
    'mailto:YOUR_MAIL_ADDRESS_OR_URL',
    apiKeys.publicKey,
    apiKeys.privateKey
)

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello world");
})

const subDatabse = [];


app.post("/save-subscription", (req, res) => {
    subDatabse.push(req.body);
    res.json({ status: "Success", message: "Subscription saved!" })
})

app.get("/send-notification", (req, res) => {
    webpush.sendNotification(subDatabse[0], "Hello world");
    res.json({ "statue": "Success", "message": "Message sent to push service" });
})

app.listen(port, () => {
    console.log("Server running on port 3000!");
})