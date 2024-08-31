"use client";

import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { auth, db } from "@/firebase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(true);
  const [userType, setUserType] = useState("seller");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        userType,
        email: user.email,
        createdAt: new Date(),
      });
      router.push("/trade");
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        userType,
        email: user.email,
        userProductse: [],
      });
      router.push("/trade");
    } catch (error) {
      setError("Error creating account");
    }
  };

  const renderBuyerInterface = () => (
    <div>
      <h2 className="text-3xl font-bold text-green-800 mb-4">
        {isSignUp ? "Create Your Buyer Account" : "Login as Buyer"}
      </h2>
      <p className="text-gray-700 mb-6">
        {isSignUp
          ? "Fill in your details below to create a Buyer account and start exploring our marketplace."
          : "Enter your credentials to log in as a Buyer and access exclusive Buyer features."}
      </p>
    </div>
  );

  const renderSellerInterface = () => (
    <div>
      <h2 className="text-3xl font-bold text-green-800 mb-4">
        {isSignUp ? "Create Your Seller Account" : "Login as Seller"}
      </h2>
      <p className="text-gray-700 mb-6">
        {isSignUp
          ? "Fill in your details below to create a seller account and start selling your products."
          : "Enter your credentials to log in as a seller and manage your listings."}
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        {userType === "Buyer" && renderBuyerInterface()}
        {userType === "seller" && renderSellerInterface()}

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <form
          onSubmit={isSignUp ? handleSignUp : handleLogin}
          className="space-y-4 mb-6"
        >
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-md font-semibold w-full hover:bg-green-600 transition"
          >
            {isSignUp ? "Create Account" : "Login"}
          </button>
        </form>

        <div className="flex flex-col space-y-4">
          <button
            onClick={() => {
              setIsSignUp(false);
              setUserType("Buyer");
            }}
            className="bg-green-500 text-white px-4 py-2 rounded-md font-semibold w-full hover:bg-green-600 transition"
          >
            Login as Buyer
          </button>
          <button
            onClick={() => {
              setIsSignUp(false);
              setUserType("seller");
            }}
            className="bg-green-500 text-white px-4 py-2 rounded-md font-semibold w-full hover:bg-green-600 transition"
          >
            Login as Seller
          </button>
          <button
            onClick={() => {
              setIsSignUp(true);
              setUserType("Buyer");
            }}
            className="bg-green-500 text-white px-4 py-2 rounded-md font-semibold w-full hover:bg-green-600 transition"
          >
            Create Account as Buyer
          </button>
          <button
            onClick={() => {
              setIsSignUp(true);
              setUserType("seller");
            }}
            className="bg-green-500 text-white px-4 py-2 rounded-md font-semibold w-full hover:bg-green-600 transition"
          >
            Create Account as Seller
          </button>
        </div>
      </div>
    </div>
  );
}
