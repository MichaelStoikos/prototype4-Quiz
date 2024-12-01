const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const config = require("./config/config.json");

const app = express();
const PORT = process.env.PORT || 2000;
const url = config.final_url;
const dbName = "Quiz";
const roomsCollection = "Rooms";
const participantsCollection = "Participants";

app.use(cors());
app.use(express.json());

let db;
const client = new MongoClient(url);

client
	.connect()
	.then(() => {
		db = client.db(dbName);
		console.log("MongoDB connected");
	})
	.catch((err) => {
		console.error("MongoDB connection error:", err.message);
		process.exit(1);
	});
    app.get("/api/question", async (req, res) => {
        try {
          const question = await db.collection("Questions").aggregate([{ $sample: { size: 1 } }]).toArray();
          res.json({
            id: question[0].id,
            question: question[0].question,
            image: question[0].image || null,
            options: question[0].options,
          });
        } catch (err) {
          console.error("Error fetching question:", err.message);
          res.status(500).json({ error: "Internal Server Error" });
        }
      });

      app.post("/api/answer", async (req, res) => {
        const { sessionId, elo, questionId, selectedOption } = req.body;
      
        try {
          const question = await db.collection("Questions").findOne({ id: questionId });
      
          if (!question) {
            return res.status(404).json({ error: "Question not found" });
          }
  
          const isCorrect = question.answer === selectedOption;

          let eloChange = isCorrect ? 10 : -5;
          let updatedElo = elo + eloChange;
      
          res.json({
            isCorrect,
            correctAnswer: question.answer,
            updatedElo,
            nextQuestionAvailable: true
          });
        } catch (err) {
          console.error("Error validating answer:", err.message);
          res.status(500).json({ error: "Internal Server Error" });
        }
      });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
      