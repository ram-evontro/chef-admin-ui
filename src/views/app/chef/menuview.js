import React, { useState, useEffect } from "react";
import { Row } from "reactstrap";
import { NavLink } from "react-router-dom";
import Details from "./menuview/details";
import qs from "query-string";
import Custombreadcrumb from "../elements/Custombreadcrum";
import { Colxx } from "components/common/CustomBootstrap";
import IntlMessages from "helpers/IntlMessages";
import api from "helpers/api";
import * as axiosURLS from "helpers/endpoints";
import { NotificationManager } from "components/common/react-notifications";
const Menuview = ({ match, history }) => {
  const [menu, setMenu] = useState({});
  const [mealTypes, setMealTypes] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [chefTypes, setChefTypes] = useState([]);
  const [courses, setCourses] = useState([]);
  const [p, setP] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(async () => {
    setIsLoading(true);
    let values1 = qs.parse(history.location.search);
    setP(values1.p);
    try {
      let response = await api.get(axiosURLS.MENU + "/" + values1.menu);
      setMenu(response.data);
      response = await api.get(axiosURLS.MEAL_TYPES_ALL);
      setMealTypes(response.data);
      response = await api.get(axiosURLS.CHEF_TYPES_ALL);
      setChefTypes(response.data);
      response = await api.get(axiosURLS.CUISINES_ALL);
      setCuisines(response.data);
      response = await api.get(axiosURLS.MEAL_COURSES_ALL);
      setCourses(response.data);
    } catch (err) {
      console.log(err);
      console.log(err.response);
      if (err.response) {
        NotificationManager.error(err.response.data.message, "Error occured", 3000, null, null, "");
      }
    }
    setIsLoading(false);
  }, []);
  return isLoading ? (
    <div className="loading" />
  ) : (
    <>
      <Row>
        <Colxx xxs="12">
          <h1>{menu.title}</h1>
          {p?(<Custombreadcrumb append={`/view?p=${menu.user.id}`} appendname={menu.user.name} match={match} />):(<Custombreadcrumb append={`/allmenus`} appendname={'All Menus'} match={match} />)}
          
          <Details courses={courses} mealTypes={mealTypes} chefTypes={chefTypes} cuisines={cuisines} menu={menu} setMenu={setMenu} />
        </Colxx>
      </Row>
    </>
  );
};
export default Menuview;
