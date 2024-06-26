import crypto from "node:crypto";

export const encrypt = (text: string, password: string) => {
  const key = crypto.createHash("sha256").update(password).digest();
  const cipher = crypto.createCipheriv("aes-256-ctr", key, Buffer.alloc(16, 0));
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return encrypted.toString("hex");
};

export const decrypt = (encryptedHex: string, password: string) => {
  const key = crypto.createHash("sha256").update(password).digest();
  const decipher = crypto.createDecipheriv(
    "aes-256-ctr",
    key,
    Buffer.alloc(16, 0)
  );
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encryptedHex, "hex")),
    decipher.final(),
  ]);
  return decrypted.toString();
};
