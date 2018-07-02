import { Request } from "express";

export default function(req: Request) {
  if (req.session.user) {
    return {
      sessionUser: req.session.user
    };
  } else {
    return {};
  }
}
