const { booksControllers, authorsControllers } = require("./controllers");

const booksRouter = (req, res, method) => {
	switch (method) {
		case "GET":
			booksControllers.getAllBooks(req, res);
			break;

		case "POST":
			booksControllers.addBook(req, res);
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

const authorsRouter = (req, res, method) => {
	switch (method) {
		case "GET":
			return authorsControllers.getAllAuthors(req, res);

		case "POST":
			return authorsControllers.addAuthor(req, res);

		case "PUT":
			return authorsControllers.updateAuthor(req, res);

		case "DELETE":
			return authorsControllers.deleteAuthor(req, res);

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
