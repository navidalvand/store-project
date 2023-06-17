const path = require("path");
const http = require("http");
const { allRoutes } = require("../routes/router");
const morgan = require("morgan");
const process = require("process");
const createError = require("http-errors");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const cookieParser = require("cookie-parser");
const cors = require("cors");

class Server {
  #express = require("express");
  #mongoose = require("mongoose");
  #app = this.#express();

  constructor(PORT, DB_URI) {
    this.configServer();
    this.configDataBase(DB_URI);
    this.initRedis();
    this.configSwagger();
    this.createRoutes();
    this.startServer(PORT);
    this.errorHandler();
  }

  configServer() {
    this.#app.use(cors());
    this.#app.use(morgan("dev"));
    this.#app.use(this.#express.json());
    this.#app.use(this.#express.urlencoded());
    this.#app.use(cookieParser());
    this.#app.use(this.#express.static(path.join(__dirname, "..", "public")));
  }

  configDataBase(DB_URI) {
    this.#mongoose.connect(DB_URI, (err) => {
      if (!err) return console.log("Connected To MongoDB!");
      return console.log(err.message);
    });
    this.#mongoose.connection.on("connected", () => {
      console.log("mongoose is ready to use");
    });
    process.on("SIGINT", async () => {
      await this.#mongoose.connection.close();
      process.exit(0);
    });
  }

  initRedis() {
    require("../utils/init-redis.js");
  }

  configSwagger() {
    this.#app.use(
      "/api-doc",
      swaggerUI.serve,
      swaggerUI.setup(
        swaggerJsDoc({
          swaggerDefinition: {
            info: {
              title: "felan store",
              version: "2.0.0",
              description: "test desc",
            },
            servers: [
              {
                url: "http://localhost:3000",
              },
            ],
          },
          apis: ["./src/routes/*/*.js", "./src/routes/*.js"],
        })
      )
    );
  }

  createRoutes() {
    this.#app.use(allRoutes);
  }

  startServer(PORT) {
    const server = http.createServer(this.#app);
    server.listen(PORT, () => {
      console.log(
        "----------------------------------------------------------------"
      );
      console.log(`Server Started On Port => ${PORT}`);
      console.log(`http://localhost:${PORT}`);
    });
  }

  errorHandler() {
    this.#app.use((req, res, next) => {
      next(createError.NotFound("page not found"));
    });

    this.#app.use((err, req, res, next) => {
      const serverError = createError.InternalServerError();
      const statusCode = err?.status || serverError.status;
      const message = err?.message || serverError.message;
      return res.status(statusCode).json({
        data: null,
        errors: {
          statusCode,
          message,
        },
      });
    });
  }
}

module.exports = {
  Server,
};
