import { sql } from "../config/db.js";
import bycrypt from "bcrypt"
import { createSession } from "../lib/SessionId.js";

// Get 1 USER 
export const getUser = async(req, res) => {
  const {id} = req.params;
  try {
  const [user] = await sql`
  SELECT * FROM users WHERE id=${id}
  `;
   if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({success: true, data: user})
  } catch (error) {
    console.log(`Error While getting userData ${error}`)
     return res.status(500).json({success: false, message: "Internal server Error"})
  }
};


//Posting a User
export const AddUser = async(req, res) => {
  const {name, email, password} = req.body;
  if(!name || !email || !password){
    console.log(`All fields required`)
   return res.status(400).json({success:false, message: "All fields required"})
  }
  if(name.length < 3){
    console.log(`Name must be Greater Than 3`)
   return res.status(400).json({success: false, field: "name", message: "Name Too Short"})
  }

  const existing = await sql`SELECT * FROM users WHERE email=${email}`
  if(existing.length > 0){
     return res.status(409).json({ success: false, field: "email", message: "User already exists" });
  }

if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  return res.status(400).json({
    success: false,
    field: "email",
    message: "Invalid email address"
  });
}

  if (!password || password.length < 6) {
  return res.status(400).json({
    success: false,
    field: "password",
    message: "Password must be at least 6 characters"
  });
}

  const hashedpswd = await bycrypt.hash(password, 10)

  try {
    const [newUser] = await sql`
    INSERT INTO users (name, email, password)
    VALUES (${name}, ${email}, ${hashedpswd})
    RETURNING *
    `

    const token = createSession(newUser.id)
    console.log(`New User Added: ${newUser}`);
    console.log(`Token ${token}`)

    res.cookie("sessionId", token, { sameSite: "strict" })

    res.status(200).json({success: true, data: newUser})
  } catch (error) {
    console.log(`Error while adding user ${error}`)
    res.status(500).json({success: false, message: "Internal server error! while posting game"})
  }
}

//Getting all userList 
export const getUsers = async (req, res) => {
  try {
    const users =  await sql`
    SELECT * FROM users
   ORDER BY created_at DESC
    `
    console.log(`Users: ${users}`)
    res.status(200).json({success: true, data: users})
  } catch (error) {
    console.log(`Error while Getting all user Data ${error}`)
  res.status(500).json({success: false, message: "Internal server error!"})  
}
}