'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, collection, query, getDocs } from 'firebase/firestore';
import { auth, db } from '@/firebase';
import { FaRegUserCircle } from "react-icons/fa";

export default function TradePage() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [productType, setProductType] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [products, setProducts] = useState([]);
  const [demands, setDemands] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);

        // Fetch user data from Firestore
        try {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.error('Error fetching user data: ', error);
        }

        // Fetch products data from Firestore
        try {
          const q = query(collection(db, 'products'));
          const querySnapshot = await getDocs(q);
          const productList = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setProducts(productList);
        } catch (error) {
          console.error('Error fetching products: ', error);
        }

        // Fetch demands data from Firestore
        try {
          const q = query(collection(db, 'demands'));
          const querySnapshot = await getDocs(q);
          const demandList = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setDemands(demandList);
        } catch (error) {
          console.error('Error fetching demands: ', error);
        }
      } else {
        router.push('/login'); // Redirect to login if not logged in
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [router]);

  if (!user) {
    return null; // or a loading spinner
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userData && userData.userType === 'Seller') {
      try {
        const productsRef = collection(db, 'products');
        const productRef = doc(productsRef);
        const imagePath = `/assets/${productType}.jpg`; // Dynamic image path

        await setDoc(productRef, {
          type: productType,
          quantity: quantity,
          price: price,
          sellerEmail: user.email,
          image: imagePath,
        });

        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, {
          userProducts: [...userData.userProducts, productRef.id],
        });

        alert('Product added successfully!');
        router.reload();
      } catch (error) {
        console.error('Error adding product: ', error);
      }
    }
  };

  const handleDemandSubmit = async (e) => {
    e.preventDefault();
    if (userData && userData.userType === 'Buyer') {
      try {
        const demandsRef = collection(db, 'demands');
        const demandRef = doc(demandsRef);

        await setDoc(demandRef, {
          type: productType,
          quantity: quantity,
          price: price,
          buyerEmail: user.email,
        });

        alert('Demand posted successfully!');
        router.reload();
      } catch (error) {
        console.error('Error posting demand: ', error);
      }
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <div className="min-h-screen bg-green-100 flex">
      <div className="flex flex-1">
        <div className="w-1/4 p-4 bg-white shadow-md">
          <h2 className="text-xl font-bold text-green-800 mb-4">User Data</h2>
          {userData ? (
            <div className='flex items-center'>
              <FaRegUserCircle size={40} />
              <div className='ml-4'>
                <p className='font-regular text-lg'>{userData.email}</p>
                {userData.userType && (
                  <p className='text-lg font-semibold'>{userData.userType}</p>
                )}
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
          {userData && userData.userType.toLowerCase() === 'seller' && (
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <select
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select product type</option>
                <option value="tomatoes">Tomatoes</option>
                <option value="onions">Onions</option>
                <option value="potatoes">Potatoes</option>
              </select>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Quantity (kg)"
                className="block w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price per kg"
                className="block w-full p-2 border border-gray-300 rounded"
              />
              <button type="submit" className="block w-full bg-green-600 text-white p-2 rounded">
                Add Product
              </button>
            </form>
          )}
          {userData && userData.userType === 'Buyer' && (
            <form onSubmit={handleDemandSubmit} className="space-y-4 mt-8">
              <select
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select product type</option>
                <option value="tomatoes">Tomatoes</option>
                <option value="onions">Onions</option>
                <option value="potatoes">Potatoes</option>
              </select>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Quantity (kg)"
                className="block w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price willing to pay per kg"
                className="block w-full p-2 border border-gray-300 rounded"
              />
              <button type="submit" className="block w-full bg-green-600 text-white p-2 rounded">
                Post Demand
              </button>
            </form>
          )}
          <button
            onClick={handleSignOut}
            className="mt-4 bg-red-600 text-white p-2 rounded mb-12 w-full"
          >
            Sign Out
          </button>
        </div>
        <div className="w-1/2 p-4 bg-white shadow-md mx-4">
          <h2 className="text-xl font-bold text-green-800 mb-4">Marketplace</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {products.map(product => (
              <div key={product.id} className='border border-gray-300 p-4 rounded block'>
                <img src={product.image || '/placeholder.png'} alt={product.type} className="w-full h-32 object-cover mb-2"/>
                <h3 className="text-lg font-semibold mb-2">{product.type}</h3>
                <p>Quantity: {product.quantity} kg</p>
                <p>Price: ₹{product.price} per kg</p>
              </div>
            ))}
          </div>
          <h2 className="text-xl font-bold text-green-800 mt-8 mb-4">Buyer Demands</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {demands.map(demand => (
              <div key={demand.id} className="border border-gray-300 p-4 rounded bg-yellow-50">
                <h3 className="text-lg font-semibold mb-2">{demand.type}</h3>
                <p>Quantity: {demand.quantity} kg</p>
                <p>Price willing to pay: ₹{demand.price} per kg</p>
                <p>Buyer: {demand.buyerEmail}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="w-1/4 p-4 bg-white shadow-md">
          <h2 className="text-xl font-bold text-green-800 mb-4">Your Orders</h2>
          <p>Here will be your orders.</p>
        </div>
      </div>
    </div>
  );
}   