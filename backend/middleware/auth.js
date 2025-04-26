import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ");
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied! No Token Provided" });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    req.status(400).json({ message: "Invalid Token" });
  }
};

export default auth;
