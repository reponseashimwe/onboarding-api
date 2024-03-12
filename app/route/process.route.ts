import express, { NextFunction, Request, Response } from "express";
import validate from "../middleware/validations/validator";
import { ProcessController } from "../controller/process.controller";
import { processSchema } from "../middleware/validations/process.schema";
import CustomError from "../utils/CustomError";
import { FileRequest } from "../type";
import { memoryUpload } from "../utils/MemoryUpload";

const processRouter = express.Router();

processRouter.post(
  "/",
  validate(processSchema),
  memoryUpload.single("pdfFile"),
  async (req: Request, res, next: NextFunction) => {
    try {
      if (!req.file) throw new CustomError("No file uploaded");

      const response = await ProcessController.process(req.file?.buffer, res);
      return res.status(200).json(response);
    } catch (error) {
      return next(error);
    }
  }
);

export default processRouter;
