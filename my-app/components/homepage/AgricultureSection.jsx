import Image from 'next/image';

const AgricultureSection = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Left side - Image */}
        <div className="md:w-1/2">
          <Image
            src="/assets/poor-farmer.jpg"
            alt="Farmer in organic farm"
            width={700}
            height={700}
            className="rounded-lg"
          />
        </div>
        
        {/* Right side - Text content */}
        <div className="md:w-1/2">
          <h2 className="text-4xl font-bold mb-4">Agriculture & Organic Product Farm</h2>
          <p className="text-gray-600 mb-8">
          Nurturing Sustainable Harvests and Natural Wellness
          </p>
          
          {/* Statistic */}
          <div className="mb-8">
            <span className="text-6xl font-bold text-green-500">25M</span>
            <p className="text-xl">Growth Tonns of Harvest</p>
          </div>
          
          {/* Info boxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-yellow-400 p-4 rounded-lg">
              <Image
                src="/assets/leaf.png"
                alt="Organic Product"
                width={60}
                height={60}
              />
              <h3 className="text-xl font-bold mt-2">100% Guaranteed Organic Product</h3>
              {/* <p className="mt-2">Always parties but trying she shewing of moment.</p> */}
            </div>
            <div className="bg-green-500 p-4 rounded-lg text-white">
              <Image
                src="/assets/corn.jpg"
                alt="Healthy Foods"
                width={60}
                height={60}
                className='rounded-full'
              />
              <h3 className="text-xl font-bold mt-2">Top-Quality Healthy Foods Production</h3>
              {/* <p className="mt-2">Majority have suffered alteration in some form by injected humor.</p> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgricultureSection;