import { vehicle } from "../../../../models/vehicle"
import { NextApiRequest, NextApiResponse } from "next";
import { openDB } from "../../../openDB";

export default async function getPeople(req: NextApiRequest, res: NextApiResponse) {
   const id = req.query.id as string;
   const db = await openDB();
   const vehicles = (await db.get(`select * from Vehicle where id =${id}`)) as vehicle;

   res.json(vehicles);
}