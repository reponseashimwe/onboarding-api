import { NextFunction, Request, Response } from "express";
import OrganizationModel from "../database/models/OrganizationModel";

const isSuperAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.user?.isSuperAdmin) return next();
    else return res.status(401).json({ error: "You are not Super Admin" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default isSuperAdmin;
