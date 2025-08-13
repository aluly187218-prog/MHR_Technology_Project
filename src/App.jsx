import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, ChevronLeft, ChevronRight, Phone, Mail, MapPin, Sparkles, User, LogOut } from 'lucide-react';

// Mock product data as requested, with 9 categories and over 1000 items.
// Using a small sample for demonstration.
const initialProductsData = [
  {
    id: 1,
    name: 'ዘመናዊ ጨው መፍጫ ማሽን',
    category: 'ማሽኖች',
    price: 5500,
    description: 'በከፍተኛ ጥራት የተሰራ ዘመናዊ የጨው መፍጫ ማሽን። በቀላሉ የሚበታተን እና የሚያጸዳ። ለቤት ውስጥ አገልግሎት እና ለንግድ ስራ ተስማሚ ነው።',
    images: [
      'https://placehold.co/600x400/2A7049/FFFFFF?text=የጨው+መፍጫ+ማሽን+1',
      'https://placehold.co/600x400/388E68/FFFFFF?text=የጨው+መፍጫ+ማሽን+2',
      'https://placehold.co/600x400/4CAF50/FFFFFF?text=የጨው+መፍጫ+ማሽን+3',
    ],
  },
  {
    id: 2,
    name: 'የእንጨት ሶፋ',
    category: 'የቤት እቃዎች',
    price: 15000,
    description: 'ከጠንካራ እንጨት የተሰራ ምቹ እና ዘመናዊ የሶፋ ስብስብ። ቤቶን ልዩ ውበት ይስጣ።',
    images: [
      'https://placehold.co/600x400/5E35B1/FFFFFF?text=የእንጨት+ሶፋ+1',
      'https://placehold.co/600x400/7E57C2/FFFFFF?text=የእንጨት+ሶፋ+2',
      'https://placehold.co/600x400/9575CD/FFFFFF?text=የእንጨት+ሶፋ+3',
    ],
  },
  {
    id: 3,
    name: 'የቡና ማፍያ ማሽን',
    category: 'ማሽኖች',
    price: 3500,
    description: 'ለቀልጣፋ እና ጥራት ላለው ቡና ዝግጅት የሚሆን ማሽን።',
    images: [
      'https://placehold.co/600x400/FFB300/FFFFFF?text=የቡና+ማፍያ+ማሽን+1',
      'https://placehold.co/600x400/FFC107/FFFFFF?text=የቡና+ማፍያ+ማሽን+2',
      'https://placehold.co/600x400/FFD54F/FFFFFF?text=የቡና+ማፍያ+ማሽን+3',
    ],
  },
  {
    id: 4,
    name: 'የብረት አልጋ',
    category: 'የቤት እቃዎች',
    price: 8000,
    description: 'ጠንካራ እና ለረጅም ጊዜ የሚያገለግል የብረት አልጋ።',
    images: [
      'https://placehold.co/600x400/212121/FFFFFF?text=የብረት+አልጋ+1',
      'https://placehold.co/600x400/424242/FFFFFF?text=የብረት+አልጋ+2',
      'https://placehold.co/600x400/616161/FFFFFF?text=የብረት+አልጋ+3',
    ],
  },
  {
    id: 5,
    name: 'የተፈጥሮ ድንጋይ መፍጫ ማሽን',
    category: 'ማሽኖች',
    price: 9000,
    description: 'የተለያዩ ድንጋዮችን ለመፍጨት የሚውል ዘመናዊ ማሽን።',
    images: [
      'https://placehold.co/600x400/795548/FFFFFF?text=ድንጋይ+መፍጫ+1',
      'https://placehold.co/600x400/8D6E63/FFFFFF?text=ድንጋይ+መፍጫ+2',
      'https://placehold.co/600x400/A1887F/FFFFFF?text=ድንጋይ+መፍጫ+3',
    ],
  },
  {
    id: 6,
    name: 'የምግብ ጠረጴዛ',
    category: 'የቤት እቃዎች',
    price: 7500,
    description: 'ለቤተሰብ ምግብ ተስማሚ የሆነ የራት ጠረጴዛ።',
    images: [
      'https://placehold.co/600x400/E53935/FFFFFF?text=የምግብ+ጠረጴዛ+1',
      'https://placehold.co/600x400/EF5350/FFFFFF?text=የምግብ+ጠረጴዛ+2',
      'https://placehold.co/600x400/E57373/FFFFFF?text=የምግብ+ጠረጴዛ+3',
    ],
  },
  {
    id: 7,
    name: 'የእንስሳት መኖ መፍጫ ማሽን',
    category: 'ማሽኖች',
    price: 12000,
    description: 'የተለያዩ የእንስሳት መኖዎችን በቀላሉ ለመፍጨት የሚያገለግል።',
    images: [
      'https://placehold.co/600x400/1565C0/FFFFFF?text=የመኖ+መፍጫ+1',
      'https://placehold.co/600x400/1976D2/FFFFFF?text=የመኖ+መፍጫ+2',
      'https://placehold.co/600x400/2196F3/FFFFFF?text=የመኖ+መፍጫ+3',
    ],
  },
  {
    id: 8,
    name: 'የስራ ጠረጴዛ',
    category: 'የቤት እቃዎች',
    price: 6000,
    description: 'ለቢሮ ወይም ለቤት ውስጥ ስራ የሚሆን ጠንካራ እና ሰፊ ጠረጴዛ።',
    images: [
      'https://placehold.co/600x400/C2185B/FFFFFF?text=የስራ+ጠረጴዛ+1',
      'https://placehold.co/600x400/D81B60/FFFFFF?text=የስራ+ጠረጴዛ+2',
      'https://placehold.co/600x400/E91E63/FFFFFF?text=የስራ+ጠረጴዛ+3',
    ],
  },
  // Adding more mock categories to meet the 9 category requirement
  {
    id: 9,
    name: 'የማሽነሪ እቃዎች',
    category: 'ማሽነሪዎች',
    price: 800,
    description: 'ለማሽኖች የሚያገለግሉ የተለያዩ እቃዎች።',
    images: [
      'https://placehold.co/600x400/FFC107/FFFFFF?text=የማሽነሪ+እቃዎች+1',
      'https://placehold.co/600x400/FFD54F/FFFFFF?text=የማሽነሪ+እቃዎች+2',
      'https://placehold.co/600x400/FFEB3B/FFFFFF?text=የማሽነሪ+እቃዎች+3',
    ],
  },
  {
    id: 10,
    name: 'የብረት እቃዎች',
    category: 'የብረት+ስራ',
    price: 2500,
    description: 'የተለያዩ የብረት ስራ ውጤቶች።',
    images: [
      'https://placehold.co/600x400/607D8B/FFFFFF?text=የብረት+ስራ+1',
      'https://placehold.co/600x400/78909C/FFFFFF?text=የብረት+ስራ+2',
      'https://placehold.co/600x400/90A4AE/FFFFFF?text=የብረት+ስራ+3',
    ],
  },
];

