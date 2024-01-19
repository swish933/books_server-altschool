const http = require("http");
const path = require("path");
const { readFileSync } = require("fs");
const { booksRouter, authorsRouter } = require("./router");

const PORT = 8000;
const HOST = "";

const booksDBPath = path.join(__dirname, "db", "books.json");
let booksDB = null;

function requestHandler(req, res) {
	res.setHeader("Content-Type", "application/json");

	if (req.url === "/books") {
		return booksRouter(req, res, req.method);
	}

	if (req.url == "/books/author") {
		return authorsRouter(req, res, req.method);
	}

	res.writeHead(404);
	res.write("Error. No such page.");
	res.end();
}

const server = http.createServer(requestHandler);

server.listen(PORT, HOST, () => {
	booksDB = JSON.parse(readFileSync(booksDBPath, "utf-8"));
	console.log(`server running at port ${PORT}`);
});
