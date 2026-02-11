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
  const [thumbnail, setThumbnail] = useState<File | null>(null);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("requirements", requirements);

    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    try {
      await api.post("/courses/create/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Course created successfully");
    } catch (err: any) {
      console.log(err.response?.data);
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

        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
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
