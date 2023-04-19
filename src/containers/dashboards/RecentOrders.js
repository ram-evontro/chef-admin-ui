/* eslint-disable react/no-array-index-key */
import React from "react";
import { NavLink } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Card, CardBody, CardTitle, Badge } from "reactstrap";

import IntlMessages from "helpers/IntlMessages";
import data from "data/products";
import { adminRoot } from "constants/defaultValues";
import { images } from "helpers/images";
import moment from "moment";

const RecentOrders = ({ items, updateAction }) => {
  return (
    <Card>
      <CardBody>
        <CardTitle>
          <IntlMessages id="dashboards.upcoming_orders" />
        </CardTitle>
        <div className="scroll dashboard-list-with-thumbs">
          <PerfectScrollbar options={{ suppressScrollX: true, wheelPropagation: false }}>
            {items.map((booking, index) => {
              return (
                <div key={index} className="d-flex flex-row mb-3">
                  <NavLink to={`${adminRoot}/booking/view/?b=${booking.id}`} className="d-block position-relative">
                    <img
                      src={
                        booking.type == "chef_table"
                          ? booking.common_menu.cover_picture
                          : booking.type == "chef_event"
                          ? booking.event.pictures
                            ? booking.event.pictures[0]
                            : images.chefplaceholder.default
                          : images.chefplaceholder.default
                      }
                      alt={booking.title}
                      className="list-thumbnail border-0"
                    />
                    <Badge
                      key={index}
                      className="position-absolute badge-top-right"
                      color={
                        booking.status === "Order Placed"
                          ? "info"
                          : booking.status === "Order Paid"
                          ? "success"
                          : booking.status === "Order Completed"
                          ? "primary"
                          : "secondary"
                      }
                      pill
                    >
                      {booking.status}
                    </Badge>
                  </NavLink>

                  <div className="pl-3 pt-2 pr-2 pb-2">
                    <NavLink to={`${adminRoot}/booking/view/?b=${booking.id}`}>
                      <p className="list-item-heading">
                        {booking.type === "virtual_dining" ? "Virtual Dining" : booking.type === "chef_table" ? "Chef's Table" : "Chef's Event"}
                      </p>
                      <div className="pr-4">
                        <p className="text-muted mb-1 text-small">
                          Total diner:{booking.diner_count}&nbsp;&nbsp;&nbsp;&nbsp; Host : {booking.user.name}&nbsp;&nbsp;({booking.user.mobile})&nbsp;&nbsp;
                        </p>
                      </div>
                      <div className="text-primary text-small font-weight-medium d-none d-sm-block">{moment(booking.booking_date).format("MMM , D Y")}</div>
                    </NavLink>
                  </div>
                </div>
              );
            })}
          </PerfectScrollbar>
        </div>
      </CardBody>
    </Card>
  );
};
export default RecentOrders;
