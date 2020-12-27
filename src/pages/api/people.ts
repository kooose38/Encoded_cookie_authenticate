import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import { openDB } from "../../openDB";
import { verify } from "jsonwebtoken";
import { secret } from "../../../api/secret";

//cookieより判別
export const authenticated = (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
   verify(req.cookies.auth!, secret, async function (err, decoded) {

      if (!err && decoded) {
         return await fn(req, res);
      }

      res.status(401).json({ message: "認証されていません。" })
   });
};


export default authenticated(async function getPeople(req, res) {
   const db = await openDB();
   const people = await db.all(`SELECT id,email,name FROM Person`);

   res.json(people);
});