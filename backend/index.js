import TorrentSearchApi from "torrent-search-api";
import express from "express";
import cors from "cors";
import { Deluge } from "@ctrl/deluge";

// Set default providers
TorrentSearchApi.enableProvider("ThePirateBay");

const client = new Deluge({
  baseUrl: "http://192.168.0.190:8112/",
  password: "deluge",
});

// create express app
const app = express();

// add middlewares
app.use(cors());
app.use(express.json());

// make route that searches for a torrent
app.get("/search", async (req, res) => {
  const { query } = req.query;
  const torrents = await TorrentSearchApi.search(query, "All", 1000);
  res.json(torrents);
});

app.get("/add", async (req, res) => {
  const { magnet } = req.query;
  console.log(magnet);
  const result = await client.addTorrentMagnet(magnet);
  res.json(result);
});

// start express server
app.listen(4241, () => {
  console.log("server started on port 4241");
});
