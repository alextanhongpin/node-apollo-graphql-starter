import jwt from "jsonwebtoken";

class JwtFactory {
  #secret = "";

  constructor(secret) {
    if (!secret) throw new Error("JWT_SECRET is required");
    this.#secret = secret;
  }

  decodeHeader(req) {
    const header = req && req.headers && req.headers.authorization;
    if (!header) return {};
    const token = header.replace(/bearer\s/i, "");
    const decoded = jwt.verify(token, this.#secret);
    return decoded;
  }

  sign(payload) {
    const encoded = jwt.sign(payload, this.#secret);
    return encoded;
  }

  static default() {
    return new JwtFactory(`supersecret`);
  }

  static fromEnv() {
    return new JwtFactory(process.env.JWT_SECRET);
  }
}

export default JwtFactory;
