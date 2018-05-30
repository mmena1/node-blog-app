import { RequestHandler } from "express";
import { IncomingHttpHeaders } from "http";
import verifyToken from "../../user/operations/verifyToken";

function getTokenFromHeaders(headers: IncomingHttpHeaders) {
  const header = headers.authorization as string;

  return header;

  //   return header.split(" ")[1];
}

export const tokenGuard: (() => RequestHandler) = () => (req, res, next) => {
  const token = getTokenFromHeaders(req.headers) || req.session.token || "";
  const hasAccess = verifyToken(token, "0.rfyj3n9nzh");

  hasAccess.then(a => {
    if (!a)
      return (
        res
          .status(403)
          // .send({
          //   message: "You have no access permissions to view this resource"
          // })
          .redirect("/login?source=" + req.path)
        // .render("login.hbs", {
        //   pageTitle: "Login Page",
        //   message: "You have no access permissions to view this resource"
        // })
      );
    next();
  });
};
