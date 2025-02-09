// import { useState } from "react";

// export default function SpamDetector() {
//   const [message, setMessage] = useState("");
//   const [prediction, setPrediction] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const response = await fetch("/predict", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ message }),
//     });
//     const data = await response.json();
//     setPrediction(data.prediction);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-6 rounded-xl shadow-lg w-96 text-center">
//         <h1 className="text-3xl font-bold text-red-500 mb-4">Spam⚠️ Detector</h1>
//         <form onSubmit={handleSubmit}>
//           <textarea
//             className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             rows="6"
//             placeholder="Enter your message..."
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             required
//           ></textarea>
//           <button
//             type="submit"
//             className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
//           >
//             Predict
//           </button>
//         </form>
//         {prediction !== null && (
//           <div className="mt-4">
//             {prediction === 1 ? (
//               <h2 className="text-red-600 text-lg font-bold">Looking Spam⚠️, Be Safe</h2>
//             ) : (
//               <h2 className="text-green-600 text-lg font-bold">Not a Spam💚</h2>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import { useState } from "react";

export default function SpamDetector() {
  const [message, setMessage] = useState("");
  const [prediction, setPrediction] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://127.0.0.1:5000/predict", { // Ensure Flask URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      setPrediction(data.prediction);
      
    } catch (error) {
      console.error("Error fetching prediction:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96 text-center">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Spam⚠️ Detector</h1>
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="6"
            placeholder="Enter your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
          <button
            type="submit"
            className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Predict
          </button>
        </form>
        {prediction !== null && (
          <div className="mt-4">
            {prediction === 1 ? (
              <h2 className="text-red-600 text-lg font-bold">Looking Spam⚠️, Be Safe</h2>
            ) : (
              <h2 className="text-green-600 text-lg font-bold">Not a Spam💚</h2>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
