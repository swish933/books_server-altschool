const { readFile } = require("fs");
const path = require("path");

const booksDBPath = path.join(__dirname, "db", "books.json");

const booksControllers = {
	getAllBooks: (_, res) => {
		readFile(booksDBPath, "utf-8", (err, books) => {
			if (err) {
				console.error(err);
				res.writeHead(500);
				res.end("An error occured.");
			}
			res.end(books);
		});
	},

	addBook: (req, res) => {
		const body = [];
		req.on("data", (chunk) => {
			body.push(chunk);
		});
		req.on("end", () => {
			const parsedBody = Buffer.concat(body).toString();
			const newBook = JSON.parse(parsedBody);
		});
		res.end();
	},
	updateBook: (req, res) => {},
	deleteBook: (req, res) => {},
};

module.exports = { booksControllers };
