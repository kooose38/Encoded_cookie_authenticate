import { person } from "../../../models/person"
import { NextApiRequest, NextApiResponse } from "next";
import { openDB } from "../../openDB";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { secret } from "../../../api/secret";
import cookie from "cookie";


export default async function Singin(req: NextApiRequest, res: NextApiResponse) {
   const db = await openDB();
   await db.get<person>(`SELECT * FROM Person WHERE email =?`, [req.body.email]).then((person) => {

      if (req.method === "POST") {
         compare(req.body.password, person?.password, async function (err, result) {
            // compare hash.password === req.body.password ? result === true:false
            if (!err && result) {
               const person = await db.get<person>(`SELECT * FROM Person WHERE email =?`, [req.body.email])
               //要素をトークン化
               const claims = { sub: person?.id, mePerconEmail: person?.email }
               const jwt = sign(claims, secret, { expiresIn: '1h' });
               //header.cookie にデータをセット
               res.setHeader("Set-Cookie", cookie.serialize(`auth`, jwt, {
                  httpOnly: true,
                  secure: process.env.NODE_ENV !== "development",
                  sameSite: "strict",
                  maxAge: 3600,
                  path: "/"
               }))

               res.status(200).json({ message: "Welcom my app " })
            } else {
               res.status(400).json({ message: "パスワードが一致しません" })
            }
            db.close();
         });
      } else {
         res.status(405).json({ message: "POSTメソッドのみ使用できます" });
         db.close();
      }
   }).catch((err) => {
      res.status(400).json({ message: err.message });
      db.close();
   })

};