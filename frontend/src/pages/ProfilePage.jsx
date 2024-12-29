import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const {
    authUser,
    isUpdatingProfile,
    isUpdatingName,
    profileUpdate,
    nameUpdate,
  } = useAuthStore();
  const [input, setInput] = useState("");

  const handleProfileUpdate = async (event) => {
    event.preventDefault();
    const fileSelected = event.target.files[0];
    if (!fileSelected) {
      return;
    }
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    if (fileSelected.size > MAX_SIZE) {
      return toast.error("File size exceeds the 5MB limit");
    }
    const reader = new FileReader();
    reader.readAsDataURL(fileSelected);

    reader.onload = async () => {
      const base64Image = reader.result;
      ``;
      await profileUpdate({ profilePic: base64Image });
    };

    reader.onerror = () => {
      toast.error("Failed to load file. Please try again.");
    };
  };

  const validInput = (input) => {
    const isValid = /^[a-zA-Z\s]+$/.test(input) && input.trim().length > 1;
    if (!isValid) {
      toast.error(
        "Username must be at least 2 characters and contain only letters."
      );
    }
    return isValid;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    validInput(input) && nameUpdate({ fullName: input });
  };
  return (
    <div className="h-screen pt-20 min-h-fit">
      <div className="max-w-2xl min-w-fit mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8 ">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2">Your Profile Info</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={authUser.profilePic || "/profilePic.jpg"}
                alt=""
                className="size-[150px] rounded-[20%] object-cover border-4 border-base-100"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 bg-base-content hover:bg-slate-500 hover:scale-105 rounded-full p-2 cursor-pointer transition-all duration-200 ${
                  isUpdatingName ? "animate-pulse pointer-events-none" : ""
                } `}
              >
                <Camera className="size-5 text-base-200"></Camera>
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleProfileUpdate}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-500">
              {isUpdatingProfile
                ? "Updating Profile..."
                : "Click the camera icon to update your profile"}
            </p>
          </div>
          <div className="space-y-6 ">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-500 flex items-center gap-2">
                <User className="size-4" />
                User Name (Click to Edit)
              </div>
              <input
                type="text"
                className="input w-full border border-zinc-300"
                placeholder={authUser?.fullName || "Full Name"}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-6 ">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-500 flex items-center gap-2">
                <Mail className="size-4" />
                Email
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border p-2">
                {authUser?.email}
              </p>
            </div>
          </div>
          <div className="flex mt-3 items-center justify-center">
            <button
              className="btn btn-primary"
              onClick={handleUpdate}
              disabled={isUpdatingName}
            >
              {isUpdatingName ? (
                <>
                  <span className="loading loading-infinity loading-md"></span>
                  <span className="text-zinc-300">Loading</span>
                </>
              ) : (
                "Click to Update"
              )}
            </button>
          </div>
        </div>
        <div className="mt-6 bg-base-300 rounded-lg border p-6">
          <h2 className="font-medium text-lg mb-4">Account Information</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between py-2 border-b border-zinc-700">
              <span>Member Since</span>
              <span>{authUser?.createdAt?.split("T")[0]}</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span>Acoount Status</span>
              <span className="text-green-600">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
