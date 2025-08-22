import express from "express"
import dotenv from "dotenv"
import {sql} from "./Config/db.js";
const app = express();

app.use(express.json());
dotenv.config();
const PORT = process.env.PORT

export async function DBinit() {
  try {
    await sql`CREATE TABLE IF NOT EXISTS SavedItems(
      id SERIAL PRIMARY KEY,
      user_id VARCHAR(255) NOT NULL,
      address  VARCHAR(255) NOT NULL,
      name  VARCHAR(255) NOT NULL,
      latitude DECIMAL(10,7) NOT NULL,
      longitude DECIMAL(10,7) NOT NULL,
      created_at DATE NOT NULL DEFAULT CURRENT_DATE
    )`;

    console.log("Database initialized successfully");
  } catch (error) {
    console.log("Error initializing DB", error);
    process.exit(1); 
  }
}
// app.get("/", (req, res) => {res.send("It's working");})
 app.post("/api/SavedItems", async (req, res) => {
    try {
        const {address, name, latitude, longitude, user_id} = req.body;
        if(!user_id|| !address || !name || latitude === undefined || longitude ===undefined)
        {
            return res.status(400).json({message: "all fields are required"});
        }
     const existing = await sql`
      SELECT * FROM SavedItems WHERE user_id = ${user_id} AND address = ${address}
    `;

    if (existing.length > 0) {
      return res.status(400).json({ message: "Destination already saved" });
    }
    const savedItem = await sql `
    INSERT INTO SavedItems(user_id, address, name, latitude, longitude)
    VALUES (${user_id}, ${address}, ${name}, ${latitude}, ${longitude})
    RETURNING *
    `
    res.status(201).json(savedItem[0]);
    console.log(savedItem);
    } catch (error) {
         console.error("GET /api/SavedItems/:userID error:", error);
    return res.status(500).json({ message: "Internal server error" }); // <-- always respond on error
    }
 })

app.get("/api/SavedItems/:userID", async (req, res) => {
  try {
    const { userID } = req.params;

    
    const rows = await sql`
      SELECT *
      FROM SavedItems
      WHERE user_id = ${userID}
      ORDER BY id DESC
    `; 

    return res.status(200).json(rows); 
  } catch (error) {
    console.error("GET /api/SavedItems/:userID error:", error);
    return res.status(500).json({ message: "Internal server error" }); // <-- always respond on error
  }
});

app.delete("/api/SavedItems/:id", async (req, res)=> {
    try {
    const {id} = req.params;
    if(isNaN(parseInt(id)))
    {
        return res.status(400).json({message: "Invalid ID"});
    }
   const result= await sql `
    DELETE FROM SavedItems WHERE id = ${id} RETURNING *
    `
    if(result.length === 0)
    {
        return res.status(404).json({message: "Transaction not found"});
    }
    return res.status(200).json({message: "Transaction Deleted Successfullt"});
    } catch (error) {
  console.error("GET /api/SavedItems/:userID error:", error);
    return res.status(500).json({ message: "Internal server error" }); // <-- always respond on error       
    }
})

DBinit().then(()=>{app.listen(PORT, () => {console.log("server is running on port 5001")});
});