import { RequestHandler } from "express";
import { IncomingHttpHeaders } from "http";
import verifyToken from "../../user/operations/verifyToken";

function getTokenFromHeaders(headers: IncomingHttpHeaders) {
  const header = headers.authorization as string;

  return header;

  //   return header.split(" ")[1];
}

export const tokenGuard: (() => RequestHandler) = () => (req, res, next) => {
  const token =
    getTokenFromHeaders(req.headers) ||
    req.query.token ||
    req.body.token ||
    "11";
  const hasAccess = verifyToken(token, "0.rfyj3n9nzh");

  hasAccess.then(a => {
    if (!a) return res.status(403).send({ message: "No access" });
    next();
  });
};
