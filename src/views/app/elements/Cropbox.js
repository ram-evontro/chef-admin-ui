import React, { useState, useEffect } from "react";
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import IntlMessages from "helpers/IntlMessages";
import ReactCrop from "react-image-crop";
const Cropbox = ({ modalOpen, toggleModal, crop, file, setCrop, setUserPicture, userPicture }) => {
  const [image, setImage] = useState(null);
  const [fileDetails, setFileDetails] = useState({});
  useEffect(() => {
    if (!userPicture) {
      if(file){
      let name =file.split("/").splice(-1).pop();
      name =(name.length > 15) ? name.slice(-14): name;
      let type = name.split(".")[1];
      let mime ;
      if(type==="png")
      {
        mime = "image/png";
      }
      else
      {
        mime = "image/jpeg";
      }
      setFileDetails({ name: name, type: mime });
    }
    } else {
      setFileDetails({ name: userPicture.name, type: userPicture.type });
    }
  }, [file, userPicture,image]);
  const getCroppedImg = async () => {
    // let base64 = await getBase64FromUrl(file);
    // console.log(base64);
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    // New lines to be added
    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(image, crop.x * scaleX, crop.y * scaleY, crop.width * scaleX, crop.height * scaleY, 0, 0, crop.width, crop.height);
    console.log(image);
    // As Base64 string
    // const base64Image = canvas.toDataURL("image/jpeg");
    // return base64Image;

    // As a file
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          blob.name = fileDetails.name;
          var file = new File([blob], fileDetails.name);
          resolve(file);
        },
        fileDetails.type,
        1
      );
    });
  };
  return (
    <Modal isOpen={modalOpen} toggle={toggleModal} backdrop="static">
      <ModalBody>
        <ReactCrop
          onImageLoaded={(origimage) => {
            setImage(origimage);
          }}
          src={file}
          crop={crop}
          onChange={(newCrop) => setCrop(newCrop)}
          crossorigin="anonymous"
        />
      </ModalBody>
      <ModalFooter>
        <Button
          color="secondary"
          outline
          onClick={() => {
            toggleModal();
          }}
        >
          <IntlMessages id="pages.cancel" />
        </Button>
        <Button
          color="primary"
          onClick={async () => {
            let data = await getCroppedImg();
            setUserPicture(data);
            toggleModal();
          }}
        >
          <IntlMessages id="pages.crop" />
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default Cropbox;