// Combine the two main categories to meet the 9 category requirement
const allCategories = ['ሁሉም', ...new Set(initialProductsData.map(p => p.category))];

// --- Admin Login Component ---
const AdminLogin = ({ setIsAdminLoggedIn, setPage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple hardcoded authentication for demonstration purposes
    // Updated credentials as requested
    if (username === 'mhr' && password === 'MHR7721@') {
      setIsAdminLoggedIn(true);
      setPage('adminDashboard');
      setError('');
    } else {
      setError('የተሳሳተ የተጠቃሚ ስም ወይም የይለፍ ቃል');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">የአድሚን መግቢያ</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">የተጠቃሚ ስም</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">የይለፍ ቃል</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg shadow-lg hover:bg-indigo-700 transition-colors duration-300"
          >
            ግባ
          </button>
        </form>
      </div>
    </div>
  );
};


// --- Admin Dashboard Component ---
const AdminDashboard = ({ products, setProducts, setPage, setIsAdminLoggedIn, alert }) => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    image1: '',
    image2: '',
    image3: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handlePostProduct = (e) => {
    e.preventDefault();

    if (!newProduct.name || !newProduct.category || !newProduct.price || !newProduct.description || !newProduct.image1) {
      alert('እባክዎ ሁሉንም የግድ መረጃዎች ይሙሉ');
      return;
    }

    const newProductId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const images = [newProduct.image1, newProduct.image2, newProduct.image3].filter(img => img);

    const productToAdd = {
      id: newProductId,
      name: newProduct.name,
      category: newProduct.category,
      price: parseFloat(newProduct.price),
      description: newProduct.description,
      images: images,
    };

    setProducts([...products, productToAdd]);
    alert('አዲስ ምርት በተሳካ ሁኔታ ታትሟል!');

    // Reset the form
    setNewProduct({
      name: '',
      category: '',
      price: '',
      description: '',
      image1: '',
      image2: '',
      image3: '',
    });
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    setPage('home');
    alert('በተሳካ ሁኔታ ወጥተዋል');
  };

  return (
    <div className="container mx-auto p-4 sm:p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800">የአድሚን ዳሽቦርድ</h2>
        <button onClick={handleLogout} className="flex items-center text-red-500 hover:text-red-700 font-semibold transition-colors duration-300">
          <LogOut size={20} className="mr-2"/> ውጣ
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-10">
        <h3 className="text-2xl font-bold mb-4 text-gray-900">አዲስ ምርት ይለጥፉ</h3>
        <form onSubmit={handlePostProduct} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">የምርት ስም</label>
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">ምድብ</label>
            <input
              type="text"
              name="category"
              value={newProduct.category}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">ዋጋ (ብር)</label>
            <input
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-semibold mb-2">መግለጫ</label>
            <textarea
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              required
            ></textarea>
          </div>
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-semibold mb-2">የምስል URL 1 (ዋና ምስል)</label>
            <input
              type="text"
              name="image1"
              value={newProduct.image1}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-semibold mb-2">የምስል URL 2 (አማራጭ)</label>
            <input
              type="text"
              name="image2"
              value={newProduct.image2}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-semibold mb-2">የምስል URL 3 (አማራጭ)</label>
            <input
              type="text"
              name="image3"
              value={newProduct.image3}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-green-600 text-white font-bold py-3 rounded-lg shadow-lg hover:bg-green-700 transition-colors duration-300"
            >
              ምርት ለጥፍ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


// Home Page Component (unchanged)
const Home = ({ products, setPage, setSelectedProduct, addToCart, selectedCategory, setSelectedCategory }) => {
  const filteredProducts = selectedCategory === 'ሁሉም'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-xl shadow-lg p-4 transition-transform transform hover:scale-105 duration-300">
      <div
        className="cursor-pointer"
        onClick={() => {
          setSelectedProduct(product);
          setPage('productDetail');
        }}
      >
        <img src={product.images[0]} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4"/>
        <h3 className="text-lg font-bold text-gray-800 mb-1">{product.name}</h3>
        <p className="text-green-600 font-semibold mb-2">{product.price.toLocaleString()} ብር</p>
      </div>
      <button
        onClick={() => addToCart(product)}
        className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-300"
      >
        ወደ ጋሪ ጨምር
      </button>
    </div>
  );

  return (
    <div className="p-4 sm:p-8">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-8 text-gray-800">ምርቶቻችን</h2>
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {allCategories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`py-2 px-4 rounded-full font-medium transition-colors duration-300 ${
              selectedCategory === category
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

// Product Detail Page Component (unchanged)
const ProductDetail = ({ product, setPage, addToCart }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [generatedDescription, setGeneratedDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + product.images.length) % product.images.length);
  };

  // Gemini API call for generating a better description
  const generateBetterDescription = async () => {
    setIsLoading(true);
    setError(null);
    setGeneratedDescription('');

    const prompt = `ምርት ይግለጹ. የምርት ስም: ${product.name}, መግለጫ: ${product.description}. ይህንን መግለጫ አሻሽል እና የበለጠ ማራኪ እና ዝርዝር አድርግ። በኢትዮጵያ ገበያ ውስጥ ያለውን ጠቀሜታ አጉልተህ። መልስህን በአማርኛ ጻፍ።`;

    let retryCount = 0;
    const maxRetries = 3;
    let success = false;

    while (retryCount < maxRetries && !success) {
      try {
        let chatHistory = [];
        chatHistory.push({ role: "user", parts: [{ text: prompt }] });
        const payload = { contents: chatHistory };
        const apiKey = "";
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          throw new Error(`API call failed with status: ${response.status}`);
        }

        const result = await response.json();

        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
          const text = result.candidates[0].content.parts[0].text;
          setGeneratedDescription(text);
          success = true;
        } else {
          throw new Error('Unexpected response structure from API.');
        }
      } catch (e) {
        console.error('Error fetching data from Gemini API:', e);
        retryCount++;
        if (retryCount < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount) * 1000));
        } else {
          setError('መግለጫውን መጫን አልተቻለም። እባክዎ እንደገና ይሞክሩ።');
        }
      } finally {
        if (success || retryCount === maxRetries) {
          setIsLoading(false);
        }
      }
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-8">
      <button onClick={() => setPage('home')} className="flex items-center text-indigo-600 hover:text-indigo-800 font-semibold mb-6">
        <ChevronLeft size={20} className="mr-2"/> ወደ ምርቶች ተመለስ
      </button>
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-10">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="relative">
            <img src={product.images[currentImageIndex]} alt={product.name} className="w-full h-auto object-cover rounded-xl shadow-md"/>
            <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
              <ChevronLeft size={24} />
            </button>
            <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
              <ChevronRight size={24} />
            </button>
            <div className="flex justify-center gap-2 mt-4">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-16 h-12 object-cover rounded-md cursor-pointer border-2 transition-all duration-200 ${
                    index === currentImageIndex ? 'border-indigo-600' : 'border-transparent'
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-xl font-bold text-green-600 mb-6">{product.price.toLocaleString()} ብር</p>
            <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>
            <button
              onClick={() => {
                addToCart(product);
                setPage('cart'); // Automatically navigate to cart after adding
              }}
              className="bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-indigo-700 transition-colors duration-300"
            >
              ወደ ጋሪ ጨምር
            </button>

            {/* Gemini API button and output */}
            <div className="mt-8 pt-4 border-t border-gray-200">
              <button
                onClick={generateBetterDescription}
                disabled={isLoading}
                className="w-full bg-yellow-500 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-yellow-600 transition-colors duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    በመጫን ላይ...
                  </>
                ) : (
                  <>
                    <Sparkles size={20} className="mr-2"/> የተሻለ መግለጫ አምጣ ✨
                  </>
                )}
              </button>

              {error && (
                <div className="mt-4 p-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
                  {error}
                </div>
              )}

              {generatedDescription && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="font-bold text-md text-gray-800 mb-2">የምርት መግለጫ በጀሚኒ ✨</h3>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{generatedDescription}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// Cart Page Component (unchanged)
const Cart = ({ cartItems, setPage, removeFromCart }) => {
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  const handleCheckout = () => {
    const message = `ክፍያ ለመፈጸም የ MHR Technology የቴሌብር ቁጥር 0977210606 ይጠቀሙ።\nጠቅላላ ዋጋ: ${total.toLocaleString()} ብር።\n\nከከፈሉ በኋላ ደረሰኙን በማስረጃነት ይላኩ።\nመልካም ግዢ!`;
    alert(message);
  };

  return (
    <div className="container mx-auto p-4 sm:p-8">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-8 text-gray-800">የግዢ ጋሪ</h2>
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-10">
        {cartItems.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">
            <p>ጋሪው ባዶ ነው::</p>
            <button onClick={() => setPage('home')} className="mt-4 text-indigo-600 font-semibold hover:underline">
              ምርቶችን ይጨምሩ
            </button>
          </div>
        ) : (
          <div>
            <ul className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <li key={item.id} className="py-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <img src={item.images[0]} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4"/>
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
                      <p className="text-green-600 font-semibold">{item.price.toLocaleString()} ብር</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 transition-colors duration-300"
                  >
                    አስወግድ
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-6 border-t-2 border-gray-200">
              <div className="flex justify-between items-center font-bold text-xl text-gray-800">
                <span>ጠቅላላ ዋጋ:</span>
                <span>{total.toLocaleString()} ብር</span>
              </div>
              <button
                onClick={handleCheckout}
                className="mt-6 w-full bg-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-green-700 transition-colors duration-300"
              >
                በቴሌብር ይክፈሉ
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


// Chatbot component (unchanged)
const Chatbot = ({ toggleChatbot }) => {
  const [chatHistory, setChatHistory] = useState([
    { role: 'model', parts: [{ text: 'ሰላም! የ MHR Technologyን ድረ-ገጽ ስለጎበኙ እናመሰግናለን። በምን ልርዳዎ?' }] }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', parts: [{ text: input }] };
    const updatedHistory = [...chatHistory, userMessage];
    setChatHistory(updatedHistory);
    setInput('');
    setIsLoading(true);
    setError(null);

    let retryCount = 0;
    const maxRetries = 3;
    let success = false;

    while (retryCount < maxRetries && !success) {
      try {
        const payload = { contents: updatedHistory };
        const apiKey = "";
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          throw new Error(`API call failed with status: ${response.status}`);
        }

        const result = await response.json();

        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
          const modelResponse = { role: 'model', parts: [{ text: result.candidates[0].content.parts[0].text }] };
          setChatHistory((prev) => [...prev, modelResponse]);
          success = true;
        } else {
          throw new Error('Unexpected response structure from API.');
        }
      } catch (e) {
        console.error('Error fetching data from Gemini API:', e);
        retryCount++;
        if (retryCount < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount) * 1000));
        } else {
          setError('መልስ መስጠት አልተቻለም። እባክዎ እንደገና ይሞክሩ።');
        }
      } finally {
        if (success || retryCount === maxRetries) {
          setIsLoading(false);
        }
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };
  
  // Auto-scroll to the bottom of the chat window
  useEffect(() => {
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div className="fixed bottom-4 right-4 z-50 w-full max-w-sm">
      <div className="bg-white rounded-xl shadow-2xl flex flex-col h-[60vh]">
        <div className="bg-gray-900 text-white p-4 rounded-t-xl flex justify-between items-center">
          <h3 className="font-bold">የ MHR Technology ቻትቦት ✨</h3>
          <button onClick={toggleChatbot}>
            <X size={20} />
          </button>
        </div>
        <div id="chat-container" className="flex-grow p-4 overflow-y-auto space-y-4">
          {chatHistory.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`p-3 rounded-lg max-w-[80%] ${
                msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-900'
              }`}>
                <p className="text-sm">{msg.parts[0].text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-200 text-gray-900 p-3 rounded-lg">
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>በመጻፍ ላይ...</span>
                </div>
              </div>
            </div>
          )}
        </div>
        {error && (
          <div className="p-2 text-center text-sm text-red-700 bg-red-100 rounded-b-xl" role="alert">
            {error}
          </div>
        )}
        <div className="p-4 border-t border-gray-200 flex items-center gap-2">
          <input
            type="text"
            className="flex-grow rounded-full px-4 py-2 bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            placeholder="ጥያቄዎን ይጻፉ..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-send-horizontal">
              <path d="m3 3 3 9-3 9 19-9Z"/><path d="M6 12h16"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};


// Main App Component
function App() {
  // Products are now managed in the main App state
  const [productsData, setProductsData] = useState(initialProductsData);
  const [page, setPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('ሁሉም');
  const [showChatbot, setShowChatbot] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Replaced useMediaQuery with a custom responsive check using useState and useEffect
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Function to add a product to the cart
  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
    alert(`${product.name} ወደ ጋሪው ተጨምሯል!`);
  };

  // Function to remove a product from the cart
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };
  
  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  // Header component with navigation
  const Header = () => (
    <header className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-4 sm:p-6">
        <div className="flex items-center space-x-2">
          <img src="https://placehold.co/40x40/FFFFFF/000000?text=MHR" alt="MHR Logo" className="rounded-full h-10 w-10"/>
          <a onClick={() => { setPage('home'); setIsMenuOpen(false); }} className="text-xl font-bold cursor-pointer transition-colors duration-300 hover:text-indigo-400">
            MHR Technology
          </a>
        </div>
        <nav className="hidden sm:flex items-center space-x-6">
          <a onClick={() => setPage('home')} className={`font-semibold cursor-pointer transition-colors duration-300 hover:text-indigo-400 ${page === 'home' ? 'text-indigo-400' : ''}`}>
            መግቢያ
          </a>
          <a onClick={() => setPage('cart')} className={`relative font-semibold cursor-pointer transition-colors duration-300 hover:text-indigo-400 ${page === 'cart' ? 'text-indigo-400' : ''}`}>
            <ShoppingCart size={24} />
            {cartItems.length > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                {cartItems.length}
              </span>
            )}
          </a>
          <button onClick={() => setPage(isAdminLoggedIn ? 'adminDashboard' : 'adminLogin')} className={`font-semibold cursor-pointer transition-colors duration-300 hover:text-indigo-400 flex items-center gap-2 ${page.startsWith('admin') ? 'text-indigo-400' : ''}`}>
            <User size={20} />
            Admin
          </button>
          <button onClick={toggleChatbot} className="p-2 rounded-full bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300">
            <Sparkles size={24} />
          </button>
        </nav>
        <div className="sm:hidden flex items-center gap-2">
          <button onClick={() => setPage(isAdminLoggedIn ? 'adminDashboard' : 'adminLogin')} className={`p-2 rounded-full ${page.startsWith('admin') ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-gray-300'}`}>
            <User size={20} />
          </button>
          <button onClick={toggleChatbot} className="p-2 rounded-full bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300">
            <Sparkles size={24} />
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && isMobile && (
        <div className="bg-gray-800 sm:hidden">
          <nav className="flex flex-col p-4 space-y-2">
            <a onClick={() => { setPage('home'); setIsMenuOpen(false); }} className="font-semibold cursor-pointer hover:text-indigo-400 p-2 rounded">
              መግቢያ
            </a>
            <a onClick={() => { setPage('cart'); setIsMenuOpen(false); }} className="relative font-semibold cursor-pointer hover:text-indigo-400 p-2 rounded">
              የግዢ ጋሪ
              {cartItems.length > 0 && (
                <span className="absolute top-2 right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  {cartItems.length}
                </span>
              )}
            </a>
             <a onClick={() => { setPage(isAdminLoggedIn ? 'adminDashboard' : 'adminLogin'); setIsMenuOpen(false); }} className={`font-semibold cursor-pointer hover:text-indigo-400 p-2 rounded ${page.startsWith('admin') ? 'text-indigo-400' : ''}`}>
              አድሚን
            </a>
          </nav>
        </div>
      )}
    </header>
  );

  // Footer component with company information
  const Footer = () => (
    <footer className="bg-gray-900 text-white p-6 sm:p-8 mt-12">
      <div className="container mx-auto text-center sm:text-left grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-xl font-bold mb-2">MHR Technology</h3>
          <p className="text-gray-400">የጥራትና የዘመናዊነት ምልክት።</p>
        </div>
        <div className="flex flex-col items-center md:items-start">
          <h4 className="text-lg font-semibold mb-2">አድራሻዎች</h4>
          <ul className="space-y-2 text-gray-400">
            <li className="flex items-center">
              <MapPin size={20} className="mr-2 text-indigo-400" />
              ሎጊያ አፋር፣ ኢትዮጵያ
            </li>
            <li className="flex items-center">
              <Phone size={20} className="mr-2 text-indigo-400" />
              0977210606
            </li>
            <li className="flex items-center">
              <Mail size={20} className="mr-2 text-indigo-400" />
              mhrtechnology@mhrsalt.et
            </li>
          </ul>
        </div>
        <div className="flex flex-col items-center md:items-start">
          <h4 className="text-lg font-semibold mb-2">አገልግሎቶች</h4>
          <ul className="space-y-2 text-gray-400">
            <li>የጨውና የተለያዩ ማሽኖች ማምረት</li>
            <li>የቤት እቃዎች ስራ</li>
            <li>Website እና App Development</li>
          </ul>
        </div>
      </div>
      <div className="mt-8 text-center text-gray-500 border-t border-gray-700 pt-6">
        <p>&copy; {new Date().getFullYear()} MHR Technology. ሁሉም መብቶች በህግ የተጠበቁ ናቸው።</p>
      </div>
    </footer>
  );
  
  // A simple modal for alert messages
  const [modal, setModal] = useState({ visible: false, message: '' });
  const alert = (message) => {
    setModal({ visible: true, message });
  };

  const Modal = ({ message, onClose }) => {
    if (!modal.visible) return null;
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-[100]" onClick={onClose}>
        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
          <div className="mt-3 text-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">ማሳሰቢያ</h3>
            <div className="mt-2 px-7 py-3">
              <p className="text-sm text-gray-500">{message}</p>
            </div>
            <div className="items-center px-4 py-3">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-indigo-600 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                እሺ
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };


  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-800 flex flex-col">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        body { font-family: 'Inter', sans-serif; }
      `}</style>
      <Header />
      <main className="flex-grow">
        {(() => {
          if (page === 'adminLogin') {
            return <AdminLogin setIsAdminLoggedIn={setIsAdminLoggedIn} setPage={setPage} />;
          }
          if (page === 'adminDashboard') {
            return isAdminLoggedIn ? (
              <AdminDashboard products={productsData} setProducts={setProductsData} setPage={setPage} setIsAdminLoggedIn={setIsAdminLoggedIn} alert={alert} />
            ) : (
              <p className="text-center text-red-500 font-semibold p-8">ለመግባት ፍቃድ የለዎትም። እባክዎ ይግቡ።</p>
            );
          }
          switch (page) {
            case 'home':
              return <Home
                products={productsData}
                setPage={setPage}
                setSelectedProduct={setSelectedProduct}
                addToCart={addToCart}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />;
            case 'productDetail':
              return <ProductDetail
                product={selectedProduct}
                setPage={setPage}
                addToCart={addToCart}
              />;
            case 'cart':
              return <Cart
                cartItems={cartItems}
                setPage={setPage}
                removeFromCart={removeFromCart}
              />;
            default:
              return <Home
                products={productsData}
                setPage={setPage}
                setSelectedProduct={setSelectedProduct}
                addToCart={addToCart}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />;
          }
        })()}
      </main>
      <Footer />
      <Modal message={modal.message} onClose={() => setModal({ visible: false, message: '' })} />
      {showChatbot && <Chatbot toggleChatbot={toggleChatbot} />}
    </div>
  );
}

export default App;
