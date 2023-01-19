export interface ICookieConfig {
  httpOnly: boolean;
  secure?: boolean;
  sameSite?: boolean | "strict" | "lax" | "none";
  maxAge?: number;
  path?: string;
}

const cookieConfig: ICookieConfig = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : false,
  maxAge: 60 * 60 * 24 * 30,
  path: "/",
};

export default cookieConfig;
