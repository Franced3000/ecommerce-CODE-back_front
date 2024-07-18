import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const JWT_SECRET = process.env.SECRET_KEY as string;
export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Autorizzazione mancante' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token non presente' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.body.user = decoded; 
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token non valido' });
  }
};

export const authenticateAdmin = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Autorizzazione mancante' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token non presente' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.body.user = decoded;
    if(req.body.user.role !== 'admin') {
      return res.status(403).json({message: 'Autorizzazione non sufficiente'})
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token non valido' });
  }
};
