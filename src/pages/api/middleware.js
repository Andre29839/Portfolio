import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

export default function middleware(req, res, next) {
  let headers = {
    "accept-language": req.headers["accept-language"] || "en;q=0.5",
  };
  let languages = new Negotiator({ headers }).languages();
  let locales = ["en", "ua"];
  let defaultLocale = "en";

  req.locale = match(languages, locales, defaultLocale);

  next();
}
