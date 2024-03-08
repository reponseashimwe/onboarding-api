import express, { NextFunction, Request, Response } from "express";
import validate from "../middleware/validations/validator";
import authorize from "../middleware/authorize.middleware";
import isSuperAdmin from "../middleware/isSuperAdmin.middleware";
import { OrganizationController } from "../controller/organization.controller";
import { organizationSchema } from "../middleware/validations/organization.schema";

const orgnanizationRouter = express.Router();
orgnanizationRouter.use(authorize);
orgnanizationRouter.use(isSuperAdmin);

orgnanizationRouter.post(
  "/",
  validate(organizationSchema),
  async (req: Request, res, next: NextFunction) => {
    try {
      const response = await OrganizationController.create(req.body);
      return res.status(200).json(response);
    } catch (error) {
      return next(error);
    }
  }
);

orgnanizationRouter.get("/", async (req: Request, res, next: NextFunction) => {
  try {
    const response = await OrganizationController.getAll();
    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
});

orgnanizationRouter.get(
  "/:id",
  async (req: Request, res, next: NextFunction) => {
    try {
      const response = await OrganizationController.getOne(
        req.params.id as unknown as number
      );
      return res.status(200).json(response);
    } catch (error) {
      return next(error);
    }
  }
);

orgnanizationRouter.delete(
  "/:id",
  async (req: Request, res, next: NextFunction) => {
    try {
      const response = await OrganizationController.delete(
        req.params.id as unknown as number
      );
      return res.status(200).json(response);
    } catch (error) {
      return next(error);
    }
  }
);

orgnanizationRouter.put(
  "/:id",
  validate(organizationSchema),
  async (req: Request, res, next: NextFunction) => {
    try {
      const response = await OrganizationController.update(
        req.params.id as unknown as number,
        req.body
      );
      return res.status(200).json(response);
    } catch (error) {
      return next(error);
    }
  }
);

export default orgnanizationRouter;
