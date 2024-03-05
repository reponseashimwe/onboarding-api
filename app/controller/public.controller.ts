import {
  Route,
  Controller,
  Post,
  Tags,
  Response,
  Body,
  Put,
  Security,
  Inject,
  Get,
} from "tsoa";
import { IUser, globalType } from "../type";

@Tags("Public")
@Route("api")
export class PublicController extends Controller {
  @Response(200)
  @Get()
  public static publicPage(): globalType {
    return { app: "Uruti Pharmacy", value: "Welcome here" };
  }
}
