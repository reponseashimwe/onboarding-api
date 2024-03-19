import express, { NextFunction, Request, Response } from "express";
import validate from "../middleware/validations/validator";
import authorize from "../middleware/authorize.middleware";
import { employeeSchema } from "../middleware/validations/user.schema";
import { EmployeesController } from "../controller/employee.controller";
import isHR from "../middleware/isHr.middleware";
import CloudinaryUpload from "../utils/CloudinaryUpload";
import { upload } from "../utils/Multer";
import { IEmployee, IUser } from "../type";

const employeeRouter = express.Router();
employeeRouter.use(authorize);

employeeRouter.post(
  "/",
  isHR,
  CloudinaryUpload.fields([
    { name: "contract" },
    { name: "salarySlip" },
    { name: "appointmentLLetter" },
    { name: "experienceLetter" },
    { name: "relievingLetter" },
  ]),
  // validate(employeeSchema),

  async (req: Request, res, next: NextFunction) => {
    try {
      const uploadedFiles = req.files; // Access all uploaded files directly
      let documents: Record<string, any> = {};

      // Process uploaded files (optional)
      for (const documentType in uploadedFiles) {
        const uploadedFile = (uploadedFiles as any)[documentType];

        // You can access the path of the uploaded file on Cloudinary:
        documents[documentType] = uploadedFile[0].path;
      }
      let data: Record<string, any> = {};
      for (const key in req.body) {
        console.log(JSON.parse(req.body[key]), typeof req.body[key]);
        data[key] = JSON.parse(req.body[key]);
      }
      data.documents = documents;

      const response = await EmployeesController.create(
        data,
        req.user?.organizationId as number
      );
      return res.status(200).json(response);
    } catch (error) {
      return next(error);
    }
  }
);

employeeRouter.get("/", async (req: Request, res, next: NextFunction) => {
  try {
    const response = await EmployeesController.getAll(req.user as IUser);
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
