const fs = require('fs');
const db = require('../db/connection'); // Import the db module from the db folder



// Function to read and execute schema files
const runSchemaFiles = async () => {
  console.log("Loading Schema Files ");

  try {
    const schemaDir = './db/schema';
    const schemaFilenames = fs.readdirSync(schemaDir);

    console.log("Found files:", schemaFilenames);

  for (const fn of schemaFilenames) {
    const filePath = `${schemaDir}/${fn}`;
    const sql = fs.readFileSync(filePath, 'utf8');
    await db.query(sql);
  }
}
catch (err) {
  console.error("Failed due to error:", err);
  process.exit();
}
};

// Function to read and execute seed files
const runSeedFiles = async () => {
  console.log("Loading Seeds ...");
  const schemaFilenames = fs.readdirSync('./db/seeds');

  for (const fn of schemaFilenames) {
    const sql = fs.readFileSync(`./db/seeds/${fn}`, 'utf8');
    await db.query(sql);
  }
};

const runResetDB = async () => {
  try {
    process.env.DB_HOST &&
      console.log(`-> Connecting to PG on ${process.env.DB_HOST} as ${process.env.DB_USER}...`);

    await runSchemaFiles();
    await runSeedFiles();

    process.exit();
  } catch (err) {
    console.error("Failed due to error:",err);
    process.exit();
  }
};

runResetDB();