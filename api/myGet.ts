import { NextPageContext } from "next";

export const myGet = async (url: string, ctx: NextPageContext) => {
   const cookie = ctx.req?.headers.cookie;
   const res = await fetch(url, {
      headers: {
         cookie: cookie!
      }
   });
   const people = await res.json()
   return people;
};
