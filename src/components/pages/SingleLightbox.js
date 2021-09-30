import React, { useState } from "react";

import Lightbox from "react-image-lightbox";
import "react-image-crop/dist/ReactCrop.css";
import Cropbox from "views/app/elements/Cropbox";
const SingleLightbox = ({ thumb, className, large,ratio,setUserPicture,userPicture }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [crop, setCrop] = useState({ aspect: ratio,height:100,unit:'px' });
  return (
    <>
      <div className="show-pointer" onClick={() => setIsOpen(true)}>
        <img src={thumb} alt="thumbnail" className={className} />
      </div>
      <Cropbox
        modalOpen={isOpen}
        toggleModal={() => {
          setIsOpen(!isOpen);
        }}
        crop={crop}
        file={large}
        setCrop={setCrop}
        setUserPicture={setUserPicture}
        userPicture={userPicture}
      />
    </>
  );
};
export default SingleLightbox;
