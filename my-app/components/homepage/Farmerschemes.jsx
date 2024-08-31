import React from 'react';
import Image from 'next/image';

const schemes = [
  {
    title: 'PM-KISAN',
    description: 'Direct income support of ₹6000 per year to eligible farmer families',
    image: '/assets/pm-kisan.jpg',
  },
  {
    title: 'Kisan Credit Card',
    description: 'Easy credit access for farmers to meet agricultural and other needs',
    image: '/assets/kisan-credit-card.jpg',
  },
  {
    title: 'Soil Health Card Scheme',
    description: 'Provides information to farmers on nutrient status of their soil',
    image: '/assets/soil-health-card.jpeg',
  },
  // Add more schemes as needed
];

const SchemeCard = ({ title, description, image }) => (
  <div className="relative group overflow-hidden rounded-lg">
    <Image
      src={image}
      alt={title}
      width={400}
      height={300}
      className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-110"
    />
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
      <h3 className="text-white text-xl font-semibold mb-2">{title}</h3>
      <p className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">{description}</p>
    </div>
  </div>
);

const FarmerSchemes = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Government Schemes for Farmers</h2>
          <p className="text-gray-600">Explore beneficial programs to support agricultural growth</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {schemes.map((scheme, index) => (
            <SchemeCard key={index} {...scheme} />
          ))}
        </div>
        {/* <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className={`w-3 h-3 rounded-full ${i === 0 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            ))}
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default FarmerSchemes;