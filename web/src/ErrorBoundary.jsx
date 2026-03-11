// import React, { Component } from "react";

// class ErrorBoundary extends Component {
//   state = { error: null };

//   static getDerivedStateFromError(error) {
//     return { error };
//   }

//   componentDidCatch(error, info) {
//     console.error("Error caught by ErrorBoundary:", error);
//     console.error("Error details:", info);
//   }

//   render() {
//     if (this.state.error) {
//       // Custom fallback UI
//       return (
//         <div className="flex flex-col items-center justify-center h-screen text-center">
//           <h1 className="text-2xl font-bold text-red-600 mb-4">
//             Something went wrong 😢
//           </h1>
//           <p className="text-gray-600 mb-6">
//             An unexpected error occurred. Please try again later.
//           </p>
//           <button
//             onClick={() => window.location.reload()}
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
//           >
//             Reload Page
//           </button>
//         </div>
//       );
//     }

//     // Render children normally if no error
//     return this.props.children;
//   }
// }

// export default ErrorBoundary;
