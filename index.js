const config = require("./config");
const express = require("express");
const fetch = require("node-fetch");

const app = express();

app.get("/", (req, res) => {
	res.send("Ciao a tutti!");
});

const URL_libro =
	"https://www.googleapis.com/books/v1/volumes?&maxResults=40&key=" +
	config.GOOGLE_BOOKS_KEY +
	"&q=intitle:";
app.get("/books/:book", async (req, res) => {
	console.log(`Libro richiesto: ${req.params.book}`);
	let libri = await fetch(URL_libro + req.params.book)
		.then((r) => r.json())
		.then((b) => b.items);
	res.send(libri);
});

const URL_autore =
	"https://www.googleapis.com/books/v1/volumes?&maxResults=40&key=" +
	config.GOOGLE_BOOKS_KEY +
	"&q=inauthor:";
app.get("/authors/:author/books", async (req, res) => {
	console.log(`Autore dei libri richiesti: ${req.params.author}`);
	let libri = await fetch(URL_autore + req.params.author)
		.then((r) => r.json())
		.then((b) => b.items);
	res.send(libri);
});

const URL_argomento =
	"https://www.googleapis.com/books/v1/volumes?&maxResults=40&key=" +
	config.GOOGLE_BOOKS_KEY +
	"&q=subject:";
app.get("/subjects/:subject/books", async (req, res) => {
	console.log(`Argomento dei libri richiesti: ${req.params.subject}`);
	let libri = await fetch(URL_argomento + req.params.subject)
		.then((r) => r.json())
		.then((b) => b.items);
	res.send(libri);
});

const URL_isbn =
	"https://www.googleapis.com/books/v1/volumes?&maxResults=40&key=" +
	config.GOOGLE_BOOKS_KEY +
	"&q=isbn:";
app.get("/books/ISBNs/:isbn", async (req, res) => {
	console.log(`ISBN del libro richiesto: ${req.params.isbn}`);
	let libri = await fetch(URL_isbn + req.params.isbn)
		.then((r) => r.json())
		.then((b) => b.items);
	res.send(libri);
});

const URL_editore =
	"https://www.googleapis.com/books/v1/volumes?&maxResults=40&key=" +
	config.GOOGLE_BOOKS_KEY +
	"&q=inpublisher:";
app.get("/publishers/:publisher/books", async (req, res) => {
	console.log(`Editore dei libri richiesti: ${req.params.publisher}`);
	let libri = await fetch(URL_editore + req.params.publisher)
		.then((r) => r.json())
		.then((b) => b.items);
	res.send(libri);
});

app.listen(3000, () => {
	console.log("connesso");
});

// npm add express
// creo index.js
// dentro a package > script aggiungo "dev": "node index.js"
// per avviare ogni volta il server scrivere npm run dev
// per fermarlo bisogna premere ctrl + c

// per aggiungere la funzione fetch
// npm install node-fetch
// e nel js > const fetch = require ('node-fetch')
