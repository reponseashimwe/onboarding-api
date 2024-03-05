import express, { NextFunction, Request, Response } from "express";
import { PublicController } from "../controller/public.controller";

const publicRouter = express.Router();

publicRouter.get("/", async (req: Request, res, next: NextFunction) => {
  try {
    const response = await PublicController.publicPage();
    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
});

export default publicRouter;
