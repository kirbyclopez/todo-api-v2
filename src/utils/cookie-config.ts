export interface ICookieConfig {
  httpOnly: boolean;
  secure?: boolean;
  sameSite?: boolean | "strict" | "lax" | "none";
  maxAge?: number;
  path?: string;
}

const cookieConfig: ICookieConfig = {
  httpOnly: true,
  maxAge: 60 * 60 * 24 * 30,
};

export default cookieConfig;
