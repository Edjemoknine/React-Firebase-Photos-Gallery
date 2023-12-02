import React, { useEffect, useState } from "react";
import lake from "../images/lake.jpg";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { motion } from "framer-motion";

const UploadImage = () => {
  const [file, setFile] = useState(null);
  const [state, setState] = useState({});
  const [percentage, setPercentage] = useState(0);
  const [name, setName] = useState("");
  const { user } = useSelector((store) => store.gallery);
  const handlechange = (e) => {
    if (!user) {
      return toast.error(
        "Please SignUp and get accuont before Uploading Images  "
      );
    } else {
      setFile(e.target.files[0]);
      setName(e.target.files[0].name.split("."));
    }
  };

  //==Upload Image==== and add to firestore=========================
  useEffect(() => {
    if (!user) {
      return;
    }
    const uploadFile = () => {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (onSnapshot) => {
          const progress =
            (onSnapshot.bytesTransferred / onSnapshot.totalBytes) * 100;
          setPercentage(progress);
        },
        (error) => {
          console.log("Error", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            toast.success("Image has been uploaded seccessfuly");
            // setState((prev) => ({ ...prev, ImgUrl: downloadUrl }));

            addDoc(collection(db, "Gallery"), {
              ...state,
              ImgUrl: downloadUrl,
              Title: name && name[0],
              timestamp: serverTimestamp(),
              author: user.displayName,
              Id: user.uid,
            });
            setPercentage(0);
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  return (
    <div
      className="h-screen w-full relative"
      style={{
        background: `url(${lake})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
      }}
    >
      <div className="overlay absolute w-full h-full top-0 left-0"></div>
      <div className="header w-full text-gray-100 text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.h1
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold mb-3"
        >
          WELCOME TO <span className="font-thin">PHOTOSNAP</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-sm uppercase text-gray-200 leading-7 "
        >
          Upload Your Photos And Share Them With Other
        </motion.p>
        <motion.span
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          viewport={{ once: true }}
          className="font-semibold text-pink-400 border-b-2 border-pink-400"
        >
          In PHOTOSNAP
        </motion.span>
        <motion.form
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="mt-16"
        >
          <input
            className="upload"
            type="file"
            id="upload"
            disabled={percentage !== 0}
            onChange={handlechange}
          />
          <label htmlFor="upload">
            <p className="font-bold text-5xl -mt-1 hover:text-pink-500">+</p>
          </label>
          <span>Upload</span>
          <div className="loading">
            <motion.div
              className="progress"
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
            ></motion.div>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default UploadImage;
