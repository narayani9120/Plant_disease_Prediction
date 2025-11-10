import React, { useState } from "react";
import axios from "axios";

const UploadImage = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("plant"); // Default value is "plant"

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };
  const handleTypeChange = (e) => {
    setType(e.target.value);
  };
  const handleSubmit = async () => {
    if (!file) {
      alert("Please select an image first!");
      return;
    }
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    // Determine the API URL based on the selected type
    let apiUrl = "";
    if (type === "plant") {
      apiUrl = "http://localhost:5000/api/plant-predict";  
    } else if (type === "fruit") {
      apiUrl = "http://localhost:5000/api/fruit-predict"; 
    }

    try {
      const res = await axios.post(apiUrl, formData);
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Error uploading image or predicting disease");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-green-900">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900 to-green-700 opacity-90"></div>
      
      {/* Decorative circles */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-green-500 rounded-full opacity-20"></div>
      <div className="absolute bottom-40 left-20 w-48 h-48 bg-green-600 rounded-full opacity-10"></div>
      <div className="absolute top-1/4 left-1/3 w-24 h-24 bg-green-400 rounded-full opacity-10"></div>
      
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative">
        {/* Main content cards */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-8">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center justify-between mb-6">
              <div className="md:w-1/2 mb-6 md:mb-0">
                <h2 className="text-3xl font-bold text-green-800 mb-4">Plant Disease Detection</h2>
                <p className="text-lg text-gray-600">
                  Upload an image of your plant to identify diseases and get treatment recommendations.
                </p>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <img 
                  src="plant.jpg" 
                  alt="Plant Disease Detection" 
                  className="rounded-lg shadow-lg max-w-full h-auto"
                />
              </div>
            </div>
            
            <div className="bg-green-100 border-l-4 border-green-500 p-4 rounded mb-8">
              <p className="text-sm text-green-700">
                Our AI can detect diseases in various fruits, vegetables, and crops with high accuracy.
              </p>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-8">
          <div className="p-6 md:p-8">
            <h3 className="text-xl font-medium text-green-800 mb-6 text-center">Select plant image to analyze</h3>
            
            {/* Type Selection Dropdown */}
            <div className="w-full max-w-md mx-auto mb-6">
              <label htmlFor="typeSelection" className="block text-sm font-medium text-gray-700 mb-2">
                Select category:
              </label>
              <select 
                id="typeSelection" 
                value={type}
                onChange={handleTypeChange}
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              >
                <option value="plant">Plant</option>
                <option value="fruit">Fruit</option>
              </select>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-full max-w-md">
                <div className="relative mb-6">
                  <input 
                    type="file" 
                    onChange={handleFileChange} 
                    className="hidden" 
                    id="file-upload" 
                    accept="image/*"
                  />
                  <label 
                    htmlFor="file-upload" 
                    className="cursor-pointer bg-green-50 rounded-lg border-2 border-dashed border-green-300 flex flex-col items-center justify-center p-10 hover:border-green-500 transition-colors"
                  >
                    {previewUrl ? (
                      <img 
                        src={previewUrl} 
                        alt="Preview" 
                        className="max-h-64 rounded shadow"
                      />
                    ) : (
                      <>
                        <svg className="w-16 h-16 text-green-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        <p className="text-base text-gray-500">Click to select an image or drag and drop</p>
                        <p className="text-sm text-gray-400 mt-1">JPG, PNG</p>
                      </>
                    )}
                  </label>
                </div>
                
                <div className="flex justify-center">
                  <button 
                    onClick={handleSubmit}
                    disabled={!file || isLoading}
                    className={`
                      px-8 py-3 rounded-lg shadow-md text-white font-medium text-lg
                      ${!file || isLoading 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-green-600 hover:bg-green-700 transition-colors'
                      }
                    `}
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Analyzing...
                      </span>
                    ) : (
                      `Analyze ${type.charAt(0).toUpperCase() + type.slice(1)}`
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section - Conditionally rendered */}
        {result && (
          <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-8">
            <div className="bg-green-700 text-white py-4 px-6">
              <h3 className="text-xl font-bold">Analysis Results</h3>
            </div>
            
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Result image */}
                <div className="md:w-1/3">
                  <div className="rounded-lg overflow-hidden border border-gray-200 shadow-lg">
                    <img
                      src={`http://127.0.0.1:5000${result.imageUrl}`}
                      alt="Result"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
                
                {/* Result details */}
                <div className="md:w-2/3">
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded shadow">
                    <h4 className="text-xl font-bold text-red-700 mb-1">
                    Disease: {result.prediction || result.predicted_class}
                    </h4>
                  </div>
                  
                  <div className="mb-4">
                    <h5 className="text-lg font-semibold text-gray-700 mb-2">Description:</h5>
                    <p className="text-gray-600 bg-gray-50 p-4 rounded shadow-inner border border-gray-100">
                      {result.description}
                    </p>
                  </div>
                  
                  <div>
                    <h5 className="text-lg font-semibold text-gray-700 mb-2">Recommended Treatment:</h5>
                    <div className="bg-green-50 p-4 rounded shadow-inner border border-green-100">
                      <p className="text-gray-600">
                        {result.remedy}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Features section - Fills the empty space */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-8">
          <div className="p-6 md:p-8">
            <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">Why Use CropCare</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-green-50 p-6 rounded-lg shadow">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9.75 9.75 0 0118 0z"></path>
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-green-800 mb-2 text-center">Accurate Detection</h3>
                <p className="text-gray-600 text-center">
                  Our AI model is trained on thousands of plant images to ensure high accuracy in disease detection.
                </p>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg shadow">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-green-800 mb-2 text-center">Instant Results</h3>
                <p className="text-gray-600 text-center">
                  Get immediate disease identification and treatment recommendations in seconds.
                </p>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg shadow">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-green-800 mb-2 text-center">Customized Solutions</h3>
                <p className="text-gray-600 text-center">
                  Receive tailored treatment options based on the specific disease and severity level.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* FAQ Section - Additional content for the empty space */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-8">
          <div className="p-6 md:p-8">
            <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-medium text-green-700 mb-2">What plants can be analyzed?</h3>
                <p className="text-gray-600">
                  Our system can analyze various fruits, vegetables, and commercial crops including tomatoes, potatoes, corn, wheat, apples, grapes, and many more.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-medium text-green-700 mb-2">How accurate is the disease detection?</h3>
                <p className="text-gray-600">
                  Our AI model achieves over 95% accuracy in identifying common plant diseases and continues to improve with ongoing training.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-green-700 mb-2">Are the treatment recommendations organic?</h3>
                <p className="text-gray-600">
                  Yes, we prioritize organic and environmentally friendly solutions first, followed by conventional treatments when necessary.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Page indicators - Similar to what's in your screenshot */}
        <div className="flex justify-center items-center space-x-2 mb-12">
          <div className="w-8 h-1 bg-white rounded-full"></div>
          <div className="w-2 h-1 bg-white bg-opacity-50 rounded-full"></div>
          <div className="w-2 h-1 bg-white bg-opacity-50 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default UploadImage;