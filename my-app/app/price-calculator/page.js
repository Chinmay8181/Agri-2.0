"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function PriceInfoForm() {
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [market, setMarket] = useState("");
  const [commodity, setCommodity] = useState("");
  const [variety, setVariety] = useState("");
  const [grade, setGrade] = useState("");
  const [priceInfo, setPriceInfo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // State for dropdown options
  const [options, setOptions] = useState({
    State: [],
    District: [],
    Market: [],
    Commodity: [],
    Variety: [],
    Grade: []
  });

  // Fetch options when component mounts or when selections change
  useEffect(() => {
    async function fetchOptions() {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5010/get_options', {
          params: {
            state,
            district,
            market,
            commodity,
            variety
          }
        });
        setOptions(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching options:', err);
        setError('Failed to fetch dropdown options. Please try again later.');
      }
      setLoading(false);
    }
    fetchOptions();
  }, [state, district, market, commodity, variety]);

  // Reset subsequent dropdowns when a selection changes
  useEffect(() => {
    setDistrict("");
    setMarket("");
    setCommodity("");
    setVariety("");
    setGrade("");
  }, [state]);

  useEffect(() => {
    setMarket("");
    setCommodity("");
    setVariety("");
    setGrade("");
  }, [district]);

  useEffect(() => {
    setCommodity("");
    setVariety("");
    setGrade("");
  }, [market]);

  useEffect(() => {
    setVariety("");
    setGrade("");
  }, [commodity]);

  useEffect(() => {
    setGrade("");
  }, [variety]);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5010/get_price_info', {
        params: {
          state,
          district,
          market,
          commodity,
          variety,
          grade
        }
      });
      setPriceInfo(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching price info:', err);
      setError('Failed to fetch price information. Please try again later.');
      setPriceInfo(null);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-green-100">
      <header className="bg-green-700 text-white p-6 shadow-lg">
        <h1 className="text-4xl font-bold text-center">AgroPriceTrack: Commodity Price Dashboard</h1>
      </header>

      <main className="container mx-auto py-8 px-4">
        <section className="bg-white rounded-lg shadow-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-green-800">Commodity Price Lookup</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {['State', 'District', 'Market', 'Commodity', 'Variety', 'Grade'].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {field}:
                </label>
                <select
                  value={eval(field.toLowerCase())}
                  onChange={(e) => eval(`set${field}`)(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Select a {field.toLowerCase()}</option>
                  {options[field].map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            ))}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white px-4 py-3 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150 ease-in-out text-lg font-semibold"
            >
              {loading ? 'Fetching Price Information...' : 'Get Price Information'}
            </button>
          </form>
        </section>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {priceInfo && (
          <section className="bg-white shadow-xl rounded-lg p-6">
            <h2 className="text-3xl font-bold mb-6 text-green-800">Price Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['Min Price', 'Max Price', 'Modal Price'].map((priceType) => (
                <div key={priceType} className="bg-gradient-to-br from-blue-50 to-green-50 p-4 rounded-lg shadow-md">
                  <h3 className="font-bold text-lg mb-2 text-green-700">{priceType}</h3>
                  <p className="text-3xl font-semibold text-gray-800">₹{priceInfo[priceType]}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* <footer className="bg-green-800 text-white p-4 mt-8">
        <p className="text-center">© 2024 AgroPriceTrack. Empowering farmers with real-time price insights.</p>
      </footer> */}
    </div>
  );
}