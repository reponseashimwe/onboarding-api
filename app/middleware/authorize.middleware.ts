import { NextFunction, Request, Response } from "express";
import UserModel from "../database/models/UserModel";
import { IUser } from "../type";
import { verifyToken } from "../utils/jwt";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

type IJwtPayload = Partial<{ id: string; email: string }>;

const authorize = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization?.split(" ")[1]) {
      return res.status(401).json({ error: "Token not found" });
    }

    const tokenData = (await verifyToken(
      authorization?.split(" ")[1] as string
    )) as IJwtPayload;

    const user = (await UserModel.findOne({
      where: { email: tokenData.email as string },
    })) as unknown as IUser;

    req.user = user;
    return next();
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default authorize;
