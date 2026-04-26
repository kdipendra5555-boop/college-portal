import studentImg from "../assets/student.png";

export default function Hero() {
  return (
    <div className="relative w-full min-h-screen flex items-start md:items-center px-6 md:px-12 pt-6 md:py-12 overflow-hidden bg-gradient-to-r from-white via-purple-50 to-blue-50">

      {/* 🔥 Background Image */}
      <img
        src={studentImg}
        alt="student"
        className="
        absolute 
        right-0 
        top-auto md:top-1/2 
        bottom-0 md:bottom-auto
        md:-translate-y-1/2
        w-screen md:w-[700px] lg:w-[900px]
        max-w-none object-contain 
        opacity-90 pointer-events-none select-none
        "
      />

      {/* 🔹 Left Content */}
      <div className="relative z-10 max-w-xl text-center md:text-left">

        <p className="text-purple-500 font-medium text-sm md:text-base">
          Hey, Student 👋
        </p>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mt-3">
          Let’s Study <br />
          <span className="bg-gradient-to-r from-blue-600 to-pink-500 bg-clip-text text-transparent">
            Smart & Fun!
          </span>
        </h1>

        <p className="text-gray-500 mt-4 md:mt-5 text-sm sm:text-base md:text-lg leading-relaxed">
          All your study materials, assignments, notes and more — all in one place.
        </p>

        <button className="mt-6 md:mt-7 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm md:text-base shadow-md hover:scale-105 transition">
          🚀 Keep Learning
        </button>

        <div className="mt-8 md:mt-10 p-4 md:p-5 rounded-2xl bg-white/80 backdrop-blur border shadow-sm max-w-md mx-auto md:mx-0">
          <p className="text-gray-600 text-sm">
            “The beautiful thing about learning is nobody can take it away from you.”
          </p>
          <p className="text-blue-600 text-sm mt-2 font-medium">
            – B.B. King
          </p>
        </div>

      </div>

    </div>
  );
}