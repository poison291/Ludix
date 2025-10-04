import { sql } from "../config/db.js";

//Fetching all the Reports
export const getReports = async (req, res) => {
  try {
    const reports = await sql`SELECT * FROM reports ORDER BY created_at DESC`;
    return res.json(reports);
  } catch (error) {
    console.log(`Error Getting user reports List: ${error}`);
    return res
      .status(500)
      .json({ success: false, message: "server error on Getting reports" });
  }
};

export const submitReport = async (req, res) => {
  const { ticket, type, message, url, created_at, status } = req.body;
  try {
    await sql`
        INSERT INTO reports (ticket, type, message, url, status, created_at) 
        VALUES (${ticket}, ${type}, ${message}, ${url},  ${status}, ${created_at})
        `;
    return { success: true };
  } catch (error) {
    console.log(`Error On Submitting report: ${error}`);
    return res
      .status(500)
      .json({ success: false, message: "Failed to Post report" });
  }
};
