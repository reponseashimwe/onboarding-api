import express, { NextFunction, Request, Response } from "express";
import { AuthController } from "../controller/auth.controller";
import validate from "../middleware/validations/validator";
import authorize from "../middleware/authorize.middleware";
import isSuperAdmin from "../middleware/isSuperAdmin.middleware";
import { UserController } from "../controller/user.controller";
import { userSchema } from "../middleware/validations/user.schema";

const userRouter = express.Router();
userRouter.use(authorize);
userRouter.use(isSuperAdmin);

userRouter.post(
  "/",
  validate(userSchema),
  async (req: Request, res, next: NextFunction) => {
    try {
      const response = await AuthController.register(req.body);
      return res.status(200).json(response);
    } catch (error) {
      return next(error);
    }
  }
);

userRouter.get("/", async (req: Request, res, next: NextFunction) => {
  try {
    const response = await UserController.getAll();
    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
});

userRouter.get("/:id", async (req: Request, res, next: NextFunction) => {
  try {
    const response = await UserController.getOne(
      req.params.id as unknown as number
    );
    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
});

userRouter.delete("/:id", async (req: Request, res, next: NextFunction) => {
  try {
    const response = await UserController.delete(
      req.params.id as unknown as number
    );
    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
});

userRouter.put(
  "/:id",
  validate(userSchema),
  async (req: Request, res, next: NextFunction) => {
    try {
      const response = await UserController.update(
        req.params.id as unknown as number,
        req.body
      );
      return res.status(200).json(response);
    } catch (error) {
      return next(error);
    }
  }
);

export default userRouter;
