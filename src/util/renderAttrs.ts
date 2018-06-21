import { Request } from "express";

export default function(req: Request) {
  if (req.session.user) {
    return {
      user: req.session.user.username
    };
  } else {
    return {};
  }
}
