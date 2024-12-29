import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";

export const getUserForSidebar = async (req, res) => {
  try {
    const loggiedInUserId = req.user._id;
    const filteredUser = await User.find({
      _id: { $ne: loggiedInUserId },
    }).select("-password");

    res.status(200).json(filteredUser);
  } catch (error) {
    console.log("Error in getUsersForSidebar controller ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        {
          senderId: myId,
          receiverId: userToChatId,
        },
        {
          senderId: userToChatId,
          receiverId: myId,
        },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const sendMessages = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;

    const uploadResponse = await cloudinary.uploader.upload(image);
    imageUrl = uploadResponse.secure_url;

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    //todo  : realtime functionality goes here => socket.io

    res.status(200).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessages controller ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
