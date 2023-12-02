import React from "react";
import { AiFillEye } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
// import { saveAs } from "file-saver";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { db } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";

const ImageCard = ({ image }) => {
  const location = useLocation();

  const handleDelete = async () => {
    await deleteDoc(doc(db, "Gallery", image.id));
    console.log(image.id);
    console.log(image);
  };

  return (
    <motion.div layout className="gmimg relative overflow-hidden h-80">
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        src={image.ImgUrl}
        alt={image.Title}
        className="hover:scale-105 w-full h-full object-cover transition duration-700 ease-in-out cursor-pointer"
      />
      {location.pathname === "/" && (
        <div className="Glass save absolute text-white flex items-center justify-around -top-16 w-10 h-10 right-0 text-center pt-1 transition-all duration-300 ease-linear">
          <a href={image.ImgUrl} download={"image"}>
            <AiFillEye
              // onClick={downloadImage}
              className="cursor-pointer"
            />
          </a>
        </div>
      )}
      <div className="Glass ImgTools absolute px-4 text-white flex items-center justify-center -bottom-16 w-full h-14 left-0 text-center pt-1 transition-all duration-300 ease-linear">
        <p className="uppercase  font-mono font-semibold  text-base">
          Tayaki <span className="font-extralight">Vegan</span>
        </p>
        {location.pathname !== "/" && (
          <div className="ml-auto transition-all font-bold text-xl hover:text-red-500 duration-300 ease-linear">
            <BsTrash onClick={handleDelete} className="cursor-pointer" />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ImageCard;
