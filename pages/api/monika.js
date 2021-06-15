import path from "path";
import fs from "fs";
import auth from "express-basic-auth";
import initMiddleware from "../../utils/init-middleware";

const user = process.env.ADMIN_USERNAME;
const password = process.env.ADMIN_PASSWORD;
const basicAuth = auth({
  users: { [user]: password },
  challenge: true,
});

const authMiddleware = initMiddleware(basicAuth);

const handler = async (req, res) => {
  if (user && password) {
    await authMiddleware(req, res);
  }

  const filePath = path.join(process.cwd(), "./files/monika.json");
  const content = fs.readFileSync(filePath);

  res.setHeader("content-disposition", "attachment; filename=monika.json");
  res.send(content);
};

export default handler;
