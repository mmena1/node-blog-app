import * as express from "express";
import * as bodyParser from "body-parser";

const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) =>
  res.status(200).send({
    message: "Welcome to the Blog App!"
  })
);

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = app;
