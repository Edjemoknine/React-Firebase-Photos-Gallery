import React from "react";
import { useSelector } from "react-redux";
import ImageCard from "../components/ImageCard";

const Profile = () => {
  const { user } = useSelector((store) => store.gallery);
  const { allIMG } = useSelector((store) => store.gallery);

  const userIMG = allIMG.filter((img) => {
    return img.Id === user.uid;
  });

  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row gap-6 mt-28">
        <div className="flex gap-6 flex-col items-center  border-b-2 md:border-r-4 md:pr-6 border-gray-400 pb-3 md:border-b-0">
          <div className="image w-52 h-52 rounded-full shadow-2xl overflow-hidden bg-pink-500 p-2">
            <img
              className="w-full h-full rounded-full transition duration-300 hover:scale-105"
              src={user.photoURL}
              alt="Profile"
            />
          </div>
          <div className="Profile_Info flex flex-col gap-3 text-center">
            <h2 className="font-semibold capitalize my-2">
              {user.displayName}
            </h2>
            <p>{user.email}</p>
            <p>
              My colsollection has <b>{userIMG.length}</b> images
            </p>
          </div>
        </div>
        <div>
          <header className="mb-3 pb-3 ">
            <h2 className="current p-2 text-center ">My Images</h2>
          </header>
          <main>
            <div className="MyImages grid md:grid-cols-3 gap-3 sm:grid-cols-2">
              {userIMG.map((img) => {
                return <ImageCard image={img} key={img.id} />;
              })}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Profile;
