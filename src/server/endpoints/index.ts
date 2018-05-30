import { Router } from "express";
import renderAttrs from "../../util/renderAttrs";

export const index = Router();

index.get("/index", (req, res) => {
  res.render("index.hbs", {
    ...renderAttrs(req),
    pageTitle: "Index"
  });
});
