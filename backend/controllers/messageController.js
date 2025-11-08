const Message = require("../models/Message");

exports.createMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const msg = await Message.create({
      name,
      email,
      message,
    });

    res.status(201).json(msg);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.json(message);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

