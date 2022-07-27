import React, { useState, useRef, useEffect } from "react";
import { Row, Card, CardBody, Button, CardTitle, Input } from "reactstrap";
import { Colxx } from "components/common/CustomBootstrap";
import IntlMessages from "helpers/IntlMessages";
import GalleryDetail from "../../elements/GalleryDetail";
import SingleLightbox from "components/pages/SingleLightbox";
import DropzoneComponent from "react-dropzone-component";
import api from "helpers/api";
import * as axiosURLS from "helpers/endpoints";
import fileapi from "helpers/fileupload";
import { NotificationManager } from "components/common/react-notifications";
import "dropzone/dist/min/dropzone.min.css";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import { images } from "helpers/images";
import MealsContainer from "./MealsContainer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const Details = ({ menu, setMenu, mealTypes, chefTypes, cuisines, courses }) => {
  const { upload } = fileapi();
  const ReactDOMServer = require("react-dom/server");
  const [tagsLO, setTagsLO] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userPicture, setUserPicture] = useState(null);
  const [userGalleryPic, setUserGalleryPic] = useState([]);
  const [tempFile, setTempFile] = useState([]);
  const [fileAction, setFileAction] = useState("none");
  const [imageToDelete, setImageToDelete] = useState(null);
  const [dropZone, setDropZone] = useState(null);
  useEffect(() => {
    setTagsLO(menu.tags);
  }, [menu]);
  let componentConfig = { postUrl: "no-url" };
  let eventHandlers = {
    addedfile: (file) => {
      setFileAction("add");
      setTempFile(file);
    },
    removedfile: (file) => {
      setFileAction("remove");
      setTempFile(file);
    },
    init: (dropzone) => {
      setDropZone(dropzone);
    },
  };
  const djsConfig = {
    thumbnailHeight: 160,
    maxFilesize: 2,
    autoProcessQueue: false,
    previewTemplate: ReactDOMServer.renderToStaticMarkup(
      <div className="dz-preview dz-file-preview mb-3">
        <div className="d-flex flex-row ">
          <div className="p-0 w-30 position-relative">
            <div className="dz-error-mark">
              <span>
                <i />
              </span>
            </div>
            <div className="dz-success-mark">
              <span>
                <i />
              </span>
            </div>
            <div className="preview-container">
              {/*  eslint-disable-next-line jsx-a11y/alt-text */}
              <img data-dz-thumbnail className="img-thumbnail border-0" />
              <i className="simple-icon-doc preview-icon" />
            </div>
          </div>
          <div className="pl-3 pt-2 pr-2 pb-1 w-70 dz-details position-relative">
            <div>
              <span data-dz-name />
            </div>
            <div className="text-primary text-extra-small" data-dz-size />
            <div className="dz-progress">
              <span className="dz-upload" data-dz-uploadprogress />
            </div>
            <div className="dz-error-message">
              <span data-dz-errormessage />
            </div>
          </div>
        </div>
        <a href="#/" className="remove" data-dz-remove>
          <i className="glyph-icon simple-icon-trash" />
        </a>
      </div>
    ),
  };
  useEffect(async () => {
    let allFiles = [...userGalleryPic];
    if (fileAction === "add") {
      allFiles.push(tempFile);
    } else if (fileAction === "remove") {
      const index = allFiles.findIndex((obj) => obj.upload.uuid === tempFile.upload.uuid);
      if (index > -1) {
        allFiles.splice(index, 1);
      }
    }
    await setUserGalleryPic(allFiles);
  }, [tempFile]);
  useEffect(async () => {
    setIsLoading(true);
    if (imageToDelete) {
      if (menu.pictures) {
        let temp = [...menu.pictures];
        const index = temp.indexOf(imageToDelete);
        if (index > -1) {
          temp.splice(index, 1);
        }
        try {
          let formdata = { pictures: temp };
          let { data } = await api.patch(axiosURLS.MENU + "/" + menu.id, formdata);
          setMenu(data);
          setImageToDelete(null);
          NotificationManager.success("Picture deleted successfully", "Success", 3000, null, null, "");
        } catch (err) {
          console.log(err);
          console.log(err.response);
          if (err.response) {
            NotificationManager.error(err.response.data.message, "Error occured", 3000, null, null, "");
          }
        }
      }
    }
    setIsLoading(false);
  }, [imageToDelete]);
  const changeImage = (e) => {
    e.preventDefault();
    setUserPicture(e.target.files[0]);
  };
  const handleChange = (e) => {
    let tempdata = { ...menu };
    let val = e.target.value;
    let name = e.target.name;
    tempdata[name] = val;
    setMenu(tempdata);
  };
  const handleClick = async () => {
    let error = "";
    let formdata = { ...menu };
    if (!formdata["title"] || formdata["title"] === "") {
      error = "Title Required";
    }
    if (!formdata["desc"] || formdata["desc"] === "") {
      error = "Description Required";
    }
    if (error != "") {
      NotificationManager.error(error, "Error", 3000, null, null, "");
      return false;
    }
    setIsLoading(true);
    if (userPicture) {
      let fileurl = await upload(userPicture);
      formdata["cover_picture"] = fileurl;
    }
    formdata["tags"] = tagsLO;
    delete formdata["id"];
    delete formdata["user"];
    if (formdata["chef_type"]["id"]) {
      formdata["chef_type"] = formdata["chef_type"]["id"];
    }
    try {
      let { data } = await api.patch(axiosURLS.MENU + "/" + menu.id, formdata);
      NotificationManager.success("Menu updated successfully", "Success", 3000, null, null, "");
      setMenu(data);
    } catch (err) {
      console.log(err);
      console.log(err.response);
      if (err.response) {
        NotificationManager.error(err.response.data.message, "Error occured", 3000, null, null, "");
      }
    }
    setIsLoading(false);
  };
  const inputFile = useRef(null);
  const openFileInput = () => {
    inputFile.current.click();
  };
  const deletePicture = () => {};
  const uploadImages = async () => {
    setIsLoading(true);
    if (userGalleryPic.length > 0) {
      try {
        let temp = [];
        if (menu.pictures) {
          temp = [...menu.pictures];
        }

        await Promise.all(
          userGalleryPic.map(async (item) => {
            let fileurl = await upload(item);
            temp.push(fileurl);
          })
        );
        console.log(temp);
        let formdata = { pictures: temp };
        let { data } = await api.patch(axiosURLS.MENU + "/" + menu.id, formdata);
        setMenu(data);
        setUserGalleryPic([]);
        setFileAction("none");
        dropZone.removeAllFiles(true);
        setTempFile(null);
        NotificationManager.success("Picture uploaded successfully", "Success", 3000, null, null, "");
      } catch (err) {
        console.log(err);
        console.log(err.response);
        if (err.response) {
          NotificationManager.error(err.response.data.message, "Error occured", 3000, null, null, "");
        }
      }
    }
    setIsLoading(false);
  };
  const addMealCard = () => {
    let tempmenu = { ...menu };
    let temparr = [];
    if (tempmenu.meals && tempmenu.meals.length > 0) {
      temparr = [...tempmenu.meals];
    }
    let newMeal = { _id: Math.floor(Math.random() * 1000000) + 1, course: "", heading: "", info: "" };
    temparr.push(newMeal);
    tempmenu["meals"] = temparr;
    setMenu(tempmenu);
  };
  const handleMenuChange = (e, id) => {
    let tempmenu = { ...menu };
    let temparr = [];
    let val = e.target.value;
    let name = e.target.name;

    if (tempmenu.meals && tempmenu.meals.length > 0) {
      temparr = [...tempmenu.meals];
      const mealindex = temparr.findIndex((meal) => (meal._id === id ? true : false));
      temparr[mealindex][name] = val;
      tempmenu["meals"] = temparr;
      setMenu(tempmenu);
    }
  };
  const handleMenuDelete = (id) => {
    let tempmenu = { ...menu };
    let temparr = [];
    if (tempmenu.meals && tempmenu.meals.length > 0) {
      temparr = [...tempmenu.meals];
      const mealindex = temparr.findIndex((meal) => (meal._id === id ? true : false));
      if (mealindex > -1) {
        temparr.splice(mealindex, 1);
      }
      tempmenu["meals"] = temparr;
      setMenu(tempmenu);
    }
  };
  const handleMenuUpload = async () => {
    let tempmenu = { ...menu };
    let formdata = {};
    if (tempmenu.meals && tempmenu.meals.length > 0) {
      formdata["meals"] = tempmenu.meals.map((meal) => {
        let tempmeal = { ...meal };
        delete tempmeal["id"];
        delete tempmeal["_id"];
        return tempmeal;
      });
      setIsLoading(true);
      try {
        let { data } = await api.patch(axiosURLS.MENU + "/" + menu.id, formdata);
        NotificationManager.success("Meal added successfully", "Success", 3000, null, null, "");
        setMenu(data);
      } catch (err) {
        console.log(err);
        console.log(err.response);
        if (err.response) {
          NotificationManager.error(err.response.data.message, "Error occured", 3000, null, null, "");
        }
      }
      setIsLoading(false);
    }
  };
  const setDate = (val, param) => {
    let tempdata = { ...menu };
    tempdata[param] = val;
    setMenu(tempdata);
  };
  return (
    <Row>
      <Colxx xxs="12" lg="4" className="mb-4 col-left">
        <Card className="mb-4">
          <div className="position-absolute card-top-buttons">
            <Button onClick={openFileInput} outline color="white" className="icon-button">
              <i className="simple-icon-pencil" />
              <input type="file" ref={inputFile} className="d-none" onChange={changeImage} />
            </Button>
          </div>
          <SingleLightbox
            thumb={userPicture ? URL.createObjectURL(userPicture) : menu.cover_picture ? menu.cover_picture : images.chefplaceholder.default}
            large={userPicture ? URL.createObjectURL(userPicture) : menu.cover_picture ? menu.cover_picture : images.chefplaceholder.default}
            className="card-img-top"
          />
          <CardBody>
            <p className="text-muted text-small mb-1">
              <IntlMessages id="forms.title" />
            </p>
            <input onChange={handleChange} type="text" name="title" className="form-control mb-2" value={menu.title} />
            <p className="text-muted text-small mb-1">
              <IntlMessages id="forms.description" />
            </p>
            <Input onChange={handleChange} type="textarea" name="desc" className="form-control mb-2" value={menu.desc} />
            <p className="text-muted text-small mb-1">
              <IntlMessages id="forms.meal_type" />
            </p>
            <select onChange={handleChange} name="meal_type" className="form-control mb-2" value={menu.meal_type}>
              {mealTypes &&
                mealTypes.map((mealType) => (
                  <option key={mealType.id} value={mealType.name}>
                    {mealType.name}
                  </option>
                ))}
            </select>
            <p className="text-muted text-small mb-1">
              <IntlMessages id="forms.cuisine" />
            </p>
            <select onChange={handleChange} name="cuisine" className="form-control mb-2" value={menu.cuisine}>
              {cuisines &&
                cuisines.map((cuisine) => (
                  <option key={cuisine.id} value={cuisine.name}>
                    {cuisine.name}
                  </option>
                ))}
            </select>
            <p className="text-muted text-small mb-1">
              <IntlMessages id="forms.chef_type" />
            </p>
            <select className="form-control mb-2" onChange={handleChange} name="chef_type" value={menu.chef_type.id} id="chef_type">
              {chefTypes &&
                chefTypes.map((chefType) => (
                  <option key={chefType.id} value={chefType.id}>
                    {chefType.name}
                  </option>
                ))}
            </select>
            <p className="text-muted text-small mb-1">
              <IntlMessages id="forms.activefrom" />
            </p>
            <div className="mb-2">
              <DatePicker selected={Date.parse(menu.activefrom)} onChange={(val) => setDate(val, "activefrom")} shouldCloseOnSelect />
            </div>
            <p className="text-muted text-small mb-1">
              <IntlMessages id="forms.activetill" />
            </p>
            <div className="mb-2">
              <DatePicker selected={Date.parse(menu.activetill)} onChange={(val) => setDate(val, "activetill")} shouldCloseOnSelect />
            </div>
            <p className="text-muted text-small mb-1">
              <IntlMessages id="forms.tags" />
            </p>
            <div className="mb-2">
              <TagsInput value={tagsLO} onChange={(val) => setTagsLO(val)} inputProps={{ placeholder: "" }} />
            </div>
            <Button color="primary" className={`btn-shadow btn-multiple-state ${isLoading ? "show-spinner" : ""}`} onClick={handleClick}>
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">
                <IntlMessages id="forms.update" />
              </span>
            </Button>
          </CardBody>
        </Card>
        <Card className="mb-4">
          <CardBody>
            <CardTitle>
              <IntlMessages id="pages.gallery" />
            </CardTitle>
            <GalleryDetail setImageToDelete={setImageToDelete} handleClick={deletePicture} images={menu.pictures} />
          </CardBody>
        </Card>
        <Card className="mb-4">
          <CardBody>
            <CardTitle>
              <IntlMessages id="pages.add_picture" />
            </CardTitle>
            <DropzoneComponent config={componentConfig} eventHandlers={eventHandlers} djsConfig={djsConfig} />
            <Button color="primary" className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`} onClick={uploadImages}>
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">
                <IntlMessages id="forms.upload" />
              </span>
            </Button>
          </CardBody>
        </Card>
      </Colxx>
      <Colxx xxs="12" lg="8" className="mb-4 col-right">
        <Card className="mb-4">
          <CardBody>
            <CardTitle>
              <IntlMessages id="pages.menu" />
            </CardTitle>
            {menu.meals &&
              menu.meals.map((meal) => (
                <MealsContainer handleMenuDelete={handleMenuDelete} handleMenuChange={handleMenuChange} mealcourses={courses} key={meal.id} item={meal} />
              ))}
            <Button color="primary" className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`} onClick={handleMenuUpload}>
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">
                <IntlMessages id="forms.update" />
              </span>
            </Button>
            <Button color="primary" className={`btn-shadow ml-3 mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`} onClick={addMealCard}>
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">
                <IntlMessages id="forms.add_more" />
              </span>
            </Button>
          </CardBody>
        </Card>
      </Colxx>
    </Row>
  );
};
export default Details;
