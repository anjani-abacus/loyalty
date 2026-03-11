import notFound from "../../public/notFound.png"
export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center">
        {/* 404 Header */}
        
        <div className=" flex items-center justify-center  ">
{/* <div className="absolute left-1/4 top-16 bg-blue-100 text-blue-400 px-6 py-2 rounded-full text-lg font-medium">
              Oops!
            </div> */}
            <img src={notFound} alt="notfound" className=" h-80 w-auto " />
        
        </div>

          <h2 className="text-3xl md:text-4xl font-bold text-orange-500 mb-1">
            Data Not Found
          </h2>
          <p className="text-gray-500  text-lg">
            Sorry, we were unable to find that page
          </p>
          {/* <p className="text-gray-500 mt-2">
            Please use main menu or choose from category below
          </p> */}
        {/* </div> */}

        {/* Illustration */}
        <div className="relative mt-12 mb-8">
          <div className="flex justify-center items-end gap-8 relative">

            {/* Oops bubble */}
            

            
            
            {/* Decorative triangles */}
            <div className="absolute right-1/4 top-0 w-8 h-8 border-2 border-blue-200 transform rotate-45"></div>
            <div className="absolute left-1/3 top-12 w-6 h-6 border-2 border-blue-200 transform rotate-45"></div>
          </div>

          {/* Wave decoration */}
          <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1200 100" preserveAspectRatio="none">
            <path d="M0,50 Q300,20 600,50 T1200,50 L1200,100 L0,100 Z" fill="#bfdbfe" opacity="0.3" />
          </svg>
        </div>

        {/* Action buttons */}
        {/* <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <button className="px-8 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors">
            Go to Homepage
          </button>
          <button className="px-8 py-3 bg-white text-gray-700 border-2 border-gray-300 rounded-lg font-semibold hover:border-gray-400 transition-colors">
            Contact Support
          </button>
        </div> */}
      </div>
    </div>
  );
}