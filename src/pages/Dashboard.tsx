import { useEffect, useState } from 'react'
import DashBoardNav from '../components/DashboardNav'
import DashboardBanner from '../components/DashboardBanner'
import { getAllBuisnessProducts01, getAllItems01 } from '../api/api'
import { decryptAES, encryptData } from '../AES/AES'
import {TailSpin} from 'react-loader-spinner';
import Product from '../components/Product'
import { Toaster } from 'sonner'
import { useQuery } from '@tanstack/react-query'
import { productProps } from '../models/models'
import DashboardComponent from '../components/DashboardComponent'
import { useUserIp, useUserProducts, useUserStore } from 'src/store/user-store'

type DataSentProp = {
  authorization: string
  ip_address: string
  search_word?: string
}

const Dashboard = () => {
  const [searchValue, setSearchValue] = useState('')
  const {ipAddress} = useUserIp.getState();
  const {user} = useUserStore.getState()
  const {setProduct, product} = useUserProducts.getState()

  // const fetchData = async () => {
  //   try {
  //     let data: DataSentProp = { authorization: user?.authorization!, ip_address: ipAddress! };
  //     if (searchValue !== '') {
  //       data.search_word = searchValue;
  //     }
  
  //     const encryptedData = encryptData({data, secretKey: process.env.REACT_APP_AFROMARKETS_SECRET_KEY});
  //     if(user?.isBusiness){
  //       const response = await getAllBuisnessProducts01(encryptedData)
  //       if(response.data){
  //         if(response.status === 200){
  //           const decryptedData = await decryptAES(response.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY)
  //           const finalData = JSON.parse(decryptedData!)
  //           return finalData
  //         }else if(response.status === 500){
  //           const decryptedData = await decryptAES(response.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY)
  //           const finalData = JSON.parse(decryptedData!)
  //           console.error("Fetch product err: ", finalData.messgae)
  //         }
  //       }else{
  //         console.error("Fetch all product failed")
  //       }
  //     }else{
  //       const response = await getAllItems01(encryptedData)

  //       if(response.data){
  //         if(response.status === 200){
  //           const decryptedData = await decryptAES(response.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY)
  //           const finalData = JSON.parse(decryptedData!)
  //           return finalData
  //         }else if(response.status === 500){
  //           const decryptedData = await decryptAES(response.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY)
  //           const finalData = JSON.parse(decryptedData!)
  //           console.error("Fetch product err: ", finalData.messgae)
  //         }
  //       }else{
  //         console.error("Fetch all product failed")
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error in fetchData:', error);
  //     throw error; 
  //   }
  // };

  const {isLoading, refetch} = useQuery({
    queryKey: ['All_Afro_Products'],
    queryFn: async () => {
      try{
        let data: DataSentProp = { authorization: user?.authorization!, ip_address: ipAddress! };
        if (searchValue !== '') {
          data.search_word = searchValue;
        }
    
        const encryptedData = encryptData({data, secretKey: process.env.REACT_APP_AFROMARKETS_SECRET_KEY});
        if(user?.isBusiness){
          const response = await getAllBuisnessProducts01(encryptedData)
          if(response.data){
            if(response.status === 200){
              const decryptedData = await decryptAES(response.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY)
              const finalData = JSON.parse(decryptedData!)
              setProduct(finalData.responseBody)
              return finalData.responseBody
            }else if(response.status === 500){
              const decryptedData = await decryptAES(response.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY)
              const finalData = JSON.parse(decryptedData!)
              console.error("Fetch product err: ", finalData.messgae)
            }
          }else{
            console.error("Fetch all product failed")
          }
        }else{
          const response = await getAllItems01(encryptedData)
  
          if(response.data){
            if(response.status === 200){
              const decryptedData = await decryptAES(response.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY)
              const finalData = JSON.parse(decryptedData!)
              setProduct(finalData.responseBody)
              return finalData.responseBody
            }else if(response.status === 500){
              const decryptedData = await decryptAES(response.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY)
              const finalData = JSON.parse(decryptedData!)
              console.error("Fetch product err: ", finalData.messgae)
            }
          }else{
            console.error("Fetch all product failed")
          }
        }
    }catch (error) {
      throw new Error('Failed to fetch products: ');
    }
    }, 
  
  })

  useEffect(() => {
    if(searchValue !== ''){
      refetch();
    }
    
  }, [searchValue, refetch]);

  if(isLoading && !product){
    return <div className='flex justify-center items-center mt-20'>
        <TailSpin 
          color="#01974B"
          height={50}
          width={50} 
        />
    </div>
  }

  else return (
    <div className='font-lato'>
      <Toaster richColors position='top-right' closeButton />
      <DashBoardNav setSearchValue={setSearchValue} />

      {!user?.isBusiness ?
      <div>
      <DashboardBanner />
        <div className='grid gap-1 md:grid-cols-2 lg:grid-cols-4 w-[90%] mx-auto '>
          {product?.map((product: productProps, index: number)=>(
            <div key={index} className='cursor-pointer my-6 flex items-center justify-center'>
              <Product product={product} />
            </div>
          ))}
        </div>
      </div> :
      <DashboardComponent />
      }      
      
    </div>
  )
}

export default Dashboard