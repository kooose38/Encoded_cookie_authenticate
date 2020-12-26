
import { NextApiRequest, NextApiResponse } from "next";
import { openDB } from "../../openDB";

export default async function getPeople(req: NextApiRequest, res: NextApiResponse) {
   const db = await openDB()
   const vehicles = await db.all(`select * from Vehicle`);

   res.json(vehicles);
}