const sqlite = require("sqlite")
const sqlite3 = require("sqlite3")


async function setUp() {
   const db = await sqlite.open({
      filename: "mydb.sqlite3",
      driver: sqlite3.Database
   });
   await db.migrate({ force: "last" });

   const person = await db.all(`select * from Person`);
   console.log("Person table", JSON.stringify(person, null, 4));

   const vehicle = await db.all(`select * from Vehicle`);
   console.log("Vehicle table", JSON.stringify(vehicle, null, 4));
};

setUp();