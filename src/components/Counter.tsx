import { useCountStore } from 'src/store/user-store'

const Counter = () => {
  const { increment, decrement} = useCountStore.getState()
  const count = useCountStore(state => state.count);
    
  return (
    <div>
      <div className='w-[114px] h-[40px] rounded-lg grid grid-cols-3'>
      <span onClick={decrement} className='flex cursor-pointer items-center justify-center rounded-l-lg border'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
        </svg>
      </span>
        <p className='border text-center flex items-center justify-center '>{count}</p>
        
      <span onClick={increment} className={`bg-primaryColor cursor-pointer border rounded-r-lg flex items-center justify-center`}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4 text-white">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </span>
      </div>
    </div>
  )
}

export default Counter