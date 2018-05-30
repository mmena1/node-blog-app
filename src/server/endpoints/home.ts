import { Router } from "express";
import renderAttrs from "../../util/renderAttrs";

export const home = Router();
home.get("/api", (req, res) => {
  // console.log(req.headers);
  res.status(200).send({
    message: "Welcome to the Blog App!"
  });
});

home.get("/", (req, res) => {
  res.render("home.hbs", {
    ...renderAttrs(req),
    pageTitle: "Welcome Page",
    welcomeMessage: "Welcome message!"
  });
});
