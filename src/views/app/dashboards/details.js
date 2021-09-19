import React, { useEffect, useState } from "react";
import { Row } from "reactstrap";
import { Colxx, Separator } from "components/common/CustomBootstrap";
import Breadcrumb from "containers/navs/Breadcrumb";
import IconCardsCarousel from "../elements/IconCardsCarousel";
import RecentOrders from "containers/dashboards/RecentOrders";
import Calendar from "../elements/Calendar";
import BestSellers from "../elements/BestSellers";
import SalesChartCard from "../elements/SalesChartCard";
import api from "helpers/api";
import * as axiosURLS from "helpers/endpoints";
import { adminRoot } from "constants/defaultValues";
const DetailsDashboard = ({ match, history }) => {
  const [upcomingOrders, setUpcomingOrders] = useState([]);
  const [calendar, setCalendar] = useState([]);
  const [users, setUsers] = useState({});
  const [carousel, setCarousel] = useState({});
  const [linechart, setLinechart] = useState({});
  const updateAction = (action, id) => {
    if (action === "view") {
      history.push(`${adminRoot}/booking/view/?b=` + id);
    }
  };
  const fetchData = async () => {
    try {
      let { data } = await api.get(axiosURLS.DASHBOARD);
      setCalendar(data.calendar);
      setUsers(data.users);
      setUpcomingOrders(data.upcoming);
      setCarousel(data.carousel);
      setLinechart(data.linechart);
    } catch (err) {
      console.log(err);
    }
  };
  const changeMonth = async (date) => {
    try {
      let { data } = await api.post(axiosURLS.BOOKING_BY_MONTH,{date:date});
      let tempCalendar = [...calendar,...data];
      setCalendar(tempCalendar);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.details" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx lg="12" xl="6">
          <IconCardsCarousel carousel={carousel} />
          <Row>
            <Colxx md="12" className="mb-4">
              <SalesChartCard linechart={linechart} />
            </Colxx>
          </Row>
        </Colxx>
        <Colxx lg="12" xl="6" className="mb-4">
          <RecentOrders items={upcomingOrders} updateAction={updateAction} />
        </Colxx>
      </Row>
      <Row>
        <Colxx xl="6" lg="12" className="mb-4">
          <Calendar changeMonth={changeMonth} items={calendar} updateAction={updateAction} />
        </Colxx>
        <Colxx xl="6" lg="12" className="mb-4">
          <BestSellers users={users} />
        </Colxx>
      </Row>
    </>
  );
};
export default DetailsDashboard;
