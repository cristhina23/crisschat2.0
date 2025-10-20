import Message from '../models/messageModel.js';
import User from '../models/userModel.js';

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const {id: userToChatId} = req.params
    const myId = req.user._id

    const messages = await Message.find({
      $or: [
        {senderId: myId, reciverId: userToChatId},
        {senderId: userToChatId, reciverId: myId}
      ]
    })

    res.status(200).json(messages)

  } catch (error) {
    console.log('error in get messages', error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

export const sendMessage = async (req, res) => {
  try {
    const {text, image, video, audio} = req.body
    const { id: reciverId } = req.params
    const senderId = req.user._id

    let imageUrl, videoUrl, audioUrl;

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image)
      imageUrl = uploadResponse.secure_url
    }

    if (video) {
      const uploadResponse = await cloudinary.uploader.upload(video)
      videoUrl = uploadResponse.secure_url
    }

    if (audio) {
      const uploadResponse = await cloudinary.uploader.upload(audio)
      audioUrl = uploadResponse.secure_url
    }

    const newMessage = await Message.create({
      senderId,
      reciverId,
      text,
      image: imageUrl,
      video: videoUrl,
      audio: audioUrl
    })
    await newMessage.save()

    // todo: realtime functionality goes here


    res.status(200).json(newMessage)

  } catch (error) {
    
  }
}