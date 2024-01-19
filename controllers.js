const { readFile, writeFile } = require("fs");
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

			readFile(booksDBPath, "utf-8", (err, books) => {
				if (err) {
					console.error(err);
					res.writeHead(500);
					res.end("An error occured.");
				}

				const existingBooks = JSON.parse(books);
				const allBooks = [...existingBooks, newBook];

				writeFile(booksDBPath, JSON.stringify(allBooks), (err) => {
					if (err) {
						console.error(err);
						res.writeHead(500);
						res.end("An error occured.");
					}
					res.end(JSON.stringify(newBook));
				});
			});
		});
	},

	updateBook: (req, res) => {
		const body = [];

		req.on("data", (chunk) => {
			body.push(chunk);
		});

		req.on("end", () => {
			const parsedBody = Buffer.concat(body).toString();
			const updateContent = JSON.parse(parsedBody);

			if (!updateContent.id) {
				res.writeHead(400);
				res.end("No ID passed");
			}

			readFile(booksDBPath, "utf-8", (err, books) => {
				if (err) {
					console.error(err);
					res.writeHead(500);
					res.end("An error occured.");
				}

				const existingBooks = JSON.parse(books);

				const bookIndex = existingBooks.findIndex((item) => {
					return item.id === updateContent.id;
				});

				existingBooks[bookIndex] = {
					...existingBooks[bookIndex],
					...updateContent,
				};

				writeFile(booksDBPath, JSON.stringify(existingBooks), (err) => {
					if (err) {
						console.error(err);
						res.writeHead(500);
						res.end("An error occured.");
					}
					res.end(JSON.stringify(existingBooks[bookIndex]));
				});
			});
		});
	},
	deleteBook: (req, res) => {},
};

module.exports = { booksControllers };
