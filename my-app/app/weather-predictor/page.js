'use client'

import { useState } from 'react';
import axios from 'axios';

async function getWeatherData(latitude, longitude) {
  try {
    const response = await axios.get(`https://api.open-meteo.com/v1/forecast`, {
      params: {
        latitude: latitude,
        longitude: longitude,
        daily: 'temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max,winddirection_10m_dominant,uv_index_max',
        timezone: 'auto'
      }
    });
    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error.response ? error.response.data : error.message);
    return null;
  }
}

function checkExtremeWeatherConditions(data) {
  const extremeConditions = [];
  const { daily } = data;

  // Check for extreme temperatures
  if (Math.max(...daily.temperature_2m_max) > 35) {
    extremeConditions.push({ event: 'Extreme Heat', description: 'Temperatures exceeding 35°C expected.' });
  }
  if (Math.min(...daily.temperature_2m_min) < 0) {
    extremeConditions.push({ event: 'Frost Risk', description: 'Temperatures below 0°C expected.' });
  }

  // Check for heavy precipitation
  if (Math.max(...daily.precipitation_sum) > 50) {
    extremeConditions.push({ event: 'Heavy Rain', description: 'Heavy rainfall expected, potential flood risk.' });
  }

  // Check for strong winds
  if (Math.max(...daily.windspeed_10m_max) > 20) {
    extremeConditions.push({ event: 'Strong Winds', description: 'High wind speeds expected.' });
  }

  return extremeConditions.length > 0 ? extremeConditions : null;
}

function adviseRiskMitigation(alert) {
  const advice = {};
  if (alert.event === 'Extreme Heat') {
    advice.message = "Extreme heat expected. Ensure proper irrigation and consider shade for sensitive crops.";
    advice.actions = ["Increase irrigation", "Provide shade for sensitive plants"];
  } else if (alert.event === 'Frost Risk') {
    advice.message = "Frost risk detected. Protect sensitive crops and monitor soil temperature.";
    advice.actions = ["Cover sensitive plants", "Use frost protection methods"];
  } else if (alert.event === 'Heavy Rain') {
    advice.message = "Heavy rains expected. Ensure proper drainage and consider flood protection measures.";
    advice.actions = ["Check and clear drainage systems", "Prepare for potential flooding"];
  } else if (alert.event === 'Strong Winds') {
    advice.message = "Strong winds predicted. Secure structures and protect wind-sensitive crops.";
    advice.actions = ["Reinforce structures", "Provide windbreaks for sensitive crops"];
  }
  return advice;
}

function formatWeatherData(data) {
  const { daily } = data;
  return daily.time.map((date, index) => ({
    date,
    maxTemp: daily.temperature_2m_max[index],
    minTemp: daily.temperature_2m_min[index],
    precipitation: daily.precipitation_sum[index],
    windSpeed: daily.windspeed_10m_max[index],
    windDirection: daily.winddirection_10m_dominant[index],
    uvIndex: daily.uv_index_max[index]
  }));
}

export default function AgriculturePage() {
    const [data, setData] = useState(null);
    const [latitude, setLatitude] = useState('51.509865');
    const [longitude, setLongitude] = useState('-0.118092');
    const [loading, setLoading] = useState(false);
  
    async function fetchWeatherData() {
      setLoading(true);
      const weatherData = await getWeatherData(latitude, longitude);
      if (weatherData) {
        const formattedData = formatWeatherData(weatherData);
        const extremeConditions = checkExtremeWeatherConditions(weatherData);
  
        setData({
          formattedData,
          extremeConditions
        });
  
        if (extremeConditions) {
          extremeConditions.forEach(condition => {
            const mitigationAdvice = adviseRiskMitigation(condition);
            console.log('Extreme Weather Condition:', condition);
            console.log('Mitigation Advice:', mitigationAdvice);
          });
        }
      }
      setLoading(false);
    }
  
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-100 to-blue-100">
        <header className="bg-green-700 text-white p-6 shadow-lg">
          <h1 className="text-4xl font-bold text-center">FarmCast: Agricultural Weather Dashboard</h1>
        </header>
        
        <main className="container mx-auto py-8 px-4">
          <section className="bg-white rounded-lg shadow-xl p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-green-800">Location Input</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Latitude:</label>
                <input
                  type="text"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="e.g. 51.509865"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Longitude:</label>
                <input
                  type="text"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="e.g. -0.118092"
                />
              </div>
            </div>
            <button
              onClick={fetchWeatherData}
              disabled={loading}
              className="w-full bg-green-600 text-white px-4 py-3 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150 ease-in-out text-lg font-semibold"
            >
              {loading ? 'Fetching Weather Data...' : 'Get Agricultural Forecast'}
            </button>
          </section>
          
          {data && (
            <section className="bg-white shadow-xl rounded-lg p-6">
              <h2 className="text-3xl font-bold mb-6 text-green-800">Agricultural Weather Forecast</h2>
              
              {data.extremeConditions && (
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold mb-4 text-red-600">⚠️ Extreme Weather Alerts</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.extremeConditions.map((condition, index) => {
                      const advice = adviseRiskMitigation(condition);
                      return (
                        <div key={index} className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
                          <div className="font-bold text-red-700 text-lg mb-2">{condition.event}</div>
                          <div className="text-red-600 mb-2">{condition.description}</div>
                          <div className="font-semibold text-gray-800 mt-2">Mitigation Advice:</div>
                          <p className="text-gray-700">{advice.message}</p>
                          <ul className="list-disc list-inside mt-2">
                            {advice.actions.map((action, idx) => (
                              <li key={idx} className="text-gray-700">{action}</li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-green-800">7-Day Agricultural Forecast</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {data.formattedData.map((day, index) => (
                    <div key={index} className="bg-gradient-to-br from-blue-50 to-green-50 p-4 rounded-lg shadow-md">
                      <div className="font-bold text-lg mb-2 text-green-700">{new Date(day.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>🌡️ Max Temp:</span>
                          <span className="font-medium">{day.maxTemp}°C</span>
                        </div>
                        <div className="flex justify-between">
                          <span>🌡️ Min Temp:</span>
                          <span className="font-medium">{day.minTemp}°C</span>
                        </div>
                        <div className="flex justify-between">
                          <span>🌧️ Precipitation:</span>
                          <span className="font-medium">{day.precipitation} mm</span>
                        </div>
                        <div className="flex justify-between">
                          <span>💨 Wind Speed:</span>
                          <span className="font-medium">{day.windSpeed} km/h</span>
                        </div>
                        <div className="flex justify-between">
                          <span>🧭 Wind Direction:</span>
                          <span className="font-medium">{day.windDirection}°</span>
                        </div>
                        <div className="flex justify-between">
                          <span>☀️ UV Index:</span>
                          <span className="font-medium">{day.uvIndex}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </main>
        
        {/* <footer className="bg-green-800 text-white p-4 mt-8">
          <p className="text-center">© 2024 FarmCast. Empowering farmers with precision weather insights.</p>
        </footer> */}
      </div>
    );
  }