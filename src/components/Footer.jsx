import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // 🔥 👉 APNA LOGIN YAHAN SET KAR
  const ADMIN_EMAIL = "adminaitdkanpur@gmail.com";
  const ADMIN_PASS = "aitdkanpur@#$54321";

  const handleLogin = () => {
    if (email === ADMIN_EMAIL && pass === ADMIN_PASS) {
      setError("");
      setOpen(false);
      navigate("/love");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <>
      <footer className="w-full py-16 flex justify-center items-center bg-gradient-to-b from-white via-gray-50 to-white">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative px-10 py-6 rounded-full border bg-white/60 backdrop-blur-xl shadow-xl flex items-center gap-4"
        >
          {/* Text */}
          <span className="text-gray-700 text-lg flex gap-2 items-center">
            In love with
            <span className="font-bold text-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              dops
            </span>
          </span>

          {/* ❤️ Click */}
          <motion.div
            onClick={() => setOpen(true)}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
            className="cursor-pointer"
          >
            <Heart className="text-red-500 fill-red-500" size={26} />
          </motion.div>
        </motion.div>

      </footer>

      {/* 🔥 LOGIN MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white p-6 rounded-xl shadow w-80 space-y-4">

            <h2 className="text-xl font-bold">Login 🔐</h2>

            <input
              placeholder="Email"
              className="w-full border px-3 py-2 rounded"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border px-3 py-2 rounded"
              onChange={(e) => setPass(e.target.value)}
            />

            {/* ❌ Error */}
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <button
              onClick={handleLogin}
              className="w-full bg-blue-500 text-white py-2 rounded"
            >
              Login
            </button>

            <button
              onClick={() => setOpen(false)}
              className="w-full text-gray-500"
            >
              Cancel
            </button>

          </div>
        </div>
      )}
    </>
  );
}