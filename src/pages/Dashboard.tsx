import { useEffect, useState } from 'react'
import DashBoardNav from '../components/DashboardNav'
import DashboardBanner from '../components/DashboardBanner'
import { getAllBuisnessProducts01, getAllItems01 } from '../api/api'
import { decryptAES, encryptData } from '../AES/AES'
import {TailSpin} from 'react-loader-spinner';
import Product from '../components/Product'
import { Toaster } from 'sonner'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { productProps } from '../models/models'
import DashboardComponent from '../components/DashboardComponent'
import { useUserIp, useUserProducts, useUserStore } from 'src/store/user-store'
import Pagination from 'src/components/Pagination2'

type DataSentProp = {
  authorization: string
  ip_address: string
  search_word?: string
}

const Dashboard = () => {
  const [searchValue, setSearchValue] = useState('')
  const [searchString, setSearchString] = useState('')
  const [allProducts, setAllProducts] = useState<productProps[]>([])
  const [filteredProducts, setFilteredroducts] = useState<productProps[]>()
  const {ipAddress} = useUserIp.getState();
  const {user} = useUserStore.getState()
  const {setProduct, product} = useUserProducts.getState()
  const clientQuery = useQueryClient()
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, seTotalPages] = useState<number>(1)
  const [pageData, setPagedata] = useState<productProps[]>([])

  // useEffect(()=> {
  //   clientQuery.invalidateQueries({queryKey: ['All_Afro_Orders']})
  // }, [clientQuery])
  
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
              setAllProducts(finalData.responseBody)
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
        
        if(!user?.isBusiness){
          const response = await getAllItems01(encryptedData)
  
          if(response.data){
            if(response.status === 200){
              const decryptedData = await decryptAES(response.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY)
              const finalData = JSON.parse(decryptedData!)
              setProduct(finalData.responseBody)
              setAllProducts(finalData.responseBody)
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

  // useEffect(() => {
  //   const filteredProducts: productProps[] = (pageData ?? []).filter((prod: productProps) => prod.name.toLowerCase().includes(searchString.toLowerCase()))
  //     setFilteredroducts(filteredProducts)

  //     const itemsPerPage = 28;

  //   const totalPages = Math.ceil(allProducts.length / itemsPerPage);
  //   seTotalPages(totalPages)
  //   const currentProducts = allProducts.slice(
  //     (currentPage - 1) * itemsPerPage,
  //     currentPage * itemsPerPage
  //   );
  //   setPagedata(currentProducts)

  // }, [searchString, setFilteredroducts, allProducts, currentPage, pageData ])

  useEffect(() => {
    const filteredProducts: productProps[] = (pageData ?? []).filter((prod: productProps) =>
      prod.name.toLowerCase().includes(searchString.toLowerCase())
    );
  
    setFilteredroducts(filteredProducts);
  }, [searchString, pageData]);
  
  useEffect(() => {
    const itemsPerPage = 28;
    const totalPages = Math.ceil(allProducts.length / itemsPerPage);
    seTotalPages(totalPages);
  
    const currentProducts = allProducts.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  
    setPagedata(currentProducts);
  }, [allProducts, currentPage]);


  if(isLoading || !allProducts){
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
      <DashBoardNav setSearchValue={setSearchValue} setSearchString={setSearchString}/>

      {!user?.isBusiness ?
      <div>
      <DashboardBanner />
        <div className='grid gap-1 md:grid-cols-2 lg:grid-cols-4 w-[90%] mx-auto '>
          
          {
          filteredProducts !== undefined && filteredProducts.length !== 0 ?
           filteredProducts?.map((product: productProps, index: number)=>(
            <div key={index} className='cursor-pointer my-6 flex items-center justify-center'>
              <Product product={product} />
            </div>
          ))
          : 
          allProducts.map((product: productProps, index: number)=>(
            <div key={index} className='cursor-pointer my-6 flex items-center justify-center'>
              <Product product={product} />
            </div>
          ))}
        </div>
      <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />

      </div> :
      <DashboardComponent />
      }      
      
    </div>
  )
}

export default Dashboard