import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full bg-white shadow-md p-6 flex justify-center items-center gap-4">
      <div
        onClick={()=>navigate('/')}
        className="py-2 px-3 font-bold transition"
      >
        <h1>Asteroids</h1>
      </div>
    </div>
  );
};

export default Navbar;
