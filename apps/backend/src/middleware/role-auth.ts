import type { Request, Response, NextFunction } from 'express';
import type { IUser } from '../interfaces/user';

const authorizeRole = (requiredRole: string) => (req: Request & IUser, res: Response, next: NextFunction) => {
	const userRole = req.role;

	if (userRole === requiredRole) {
		next();
	} else {
		res.status(403).json({ message: 'Forbidden access' });
	}
};

export default authorizeRole;
