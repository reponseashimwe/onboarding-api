import OpenAI from "openai";
import VARIABLES from "../config/variables";
import CustomError from "./CustomError";

const openai = new OpenAI({
  apiKey: VARIABLES.AIKEY,
});

const extractPersonInfo = async (pdfText: string) => {
  try {
    const prompt = `
      Extract the following information from the provided text:
      
      1. Personal Details:
         - Full Name
         - Date of Birth
         - Marital Status
         - Gender
         - Carrer Summary
      
      2. Contact Details:
         - Phone Number
         - Email Address
      
      3. Address:
         - Country
         - City
         - Other Address Details
      
      4. Educational Background (all of them):
         - School Name
         - Period (from - to month, year)
         - Details of what was learned
      
      5. Experience (all of them):
         - Institution Name
         - Period (from - to month, year)
         - Job Title
         - Details of job responsibilities and achievements

      6. SocialMedia (if the link is not present, skip the key)
         - Facebook
         - Instagram
         - LinkedIn
         - Github

      7. Languages
      8. Skills
          
      
      Please parse the text and provide the extracted information in the following specified JSON format. Return just an object, with no \`\`\`json formatter at the beginning or marking the end.
          
      {
        "personalDetails": {
          "fullname": "person's full name",
          "dob": "a year in which he was born",
          "gender": "Female or male",
          "maritalStatus": "whether he's single or married"
          "carrerSummary": "summary of his/her carrer summary or bio"
        },
        "contactDetails": {
          "phoneNumber": "his/her phone number",
          "emailAddress": "his email address"
        },
        "address": {
          "country": "His resident country",
          "city": "Residence city",
          "otheraddress": "Remaining Address as a string here"
        },
        "educationalBackground": [
          {
            "schoolName": "name of the school",
            "period": "from to month, year",
            "details": "what he was learning"
          }
        ],
        "experience": [
          {
            "institution": "name of the institution",
            "period": "from to month, year",
            "title": "what title he was operating under",
            "details": "desc of what he did and some achievements"
          }
        ],
        "socialMedia" [{
            "mediaName": "media name such as facebook",
            "url": "social media url here"
        }],
        "languages": [],
        "skills": [],
        "qualifications": [],
      }
          
      Text to be analyzed:\n
      ${pdfText}
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ content: prompt, role: "system" }],
    });
    let parsedJSON = JSON.parse(response.choices[0].message.content as string);

    parsedJSON = notProvidedToNull(parsedJSON);
    return parsedJSON;
  } catch (err) {
    console.error("OpenAI API Error:", err);
    throw new CustomError("Failed in API request", 400);
  }
};

const notProvidedToNull = (parsedJSON: Record<string, any>) => {
  for (const key in parsedJSON) {
    if (typeof parsedJSON[key] === "object") {
      for (const i in parsedJSON[key]) {
        if (
          typeof parsedJSON[key][i] === "string" &&
          parsedJSON[key][i].toLowerCase().endsWith("not provided")
        ) {
          parsedJSON[key][i] = null;
        } else if (typeof parsedJSON[key][i] === "object") {
          for (let j = 0; j < parsedJSON[key][i].length; j++) {
            for (const k in parsedJSON[key][i][j]) {
              if (
                typeof parsedJSON[key][i][j][k] === "string" &&
                parsedJSON[key][i][j][k].toLowerCase().endsWith("not provided")
              )
                parsedJSON[key][i][j][k] = null;
            }
          }
        }
      }
    }
  }

  return parsedJSON;
};

export default extractPersonInfo;
