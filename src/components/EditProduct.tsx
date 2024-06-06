import React, { useEffect, useRef, useState } from 'react'
import { editProduct, getImageUrl } from '../api/api'
import { encryptData } from '../AES/AES'
import { FadeLoader } from "react-spinners";
import { Toaster, toast } from 'sonner'
import { useUserCtaegory, useUserStore } from 'src/store/user-store';
import { productProps } from 'src/models/models';
import CategoryDropdown from './CategoryDropdown';
import { useQueryClient } from '@tanstack/react-query';

type Props = {
  product: productProps;
}

const EditProduct = (props: Props) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [imgFIle, setImgFile] = useState<File>()
    const [imgUrl, setImgUrl] = useState(props.product.imageUrl)
    const [loading, setLoading] = useState(false)
    const [productName, setProductName] = useState(props.product.name)
    const [productQuantity, setProductQuantity] = useState(props.product.productQuantity)
    const [productPrice, setProductPrice] = useState(props.product.productPrice)
    const [productDescription, setProductDescription] = useState(props.product.description)
    const {user} = useUserStore.getState();
    const {category, setCategory} = useUserCtaegory.getState();
    const queryClient = useQueryClient();
    useEffect(()=> {
      setCategory(props.product.category)
    }, [props.product.category, setCategory])
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const fee_bearer = user?.isBusiness ? 'business' : 'customer'
        const data = {product_id: props.product.productId, product_name: productName, product_description: productDescription, product_category: category, product_fee_bearer: fee_bearer, product_image: imgUrl, product_price: productPrice, product_quantity: productQuantity, authorization: user?.authorization}
        const encryptedInfo = encryptData({data, secretKey: process.env.REACT_APP_AFROMARKETS_SECRET_KEY})
        editProduct({encryptedInfo, setLoading, toast})

        setTimeout(() => {
            queryClient.invalidateQueries({queryKey: ["All_Afro_Business_Products"]})
            }, 1000);
        
    }
    const handleImage = ()=>{
       if(imgFIle) {
        const formData = new FormData()
        formData.append("file", imgFIle)
        formData.append("upload_preset", "ewf7xmbi")
        getImageUrl({files:formData, setImgUrl, setLoading})
      }
    }
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        setImgFile(files[0]);
      }
    };

  return (
    <div>
        
        <Toaster richColors position='top-right' closeButton />
        <div className='max-w-[680px] mx-auto my-2 shadow-lg px-10 py-5'>
            <h2 className='font-semibold text-lg text-primaryColor'>EDIT PRODUCT DETAILS</h2>
            <p className='text-sm text-primaryColor'>Kindly fill in product details</p>

            <form onSubmit={(e)=>handleSubmit(e)} className='mt-8 flex flex-col gap-3'>
                <div className='flex flex-col md:flex-row gap-y-6 gap-10'>
                    <div className='bg-secondaryColor shrink-0 h-[200px] w-[150px] rounded-lg flex justify-center items-center'>
                        {imgFIle === undefined && imgUrl === '' ? 
                            <div className='flex flex-col items-center gap-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-primaryColor font-bold">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                                </svg>
                                <button onClick={(e)=>{ e.preventDefault(); inputRef.current?.click(); }} className='text-xs border border-primaryColor px-2 py-1 border-opacity-30 rounded-md text-primaryColor'>Choose an image</button>
                            </div> : imgFIle !== null && imgUrl === '' && !loading ?
                            <div className='text-center relative'>
                                
                                <p className='text-sm text-primaryColor'>{imgFIle?.name}</p>
                                <button onClick={()=>handleImage()} className='text-xs border border-primaryColor px-2 py-1 border-opacity-30 rounded-md text-primaryColor'>Select file</button>
                                <button onClick={()=>setImgFile(undefined)} className='text-xs border border-primaryColor px-2 py-1 border-opacity-30 rounded-md text-primaryColor'>Cancel</button>
                            </div> : 
                            <div className='w-full h-full'>
                                {loading ? <div className='w-full h-full text-black flex justify-center items-center'>              
                                <FadeLoader height={10} width={2} color="#01974B" loading={true} />
                                </div> : <img className='object-cover w-full h-full' src={imgUrl} alt="product-img" width={100} height={100} />}
                            </div>}
                        <input type="file" className='hidden' name="" id="" ref={inputRef} onChange={handleFileChange} />
                    </div>
                    <div className='w-full text-sm text-primaryColor font-semibold flex flex-col gap-2 justify-evenly'>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="productname">Product Name</label>
                            <input onChange={(e)=>setProductName(e.target.value)} value={productName} type="text" className='px-2 w-full py-1.5 outline-none rounded-lg bg-secondaryColor' id='productname' />
                        </div>
                        <div className='flex flex-col gap-1 relative'>
                            <span className='absolute left-1 text-lg top-6'>
                            £
                            </span>
                            <label htmlFor="productprice">Price</label>
                            <input onChange={(e)=>setProductPrice(parseFloat(e.target.value))} value={productPrice} type="number" className='px-2 pl-8 py-1.5 outline-none rounded-lg bg-secondaryColor' id='productprice' />
                            {/* {errors.product_price && <span className='text-xs text-right'>This field is required</span>} */}
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="quantity">Quantity Available</label>
                            <input onChange={(e)=>setProductQuantity(parseFloat(e.target.value))} value={productQuantity} type="number" className='px-2 py-1.5 outline-none rounded-lg bg-secondaryColor' id='quantity' />
                            {/* {errors.product_quantity && <span className='text-xs text-right'>This field is required</span>} */}
                        </div>
                    </div>
                </div>
                <div>
                    <CategoryDropdown productCategory={category} />
                </div>
              
                <div className='flex flex-col gap-1 text-primaryColor text-sm font-semibold'>
                    <label htmlFor="description">Description</label>
                    <textarea onChange={(e)=>setProductDescription(e.target.value)} value={productDescription} name="" className='px-2 py-1  h-[122px] bg-secondaryColor outline-none rounded-lg ' id="description" cols={30} rows={30} />
                    {/* {errors.product_description && <span className='text-xs text-right'>This field is required</span>} */}
                </div>

                <div className='mt-4 w-[80%] mx-auto'>
                    <button disabled={loading} type='submit' className='bg-primaryColor py-1.5 text-gray-100 rounded-lg w-full'>{loading ? "Loading..." : "Update Product"}</button>
                    <button className='bg-secondaryColor py-1.5 text-primaryColor mt-2 rounded-lg w-full'>Save for later</button>
                </div>
            </form>
        </div>
      
    </div>
  )
}

export default EditProduct