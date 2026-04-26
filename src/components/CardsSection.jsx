import { Link } from "react-router-dom";
import {
  BookOpen,
  ClipboardList,
  FileText,
} from "lucide-react";

export default function CardsSection() {
  const cards = [
    {
      title: "Semester",
      desc: "Browse semester wise materials and resources.",
      color: "blue",
      path: "/semester",
      icon: <BookOpen size={22} />,
    },
    {
      title: "CT",
      desc: "Access Class Test papers and previous papers.",
      color: "green",
      path: "/ct",
      icon: <ClipboardList size={22} />,
    },
    {
      title: "Notes",
      desc: "Access important notes and study materials.",
      color: "cyan",
      path: "/notes",
      icon: <FileText size={22} />,
    },
  ];

  const styles = {
    blue: "from-blue-50 to-white border-blue-100",
    green: "from-green-50 to-white border-green-100",
    cyan: "from-cyan-50 to-white border-cyan-100",
  };

  const iconBg = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    cyan: "bg-cyan-100 text-cyan-600",
  };

  const btn = {
    blue: "bg-blue-500 hover:bg-blue-600",
    green: "bg-green-500 hover:bg-green-600",
    cyan: "bg-cyan-500 hover:bg-cyan-600",
  };

  return (
    <div className="w-full px-6 md:px-12 py-14 bg-gradient-to-b from-white to-gray-50">

      {/* 🔥 FULL WIDTH GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">

        {cards.map((card, i) => (
          <Link
            to={card.path}
            key={i}
            className={`group relative p-6 rounded-2xl border bg-gradient-to-br ${styles[card.color]} 
            backdrop-blur transition duration-300 hover:-translate-y-2 hover:shadow-2xl`}
          >
            {/* Glow */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-white/40 blur-xl"></div>

            <div className="relative z-10">

              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBg[card.color]} shadow`}
              >
                {card.icon}
              </div>

              {/* Title */}
              <h3 className="mt-4 text-lg font-semibold text-gray-800">
                {card.title}
              </h3>

              {/* Desc */}
              <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                {card.desc}
              </p>

              {/* Button */}
              <div className="mt-6">
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full text-white transition-transform group-hover:translate-x-1 ${btn[card.color]}`}
                >
                  →
                </div>
              </div>

            </div>
          </Link>
        ))}

      </div>

    </div>
  );
}