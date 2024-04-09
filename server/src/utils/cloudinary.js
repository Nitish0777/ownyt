import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });          
cloudinary.config({ 
  cloud_name: 'dh2yfo5pn', 
  api_key: '552176296158351', 
  api_secret: 'r3ZQ7VEzRBDPT95wuBaZOttGKsI' 
});

export const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) throw new Error("File path is required");

    // Upload file to cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("file uploaded on cloudinary ", response);
    console.log("file uploaded on cloudinary ", response.url);
    fs.unlinkSync(localFilePath); //remove locally saved file after uploading
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); //remove locally saved file as the operation failed
    console.log("Error while uploading file on cloudinary ", error);
    return null;
  }
};

// cloudinary.uploader.upload(
//   "https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" },
//   function (error, result) {
//     console.log(result);
//   }
// );
