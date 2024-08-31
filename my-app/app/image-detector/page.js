'use client'

import Image from "next/image";
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setPrediction(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('An error occurred while processing your request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50">
      <header className="bg-green-700 text-white p-6">
        <h1 className="text-3xl font-bold text-center">FarmCast: Crop Yield Predictor</h1>
      </header>

      <main className="container mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-green-800">Upload Your Field Image</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center justify-center w-full">
              <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-green-300 border-dashed rounded-lg cursor-pointer bg-green-50 hover:bg-green-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-10 h-10 mb-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                  <p className="text-xs text-gray-500">PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
              </label>
            </div>
            {selectedFile && (
              <p className="text-sm text-green-600">Selected file: {selectedFile.name}</p>
            )}
            <button 
              type="submit" 
              className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition duration-300 ease-in-out"
              disabled={!selectedFile || isLoading}
            >
              {isLoading ? 'Processing...' : 'Predict Class'}
            </button>
          </form>
        </div>

        {prediction && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-green-800">Yield Prediction Results</h2>
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded" role="alert">
              <p className="font-bold">Predicted Yield Class:</p>
              <p className="text-xl">{prediction.predicted_class}</p>
            </div>
            {/* Uncomment if confidence score is available */}
            <div className="mt-4">
              <p className="font-semibold">Confidence Score:</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-2">
                <div className="bg-green-600 h-2.5 rounded-full" style={{width: `${prediction.confidence * 100}%`}}></div>
              </div>
              <p className="text-sm text-gray-600 mt-1">{(prediction.confidence * 100).toFixed(2)}% confidence</p>
            </div>
           
          </div>
        )}
      </main>

      {/* <footer className="bg-green-800 text-white p-4 mt-8">
        <p className="text-center">&copy; 2024 FarmCast. Empowering farmers with AI-driven yield predictions.</p>
      </footer> */}
    </div>
  );
}