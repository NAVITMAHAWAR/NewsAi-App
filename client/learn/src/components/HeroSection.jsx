// eslint-disable-next-line no-unused-vars
import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const HeroSection = () => {
  return (
    <div>
      <section className="relative h-[70vh]  text-black flex items-center justify-center px-6 text-center overflow-hidden">
        <div className="absolute inset-0  opacity-80 blur-3xl" />

        <div className="relative z-10 max-w-4xl">
          <motion.h1
            className="text-4xl md:text-7xl font-[900] leading-tight"
            style={{ fontFamily: "PolySans Bulky" }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            AI That <span className="text-sky-400">Curates</span> News For You
          </motion.h1>

          <motion.p
            className="mt-6 text-lg md:text-xl text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Get real-time breaking news, AI-powered summaries, and personalized
            recommendations. Stay informed with deep insights, trending stories,
            and expert analysis—all in one place.
          </motion.p>

          <motion.div
            className="mt-8 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <button className="bg-sky-500 cursor-pointer text-white px-8 py-4 text-lg font-semibold rounded-lg hover:bg-sky-600 transition-transform transform hover:scale-105 duration-200 flex items-center">
              <Sparkles className="mr-2 animate-pulse" size={24} /> Start
              Exploring
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;

// // eslint-disable-next-line no-unused-vars
// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { Sparkles, Newspaper, Globe, Lightbulb } from "lucide-react";

// const keywords = [
//   { word: "Curates", color: "text-sky-400" },
//   { word: "AI", color: "text-purple-500" },
// ];

// const headline = ["AI That", "Curates News", "For You"];

// const icons = [Newspaper, Globe, Lightbulb];

// const bgGradientLight = "bg-gradient-to-br from-white via-sky-50 to-sky-100";
// const bgGradientDark =
//   "bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155]";

// const HeroSection = () => {
//   const [dark, setDark] = useState(false);

//   return (
//     <div className={dark ? "dark" : ""}>
//       <section
//         className={`relative h-[70vh] flex items-center justify-center px-6 text-center overflow-hidden transition-colors duration-500 ${
//           dark ? bgGradientDark : bgGradientLight
//         }`}
//       >
//         {/* Animated floating icons */}
//         <div className="absolute inset-0 pointer-events-none">
//           {icons.map((Icon, i) => (
//             <motion.div
//               key={i}
//               className="absolute"
//               style={{
//                 top: `${20 + i * 20}%`,
//                 left: `${10 + i * 25}%`,
//                 opacity: 0.15,
//                 zIndex: 1,
//               }}
//               animate={{
//                 y: [0, -20, 0],
//                 rotate: [0, 10, -10, 0],
//               }}
//               transition={{
//                 repeat: Infinity,
//                 duration: 8 + i * 2,
//                 ease: "easeInOut",
//               }}
//             >
//               <Icon
//                 size={64}
//                 className={dark ? "text-white" : "text-sky-400"}
//               />
//             </motion.div>
//           ))}
//         </div>

//         {/* Gradient overlay */}
//         <motion.div
//           className="absolute inset-0 z-0"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 0.7 }}
//           transition={{ duration: 1 }}
//           style={{
//             background: dark
//               ? "radial-gradient(circle at 60% 40%, #334155 0%, transparent 70%)"
//               : "radial-gradient(circle at 60% 40%, #38bdf8 0%, transparent 70%)",
//             filter: "blur(60px)",
//           }}
//         />

//         <div className="relative z-10 max-w-4xl mx-auto">
//           {/* Headline with animated entrance */}
//           <motion.h1
//             className="text-4xl md:text-7xl font-extrabold leading-tight mb-4"
//             style={{ fontFamily: "PolySans Bulky" }}
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//           >
//             {headline.map((line, idx) => (
//               <motion.span
//                 key={idx}
//                 className="block"
//                 initial={{ opacity: 0, x: -30 * (idx + 1) }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{
//                   delay: 0.2 + idx * 0.18,
//                   duration: 0.7,
//                   type: "spring",
//                   stiffness: 80,
//                 }}
//               >
//                 {line.split(" ").map((word, i) => {
//                   const highlight = keywords.find((k) => k.word === word);
//                   return (
//                     <span key={i} className={highlight ? highlight.color : ""}>
//                       {word}
//                       {i < line.split(" ").length - 1 ? " " : ""}
//                     </span>
//                   );
//                 })}
//               </motion.span>
//             ))}
//           </motion.h1>

//           {/* Subheading */}
//           <motion.p
//             className="mt-4 text-lg md:text-2xl text-gray-600 dark:text-gray-300 font-medium"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.6, duration: 0.8 }}
//           >
//             Real-time breaking news, AI-powered summaries, and personalized
//             recommendations. Stay ahead with trending stories and expert
//             insights.
//           </motion.p>

//           {/* CTA Button */}
//           <motion.div
//             className="mt-8 flex justify-center"
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: 1, duration: 0.6 }}
//           >
//             <button className="bg-sky-500 dark:bg-purple-600 cursor-pointer text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:bg-sky-600 dark:hover:bg-purple-700 transition-all duration-200 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-sky-400 dark:focus:ring-purple-400">
//               <Sparkles className="animate-pulse" size={24} />
//               Start Exploring
//             </button>
//           </motion.div>

//           {/* Theme toggle */}
//           <div className="absolute top-6 right-6">
//             <button
//               aria-label="Toggle theme"
//               className="bg-white/80 dark:bg-gray-800/80 rounded-full p-2 shadow hover:scale-110 transition"
//               onClick={() => setDark((d) => !d)}
//             >
//               {dark ? (
//                 <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
//                   <path
//                     d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.07l-.71.71m16.97 0l-.71-.71M4.05 4.93l-.71-.71M21 12h-1M4 12H3"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                   />
//                   <circle
//                     cx="12"
//                     cy="12"
//                     r="5"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                   />
//                 </svg>
//               ) : (
//                 <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
//                   <path
//                     d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                   />
//                 </svg>
//               )}
//             </button>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default HeroSection;
