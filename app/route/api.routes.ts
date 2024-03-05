import express from "express";
import publicRouter from "./public.route";
import authRouter from "./auth.route";

const apiRouter = express.Router();

apiRouter.use("/", publicRouter);
apiRouter.use("/auth", authRouter);

export default apiRouter;
