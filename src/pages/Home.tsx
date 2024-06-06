import { useEffect, useState } from 'react'
import DashboardBanner from '../components/DashboardBanner'
import { getAllItems01} from '../api/api'
import { decryptAES, encryptData } from '../AES/AES'
import { TailSpin} from 'react-loader-spinner';
import { Toaster } from 'sonner'
import { useQuery } from '@tanstack/react-query'
import HomeNav from '../components/HomeNav'
import HomeProducts from '../components/HomeProducts'
import { productProps } from 'src/models/models'
import { useUserIp } from 'src/store/user-store'

export type DataSentProp = {
  ip_address: string
  search_word?: string
}

const Home = () => {
  const [searchValue, setSearchValue] = useState('')
  const {ipAddress} = useUserIp.getState()
  

  const {data: allProducts, isLoading, refetch} = useQuery({
    queryKey: ['All_Afro_Products'],
    queryFn: async () => {
      try{
        let data:DataSentProp =  { ip_address: ipAddress! };
        if (searchValue !== '') {
          data.search_word = searchValue;
        }
    
        const encryptedData = encryptData({data, secretKey: process.env.REACT_APP_AFROMARKETS_SECRET_KEY});
    
        const result = await getAllItems01(encryptedData);
        if(result.data){
          if(result.status === 200){
            const decryptedData = await decryptAES(result.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY)
            const res = JSON.parse(decryptedData!)

            return res.responseBody

          }else if(result.status === 500){
            const decryptedData = await decryptAES(result.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY)
            const res = JSON.parse(decryptedData!)
            console.log("Add product error: ", res.message)

          }
        }else{
          console.log("Fetch all data error")
        }
    }catch (error) {
      throw new Error('Failed to fetch products: ');
    }
    },
  })

  useEffect(() => {
      refetch();    
  }, [searchValue, refetch]);


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
        {allProducts?.map((product: productProps, index: number)=>(
          <div key={index} className='cursor-pointer my-6 flex items-center justify-center'>
            <HomeProducts product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home