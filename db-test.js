import sqlite3 from "sqlite3";
import sqlite from "sqlite";

// this is a top-level await
async function Setup() {
  // open the database
  const db = await sqlite.open("./mydb.sqlite");
  await db.migrate({ force: "last" });
}

Setup();
