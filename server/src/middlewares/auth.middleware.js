import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const refreshToken =
      req.cookies?.accessToken ||
      req.headers("Authorization")?.replace("Bearer ", "");
    if (!refreshToken) {
      throw new ApiError(401, "Unauthorized access");
    }
    const decodeToken = jwt.verify(
      refreshToken,
      process.env.ACCESS_TOKEN_SECRET
    );

    const user = await User.findById(decodeToken?._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, "Invalid Access Token");
  }
});
