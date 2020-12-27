
import { NextApiRequest, NextApiResponse } from "next";
import { openDB } from "../../openDB";
import { authenticated } from "./people";

export default authenticated(async function getPeople(req: NextApiRequest, res: NextApiResponse) {
   const db = await openDB()
   const vehicles = await db.all(`select * from Vehicle`);

   res.json(vehicles);
});