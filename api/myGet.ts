import { person } from "../models/person";
import { NextPageContext } from "next";

interface ErrorProps {
   message: string,
};

interface myGetProps {
   people: person[] | ErrorProps,
};
//cookieの判定
export async function myGet(url: string, ctx: NextPageContext) {
   const cookie = ctx.req?.headers.cookie;
   const res = await fetch(url, {
      headers: {
         cookie: cookie!
      }
   });
   const people = await res.json() as myGetProps;

   if (res.status === 401) {
      return null
   }
   return people;
};
