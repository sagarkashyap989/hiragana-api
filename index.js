const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;
const DATA_FILE = "hiraganaData.json";

app.use(cors());
app.use(bodyParser.json());

// GET endpoint - Fetch flashcards
app.get("/flashcards", (req, res) => {
  fs.readFile(DATA_FILE, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading data file" });
    }
    res.json(JSON.parse(data));
  });
});

// POST endpoint - Add new flashcards
app.post("/flashcards", (req, res) => {
  const newFlashcards = req.body;

  fs.readFile(DATA_FILE, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading data file" });
    }

    const existingFlashcards = JSON.parse(data);
    const updatedFlashcards = [...existingFlashcards, ...newFlashcards];

    fs.writeFile(DATA_FILE, JSON.stringify(updatedFlashcards, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: "Error writing to data file" });
      }
      res.json({ message: "Flashcards added successfully", data: updatedFlashcards });
    });
  });
});

app.listen(3001, () => {
  console.log(`Server is running on http://localhost:${3001}`);
});
