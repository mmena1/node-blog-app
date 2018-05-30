import { Router } from "express";

export const home = Router();
home.get("/api", (req, res) => {
  // console.log(req.headers);
  res.status(200).send({
    message: "Welcome to the Blog App!"
  });
});

home.get("/", (req, res) => {
  res.render("home.hbs", {
    pageTitle: "Welcome Page",
    welcomeMessage: "Welcome message!"
  });
});
