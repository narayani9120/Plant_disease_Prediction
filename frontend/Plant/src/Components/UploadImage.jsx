import React from "react";

const UploadImage = () => {
  return (
    <div>
      <div className="container_uploadImage">
        <img src="/image.jpg"alt="Uploaded preview"></img>
      </div>
      <div className="container_uploadbutton">
        <button>Upload the Image</button>
      </div>
    </div>
  );
};

export default UploadImage;
