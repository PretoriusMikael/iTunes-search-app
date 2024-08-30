const express = require("express");
const cors = require("cors");
const iTunesRoutes = require("./routes/iTunesRoutes");
require("dotenv").config();
const loginRoute = require("./routes/loginRoute");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

loginRoute(app);
app.use("/api", iTunesRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
