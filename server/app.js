const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
require("dotenv").config();

// Get the secret key
const watch_mode_secret_key = process.env.WATCH_MODE_SECRET_KEY;

// Middleware to parse JSON request bodies
const corsOptions = {
  origin: ["http://localhost:5173", "https://wheretowatchthis.vercel.app"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ hello: "you found me" });
});

app.post("/api/whereisthis", async (req, res) => {
  try {
    /** get the title */
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    /** Getting the id of the requested tv show or*/
    const { titleId, titleImage, titleName, error1 } =
      await titleIdImageNameHelper(title);
    if (error1) return res.status(400).json({ message: "title not found" });

    /** searching for sources */
    const { sourcesData, error2 } = await sourceSearchingHelper(titleId);
    if (error2) return res.status(400).json({ message: "no sources found" });
    if (sourcesData.length < 1)
      return res
        .status(404)
        .json({ message: "No streaming service has this title" });

    /** Getting the sources */
    let sourcesIds = sourcesData
      .slice(0, Math.min(sourcesData.length, 5))
      .map((v, i) => v.source_id);
    const idsSet = new Set(sourcesIds);

    /** Get all sources and filter them */
    const { sourcesDetailsData } = await sourcesDetailsHelper();
    const filteredData = sourcesDetailsData.filter((obj) => idsSet.has(obj.id));

    /** return the response */
    return res.status(200).json({ filteredData, titleImage, titleName });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

/** Helpers */
const titleIdImageNameHelper = async (title) => {
  try {
    /** Encode the title */
    const encodedTitle = encodeURIComponent(title);

    /** Make the request */
    const url = `https://api.watchmode.com/v1/autocomplete-search/?apiKey=${watch_mode_secret_key}&search_value=${encodedTitle}&search_type=1`;
    const response = await fetch(url);
    const data = await response.json();

    /** Get the id, image, name */
    const titleId = data.results[0].id;
    const titleImage = data.results[0].image_url;
    const titleName = data.results[0].name;

    return { titleId, titleImage, titleName };
  } catch (error) {
    return { error1: error.message };
  }
};

const sourceSearchingHelper = async (titleId) => {
  try {
    /** Making the request to get the sources id */
    const url = `https://api.watchmode.com/v1/title/${titleId}/sources/?apiKey=${watch_mode_secret_key}`;
    const response = await fetch(url);
    const data = await response.json();

    return { sourcesData: data };
  } catch (error) {
    return { error2: error.message };
  }
};

const sourcesDetailsHelper = async () => {
  try {
    /** Make the request */
    const url = `https://api.watchmode.com/v1/sources/?apiKey=${watch_mode_secret_key}`;
    const response = await fetch(url);
    const data = await response.json();

    /** Return the data */
    return { sourcesDetailsData: data };
  } catch (error) {
    return { error3: error.message };
  }
};


module.exports = app;
