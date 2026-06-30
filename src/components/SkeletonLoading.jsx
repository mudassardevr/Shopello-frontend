import React from 'react'

function SkeletonLoading() {
  return (
    <>
     <div className="bg-white rounded-xl p-4 shadow-md animate-pulse">
      <div className="w-full h-52 bg-gray-200 rounded-lg"></div>

      <div className="h-5 bg-gray-200 rounded mt-4"></div>

      <div className="h-4 bg-gray-200 rounded mt-3 w-1/2"></div>

      <div className="h-10 bg-gray-200 rounded mt-4 w-32"></div>
    </div>
    </>
    
  )
}

export default SkeletonLoading
