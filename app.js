const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const fetch = require("node-fetch");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));
app.get("/", (req, res, next) => {
    res.sendFile(__dirname + "/index.html");
});
app.get("/add", (req, res, next) => {
    res.sendFile(__dirname + "/quote.html");
});
app.post("/add", (req, res, next) => {
    const quote = req.body.quote;
    if (quote !== "") {
        fetch("http://localhost:8800/quote", {
            method: "POST",
            body: JSON.stringify({
                quote: quote,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => console.log(data[0].quote))
            .catch((err) => console.log(err));
    }
    res.redirect("/");
});
app.listen(3000);
