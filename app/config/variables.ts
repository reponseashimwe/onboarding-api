import dotenv from "dotenv";

dotenv.config();

const VARIABLES = {
  PORT: process.env.PORT || 3000,
  DBHOST: process.env.DBHOST,
  DBUSER: process.env.DBUSER || "root",
  DBPASS: process.env.DBPASS || "",
  DBNAME: process.env.DBNAME || "posts",
  JWT_TOKEN: process.env.JWT_TOKEN || "posts",
  EXPIRE:
    Number(process.env.EXPIRE as unknown as string) * 60 * 60 ||
    (3600 as number),
  AIKEY: process.env.AIKEY || "",
};

export default VARIABLES;
