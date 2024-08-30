const { loginUser } = require("../controllers/iTunesController");

const loginRoute = (app) => {
  app.get("/login", loginUser);
};

module.exports = loginRoute;
