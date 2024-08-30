const axios = require("axios");
const userInformation = require("./userDB");
const jwt = require("jsonwebtoken");

// Controller function to handle search requests
const searchiTunes = async (req, res) => {
  try {
    const { term, media } = req.query;

    // Validate that the term and media type are provided
    if (!term) {
      return res.status(400).json({ error: "Search term is required." });
    }

    // Construct the iTunes Search API URL
    const baseURL = "https://itunes.apple.com/search";
    const queryParams = `?term=${encodeURIComponent(term)}&media=${
      media || "all"
    }`;
    const url = `${baseURL}${queryParams}`;

    // Make a request to the iTunes Search API
    const response = await axios.get(url);

    // Extract relevant data from the API response
    const results = response.data.results.map((item) => ({
      trackName: item.trackName,
      artistName: item.artistName,
      artworkUrl100: item.artworkUrl100,
      releaseDate: item.releaseDate,
      kind: item.kind,
      collectionName: item.collectionName,
      collectionPrice: item.collectionPrice,
      trackPrice: item.trackPrice,
      previewUrl: item.previewUrl,
    }));

    // Return the results to the client
    res.json(results);
  } catch (error) {
    console.error("Error fetching data from iTunes API:", error.message);
    res.status(500).json({ error: "Failed to fetch data from iTunes API." });
  }
};

const loginUser = (req, res) => {
  const { username, password } = req.query;

  const user = userInformation.find(
    (user) => user.username === username && user.password === password
  );

  if (!user) {
    return res.status(401).json({ error: "Incorrect user credentials" });
  }

  payload = { "name": username, "admin": user.admin };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    algorithm: "HS256",
  });

  res.send({ message: `Welcome back ${username}`, token: token });
};

module.exports = {
  searchiTunes,
  loginUser,
};
