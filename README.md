**nextjs practice**

*sqlite3/typescript/nextjs/api-server*

--認証機能の実装--
--パスワードのハッシュ化,cookieの使用--

*サインアップ*
→passwordをハッシュ化
*サインイン*
→name.email.有効時間をjwtエンコード/jwtをheraderにセットしてresを返す(cookie)
*認証ページ*
→cookieの履歴から判別

**NextjsでのSELECT文**
if(req.meyhods === "GET"){
   const person = await db.get(`SELECT * FROM Person WHERE id=?`,[req.query.id]);

   res.json(person);
}

**NextjsでのINSERT文**
if(req.meyhods === "POST"){
   const statement = await db.prepare(`INSERT INTO Person (name,email) VALUES (?,?)`);
   const result = await statement.run(
      req.body.name,
      req.body.email,
   );
}

**NextjsでのUPDATE文**
if(req.meyhods === "PUT"){
   const statement = await db.prepare(`UPDATE Person set name=? ,email=? WHERE id=?`);
   const result = await statement.run(
      req.body.name,
      req.body.email,
      req.query.id,
   );
}