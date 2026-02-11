import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/api/axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

function CreateCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await api.post("/courses/create/", {
        title,
        description,
        requirements,
      });

      navigate(`/course/${res.data.id}`);
    } catch (err: any) {
      // alert("Failed to create course");
      console.log(err.response?.data);
      alert(JSON.stringify(err.response?.data));
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create New Course</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Course title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Textarea
          placeholder="Course description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Textarea
          placeholder="Course requirements"
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
        />

        <Button className="w-full">Create Course</Button>
      </form>
    </div>
  );
}

export default CreateCourse;
