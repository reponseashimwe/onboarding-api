import { NextFunction, Request, Response } from "express";
import OrganizationModel from "../database/models/OrganizationModel";

const isHR = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const organization = await OrganizationModel.findByPk(
      req?.user?.organizationId || 0
    );

    if (organization && organization.hrId == req?.user?.id) return next();
    else return res.status(401).json({ error: "You are not HR" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default isHR;
