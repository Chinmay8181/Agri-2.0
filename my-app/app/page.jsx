'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/universal/Navbar'
import AgricultureSection from '@/components/homepage/AgricultureSection'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import FarmerSchemes from '@/components/homepage/Farmerschemes'
import ContactUs from '@/components/homepage/ContactUs'
import Footer from '@/components/universal/Footer'

const features = [
  {
    title: 'Soil Preparation & Analysis',
    description: 'Advanced soil testing and recommendations for optimal crop selection and preparation.',
    icon: '🌱',
    link: '/soil-detection',
    bgImage: '/assets/sowing-plants.jpg'
  },
  {
    title: 'Crop Yield Finder',
    description: 'AI-powered planting scheduler and seed selection guide based on soil and climate data.',
    icon: '🌾',
    link: '/yield-prediction',
    bgImage: '/assets/soil-analysis.jpg'
  },
  {
    title: 'Weather Monitoring',
    description: 'Real-time crop health tracking using satellite imagery and IoT sensors.',
    icon: '📈',
    link: '/weather-predictor',
    bgImage: '/assets/weather_img.jpg'
  },
  {
    title: 'Disease Management',
    description: 'Early detection system for pests and diseases with tailored treatment recommendations.',
    icon: '🐛',
    link: '/image-detector',
    bgImage: '/assets/pest_n_disease_mngmnt.webp'
  },
  {
    title: 'Harvest Price Prediction',
    description: 'Predictive analytics for optimal harvest timing and yield estimation.',
    icon: '🚜',
    link: '/price-calculator',
    bgImage: '/assets/harvest_pred.webp'
  }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % features.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + features.length) % features.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000); // Auto-advance every 5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="relative h-[calc(100vh-80px)]">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            style={{
              backgroundImage: `url(${feature.bgImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="text-center text-white p-8 max-w-2xl">
                <h2 className="text-4xl font-bold mb-4">{feature.title}</h2>
                {/* <p className="text-xl mb-6">{feature.description}</p> */}
                <Link href={feature.link} className="bg-white text-black py-2 px-6 rounded-full hover:bg-opacity-80 transition-colors">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        ))}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-colors"
        >
          <FaChevronLeft className="text-black" size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-colors"
        >
          <FaChevronRight className="text-black" size={24} />
        </button>
      </div>
      <AgricultureSection />
      <FarmerSchemes />
      <ContactUs />
    </>
  )
}