export interface ICookieConfig {
  httpOnly: boolean;
  secure?: boolean;
  sameSite?: boolean | "strict" | "lax" | "none";
  maxAge?: number;
  path?: string;
  domain?: string;
}

const cookieConfig: ICookieConfig = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "strict" : false,
  maxAge: 60 * 60 * 24 * 30,
  path: "/",
  domain: process.env.NODE_ENV === "production" ? ".klcodes.com" : "localhost",
};

export const delCookieConfig: ICookieConfig = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "strict" : false,
  domain: process.env.NODE_ENV === "production" ? ".klcodes.com" : "localhost",
};

export default cookieConfig;
