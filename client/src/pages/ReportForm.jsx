import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Filter } from "bad-words";
import ShortUniqueId from "short-uuid";
import { submitReport } from "../Api/Reports";

const ReportForm = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  let reportType = params.get("type");

  const [message, setmessage] = useState("");
  const [url, seturl] = useState("");
  const [status, setstatus] = useState("idle");

  const allowedType = ["bug", "feedback"];
  const filter = new Filter();

  if (!allowedType.includes(reportType)) {
    reportType = "feedback";
  }

  const handleChange = (e) => {
    let input = e.target.value;
    input = filter.clean(input);
    setmessage(input);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanMessage = filter.clean(message);
    const translator = ShortUniqueId();
    const ticket = translator.new();

    const reportData = {
      ticket,
      type: reportType,
      message: cleanMessage,
      url,
      status: "submitted",
      created_at: new Date().toISOString(),
    };

    console.log(reportData);

    try {
      await submitReport(reportData);
      setstatus("submitted");
    } catch (error) {
      setstatus("error");
    }
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-4 capitalize">
            {reportType} report
          </h2>
          <label className="block mb-2 font-semibold">Message*</label>
          <textarea
            value={message}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
            rows={5}
            placeholder="Describe Your feedback or bug..."
            required
          />

          <label className="block mb-2 font-semibold">
            Page Url (optional)
          </label>
          <textarea
            value={url}
            onChange={(e) => seturl(e.target.value)}
            className="w-full p-2 border rounded mb-4"
            placeholder="https://www.example.com/page"
          />
          <button
            type="submit"
            className="mt-4 w-full bg-purple-600 text-white p-2 rounded cursor-pointer hover:bg-purple-700"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default ReportForm;
