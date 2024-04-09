import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js  ";
import { ApiResponse } from "../utils/ApiResponse.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, username, password } = req.body;
  console.log(fullName, email, username, password);
  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }
  if (password.length < 6) {
    throw new ApiError(400, "Password must be at least 6 characters long");
  }
  if (!email.includes("@") || !email.includes(".")) {
    throw new ApiError(400, "Invalid email address");
  }
  const existingUser = User.findOne({
    $or: [{ email }, { username }],
  });
  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }
  console.log(req.files);
  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;
  if (!avatarLocalPath || !coverImageLocalPath) {
    throw new ApiError(400, "Avatar and CoverImage image are required");
  }
  const avatar = await uploadOnCloudinary(avatarLocalPath)
  const coverImage = await uploadOnCloudinary(coverImageLocalPath)
  if(!avatar || !coverImage){
    throw new ApiError(500, "Something went wrong while uploading images")
  }
  const user = User.create
  ({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    username:username.toLowerCase(),
    password,
  }) 
  const createdUser = await User.findById(user._id).select("-password -refreshToken -__v");
  if(!createdUser){
    throw new ApiError(500, "Something went wrong while creating user")
  }
  return res.status(201).json(new ApiResponse(201, createdUser, "User registered successfully"));
});
