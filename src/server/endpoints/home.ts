import { Router } from "express";

export const home = Router();
home.get("/", (req, res) =>
  res.status(200).send({
    message: "Welcome to the Blog App!"
  })
);
