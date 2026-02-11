import { useState } from "react";
import api from "@/api/axios";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

function InstructorRequest() {
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      await api.post("/accounts/instructor-request/", {
        message,
      });

      alert("Request submitted successfully.");
      setMessage("");
    } catch (err: any) {
      alert(err.response?.data?.detail || "Failed to submit request");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-16 space-y-6">
      <h1 className="text-2xl font-bold">Become an Instructor</h1>

      <p className="text-gray-600">
        Tell us why you want to become an instructor.
      </p>

      <Textarea
        placeholder="Write your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <Button onClick={handleSubmit}>Submit Request</Button>
    </div>
  );
}

export default InstructorRequest;
