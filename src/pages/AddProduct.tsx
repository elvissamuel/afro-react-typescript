import React, { useState, ChangeEvent } from 'react';
import { decryptAES, encryptData } from 'src/AES/AES';
import { addNewProduct } from 'src/api/api';
import { useUserStore } from 'src/store/user-store';

interface Category {
  id: string;
  name: string;
}

const categories: Category[] = [
  { id: 'dairy', name: 'Dairy & Milk' },
  { id: 'seafood', name: 'Seafood' },
  { id: 'canned', name: 'Canned & Processed food' },
  { id: 'beverages', name: 'Beverages' },
  { id: 'spices', name: 'Spices & Herbs' },
  { id: 'condiments', name: 'Condiments & Sauces' },
  { id: 'nuts', name: 'Nuts & Seeds' },
  { id: 'meat', name: 'Meat & Poultry' },
  { id: 'grains', name: 'Grains & Cereals' },
  { id: 'fruits', name: 'Fruits & Vegetables' },
  { id: 'tubers', name: 'Tubers & Roots' },
  { id: 'baked', name: 'Baked Goods' }
];

interface Variant {
  id: string;
  name: string;
  value: string;
}

const AddProduct: React.FC = () => {
  const [product_name, setProductName] = useState<string>('');
  const [product_description, setDescription] = useState<string>('');
  const [product_type, setProductType] = useState<string>('');
  const [product_category, setSelectedCategories] = useState<string>();
  const [product_image, setProductImage] = useState<string>("");
  const [other_images, setOtherImages] = useState<string[]>([]);
  const [quantity, setQuantity] = useState<number>(0);
  const [basePrice, setBasePrice] = useState<number>(0);
  const [variation, setVariants] = useState<Variant[]>([]);
  const {user} = useUserStore.getState();
  

  // const handleCategoryClick = (categoryId: string) => {
  //   setSelectedCategories(prev => 
  //     prev.includes(categoryId)
  //       ? prev.filter(c => c !== categoryId)
  //       : [...prev, categoryId]
  //   );
  // };

  

  const handleSubmit = async () => {
    // e.preventDefault();
    const data = {
      product_name,
      product_description,
      product_type,
      product_category: "cereals",
      product_image,
      other_images,
      quantity,
      basePrice,
      variation,
      authorization: user?.authorization,
      ip_address: "",
    }

    const encryptedInfo = encryptData({data, secretKey: process.env.REACT_APP_AFROMARKETS_SECRET_KEY})
    const response = await addNewProduct(encryptedInfo)
     const decryptedResponse = await decryptAES(response.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY)
    console.log("This is response: ", decryptedResponse);
  }

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newImage = URL.createObjectURL(files[0]);
      setProductImage(newImage);
    }
  };

  const handleOtherImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setOtherImages(prev => [...prev, ...newImages]);
    }
  };

  const removeOtherImage = (index: number) => {
    setOtherImages(prev => prev.filter((_, i) => i !== index));
  };

  const addVariant = () => {
    const newVariant: Variant = {
      id: Date.now().toString(),
      name: '',
      value: ''
    };
    setVariants(prev => [...prev, newVariant]);
  };

  const removeVariant = (id: string) => {
    setVariants(prev => prev.filter(variant => variant.id !== id));
  };

  const updateVariant = (id: string, field: 'name' | 'value', value: string) => {
    setVariants(prev => prev.map(variant => 
      variant.id === id ? { ...variant, [field]: value } : variant
    ));
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          <h1 className="text-xl font-semibold">Add New Product</h1>
        </div>
        <div className="flex gap-2">
          <button onClick={()=>handleSubmit()} className="px-4 py-2 bg-green-600 text-white rounded-3xl hover:bg-green-700">
            Add Product
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-3xl hover:bg-gray-100">
            Save Product
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-3xl text-red-600 hover:bg-gray-100">
            Discard
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-8 gap-4">
        <div className="space-y-6 col-span-3">
          <div>
            <label htmlFor="product-name" className="block text-sm font-medium text-gray-700">Product name</label>
            <input
              id="product-name"
              type="text"
              value={product_name}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Enter product name"
              className="mt-1 block w-full py-2 px-4 outline-none rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              value={product_description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter product description"
              className="mt-1 block w-full rounded-md outline-none border p-4 border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 min-h-[200px]"
            />
          </div>

          <div>
            <label htmlFor="product-type" className="block text-sm font-medium text-gray-700">Product type</label>
            <select
              id="product-type"
              value={product_type}
              onChange={(e) => setProductType(e.target.value)}
              className="mt-1 block w-full rounded-md py-2 px-4 outline-none border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">Select Option</option>
              <option value="physical">Physical Product</option>
              <option value="digital">Digital Product</option>
            </select>
          </div>


        </div>


        {/* <div className=" col-span-3">

            <button className='border flex items-center gap-2 py-3 px-4 rounded-xl mx-auto mt-32'>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                <p className="text-gray-400 text-xs font-semibold">Add New Product</p>
            </button>
        </div> */}

<div className="col-span-3 space-y-4">
          {variation.map(variant => (
            <div key={variant.id} className="flex items-center gap-2">
              <input
                type="text"
                value={variant.name}
                onChange={(e) => updateVariant(variant.id, 'name', e.target.value)}
                placeholder="Variant name"
                className="flex-1 py-2 px-4 outline-none rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <input
                type="text"
                value={variant.value}
                onChange={(e) => updateVariant(variant.id, 'value', e.target.value)}
                placeholder="Select Variant"
                className="flex-1 py-2 px-4 outline-none rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <button
                onClick={() => removeVariant(variant.id)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          ))}
          
          <button 
            onClick={addVariant}
            className='border flex items-center gap-2 py-3 px-4 rounded-xl mx-auto mt-32'
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <p className="text-gray-400 text-xs font-semibold">Add New Product</p>
          </button>
        </div>

        <div className="space-y-6 col-span-2">
          <div className="border rounded-lg p-4">
            <label className="block text-sm font-medium text-gray-700">Display image</label>
            <div className="mt-1.5 space-y-4">
              <div className="aspect-square rounded-lg border-2 border-dashed border-gray-200 hover:bg-gray-50 cursor-pointer flex items-center justify-center">
                <label htmlFor="main-image-upload" className="w-full h-full flex items-center justify-center cursor-pointer">
                  <input
                    id="main-image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </label>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="aspect-square rounded-lg border border-gray-200 flex items-center justify-center">
                    {other_images[index] ? (
                      <div className="relative w-full h-full">
                        <img
                          src={other_images[index]}
                          alt={`Product ${index + 1}`}
                          className="object-cover rounded-lg w-full h-full"
                        />
                        <button
                          className="absolute top-1 right-1 h-4 w-4 bg-white rounded-full flex items-center justify-center"
                          onClick={() => removeOtherImage(index)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <label htmlFor={`image-upload-${index}`} className="w-full h-full flex items-center justify-center cursor-pointer">
                        <input
                          id={`image-upload-${index}`}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleOtherImageUpload}
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                      </label>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">More images</p>
          </div>

          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
            <input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.valueAsNumber)}
              placeholder="Number of quantity"
              className="mt-1 block w-full rounded-md border py-2 px-4 outline-none border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <div>
            <label htmlFor="base-price" className="block text-sm font-medium text-gray-700">Base Pricing</label>
            <div className="relative mt-1.5">
              <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none z-20 bg-gray-100 text-gray-500 pl-3 pr-2 rounded-l-md border-r">
                <span className="text-sm font-medium">$</span>
              </div>
              <input
                id="base-price"
                type="number"
                value={basePrice}
                onChange={(e) => setBasePrice(e.target.valueAsNumber)}
                placeholder="0.00"
                className="pl-10 block w-full rounded-md border outline-none px-4 py-2 border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;