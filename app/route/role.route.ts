import express, { NextFunction, Request, Response } from "express";
import { AuthController } from "../controller/auth.controller";
import validate from "../middleware/validations/validator";
import {} from "../middleware/validations/auth.schema";
import authorize from "../middleware/authorize.middleware";
import isSuperAdmin from "../middleware/isSuperAdmin.middleware";
import { organizationSchema } from "../middleware/validations/organization.schema";
import isHR from "../middleware/isHr.middleware";
import { RoleController } from "../controller/roles.controller";
import { roleSchema } from "../middleware/validations/role.schema";

const roleRouter = express.Router();
roleRouter.use(authorize);
roleRouter.use(isHR);

roleRouter.post(
  "/",
  validate(organizationSchema),
  async (req: Request, res, next: NextFunction) => {
    try {
      const response = await RoleController.create(req.body);
      return res.status(200).json(response);
    } catch (error) {
      return next(error);
    }
  }
);

roleRouter.get("/", async (req: Request, res, next: NextFunction) => {
  try {
    const response = await RoleController.getAll();
    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
});

roleRouter.get("/:id", async (req: Request, res, next: NextFunction) => {
  try {
    const response = await RoleController.getOne(
      req.params.id as unknown as number
    );
    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
});

roleRouter.delete("/:id", async (req: Request, res, next: NextFunction) => {
  try {
    const response = await RoleController.delete(
      req.params.id as unknown as number
    );
    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
});

roleRouter.put(
  "/:id",
  validate(roleSchema),
  async (req: Request, res, next: NextFunction) => {
    try {
      const response = await RoleController.update(
        req.params.id as unknown as number,
        req.body
      );
      return res.status(200).json(response);
    } catch (error) {
      return next(error);
    }
  }
);

export default roleRouter;
