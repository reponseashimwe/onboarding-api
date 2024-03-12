import express from "express";
import authRouter from "./auth.route";
import roleRouter from "./role.route";
import orgnanizationRouter from "./organization.route";
import userRouter from "./user.route";
import processRouter from "./process.route";

const apiRouter = express.Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/roles", roleRouter);
apiRouter.use("/organizations", orgnanizationRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/processResume", processRouter);

export default apiRouter;
