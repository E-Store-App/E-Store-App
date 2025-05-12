import React from 'react'
import { FaBell, FaEnvelope } from "react-icons/fa";

export const HomePage = () => {
  return (
    <div className="max-w-sm mx-auto p-4 pb-20 relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">E-Store</h1>
        <div className="flex space-x-3 text-xl">
          <FaBell />
          <FaEnvelope />
        </div>
      </div>
      {/* Story Bar */}
      {/* <StoryBar /> */}
      {/* <div className='gird gap-4 md:grid-cols-2 lg:grid-cols-3'>
<ProductCard/>
<ProductCard/>
<ProductCard/>
      </div> */}
       <div className="space-y-4">
        {/* <ProductCard/> */}
     <div className="flex justify-between mt-2">
          <button className="text-sm bg-gray-200 px-4 py-1 rounded">Back</button>
          <button className="text-sm bg-blue-600 text-white px-4 py-1 rounded">Next</button>
        </div>
      </div>

      {/* <BottomNav /> */}
    </div>
  )
}


// import BottomNav from '../Components/BottomNav';

// import { useNavigate } from "react-router-dom";
// import StoryBar from '../Components/StoryBar';
// import ProductCard from '../Components/ProductCard';
