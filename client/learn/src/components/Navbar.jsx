/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Button } from "@mantine/core";
import { X, Menu } from "lucide-react";
import { useSelector } from "react-redux";
import ProfileDropDown from "./ProfileDropDown";
import LiveSearch from "./LiveSearch";
const Navbar = () => {
  const { authenticated } = useSelector((state) => state.auth);
  // console.log(import.meta.env.VITE_API_URL);
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="h-16 p-2 sticky top-0 z-50 bg-white backdrop-blur-md opacity-80">
      <div className="flex items-center justify-between mx-6">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-2*1 font-semibold"
        >
          NewsAI
        </motion.h1>

        <div className="w-1/3">
          <LiveSearch />
        </div>

        <ul className="hidden md:flex gap-4">
          {["Home", "Categories", "Channels", "About"].map((item) => (
            <motion.li
              //   initial={{ opacity: 0, y: -10 }}
              //   animate={{ opacity: 1, y: 0 }}
              //   transition={{ duration: 0.7 }}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 100 }}
              key={item}
            >
              <Link to={`/${item.toLowerCase()}`}>{item}</Link>
            </motion.li>
          ))}
        </ul>
        <div className="flex space-x-4 items-center ">
          {!authenticated && (
            <div className="flex gap-4">
              <Link to="/Login" className="hidden md:block">
                <Button variant="white" size="xs">
                  Login
                </Button>
              </Link>
              <Link to="/Register" className="hidden md:block">
                <Button variant="white" size="xs">
                  Register
                </Button>
              </Link>
            </div>
          )}

          {authenticated && <ProfileDropDown />}

          <button onClick={handleClick} className="md:hidden">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div>
          <ul className="md:hidden flex flex-col gap-4">
            {["Home", "Categories", "Channels", "About"].map((item) => (
              <motion.li
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 100 }}
                key={item}
              >
                <Link to={`/${item.toLowerCase()}`}>{item}</Link>
              </motion.li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
