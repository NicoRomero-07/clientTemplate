//import { CloudinaryImage } from "../components/Cloudinary/Cloudinary";
import { useState } from "react";
import CloudinaryUploadWidget from "../components/Cloudinary/UploadCloudinary";
export function Images() {
    const [urlImg, setUrlImg] = useState({
        urlImg: "",
      });

    return <div>
          <CloudinaryUploadWidget setUrlImg={setUrlImg} />
          <img id="uploadedimage" src={urlImg} alt="Uploaded"></img>
          </div>;
  }
  