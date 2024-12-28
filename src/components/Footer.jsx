import React from 'react';

export default function Footer() {
  return (
    <div className='relative p-1 bg-gradient-to-r from-[#4863e9] to-[#090f0b] font-bold text-center'>
      <h3 className='text-center font-bold'>
        <span className='text-orange-600'>Secret</span>{' '}
        <span className='text-green-500'>&lt;</span>
        <span className='text-green-500'>Codes/&gt;</span>
      </h3>
      <p className='text-slate-400 hover:scale-105 cursor-pointer'>
        Thanks for visiting my website
      </p>
    </div>
  );
}
