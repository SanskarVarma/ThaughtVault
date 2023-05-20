import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/myKeeperAppDB", { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', (error) => {
  console.error('Connection error:', error);
});

db.once('open', () => {
  console.log('Connected to the database!');
});

const keeperSchema = mongoose.Schema({
  title: String,
  description: String
});

const Keeper = new mongoose.model("Keeper", keeperSchema);

app.get("/api/getAll", (req, res) => {
  Keeper.find({}, (err, keeperList) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(keeperList);
    }
  });
});

app.post("/api/addNew", (req, res) => {
  const { title, description } = req.body;
  const keeperObj = new Keeper({
    title,
    description
  });

  keeperObj.save((error) => {
    if (error) {
      console.log(error);
    }
    Keeper.find({}, (err, keeperList) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send(keeperList);
      }
    });
  });
});

app.post("/api/deleteAll", (req, res) => {
    const { id } = req.body;
    Keeper.deleteOne({ _id: id }, () => {
      Keeper.find({}, (err, keeperList) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).send(keeperList);
        }
      });
    });
  });

app.listen(8000, () => {
  console.log("backend created at port 8000");
});
