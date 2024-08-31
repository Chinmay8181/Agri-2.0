"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function AgricultureDashboard() {
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState("");
  const [soilInfo, setSoilInfo] = useState(null);
  const [currentCrop, setCurrentCrop] = useState("");
  const [nextCrop, setNextCrop] = useState("");
  const [fertilizerInput, setFertilizerInput] = useState({
    crop: "",
    land_size: "",
    cost_per_kg: "",
  });
  const [fertilizerInfo, setFertilizerInfo] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5005/areas")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setAreas(response.data);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      })
      .catch((error) => console.error("Error fetching areas:", error));
  }, []);

  const fetchSoilInfo = (area) => {
    axios.get(`http://localhost:5005/area/${area}`)
      .then((response) => {
        setSoilInfo(response.data);
      })
      .catch((error) => console.error("Error fetching soil info:", error));
  };

  const fetchNextCrop = (crop) => {
    axios.get(`http://localhost:5005/crop_rotation?current_crop=${crop}`)
      .then((response) => {
        setNextCrop(response.data.next_crop);
      })
      .catch((error) => console.error("Error fetching next crop:", error));
  };

  const fetchFertilizerInfo = () => {
    axios.post("http://localhost:5005/fertilizer", fertilizerInput)
      .then((response) => {
        setFertilizerInfo(response.data);
      })
      .catch((error) => console.error("Error fetching fertilizer info:", error));
  };

  return (
    <div className="bg-green-50 min-h-screen">
      <header className="bg-green-700 text-white p-4">
        <h1 className="text-3xl font-bold">FarmWise: Your Agricultural Companion</h1>
      </header>
      
      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Area Selection */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4 text-green-800">Field Selection</h2>
            <select
              className="w-full p-2 border border-green-300 rounded focus:ring-2 focus:ring-green-500"
              value={selectedArea}
              onChange={(e) => {
                setSelectedArea(e.target.value);
                fetchSoilInfo(e.target.value);
              }}
            >
              <option value="">Select your field</option>
              {areas.map((area) => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
          </section>

          {/* Soil Information */}
          {soilInfo && (
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4 text-green-800">Soil Analysis: {selectedArea}</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-green-700">Soil Type:</h3>
                  <p>{soilInfo["Soil Type"]}</p>
                </div>
                <div>
                  <h3 className="font-medium text-green-700">Rich in:</h3>
                  <p>{soilInfo["Rich in"].join(", ")}</p>
                </div>
                <div>
                  <h3 className="font-medium text-green-700">Lacks in:</h3>
                  <p>{soilInfo["Lacks in"].join(", ")}</p>
                </div>
                <div>
                  <h3 className="font-medium text-green-700">Suitable Crops:</h3>
                  <p>{soilInfo["Crops"].join(", ")}</p>
                </div>
              </div>
            </section>
          )}

          {/* Crop Rotation */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4 text-green-800">Crop Rotation Planner</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Crop:</label>
              <select
                className="w-full p-2 border border-green-300 rounded focus:ring-2 focus:ring-green-500"
                value={currentCrop}
                onChange={(e) => {
                  setCurrentCrop(e.target.value);
                  fetchNextCrop(e.target.value);
                }}
              >
                <option value="">Select current crop</option>
                {soilInfo?.Crops?.map((crop) => (
                  <option key={crop} value={crop}>{crop}</option>
                ))}
              </select>
            </div>
            {nextCrop && (
              <div className="mt-4 p-3 bg-green-100 rounded-lg">
                <h3 className="font-medium text-green-800">Recommended Next Crop:</h3>
                <p className="text-lg font-semibold text-green-700">{nextCrop}</p>
              </div>
            )}
          </section>

          {/* Fertilizer Calculator */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4 text-green-800">Fertilizer Calculator</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Crop:</label>
                <select
                  className="w-full p-2 border border-green-300 rounded focus:ring-2 focus:ring-green-500"
                  value={fertilizerInput.crop}
                  onChange={(e) => setFertilizerInput({ ...fertilizerInput, crop: e.target.value })}
                >
                  <option value="">Select a crop</option>
                  {soilInfo?.Crops?.map((crop) => (
                    <option key={crop} value={crop}>{crop}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Land Size (acres):</label>
                <input
                  type="number"
                  className="w-full p-2 border border-green-300 rounded focus:ring-2 focus:ring-green-500"
                  value={fertilizerInput.land_size}
                  onChange={(e) => setFertilizerInput({ ...fertilizerInput, land_size: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fertilizer Cost (per kg):</label>
                <input
                  type="number"
                  className="w-full p-2 border border-green-300 rounded focus:ring-2 focus:ring-green-500"
                  value={fertilizerInput.cost_per_kg}
                  onChange={(e) => setFertilizerInput({ ...fertilizerInput, cost_per_kg: e.target.value })}
                />
              </div>
              <button
                className="w-full p-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-300"
                onClick={fetchFertilizerInfo}
              >
                Calculate Fertilizer Needs
              </button>
            </div>
            {fertilizerInfo && (
              <div className="mt-6 p-4 bg-green-100 rounded-lg">
                <h3 className="font-medium text-green-800 mb-2">Fertilizer Recommendation:</h3>
                <p><span className="font-medium">Total NPK Needed:</span> {fertilizerInfo.total_fertilizer.join(", ")} kg</p>
                <p><span className="font-medium">NPK Ratio:</span> {fertilizerInfo.npk_ratio}</p>
                <p><span className="font-medium">Estimated Cost: ₹</span> {fertilizerInfo.total_cost}</p>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* <footer className="bg-green-800 text-white p-4 mt-8">
        <p className="text-center">&copy; 2024 FarmWise. Empowering farmers with data-driven decisions.</p>
      </footer> */}
    </div>
  );
}