const express = require("express");
const axios = require("axios");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/search", authMiddleware, async (req, res) => {
  const { term, media } = req.query;
  try {
    const response = await axios.get(`https://itunes.apple.com/search`, {
      params: {
        term,
        media,
        limit: 10,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data from iTunes API" });
  }
});

module.exports = router;
