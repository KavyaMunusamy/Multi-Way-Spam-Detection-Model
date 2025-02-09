// import React from "react";
// import SpamDetector from "./SpamDetector";

// function App() {
//   return (
//     <div className="App">
//       {/* <Chatbot /> */}
//       <SpamDetector/>
//     </div>
//   );
// }

// export default App;
// import React, { useState } from "react";
// import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
// import Chatbot from "./Chatbot";
// import ImageAnalyzer from "./ImageAnalyzer";
// import Login from "./Login";
// import Signup from "./Signup";
// import SpamDetector from "./SpamDetector";
// import "./styles1.css"; // Import CSS file

// function App() {
//   const [activeTab, setActiveTab] = useState("spam"); // Default to Spam Detector

//   return (
//     <Router>
//       <div className="app-container">
//         {/* Navigation Buttons */}
//         <nav className="navbar">
//           <button
//             className={activeTab === "spam" ? "active" : ""}
//             onClick={() => setActiveTab("spam")}
//           >
//             Spam Detection
//           </button>
//           <button
//             className={activeTab === "chatbot" ? "active" : ""}
//             onClick={() => setActiveTab("chatbot")}
//           >
//             Chatbot
//           </button>
//           <button
//             className={activeTab === "image" ? "active" : ""}
//             onClick={() => setActiveTab("image")}
//           >
//             Image Analyzer
//           </button>
//         </nav>

//         {/* Render the selected component */}
//         <div className="content">
//           <Switch>
//             <Route path="/login" component={Login} />
//             <Route path="/signup" component={Signup} />
//             <Route
//               path="/"
//               render={() => (
//                 <>
//                   {activeTab === "spam" && <SpamDetector />}
//                   {activeTab === "chatbot" && <Chatbot />}
//                   {activeTab === "image" && <ImageAnalyzer />}
//                 </>
//               )}
//             />
//           </Switch>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;


import React, { useState } from "react";
import Chatbot from "./Chatbot";
import ImageAnalyzer from "./ImageAnalyzer";
import SpamDetector from "./SpamDetector";
import "./styles1.css"; // Import CSS file

function App() {
  const [activeTab, setActiveTab] = useState("spam"); // Default to Spam Detector

  return (
    <div className="app-container">
      {/* Navigation Buttons */}
      <nav className="navbar">
        <button
          className={activeTab === "spam" ? "active" : ""}
          onClick={() => setActiveTab("spam")}
        >
          Spam Detection
        </button>
        <button
          className={activeTab === "chatbot" ? "active" : ""}
          onClick={() => setActiveTab("chatbot")}
        >
          Chatbot
        </button>
        <button
          className={activeTab === "image" ? "active" : ""}
          onClick={() => setActiveTab("image")}
        >
          Image Analyzer
        </button>
      </nav>

      {/* Render the selected component */}
      <div className="content">
        {activeTab === "spam" && <SpamDetector />}
        {activeTab === "chatbot" && <Chatbot />}
        {activeTab === "image" && <ImageAnalyzer />}
      </div>
    </div>
  );
}

export default App;