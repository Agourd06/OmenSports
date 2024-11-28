import React from 'react'

export default function Input({name , type  , placeholder,onChange}) {
  return (
    <div className='relative flex items-center  max-w-md mx-auto mt-4'>
      <label htmlFor={name} className='text-[13px] bg-black text-[#fff] absolute px-2 top-[-10px] left-[18px]' >{placeholder}</label>
      <input  className="pl-4 pr-12 py-3.5 bg-black text-[#fff] w-full text-sm border-2 border-gray-700 focus:border-[#333] rounded outline-none" type={type} name={name}  placeholder={placeholder} onChange={onChange}/>
      <i className='bx bx-user w-[18px] h-[18px] absolute right-4'></i>
    </div>
  )
}
