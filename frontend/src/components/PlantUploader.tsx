import React, { useState } from "react";
import { analyzePlant } from "../api/plantApi";

function PlantUploader() {

  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {

    if (!file) {
      alert("Please select image");
      return;
    }

    try {

      setLoading(true);

      const response = await analyzePlant(file);

      setResult(response);

    } catch (error) {
      console.error(error);
      alert("Error analyzing plant");
    }

    setLoading(false);
  };

  return (
    <div>

      <input type="file" onChange={handleFileChange} />

      <button onClick={handleUpload}>
        Upload Plant Photo
      </button>

      {loading && <p>Analyzing plant...</p>}

      {result && (
        <div>

          <h3>Disease: {result.disease}</h3>

          <p>Confidence: {result.confidence}</p>

          <p>Treatment: {result.treatment}</p>

        </div>
      )}

    </div>
  );
}

export default PlantUploader;