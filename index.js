const http = require("http");
const sharp = require("sharp");
const Busboy = require("busboy");
const { createReadStream } = require("fs");
const port = 8000;

const app = (req, res) => {
  if (req.url.indexOf("/uploads") >= 0 && req.method.toLowerCase() === "get") {
    const fileName = req.url.split("/")[2];
    const imageFileStream = createReadStream(
      `${__dirname}/uploads/${fileName}`
    );
    res.statusCode = 200;
    imageFileStream.pipe(res);
    return;
  }

  if (req.url === "/uploads" && req.method.toLowerCase() === "post") {
    const busboy = new Busboy({ headers: req.headers });

    let imageFileName = "";
    busboy.on("file", function (fieldname, file, filename, encoding, mimetype) {
      imageFileName = filename;
      const transformer = sharp()
        .resize(300)
        .composite([
          {
            input: `${__dirname}/overlays/snowball_logo.png`,
            gravity: "southeast",
            blend: "overlay",
          },
        ])
        .sharpen();
      file.pipe(transformer).toFile(`${__dirname}/uploads/${imageFileName}`);
    });

    busboy.on("finish", function () {
      res.writeHead(200);
      res.end(
        JSON.stringify({
          url: `http://127.0.0.1:${port}/uploads/${imageFileName}`,
        })
      );
    });
    return req.pipe(busboy);
  }

  res.writeHead(400);
  res.end();
};

const server = http.createServer(app);

server.listen(port, () => console.log(`Server is running on port:${port}`));
