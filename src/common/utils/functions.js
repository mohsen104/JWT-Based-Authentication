import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';
configDotenv();

const jwtSecretKey = process.env.JWT_SECRET_KEY;

export const loginMethod = (username) => {
    const regexMobile = new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/);
    const regexEmail = new RegExp(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/);

    if (regexMobile.test(username)) return "otp";

    if (regexEmail.test(username)) return "password";

    return "nothing";
}

export const generateCodeOtp = () => {
    return crypto.randomInt(10000, 99999);
}

export const responseFormatter = ({ status, message = null, data = null }) => {
    let res = { status };
    if (message) res.message = message;
    if (data) res.data = data;
    return res;
}

export const accessTokenGenerator = (user, req) => {
    const payload = {
        iss: 'myapp',
        sub: user._id,
        aud: 'myusers',
        iat: Math.floor(Date.now() / 1000),
        phone: user.phone,
        clientIP: req.ip,
        userAgent: req.headers['user-agent'],
        ver: "1.0",
        jti: crypto.randomUUID(),
    }
    const token = jwt.sign(payload, jwtSecretKey, {
        expiresIn: "1h",
        algorithm: "HS256",
    });
    return token;
}

export const refreshTokenGenerator = (user) => {
    const payload = {
        iss: 'myapp',
        sub: user._id,
        aud: 'myusers',
        iat: Math.floor(Date.now() / 1000),
        jti: crypto.randomUUID(),
    }
    const token = jwt.sign(payload, jwtSecretKey, {
        expiresIn: "1w",
        algorithm: "HS256"
    });
    return token;
}

export const verifyToken = (token) => {
    const decode = jwt.verify(token, jwtSecretKey, {
        algorithms: "HS256"
    });
    return decode;
}