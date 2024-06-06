import { productProps } from '../models/models'
import { useNavigate } from 'react-router-dom';
import { useUserStore } from 'src/store/user-store';
import SlideOverForm from './SlideOverForm';
import { useState } from 'react';
import DialogueBox from './DialogueBox';

type Props = {
  product: productProps
}

const DashboardProduct = (props: Props) => {
  const navigate = useNavigate();
  const {user} = useUserStore.getState();
  const [editProduct, setEditProduct] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState(false);

  const isBusiness = user?.isBusiness


  return (
    <div key={props.product.productId} className='w-full h-full bg-slate-50 rounded-xl p-2 flex flex-col gap-2'>
        <div className='h-[140px] flex items-center gap-3'>
          <div onClick={()=>{if(!isBusiness) navigate(`product/${props.product.productId}`)}} className='h-[140px] w-[50%] relative'>
            <img className='object-contain w-full h-full shadow-md rounded-lg p-1' src={props.product.imageUrl} width={100} height={100} alt="" />
          </div>
                <div className='px-1 flex flex-col gap-1'>
          <div className='flex font-semibold justify-between flex-col'>
              <p className='text-sm'>{props.product.name}</p>
              <span className='text-xs'>£{props.product.productPrice}</span>
          </div>
          <p className='text-xs'>{props.product.category}</p>
          
                </div>
        </div>
      <div className='flex items-center gap-2'>
          <button onClick={()=>setEditProduct(prev => !prev)} className='px-3 shadow-md bg-primaryColor text-secondaryColor hover:text-primaryColor py-2 text-sm w-[107px] hover:bg-secondaryColor'>Edit</button>
          <button onClick={()=>setDeleteProduct(prev => !prev)} className='px-3 shadow-md bg-red-600 text-white hover:text-primaryColor py-2 text-sm w-[107px] hover:bg-secondaryColor'>Delete</button>
        </div>
        {editProduct && <SlideOverForm product={props.product} openForm={editProduct} setOpenForm={setEditProduct} />}
        {deleteProduct && <DialogueBox product={props.product} openForm={deleteProduct} setOpenForm={setDeleteProduct} />}
    </div>
)
}

export default DashboardProduct