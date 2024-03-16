import express, { NextFunction, Request, Response } from "express";
import { AuthController } from "../controller/auth.controller";
import validate from "../middleware/validations/validator";
import authorize from "../middleware/authorize.middleware";
import { employeeSchema } from "../middleware/validations/user.schema";
import { EmployeesController } from "../controller/employee.controller";
import isHR from "../middleware/isHr.middleware";

const employeeRouter = express.Router();
employeeRouter.use(authorize);

employeeRouter.post(
  "/",
  isHR,
  validate(employeeSchema),
  async (req: Request, res, next: NextFunction) => {
    try {
      const response = await AuthController.register(req.body);
      return res.status(200).json(response);
    } catch (error) {
      return next(error);
    }
  }
);

employeeRouter.get("/", async (req: Request, res, next: NextFunction) => {
  try {
    const response = await EmployeesController.getAll();
    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
});

employeeRouter.get("/:id", async (req: Request, res, next: NextFunction) => {
  try {
    const response = await EmployeesController.getOne(
      req.params.id as unknown as number
    );
    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
});

employeeRouter.delete("/:id", async (req: Request, res, next: NextFunction) => {
  try {
    const response = await EmployeesController.delete(
      req.params.id as unknown as number
    );
    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
});

employeeRouter.put(
  "/:id",
  validate(employeeSchema),
  async (req: Request, res, next: NextFunction) => {
    try {
      const response = await EmployeesController.update(
        req.params.id as unknown as number,
        req.body
      );
      return res.status(200).json(response);
    } catch (error) {
      return next(error);
    }
  }
);

export default employeeRouter;
