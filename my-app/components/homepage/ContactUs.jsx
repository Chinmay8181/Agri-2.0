import React from 'react';
import Image from 'next/image';

const ContactUs = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-green-50 to-green-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center">
          {/* Left side - Contact Form */}
          <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
            <div className="bg-white rounded-lg shadow-lg p-8 relative">
              {/* <Image
                src="/farmer-illustration.svg"
                alt="Farmer"
                width={150}
                height={200}
                className="absolute -left-20 bottom-0 hidden lg:block"
              /> */}
              <h3 className="text-green-600 font-semibold mb-2">Have Questions?</h3>
              <h2 className="text-3xl font-bold mb-6">Send us a message</h2>
              <form>
                <div className="mb-4">
                  <input type="text" placeholder="Name" className="w-full p-2 border border-gray-300 rounded" />
                </div>
                <div className="mb-4 flex space-x-4">
                  <input type="email" placeholder="Email" className="w-1/2 p-2 border border-gray-300 rounded" />
                  <input type="tel" placeholder="Phone" className="w-1/2 p-2 border border-gray-300 rounded" />
                </div>
                <div className="mb-4">
                  <textarea placeholder="Tell Us About Project" rows="4" className="w-full p-2 border border-gray-300 rounded"></textarea>
                </div>
                <button type="submit" className="bg-yellow-400 text-black font-semibold py-2 px-6 rounded hover:bg-yellow-500 transition duration-300">
                  Get In Touch
                </button>
              </form>
            </div>
          </div>

          {/* Right side - Contact Information */}
          <div className="w-full lg:w-1/2 lg:pl-12">
  <div className="bg-green-800 text-white p-8 rounded-lg relative overflow-hidden">
    <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
    {/* <p className="mb-6">Feel free to reach out to our team for any inquiries or assistance.</p> */}
    <div className="mb-4">
      <h3 className="font-semibold mb-2">Jaskeerat</h3>
      <p>jaskeerat@agri.com</p>
    </div>
    <div className="mb-4">
      <h3 className="font-semibold mb-2">Chinmay</h3>
      <p>chinmay@agri.com</p>
    </div>
    <div className="mb-4">
      <h3 className="font-semibold mb-2">Dev</h3>
      <p>dev@agri.com</p>
    </div>
    <div className="mb-4">
      <h3 className="font-semibold mb-2">Niket</h3>
      <p>niket@agri.com</p>
    </div>
  </div>
</div>

        </div>
      </div>
    </section>
  );
};

export default ContactUs;