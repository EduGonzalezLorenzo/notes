import React, { useState } from "react";

const baseUrl = "http://localhost:8081";

const uploadFile = async (noteId, file) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await fetch(`${baseUrl}/notes/${noteId}/files`, {
    method: "POST",
    body: formData,
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  });
  return await response.json();
};

export default function FileUploadForm({ noteId }) {
  const [file, setFile] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (file) {
      await uploadFile(noteId, file);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>The note has been created. If you want to add a image to this note upload it from here.</p>
      <label htmlFor="fileInput">File:</label>
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        onChange={(event) => setFile(event.target.files[0])}
      />
      <button type="submit">Upload file</button>
    </form>
  );
}