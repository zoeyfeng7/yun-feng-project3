import React from "react";

function Account() {
  return (
    <div className="w-full h-screen bg-[#1a1a1a] text-white flex justify-center items-center">
      <div className="AddingPassword">
        <input type="text" placeholder="Ex. user123" />
        <input type="text" placeholder="Ex. password" />
        <button>Add Password</button>
      </div>
    </div>
  );
}

export default Account;
