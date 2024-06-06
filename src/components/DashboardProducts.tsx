import { useQuery } from '@tanstack/react-query'
import { decryptAES, encryptData } from '../AES/AES'
import { getAllBuisnessProducts01 } from '../api/api'
import DashboardProduct from './DashboardProduct'
import { useUserIp, useUserProducts, useUserStore } from 'src/store/user-store'

type Props = {}
type DataSentProp = {
  authorization: string
  ip_address: string
  search_word?: string
}

const DashboardProducts = (props: Props) => {
  const {user} = useUserStore.getState();
  const {ipAddress} = useUserIp.getState();
  const {setProduct, product} = useUserProducts.getState();
  let searchValue = ""
  useQuery({
    queryKey: ['All_Afro_Business_Products'],
    queryFn: async () => {
      try{
        let data: DataSentProp = { authorization: user?.authorization!, ip_address: ipAddress! };
      if (searchValue !== '') {
        data.search_word = searchValue;
      }
  
      const encryptedData = encryptData({data, secretKey: process.env.REACT_APP_AFROMARKETS_SECRET_KEY});
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
    }catch (error) {
      throw new Error('Failed to fetch products: ');
    }
    }, 
    enabled: user?.authorization !== '',
    refetchOnWindowFocus: false,
  
  })

  return (
    <div>
      <div className='bg-secondaryColor my-2 h-8 px-4 py-3 flex text-lg font-semibold text-primaryColor items-center'>Manage</div>
      <div>
        {product !== undefined && product !== null && product.length > 0 ? 
        <div className=' bg-secondaryColor h-full min-h-[80vh] px-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3 w-[100%] mx-auto'>
          {product?.map((product, index)=>(
            <div key={index} className=' my-6 h-[280px] flex justify-center'>
              <DashboardProduct product={product} />
            </div>
          ))}
        </div> :
        <div><p className='text-primaryColor text-lg font-bold mt-6'>No product available</p></div>}
      </div>
    </div>
  )
}

export default DashboardProducts