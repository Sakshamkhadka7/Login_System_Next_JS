import React from 'react'

const Header = () => {
  return (
    <header className="py-2 px-1 flex justify-between bg-white min-h-5 shadow-lg text-green-950 text-xl font-bold">
          <div>
            <div className="py-2 px-2 mx-2  border-b-2 border-transparent hover:border-b-green-400">
              Home
            </div>
          </div>

          <div className="py-2 px-1 flex justify-center items-center gap-8 mr-2.5">
            <div className="border-b-3 border-transparent hover:border-b-green-400">
              About us
            </div>
            <div className="border-b-3 border-transparent hover:border-b-green-400">
              Service
            </div>
            <div className="border-b-3 border-transparent hover:border-b-green-400">
              Contact Us
            </div>
          </div>
        </header>
  )
}

export default Header