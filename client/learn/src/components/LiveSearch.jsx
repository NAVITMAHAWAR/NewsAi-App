// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef } from "react";
import { TextInput } from "@mantine/core";
import { Loader, Search } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

const LiveSearch = () => {
  const searchRef = useRef();
  console.log(searchRef);

  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dropDown, setDropDown] = useState(false);

  console.log(query);

  useEffect(() => {
    const handleClickOutside = (event) => {
      console.log(searchRef.current);
      console.log(searchRef.current.contains(event.target));
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setDropDown(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length < 1) {
      setDropDown(false);
      setResult([]);
      return;
    }

    const fetchData = async () => {
      setDropDown(true);
      setLoading(true);
      try {
        const res = await axios.get(
          `https://newsapi.org/v2/everything?q=${query}&apiKey=ce768252cadf41288180b08569a9f12d`
        );
        console.log(res.data);
        setResult(res.data.articles);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    const timeOut = setTimeout(() => {
      fetchData();
    }, 1000);
    return () => clearTimeout(timeOut);
  }, [query]);

  return (
    <motion.div
      className="relative"
      ref={searchRef}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 15 }}
    >
      <TextInput
        radius={20}
        placeholder="Search..."
        leftSection={<Search size={16} />}
        onChange={(e) => setQuery(e.target.value)}
      />
      <AnimatePresence>
        {dropDown && (
          <motion.div
            className="absolute p-2 mt-2 max-h-[300px] overflow-y-scroll w-full bg-white shadow rounded-sm"
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {loading ? (
              <motion.div
                className="flex px-4 py-8 items-center justify-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Loader size={20} />
                <p>Searching</p>
              </motion.div>
            ) : result.length > 0 ? (
              <motion.div
                className="flex flex-col gap-2"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.07,
                    },
                  },
                }}
              >
                {result?.map((d) => (
                  <motion.a
                    href={d.url}
                    target="_blank"
                    className="flex items-center gap-4 hover:bg-gray-200 p-2 rounded-sm cursor-pointer"
                    key={d.url}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <img
                      className="h-16 w-16 object-cover rounded-sm"
                      src={d.urlToImage || "https://placehold.co/16x16"}
                      alt={d.title}
                      style={{ width: 50, height: 50, objectFit: "cover" }}
                    />
                    <p>{d.title}</p>
                  </motion.a>
                ))}
              </motion.div>
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                No result found
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LiveSearch;
