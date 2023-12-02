import React, { useEffect, useState } from "react";
import ImageCard from "./ImageCard";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { GetAllImages } from "../container/Slices/GallerySlice";
import { motion } from "framer-motion";

const Gallery = () => {
  const { allIMG } = useSelector((store) => store.gallery);
  const dispatch = useDispatch();

  // Get All Images From Firestore Gallery
  useEffect(() => {
    const q = query(collection(db, "Gallery"));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let arrBlogs = [];
      QuerySnapshot.forEach((doc) => {
        arrBlogs = [...arrBlogs, { ...doc.data(), id: doc.id }];
      });
      dispatch(GetAllImages(arrBlogs));
    });

    return () => unsubscribe();
  }, []);

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      layout
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 "
    >
      {allIMG.map((image) => {
        return <ImageCard image={image} key={image.id} />;
      })}
    </motion.div>
  );
};

export default Gallery;
