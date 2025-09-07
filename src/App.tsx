import { useState } from "react";
import "./App.css";
import { Navbar } from "./components/Navbar";
import testContent from "./assets/test";

function App() {
  return (
    <>
      {/* NAVBAR */}
      <Navbar />

      {/* MAPPING */}
      <div className="pt-10 grid grid-cols-4 gap-4">
        {testContent.map((item, index) => (
          <div
            key={index}
            className="relative flex items-start aspect-square border mb-2 cursor-pointer hover:opacity-50 overflow-hidden"
          >
            {item.image && <img className="w-full h-full object-cover opacity-20" src={item.image} alt="" />}
            <div className="absolute p-6 top-0 left-0">{item.content}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
