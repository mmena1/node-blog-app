import * as express from "express";
import * as bodyParser from "body-parser";
import { createUser } from "./../user/endpoints/create";
import { allUsers } from "./../user/endpoints/findAll";
import { home } from "./endpoints/home";

export const app = express();
app.use(bodyParser.json());

app.use("/", home);

app.use("/users", createUser);

app.use("/users", allUsers);
