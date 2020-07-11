const express = require("express");
const router = express.Router();
// const db = require("../models");
// const passport = require("../config/passport");

// Route to get all stocks from user watchlist
router.get("/api", (req, res) => {
    seeAllstocks()
        .then((allStocks) => res.json(allStocks))
        .catch((err) => res.send(err))
});

// Route to get a single stock information
router.get("/api/find:symbol", (req, res) => {
    const symbol = req.params.symbol
    showStock(symbol)
        .then((stockSymbol) => res.json(stockSymbol))
        .catch((err) => res.send(err))
});

// Route to delete stock from watchlist
router.get("/api/delete:symbol", (req, res) => {
    const symbol = req.params.symbol
    deleteStock(symbol)
        .then((stockSymbol) => res.json(stockSymbol))
        .catch((err) => res.send(err))
});

// router.get("/api", (req, res) => {
//     res.send({ msg: "success" });
// });

router.post("/api/login", passport.authenticate("local"), (req, res) => {
    res.json({ email: req.user.email, id: req.user.id });
});

router.post("/api/signup", (req, res) => {
    db.User.create({ email: req.body.email, password: req.body.password })
        .then(() => {
            res.redirect(307, "/api/login");
        })
        .catch((err) => res.status(401).json(err));
});

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

router.get("/api/user_data", (req, res) => {
    !req.user
        ? res.json({})
        : res.json({
            email: req.user.email,
            id: req.user.id,
        });
});

module.exports = router;
