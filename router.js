const { booksControllers } = require("./controllers");

const booksRouter = (req, res, method, books) => {
	switch (method) {
		case "GET":
			booksControllers.getAllBooks(req, res);
			break;

		case "POST":
			booksControllers.addBook(req, res, books);
			break;

		case "PUT":
			booksControllers.updateBook(req, res);
			break;

		case "DELETE":
			booksControllers.deleteBook(req, res);
			break;

		default:
			res.writeHead(404);
			res.write(
				JSON.stringify({
					message: "Method Not Supported",
				})
			);
			res.end();
	}
};

const authorsRouter = (req, res, method, db) => {
	switch (method) {
		case "GET":
			return getAllAuthors(req, res);

		case "POST":
			return addAuthor(req, res);

		case "PUT":
			return updateAuthor(req, res);

		case "DELETE":
			return deleteAuthor(req, res);

		default:
			res.writeHead(404);
			res.write(
				JSON.stringify({
					message: "Method Not Supported",
				})
			);
			res.end();
	}
};

module.exports = { booksRouter, authorsRouter };
