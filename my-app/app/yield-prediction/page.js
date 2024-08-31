"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function AgricultureYieldPrediction() {
  const [stateName, setStateName] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [cropYear, setCropYear] = useState("");
  const [season, setSeason] = useState("");
  const [crop, setCrop] = useState("");
  const [area, setArea] = useState("");
  const [predictedYield, setPredictedYield] = useState(null);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({
    State_Name: [],
    District_Name: [],
    Season: [],
    Crop: []
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchOptions() {
      try {
        const response = await axios.get('http://localhost:5002/options');
        setOptions(response.data);
      } catch (err) {
        console.error('Error fetching options:', err);
        setError('Failed to fetch dropdown options. Please try again later.');
      }
    }
    fetchOptions();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5002/predict', {
        State_Name: stateName,
        District_Name: districtName,
        Crop_Year: parseFloat(cropYear),
        Season: season,
        Crop: crop,
        Area: parseFloat(area)
      });
      setPredictedYield(response.data.predicted_production);
      setError(null);
    } catch (err) {
      console.error('Error fetching predicted yield:', err);
      setError('Failed to fetch predicted yield. Please try again later.');
      setPredictedYield(null);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-yellow-100">
      <header className="bg-green-700 text-white p-6 shadow-lg">
        <h1 className="text-4xl font-bold text-center">Yield Predictor</h1>
      </header>

      <main className="container mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-green-800">Crop Yield Prediction</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">State Name:</label>
              <select
                value={stateName}
                onChange={(e) => setStateName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Select a state</option>
                {options.State_Name.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">District Name:</label>
              <select
                value={districtName}
                onChange={(e) => setDistrictName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Select a district</option>
                {options.District_Name.map((district) => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Crop Year:</label>
              <input
                type="number"
                value={cropYear}
                onChange={(e) => setCropYear(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="e.g. 2023"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Season:</label>
              <select
                value={season}
                onChange={(e) => setSeason(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Select a season</option>
                {options.Season.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Crop:</label>
              <select
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Select a crop</option>
                {options.Crop.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Area (in hectares):</label>
              <input
                type="number"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="e.g. 100"
              />
            </div>
            <div className="col-span-2">
              <button 
                type="submit" 
                className="w-full bg-green-600 text-white px-4 py-3 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150 ease-in-out text-lg font-semibold"
                disabled={loading}
              >
                {loading ? 'Predicting...' : 'Get Yield Prediction'}
              </button>
            </div>
          </form>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8" role="alert">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}

        {predictedYield !== null && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-8" role="alert">
            <p className="font-bold">Prediction Result</p>
            <p>Predicted Yield: {predictedYield.toFixed(2)} tons</p>
          </div>
        )}

        {/* <div className="bg-white rounded-lg shadow-xl p-6">
          <h2 className="text-2xl font-semibold mb-4 text-green-800">Agricultural Map</h2>
          <div className="bg-green-200 h-64 rounded-lg flex items-center justify-center">
            <p className="text-gray-600">Map visualization would go here</p>
          </div>
        </div> */}
      </main>

      <footer className="bg-green-800 text-white p-4 mt-8">
        <p className="text-center">© 2024 AgroYield Predictor. Empowering farmers with data-driven insights.</p>
      </footer>
    </div>
  );
}