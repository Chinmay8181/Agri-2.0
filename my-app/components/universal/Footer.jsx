import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-green-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Agri Guardian 360</h3>
            <p className="mb-4">Empowering farmers with innovative solutions for sustainable agriculture.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-yellow-400 transition duration-300">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="hover:text-yellow-400 transition duration-300">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="hover:text-yellow-400 transition duration-300">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-yellow-400 transition duration-300">Home</Link></li>
              <li><Link href="/about" className="hover:text-yellow-400 transition duration-300">About Us</Link></li>
              <li><Link href="/services" className="hover:text-yellow-400 transition duration-300">Services</Link></li>
              <li><Link href="/contact" className="hover:text-yellow-400 transition duration-300">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li><Link href="/soil-analysis" className="hover:text-yellow-400 transition duration-300">Soil Analysis</Link></li>
              <li><Link href="/crop-management" className="hover:text-yellow-400 transition duration-300">Crop Management</Link></li>
              <li><Link href="/smart-irrigation" className="hover:text-yellow-400 transition duration-300">Smart Irrigation</Link></li>
              <li><Link href="/market-insights" className="hover:text-yellow-400 transition duration-300">Market Insights</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
            <p className="mb-2">Nirma University, Ahmedabad</p>
            <p className="mb-2">Phone: +1 234 567 8900</p>
            <p className="mb-2">Email: agritech@agri.com</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-green-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2024 AgriTech. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-yellow-400 transition duration-300 mr-4">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-yellow-400 transition duration-300">Terms of Service</Link>
          </div>
        </div>
      </div>
      <Image
        src="/footer-plant.svg"
        alt="Footer Decoration"
        width={150}
        height={150}
        className="absolute bottom-0 right-0 opacity-20"
      />
    </footer>
  );
};

export default Footer;