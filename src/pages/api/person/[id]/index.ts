import { person } from "../../../../../models/person"
import { NextApiRequest, NextApiResponse } from "next";
import { openDB } from "../../../../openDB";
//UPDATE testapi
export default async function getPeople(req: NextApiRequest, res: NextApiResponse) {
   const db = await openDB();

   if (req.method === "PUT") {
      const Oldperson = await db.get(`SELECT * FROM Person WHERE id=?`, [req.query.id]) as person;

      const statement = await db.prepare(`UPDATE Person SET name=?,email=? ,password=? WHERE id=?`);

      await statement.run(
         req.body.name || Oldperson.name,
         req.body.email || Oldperson.email,
         req.body.password || Oldperson.password,
         req.query.id,
      );

      const person = (await db.get(`select * from Person where id =?`, [req.query.id])) as person;

      await res.json(person);
      db.close();
   } else {
      res.status(400).json({ message: "PUTメソッドのみ使用できます" })
   }

};