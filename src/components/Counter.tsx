import React, { useEffect, useState } from 'react'
import { useCountStore } from 'src/store/user-store'

const Counter = () => {
  const {setCount} = useCountStore.getState()
  const [value, setValue] = useState(1)

    const reduceCount = ()=>{
      setValue((prev: number) => {
            if(prev > 1){
                return prev - 1
            } else {
                return prev
            }
        })
    }

    useEffect(()=> {
      setCount(value)
    }, [value, setCount])
    
  return (
    <div>
      <div className='w-[114px] h-[40px] rounded-lg grid grid-cols-3'>
      <span onClick={()=>reduceCount()} className='flex cursor-pointer items-center justify-center rounded-l-lg border'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
            </svg>
        </span>
        <p className='border text-center flex items-center justify-center '>{value}</p>
        
        <span onClick={()=>setValue(prev=> prev + 1)} className={`bg-primaryColor cursor-pointer border rounded-r-lg flex items-center justify-center`}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4 text-white">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
        </span>
      </div>
    </div>
  )
}

export default Counter