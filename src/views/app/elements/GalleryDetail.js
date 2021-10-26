/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import Cropbox from "./Cropbox";
import Lightbox from "react-image-lightbox";
const GalleryDetail = ({ images, updateGalleryImage, setImageToDelete }) => {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [userPicture, setUserPicture] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState(false);
  const [crop, setCrop] = useState({ aspect: 538 / 303, height: 768, unit: "px" });
  useEffect(() => {
    if (userPicture && url) {
      updateGalleryImage(userPicture, url);
    }
  }, [userPicture]);
  return (
    <div>
      <div className="row social-image-row gallery">
        {images &&
          images.map((item, index) => {
            return (
              <div className="col-6" key={index}>
                <div className="position-absolute card-top-buttons">
                  <Button
                    onClick={() => {
                      setImageToDelete(item);
                    }}
                    color="primary"
                    className="icon-button"
                  >
                    <i className="simple-icon-trash" />
                  </Button>
                </div>
                <div
                  className="show-pointer"
                  onClick={() => {
                    if (!updateGalleryImage) {
                      setPhotoIndex(index);
                    } else {
                      setUrl(item);
                    }
                    setIsOpen(true);
                  }}
                >
                  <img className="img-fluid border-radius" src={item} alt="thumbnail" />
                </div>
              </div>
            );
          })}
      </div>
      {url ? (
        <Cropbox
          modalOpen={isOpen}
          toggleModal={() => {
            setIsOpen(!isOpen);
          }}
          crop={crop}
          file={url}
          setCrop={setCrop}
          setUserPicture={setUserPicture}
          userPicture={userPicture}
        />
      ) : (
        ""
      )}
      {isOpen && !url && (
        <Lightbox
          mainSrc={images[photoIndex]}
          nextSrc={images[(photoIndex + 1) % images.length]}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() => setPhotoIndex((photoIndex + images.length - 1) % images.length)}
          onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % images.length)}
        />
      )}
    </div>
  );
};

export default GalleryDetail;
