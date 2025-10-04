import { useParams } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_BASE + "/api";
console.log(BASE_URL)

//Function to get all reports

export async function getReports() {
  try {
    const res = await fetch(`${BASE_URL}/reports`);
    if (!res.ok) {
      throw new Error("Failed to fetch the reports ");
    }
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//function to submit a report

export async function submitReport(reportData) {
  try {
    const res = await fetch(`${BASE_URL}/reports`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reportData),
    });

    if (!res.ok) {
      throw new Error("Failed to submit report");
    }

    const data = await res.json();
    console.log("Report submitted:", data);
    return data;
  } catch (error) {

    console.log(`Error while Posting reports: ${error}`)
      throw error
  }
}
