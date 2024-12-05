import React from 'react'

const Defaultexport = () => {
  return (
    <div className='h-[40px] w-full rounded-lg bg-teal-500 m-3'>
      <h1 className=''>this is default export</h1>
    </div>
  )
}
const Nameexport1 = () => {
    return (
      <div className='h-[40px] w-full rounded-lg bg-teal-500 m-3'>
        <h1 className=''>this is named export</h1>
      </div>
    )
  }
  const Nameexport2 = () => {
    return (
      <div className='h-[40px] w-full rounded-lg bg-teal-500 m-3'>
        <h1 className=''>this is named export</h1>
      </div>
    )
  }

export default Defaultexport
export{ Nameexport1, Nameexport2}
