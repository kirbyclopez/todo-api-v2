"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cookieConfig = {
    httpOnly: true,
    secure: process.env.COOKIE_SECURE === "true",
    sameSite: process.env.NODE_ENV === "production" ? "none" : false,
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
};
exports.default = cookieConfig;
