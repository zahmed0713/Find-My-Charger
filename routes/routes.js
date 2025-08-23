import express from "express"
import { sql } from "../Config/db.js";
const router = express.Router();

 router.post("/api/Saved", async (req, res) => {
    try {
        const {address, distance, latitude, longitude, user_id} = req.body;
        if(!user_id|| !address || distance === undefined || latitude === undefined || longitude ===undefined)
        {
            return res.status(400).json({message: "all fields are required"});
        }
    
    const savedItem = await sql `
    INSERT INTO Saved(user_id, address, distance, latitude, longitude)
    VALUES (${user_id}, ${address}, ${distance}, ${latitude}, ${longitude})
    RETURNING *
    `
    res.status(201).json(savedItem[0]);
    console.log(savedItem);
    } catch (error) {
         console.error("GET /api/Saved/:userID error:", error);
    return res.status(500).json({ message: "Internal server error" }); // <-- always respond on error
    }
 })

router.get("/api/Saved/:userID", async (req, res) => {
  try {
    const { userID } = req.params;

    
    const rows = await sql`
      SELECT *
      FROM saved
      WHERE user_id = ${userID}
      ORDER BY id DESC
    `; 

    return res.status(200).json(rows); 
  } catch (error) {
    console.error("GET /api/Saved/:userID error:", error);
    return res.status(500).json({ message: "Internal server error" }); // <-- always respond on error
  }
});

router.delete("/api/Saved/:id", async (req, res)=> {
    try {
    const {id} = req.params;
    if(isNaN(parseInt(id)))
    {
        return res.status(400).json({message: "Invalid ID"});
    }
   const result= await sql `
    DELETE FROM Saved WHERE id = ${id} RETURNING *
    `
    if(result.length === 0)
    {
        return res.status(404).json({message: "Transaction not found"});
    }
    return res.status(200).json({message: "Transaction Deleted Successfullt"});
    } catch (error) {
  console.error("GET /api/Saved/:userID error:", error);
    return res.status(500).json({ message: "Internal server error" }); // <-- always respond on error       
    }
})

export default router
