import { person } from "../../../models/person"
import { NextApiRequest, NextApiResponse } from "next";
import { openDB } from "../../openDB";
import { hash } from "bcrypt";

export default async function Signup(req: NextApiRequest, res: NextApiResponse) {
   const db = await openDB();

   if (req.method === "POST") {
      hash(req.body.password, 10, async function (err, hash) {
         // Store hash in your password DB.
         const statement = await db.prepare(`INSERT INTO Person (name,email,password) VALUES (?,?,?)`);
         await statement.run(
            req.body.name,
            req.body.email,
            hash,
         );

         const person = await db.get<person>(
            `SELECT * FROM Person WHERE name =? AND password = ?`, [req.body.name, hash]
         );

         res.status(200).json(person);

         db.close();
      });

   } else {
      res.status(405).json({ message: "POSTメソッドのみ使用できます" });
      db.close();
   }

};