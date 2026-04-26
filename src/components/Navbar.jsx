import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="w-full flex items-center justify-between px-4 md:px-8 py-3 md:py-4 
      bg-white border-b border-gray-200">

        {/* 🔹 Left */}
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
            <span className="text-blue-600 text-lg md:text-xl">🎓</span>
          </div>

          <h1 className="text-sm md:text-lg font-semibold text-gray-800">
            Paper   Portal
          </h1>
        </div>

        {/* 🔹 Right */}
        <div className="flex items-center gap-3 md:gap-5">

          {/* Profile */}
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 
            text-white flex items-center justify-center text-xs md:text-sm font-medium">
              S
            </div>

            <span className="hidden md:block text-sm text-gray-700">
              Student
            </span>
          </div>

          {/* Button */}
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-xl 
            bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs md:text-sm 
            shadow-md hover:scale-105 transition"
          >
            <span className="md:hidden">✈️</span>
            <span className="hidden md:inline">Submit Paper</span>
          </button>

        </div>
      </div>

      {/* 🔥 MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-xl text-center space-y-4">

            <h2 className="text-xl font-bold text-gray-800">
              📤 Submit Paper
            </h2>

            <p className="text-gray-600 text-sm">
              You can submit your paper via:
            </p>

            {/* WhatsApp */}
            <div className="p-3 rounded-xl bg-green-50 text-green-700 font-medium">
              📱 WhatsApp: 9876543210
            </div>

            {/* Email */}
            <div className="p-3 rounded-xl bg-blue-50 text-blue-700 font-medium">
              📧 Email: submit@college.com
            </div>

            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="mt-4 px-5 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Close
            </button>

          </div>

        </div>
      )}
    </>
  );
}