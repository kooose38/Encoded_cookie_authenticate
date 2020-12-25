const sqlite3 = require("sqlite3")
const sqlite = require("sqlite")

async function setUp() {
   const db = await sqlite.open({
      filename: "mydb.sqlite3",
      driver: sqlite3.Database
   });

   await db.migrate({ force: true });

   const person = await db.all(`select * from Person`)
   console.log("ALL TABLE Person", JSON.stringify(person.null, 3));
   const vehicle = await db.all(`select * from Vehicle`)
   console.log("ALL TABLE vehicle", JSON.stringify(vehicle.null, 3));
}

setUp();