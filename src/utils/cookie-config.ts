export interface ICookieConfig {
  httpOnly: boolean;
  secure?: boolean;
  sameSite?: boolean | "strict" | "lax" | "none";
  maxAge?: number;
  path?: string;
}

const cookieConfig: ICookieConfig = {
  httpOnly: true,
  secure: process.env.COOKIE_SECURE === "true",
  sameSite: "none",
  maxAge: 60 * 60 * 24 * 30,
  path: "/",
};

export default cookieConfig;
