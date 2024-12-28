import React from 'react'

function Navbar() {
  return (
    <nav className='bg-purple-500 flex justify-between items-center px-4
    h-14 py-5'>
        <div className=" block logo font-bold cursor-pointer
        relative text-2xl w-fit after:block after:content-[''] after:absolute after:h-[3px] after:bg-green-900 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left">
          <span className='text-green-900'>&lt;</span>
          VIJAY
          <span className='text-green-900'>/&gt;</span>
          </div>
        <button className='w-8 hover:animate-bounce cursor-pointer'><a href="https://github.com/vijay-pankaj">
          <img src="github.svg" alt="git-hub" /></a>
        </button>
    </nav>
  )
}

export default Navbar