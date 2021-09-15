import React, { useEffect, useState } from "react";
import { Row } from "reactstrap";
import { Colxx, Separator } from "components/common/CustomBootstrap";
import Breadcrumb from "containers/navs/Breadcrumb";
import IconCardsCarousel from "containers/dashboards/IconCardsCarousel";
import RecentOrders from "containers/dashboards/RecentOrders";
import Calendar from "containers/dashboards/Calendar";
import BestSellers from "containers/dashboards/BestSellers";
import SalesChartCard from "containers/dashboards/SalesChartCard";
import api from "helpers/api";
import * as axiosURLS from "helpers/endpoints";
import { adminRoot } from "constants/defaultValues";
const DetailsDashboard = ({ match,history }) => {
  const [items, setItems] = useState([]);
  const updateAction = (action, id) => {
    if (action === "view") {
      history.push(`${adminRoot}/booking/view/?b=` + id);
    }
  };
  const fetchData = async () => {
    try {
      let { data } = await api.get(axiosURLS.BOOKING);
     setItems(data.results);     
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
          <IconCardsCarousel />
          <Row>
            <Colxx md="12" className="mb-4">
              <SalesChartCard />
            </Colxx>
          </Row>
        </Colxx>
        <Colxx lg="12" xl="6" className="mb-4">
          <RecentOrders items={items} updateAction={updateAction} />
        </Colxx>
      </Row>
      <Row>
        <Colxx xl="6" lg="12" className="mb-4">
          <Calendar items={items} updateAction={updateAction} />
        </Colxx>
        <Colxx xl="6" lg="12" className="mb-4">
          <BestSellers />
        </Colxx>
      </Row>
    </>
  );
};
export default DetailsDashboard;
