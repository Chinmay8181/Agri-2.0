import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="bg-white">
      <div className="max-w-[1200px] flex justify-between items-center mx-auto h-[80px]">
        <div className="flex items-center">
          <Image src={"/assets/logo.jpg"} height={60} width={80} alt="" />
          <h1 className="text-2xl font-bold text-green-700">
            Agri Guardian 360
          </h1>
        </div>
        <ul className="flex items-center">
            <li className="ml-3 underline font-medium">
                <Link href='/'>Home</Link>
            </li>
            <li className="ml-3 underline font-medium">
                <Link href='/yield-prediction'>Predicted Yield</Link>
            </li>
            <li className="ml-3 underline font-medium">
                <Link href='/image-detector'>Disease Detection</Link>
            </li>
            <li className="ml-3 underline font-medium">
                <Link href='/price-calculator'>Price Calculator</Link>
            </li>
            <li className="ml-3 underline font-medium">
                <Link href='/soil-detection'>Soil Analysis</Link>
            </li>
            <li className="ml-3 underline font-medium">
                <Link href='/weather-predictor'>Weather Prediction</Link>
            </li>
            <li className="ml-3 underline font-medium">
                <Link href='/trade'>Ecommerce</Link>
            </li>
        </ul>
      </div>
    </div> 
  );
}
