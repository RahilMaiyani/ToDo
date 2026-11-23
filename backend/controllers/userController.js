import User from "../models/User.js";

export const editUserName = async (req, res) => {
  try {
    const userData = req.user;
    if (!userData) {
      res.status(409).json({
        success: false,
        message: "User data missing in request",
      });
      return;
    }

    const { name } = req.body;
    if (!name) {
      res.status(409).json({
        success: false,
        message: "Name should be declared in body",
      });
      return;
    }

    const user = await User.findById(userData._id);

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User with this ID not found",
      });
      return;
    }

    user.name = name;
    user.save();

    res.status(200).json({
      success: true,
      message: "Name updated successfully.",
      user,
    });
  } catch (err) {
    console.error("Edit user error:", err);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userData = req.user;
    if (!userData) {
      res.status(409).json({
        success: false,
        message: "User data missing in request",
      });
      return;
    }

    const user = await User.findById(userData._id);

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User with this ID not found",
      });
      return;
    }

    await User.findByIdAndDelete(user._id);

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", "", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "strict" : "lax",
      maxAge: 0,
    });

    res.status(200).json({
      success: true,
      message: "User deleted successfully.",
    });
  } catch (err) {
    console.error("Delete user error:", err);
  }
};
