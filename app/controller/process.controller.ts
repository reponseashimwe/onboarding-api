import { Route, Controller, Post, Tags, Body, Res, Inject } from "tsoa";
import { Response } from "express";

import pdf from "pdf-parse";
import extractPersonInfo from "../utils/OpenAI";

@Tags("Process")
@Route("api/processResume")
export class ProcessController extends Controller {
  @Post()
  public static async process(
    @Body() pdfFile: Buffer,
    @Inject() res: Response
  ): Promise<void> {
    try {
      // Use pdf-parse to extract text from the PDF content
      const pdfData = await pdf(pdfFile);
      const pdfText = pdfData.text;

      const aitext = await extractPersonInfo(pdfText);

      // Your processing logic here with the pdfText

      // Respond with the extracted text
      res.status(200); // Set HTTP status code
      res.json({ success: true, text: pdfText, aitext });
    } catch (error) {
      console.error("Error processing the file:", error);
      res.status(500); // Set HTTP status code
      res.json({ success: false, error: "Error processing the file" });
    }
  }
}
