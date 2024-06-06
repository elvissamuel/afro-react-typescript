"use client"
import React, { useContext, useEffect, useState } from 'react'
import DashboardBanner from '../components/DashboardBanner'
import { getAllItems, getAllItemsNew} from '../api/api'
import { LoginContext } from '../contexts/LoginContext'
import { encryptData } from '../AES/AES'
import { TailSpin} from 'react-loader-spinner';
import { Toaster, toast } from 'sonner'
import { useQuery } from '@tanstack/react-query'
import HomeNav from '../components/HomeNav'
import HomeProducts from '../components/HomeProducts'

type Props = {}
export type DataSentProp = {
  ip_address: string
  search_word?: string
}

const LandingPage = (props: Props) => {
  const [searchValue, setSearchValue] = useState('')
  const [dataIP, setDataIP] = useState('')

  useEffect(() => {
    fetch("https://api64.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => {
        const myIPAddress = data.ip;
        setDataIP(myIPAddress);
      })
      .catch((error) => {
        console.error("Error fetching IP:", error);
      });
  }, []);

  
  const contextValues = useContext(LoginContext)
  

  const fetchData = async () => {
    try {
      let data:DataSentProp =  { ip_address: dataIP };
      if (searchValue !== '') {
        data.search_word = searchValue;
      }
  
      const encryptedData = encryptData({data, secretKey: process.env.REACT_APP_AFROMARKETS_SECRET_KEY});
  
      const result = await getAllItemsNew(encryptedData);
  
      return result;
    } catch (error) {
      console.error('Error in fetchData:', error);
      throw error; 
    }
  };

  const {data: allProducts, isLoading, refetch, isError} = useQuery({
    queryKey: ['All_Afro_Products'],
    queryFn: async () => {
      try{
      const myProducts = await fetchData()
      if (myProducts){
        setProducts(myProducts)
      }
      return myProducts
    }catch (error) {
      throw new Error('Failed to fetch products: ');
    }
    },
  })

  useEffect(() => {
      refetch();
      console.log('Refetch triggered');
    
  }, [searchValue, refetch]);

  if(!contextValues){
    return null;
  }
  const { setProducts, products} = contextValues


  if(isLoading){
    return <div className='flex justify-center items-center mt-20'>
      <TailSpin 
          color="#01974B"
          height={50}
          width={50} 
        />
    </div>
  } return (
    <div className='font-lato'>
      <HomeNav setSearchValue={setSearchValue} />
      <DashboardBanner />
      <Toaster position="top-center" />
      <div className='grid gap-1 md:grid-cols-2 lg:grid-cols-4 w-[90%] mx-auto '>
        {products?.map((product, index)=>(
          <div key={index} className='cursor-pointer my-6 flex items-center justify-center'>
            <HomeProducts product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default LandingPage
