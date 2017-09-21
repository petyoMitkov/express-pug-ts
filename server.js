"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.set("view engine", "pug");
//localhost:3000/static/
app.use("/static", express.static("public"));
//localhost:3000/static/css/main.css
//access to bootstrap
app.use("/libs", express.static("node_modules"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); //pars form input!
app.use(function(req, res, next) {
    console.log(req.ip);
    next();
});
var books = [];
app.get("/", function(req, res) {
    var model = {
        model: books
    };
    res.render("home/index", model);
});
/*app.get("/books", (req, res) => {
    res.send(books);
});*/
app.get("/books/add", function(req, res) {
    res.render("books/book-add");
});
app.get("/books/:id", function(req, res) {
    var id = req.params.id; //type String
    for (var _i = 0, books_1 = books; _i < books_1.length; _i++) {
        var book = books_1[_i];
        if (book.id == id) {
            var model = {
                model: book
            };
            return res.render("books/book", model);
            //return res.send(b);
        }
    }
    return res.status(404)
        .send({ error: "Book not found" });
});
app.post("/books", function(req, res) {
    var body = req.body;
    var book = {
        id: books.length + 1,
        title: body.title
    };
    books.push(book);
    res.redirect("/");
});
app.listen("https://express-pug-ts.herokuapp.com/", function() { return console.log("Magic happens at : 3000"); });