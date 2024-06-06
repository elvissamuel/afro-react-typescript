import { useContext } from 'react'
import StarComponent from '../components/StarComponent'
import ButtonComponent from '../components/ButtonComponent'
import Counter from '../components/Counter'
import { LoginContext } from '../contexts/LoginContext'
import { getSingleItems } from '../api/api'
import { Toaster, toast } from 'sonner'
import { decryptAES } from '../AES/AES'
import { useQuery } from '@tanstack/react-query';
import HomeNav from '../components/HomeNav'
import { TailSpin } from 'react-loader-spinner'
import BreadCrumbs from '../components/BreadCrumbs'
import { useParams } from 'react-router-dom'

const ProductDetails = ( ) => {
  const contextValues = useContext(LoginContext)
    const { id } = useParams();


    const {data: allProducts} = useQuery({
      queryKey: ['All_Afro_Products'],
      queryFn: async () => {
        try{
        const myProducts = await getSingleItems(id!)
        const decryptedData = await decryptAES(myProducts.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY)
        const response = JSON.parse(decryptedData!)
        console.log("alldata: ", response)

        return response
      }catch (error) {
        throw new Error('Failed to fetch products: ');
      }
      },
    })


    if(!contextValues){
      return null;
    }
    const {setButtonClick} = contextValues

    return (
    <>
    
     <HomeNav />
        <Toaster richColors position='top-center' />
        <div className='w-full fixed'><BreadCrumbs title="Product" /> </div>
        {allProducts ? 
        <div key={allProducts.productId} className='w-full xl:w-[85%] mx-auto mt-16 my-6'>
        <div className='flex flex-col lg:flex-row lg:justify-around gap-8 lg:items-center px-8'>
            <div className='w-full  xl:w-1/2'>
                <div className='md:w-[90%] md:h-[90%] mx-auto xl:w-[450px] xl:h-[450px] shadow-md p-24'>
                    <img className='w-full h-full' src={allProducts.imageUrl} alt="" width={100} height={100} />
                </div>
                
            </div>
            <div className='py-10 w-full xl:w-1/2'>
                <div className='bg-secondaryColor text-primaryColor rounded-xl w-[127px] h-[35px] flex justify-center items-center font-semibold mb-3'>Afro Markets</div>
                <p className='text-primaryColor text-xl font-bold'>{allProducts.name}</p>
                <p className='font-extrabold'>£{allProducts.productPrice}</p>
                <div className='flex items-center gap-1'>
                    <StarComponent numberOfColored={2} numberOfUncolored={3} />
                    <span className='text-xs text-primaryColor font-semibold'>(100 rating)</span>
                </div>
                <div className='shadow-md rounded-xl p-3 my-4 '>
                    <h2 className='font-semibold text-primaryColor'>{allProducts.category}</h2>
                    <span className='text-sm'>{allProducts.description}</span>
                </div>
                <div className='flex items-center my-2 justify-between gap-2 w-[415px] pr-6'>

                     <button onClick={()=>{toast.warning("Can't Add to Cart", {description: 'You have to sign in before adding to cart'}); setButtonClick(prev => !prev)}} className='w-[251px] bg-secondaryColor font-semibold text-primaryColor rounded-lg h-[40px]'>Add to Cart</button>
                     
                    <Counter />
                </div>
                <ButtonComponent handleClick={()=> console.log('button was clicked')} title='Add to wishlist' />
            </div>
        </div>

        <div className='my-16 w-[95%] mx-auto'>
            <h2 className='text-primaryColor text-lg font-semibold mb-6'>Customer Review</h2>

            <div className='grid gap-4 lg:grid-cols-2 '>
                <div className='col-span-1 flex flex-col gap-6'>
                    <div className='flex flex-col items-center justify-center'>
                        <p className='text-4xl font-bold'>0</p>
                        <StarComponent numberOfUncolored={5} />
                        <p className='text-sm text-primaryColor'>No reviews yet</p>
                    </div>
                    <div className='pl-4 text-sm font-semibold text-gray-600'>
                        <div className='flex gap-1 items-center'>
                            <StarComponent numberOfColored={5} />
                            <div className='h-[6px] w-[240px] bg-gray-400 rounded-lg' />
                            <span>0</span>
                        </div>
                        <div className='flex gap-1 items-center'>
                            <StarComponent numberOfColored={4} numberOfUncolored={1} />
                            <div className='h-[6px] w-[240px] bg-gray-400 rounded-lg' />
                            <span>0</span>
                        </div>
                        <div className='flex gap-1 items-center'>
                            <StarComponent numberOfColored={3} numberOfUncolored={2} />
                            <div className='h-[6px] w-[240px] bg-gray-400 rounded-lg' />
                            <span>0</span>
                        </div>
                        <div className='flex gap-1 items-center'>
                            <StarComponent numberOfColored={2} numberOfUncolored={3} />
                            <div className='h-[6px] w-[240px] bg-gray-400 rounded-lg' />
                            <span>0</span>
                        </div>
                        <div className='flex gap-1 items-center'>
                            <StarComponent numberOfColored={1} numberOfUncolored={4} />
                            <div className='h-[6px] w-[240px] bg-gray-400 rounded-lg' />
                            <span>0</span>
                        </div>
                    </div>
                </div>
                <div className='col-span-1 flex flex-col gap-2 text-primaryColor'>
                        <h2 className='uppercase text-primaryColor font-bold'>Add a review</h2>
                        <p className='text-sm'>Your email address will not be published, required fields are marked <span className='text-red-600 font-bold'>*</span></p>
                        <div className='flex items-center gap-1'>
                            <p className='text-sm'>Your Rating<span className='text-red-600 font-bold'>*</span>: </p>
                            <StarComponent numberOfUncolored={5} />
                        </div>
                        <form className='flex flex-col gap-4' action="">
                            <div className='flex flex-col text-primaryColor'>
                                <label htmlFor="review" className='text-sm font-semibold'>Your Review <span className='text-red-600 font-bold'>*</span></label>
                                <textarea name="" id="review" cols={30} rows={10} className='h-[178px] outline-none boder border-[1px] rounded-lg border-primaryColor shadow-md p-3' />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="name" className='text-sm font-semibold text-primaryColor'>Name<span className='text-red-600 font-bold'>*</span></label>
                                <input type="text" id='name' className='border-primaryColor outline-none border-[1px] rounded-lg px-3 py-1.5' />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="email" className='text-sm font-semibold text-primaryColor'>Email<span className='text-red-600 font-bold'>*</span></label>
                                <input type="text" id='email' className='border-primaryColor outline-none border-[1px] rounded-lg px-3 py-1.5' />
                            </div>
                            <div className='flex items-center gap-2'>
                                <input type="checkbox" className='border-[1px] outline-none border-primaryColor' name="" id="" />
                                <p className='text-sm font-semibold text-primaryColor'>Save my name, email and website in this browser for next time</p>
                            </div>
                            <button className='bg-primaryColor text-white text-sm font-semibold py-2 px-4 rounded-md' type="submit">Submit</button>
                        </form>
                </div>

            </div>
        </div>
        </div> 
        : 
        <div className='flex justify-center items-center mt-20'>
          <TailSpin 
              color="#01974B"
              height={50}
              width={50} 
            />
        </div>
        }
    </>
  ) 

  }


export default ProductDetails