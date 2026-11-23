import json from "jsonwebtoken";

export const generateTokenAndSetCookie = async (res, userId) => {
  try {
    const JWT_SECRET =
      process.env.JWT_SECRET || "qe8s6fb9dfysfspo86fdsmdhg670vvj";

    const token = await json.sign({ userId }, JWT_SECRET, {
      expiresIn: "7d",
    });
    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return token;
  } catch (err) {
    console.error("Generating Token error:", err);
  }
};
