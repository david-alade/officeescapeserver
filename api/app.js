const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Basic route to handle GET requests
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Express API!" });
});

// Another example route to handle POST requests
app.post("/data", (req, res) => {
  const receivedData = req.body;
  res.json({ message: "Data received successfully", data: receivedData });
});

// Start the server
app.listen(port, () => {
  console.log('hello world');
  console.log(`Server is running on http://localhost:${port}`);
});

