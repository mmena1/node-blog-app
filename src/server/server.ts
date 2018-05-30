import * as express from "express";
import * as bodyParser from "body-parser";
import { createUser } from "./../user/endpoints/create";
import { deleteUser } from "./../user/endpoints/delete";
import { updateUser } from "./../user/endpoints/update";
import { allUsers } from "./../user/endpoints/findAll";
import { home } from "./endpoints/home";
import * as exphbs from "express-handlebars";
import * as hbs from "hbs";
import { signup } from "./endpoints/signup";
import { tokenGuard } from "./middleware/tokenGuard";

export const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

const routeToPartials = "views/partials";
hbs.registerPartials(routeToPartials);
app.engine("handlebars", exphbs({ extname: ".hbs" }));

hbs.registerHelper("getCurrentYear", () => new Date().getFullYear());
app.use("/", signup);
app.use(tokenGuard());
app.use("/", home);
app.use("/api/users", createUser);
app.use("/api/users", deleteUser);
app.use("/api/users", updateUser);
app.use("/", allUsers);
