import * as express from "express";
import * as bodyParser from "body-parser";
import { createUser } from "./../user/endpoints/create";
import { deleteUser } from "./../user/endpoints/delete";
import { updateUser } from "./../user/endpoints/update";
import { allUsers } from "./../user/endpoints/findAll";
import { home } from "./endpoints/home";
import * as exphbs from "express-handlebars";
import * as hbs from "hbs";

export const app = express();
app.use(bodyParser.json());

const routeToPartials = "views/partials";
hbs.registerPartials(routeToPartials);
app.engine("handlebars", exphbs({ extname: ".hbs" }));

hbs.registerHelper("getCurrentYear", () => new Date().getFullYear());

app.use("/api/", home);
app.use("/api/users", createUser);
app.use("/api/users", deleteUser);
app.use("/api/users", updateUser);
app.use("/api/users", allUsers);
import findAll from "../user/operations/findAll";

app.get("/", (req, res) => {
  res.render("home.hbs", {
    pageTitle: "Welcome Page",
    welcomeMessage: "Welcome message!"
  });
});

app.get("/users", (req, res) => {
  findAll()
    .then(users => {
      res.render("users.hbs", {
        pageTitle: "Users Page",
        users
      });
    })
    .catch(error => res.status(400).send(error));
});
