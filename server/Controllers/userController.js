import { sql } from "../config/db.js";

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
      res.status(500).json({success: false, message: "Internal server Error"})
  }
};


//Posting a User
export const AddUser = async(req, res) => {
  const {name, email, password} = req.body;
  if(!name || !email || !password){
    // console.log(`All fields required`)
   return res.status(400).json({success:false, message: "All fields required"})
  }

  try {
    const newUser = await sql`
    INSERT INTO users (name, email, password)
    VALUES (${name}, ${email}, ${password})
    RETURNING *
    `
    console.log(`New User Added: ${newUser}`);
    res.status(200).json({success: true, data: newUser[0]})
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