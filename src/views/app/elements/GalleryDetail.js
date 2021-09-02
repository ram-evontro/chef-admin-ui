/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import Lightbox from 'react-image-lightbox';
import { NavLink } from 'react-router-dom';
import {Button } from 'reactstrap';


const GalleryDetail = ({images,handleClick,setImageToDelete}) => {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="row social-image-row gallery">
        {images&&images.map((item, index) => {
          return (
            <div className="col-6" key={index}>
               <div className="position-absolute card-top-buttons">
                      <Button onClick={()=>{setImageToDelete(item);handleClick('deleteimage')}} outline color="white" className="icon-button">
                        <i className="simple-icon-trash" />
                      </Button>
                    </div>
              <NavLink
                to="#"
                onClick={() => {
                  setPhotoIndex(index);
                  setIsOpen(true);
                }}
                location={{}}
              >
                <img
                  className="img-fluid border-radius"
                  src={item}
                  alt="thumbnail"
                />
              </NavLink>
            </div>
          );
        })}
      </div>
      {isOpen && (
        <Lightbox
          mainSrc={images[photoIndex]}
          nextSrc={images[(photoIndex + 1) % images.length]}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + images.length - 1) % images.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % images.length)
          }
        />
      )}
    </div>
  );
};

export default GalleryDetail;
