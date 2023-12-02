import React, { useEffect, useState } from "react";
import { auth, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const inialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const Auth = () => {
  const [signin, setSignIn] = useState(true);
  const [state, setState] = useState(inialState);
  const [file, setFile] = useState(null);
  const [percentage, setPercentage] = useState(0);
  const navigate = useNavigate();
  const { firstName, lastName, email, password, confirmPassword } = state;
  console.log(auth);
  const handlechange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  console.log(file);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (signin) {
      if (email && password) {
        // LogIn In My Account
        await signInWithEmailAndPassword(auth, email, password).then((data) => {
          console.log(data);
        });
      }
    } else {
      // Create New User
      if (email && firstName && password === confirmPassword) {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await updateProfile(user, {
          displayName: `${firstName} ${lastName}`,
          photoURL: `${state.ImgUrl}`,
        });

        toast.success("You been Logged successfuly !");
      }
    }
    navigate("/");
  };
  //==Upload Image=============================
  useEffect(() => {
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
            setState((prev) => ({ ...prev, ImgUrl: downloadUrl }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  return (
    <div className="container mx-auto">
      <div className="auth_container border p-6 mt-10 rounded-lg">
        <h1 className="text-center mb-6 text-gray-600 text-3xl font-bold">
          {signin ? " Sign In" : "Sign Up"}
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex w-full items-center  flex-col justify-center"
        >
          {!signin && (
            <div className="w-full flex gap-3 items-center justify-between">
              <input
                onChange={handlechange}
                className="w-full mb-4 border p-2 rounded"
                type="text"
                name="firstName"
                placeholder="first Name"
              />{" "}
              <input
                onChange={handlechange}
                className="w-full mb-4 border p-2 rounded"
                type="text"
                name="lastName"
                placeholder="Last Name"
              />
            </div>
          )}
          <input
            className="w-full mb-4 border p-2 rounded"
            type="email"
            placeholder="Email"
            name="email"
            onChange={handlechange}
          />
          <input
            className="w-full mb-4 border p-2 rounded"
            type="password"
            placeholder="Password"
            name="password"
            onChange={handlechange}
          />
          {!signin && (
            <div className="w-full flex gap-3 items-center justify-between">
              <div className="w-full flex gap-3 items-center justify-between">
                <input
                  onChange={handlechange}
                  className="w-full mb-4 border p-2 rounded"
                  type="password"
                  name="confirmPassword"
                  placeholder="confirm Password"
                />{" "}
                <input
                  onChange={(e) => setFile(e.target.files[0])}
                  className="w-full mb-4 border p-2 rounded"
                  type="file"
                  // disabled
                  placeholder="Profile Image"
                />
              </div>
            </div>
          )}

          {signin ? (
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 px-5 hover:bg-blue-400 rounded-md inline-block w-fit "
            >
              Sign In
            </button>
          ) : (
            <button
              disabled={percentage === 0 || percentage < 100}
              type="submit"
              className="bg-blue-500 text-white p-2 px-5 hover:bg-blue-400 rounded-md inline-block w-fit "
            >
              Sign Up
            </button>
          )}
          <div className="mt-3 capitalize flex gap-2 text-gray-500">
            I already have an account
            <p
              onClick={() => setSignIn(!signin)}
              className="text-blue-500 cursor-pointer"
            >
              {signin ? "Sign Up" : "Sign In"}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
