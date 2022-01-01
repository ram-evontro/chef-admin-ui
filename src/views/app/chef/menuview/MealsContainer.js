import React from "react";
import {  Button } from "reactstrap";
import IntlMessages from "helpers/IntlMessages";
const MealsContainer = ({ item, mealcourses,handleMenuChange,handleMenuDelete }) => {
  
  return (
    <div className="border border-primary p-2 mb-4">
      <div className="position-relative text-right mt-n4 mr-n4">
        <Button onClick={()=>{handleMenuDelete(item._id)}} color="primary" className="icon-button">
          <i className="simple-icon-trash" />
        </Button>
      </div>
      <p className="text-muted text-small mb-1">
        <IntlMessages id="forms.meal_course" />
      </p>
      <select onChange={(e)=>{handleMenuChange(e,item._id)}} className="form-control mb-2" value={item.course} name="course" id="course">
        <option value="">Select a Value</option>
        {mealcourses.map((course) => (
          <option key={course.id} value={course.name}>
            {course.name}
          </option>
        ))}
      </select>
      <p className="text-muted text-small mb-1">
        <IntlMessages id="forms.title" />
      </p>
      <input onChange={(e)=>{handleMenuChange(e,item._id)}} type="text" className="form-control mb-2" value={item.heading} name="heading" />
      <p className="text-muted text-small mb-1">
        <IntlMessages id="forms.description" />
      </p>
      <textarea onChange={(e)=>{handleMenuChange(e,item._id)}} value={item.info} className="form-control mb-1" name="info" id="info" cols="30" rows="2"></textarea>
    </div>
  );
};

export default MealsContainer;
