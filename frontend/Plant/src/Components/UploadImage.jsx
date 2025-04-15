import React, { useState } from "react";
import axios from "axios";

const UploadImage = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      alert("Please select an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "http://127.0.0.1:5000/api/predict",
        formData
      );
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Error uploading image or predicting disease");
    }
  };

  return (
    <div className="container_upload">
    
      <img src="/image.jpg" alt="Uploaded preview"></img>
      <input type="file" onChange={handleFileChange} />

      {previewUrl && (
        <div className="container_uploadImage">
          <img src={previewUrl} alt="Uploaded preview" width="300" />
        </div>
      )}

      <div className="container_uploadbutton">
        <button onClick={handleSubmit}>Upload the Image</button>
      </div>

      {result && (
        <div className="result-container">
          <h3>Prediction: {result.prediction}</h3>
          <p>
            <strong>Description:</strong> {result.description}
          </p>
          <p>
            <strong>Remedy:</strong> {result.remedy}
          </p>
          <img
            src={`http://127.0.0.1:5000${result.imageUrl}`}
            alt="Predicted"
            width="300"
          />
        </div>
      )}
    </div>
  );
};

export default UploadImage;
