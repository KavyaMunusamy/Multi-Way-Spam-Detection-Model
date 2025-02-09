import axios from "axios";
import { useState } from "react";

export default function ImageAnalyzer() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post("http://localhost:5000/analyze", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(response.data);
      setError(null);
    } catch (err) {
      setError("Error analyzing image.");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto border rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Image Spam Analyzer</h2>
      <input type="file" onChange={handleFileChange} className="mb-2" />
      <button onClick={handleUpload} className="px-4 py-2 bg-blue-500 text-white rounded">
        Analyze Image
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {result && (
        <div className="mt-4 p-2 border rounded">
          <h3 className="font-bold">Results:</h3>
          <p><strong>Extracted Text:</strong> {result.extracted_text}</p>
          <p><strong>Detected URLs:</strong> {result.urls.length > 0 ? result.urls.join(", ") : "None"}</p>
          <p><strong>Spam Detected:</strong> {result.is_spam ? "Yes" : "No"}</p>
        </div>
      )}
    </div>
  );
}