// src/pages/AdminProductForm.jsx
import React, { useState } from "react";
import axios from "axios";

export default function AdminProductForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]); // File objects
  const [loading, setLoading] = useState(false);

  const handleFiles = (e) => {
    setImages(Array.from(e.target.files)); // multiple files -> array
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price) {
      alert("Please add name and price");
      return;
    }

    try {
      setLoading(true);

      // 1) Upload files to backend (which will send them to Cloudinary)
      const formData = new FormData();
      images.forEach((file) => formData.append("images", file));

      const uploadRes = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/upload`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      // expected: { urls: [ "https://res.cloudinary.com/..." , ... ] }
      const urls = uploadRes.data.urls || uploadRes.data;

      // 2) Create product in DB using those urls
      const productPayload = {
        name,
        price: Number(price),
        description,
        images: urls,
      };

      const productRes = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/products`,
        productPayload
      );

      alert("Product created!");
      // reset
      setName("");
      setPrice("");
      setDescription("");
      setImages([]);
    } catch (err) {
      console.error("Upload/create error:", err);
      alert("Something went wrong. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>New Product (Admin)</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label> Name </label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label> Price </label>
          <input value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div>
          <label> Description </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label> Images (choose multiple) </label>
          <input type="file" multiple accept="image/*" onChange={handleFiles} />
          <div>
            {images.length > 0 && (
              <div style={{ marginTop: 8 }}>
                <strong>Files to upload:</strong>
                <ul>
                  {images.map((f, i) => (
                    <li key={i}>{f.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Create Product"}
        </button>
      </form>
    </div>
  );
}
