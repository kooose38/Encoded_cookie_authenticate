import { person } from "../../../../../models/person"
import { NextApiRequest, NextApiResponse } from "next";
import { openDB } from "../../../../openDB";


export default async function getPeople(req: NextApiRequest, res: NextApiResponse) {
   const id = req.query.id as string;
   const db = await openDB();

   if (req.method === "PUT") {

      const statement = await db.prepare(`UPDATE Person SET name=?,email=? ,password=? where id=?`);

      await statement.run(
         req.body.name || "",
         req.body.email || "",
         req.body.password || "",
         req.query.id,
      );

   }
   const person = (await db.get(`select * from Person where id =${id}`)) as person | undefined;

   res.json(person);
   db.close();

};