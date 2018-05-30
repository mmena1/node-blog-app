import { Request } from "express";

export default function(req: Request) {
  return {
    user: req.session.user
  };
}
