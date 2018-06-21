import * as express from "express";
import * as bodyParser from "body-parser";
import { createUser } from "./../user/endpoints/create";
import { deleteUser } from "./../user/endpoints/delete";
import { updateUser } from "./../user/endpoints/update";
import { allUsers } from "./../user/endpoints/findAll";
import { login } from "./endpoints/login";
import { home } from "./endpoints/home";
import * as exphbs from "express-handlebars";
import * as hbs from "hbs";
import { signup } from "./endpoints/signup";
import { tokenGuard } from "./middleware/tokenGuard";
import * as session from "express-session";
import { index } from "./endpoints/index";
import config from "../util/index";
import { createPost } from "../post/endpoints/create";
import { updatePost } from "../post/endpoints/update";

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
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: config.session_secret,
    cookie: { maxAge: 600000 /* 10 minutes in milliseconds */ }
  })
);
hbs.registerHelper("getCurrentYear", () => new Date().getFullYear());
app.use("/", signup);
app.use("/", login);
app.use("/", index);
app.use(tokenGuard());
app.use("/", home);
app.use("/", createPost);
app.use("/", updatePost);
app.use("/api/users", createUser);
app.use("/api/users", deleteUser);
app.use("/api/users", updateUser);
app.use("/", allUsers);
app.get("/logout", (req, res) => {
  req.session.destroy(err => {
    res.redirect("/index");
  });
});
