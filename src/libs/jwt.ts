import jwt from 'jsonwebtoken';

interface TokenObject {
  recordId: string;
  email: string;
}

export const encrypt = (obj: TokenObject): string => (
  jwt.sign(obj, process.env.JWT_SECRET, { expiresIn: 94608000 })
);

export const decrypt = (token: string): TokenObject => (
  jwt.verify(token, process.env.JWT_SECRET) as TokenObject
);

export const authorize = (value: string): TokenObject => {
  if (!value) {
    throw new Error('Invalid Token');
  }
  const token = value.split('Bearer ')[1];
  return decrypt(token);
};
