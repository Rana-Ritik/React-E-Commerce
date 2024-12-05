import React from 'react'

import data2 from './watchesdata'


const Singlewatches = ({watchesdata}) => {
  return (
    

   <div className='h-[500px] w-[100%]  flex gap-3 mt-36'>
     <div className='h-[400px] w-[20%]  ml-4 '>
         <div className='h-[100px] w-[100%]  mt-20 font-semibold text-5xl'><h1 className='h-[100px] w-[100%]'>{watchesdata.brand} </h1></div>
         <div className='h-[200px] w-[100%] -50 mt-4'><img className='h-[200px] w-[100%]' src={watchesdata.brandimage}></img></div>
     </div>
     <div className='h-[500px] w-[50%]  flex'>
         <div className='h-[300px] w-[40%]  ml-4 mt-20'><img className='h-[300px] w-[100%]' src={watchesdata.image}></img></div>
         <div className='h-[420px] w-[54%]  ml-4 mt-20'>
             <div className='h-[70px] w-[100%]  font-semibold text-2xl '>
                 <h1 className='h-[70px] w-[100%]'>{watchesdata.name}</h1>
             </div>
             <div className='h-[50px] w-[100%]  flex gap-2'>
                 <div className='h-[50px] w-[30%] font-semibold'><h1>PRICE</h1></div>
                 <div className='h-[50px] w-[70%]  font-semibold'>{watchesdata.price}</div>
             </div>
             <div className='h-[50px] w-[100%]  flex gap-2'>
                 <div className='h-[50px] w-[30%]  font-semibold'><h1>WATER RESISTANCE</h1></div>
                 <div className='h-[50px] w-[70%]  font-semibold'>{watchesdata.WaterResistant}</div>
             </div>
             <div className='h-[50px] w-[100%] flex gap-2'>
                 <div className='h-[50px] w-[30%]  font-semibold'><h1>USAGE</h1></div>
                 <div className='h-[50px] w-[70%]  font-semibold'>{watchesdata.Usage}</div>
             </div>
             <div className='h-[50px] w-[100%]  flex gap-2'>
                 <div className='h-[50px] w-[30%]  font-semibold'><h1>SENSOR</h1></div>
                 <div className='h-[50px] w-[70%]  font-semibold'>{watchesdata.Sensor}</div>
             </div>
            
             <div className='h-[50px] w-[100%]  flex gap-2'>
                 <div className='h-[50px] w-[30%]  font-semibold'><h1>Resolution Type</h1></div>
                 <div className='h-[50px] w-[70%]  font-semibold'>Super Retina XDR Display</div>
             </div>
             <div className='h-[50px] w-[100%]  flex gap-2'>
                 <div className='h-[50px] w-[30%]  font-semibold'><h1>Display Type</h1></div>
                 <div className='h-[50px] w-[70%]  font-semibold'>All Screen OLED Display</div>
             </div>
         </div>
     </div>
     <div className='h-[400px] w-[20%] flex gap-2'>
         <div className='h-[100px] w-[40%]  font-semibold text-2xl ml-4 mt-20'>PRICE</div>
         <div className='h-[100px] w-[40%]  font-semibold text-2xl  ml-4 mt-20'>{watchesdata.price}</div>
     </div>
   </div>
  

  )
}

export default Singlewatches
