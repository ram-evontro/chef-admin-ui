import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import IntlMessages from "helpers/IntlMessages";
import { getDirection } from "helpers/Utils";

const localizer = momentLocalizer(moment);

const CalendarCard = ({ items, updateAction, changeMonth }) => {
  const changedMonth = (date) => {
    let selectedtMonth = moment(date).format("MMMM YY");
    console.log(filledMonths[selectedtMonth]);
    console.log(selectedtMonth);
    if (!filledMonths[selectedtMonth]) {
      let tempMonths = { ...filledMonths };
      tempMonths[selectedtMonth] = true;
      setFilledMonths(tempMonths);
      changeMonth(date);     
    }
  };
  const CalendarToolbar = (toolbar) => {
    const goToBack = () => {
      toolbar.onNavigate("PREV");
      changedMonth(moment(toolbar.date).subtract(1, "month"));
    };
    const goToNext = () => {
      changedMonth(moment(toolbar.date).add(1, "month"));
      toolbar.onNavigate("NEXT");
    };
    const goToCurrent = () => {
      toolbar.onNavigate("TODAY");
    };

    const label = () => {
      const date = moment(toolbar.date);
      return (
        <span>
          <span>{date.format("MMMM")} </span>
          <span> {date.format("YYYY")}</span>
        </span>
      );
    };

    return (
      <div className="big-calendar-header">
        <div className="float-left">
          <label>{label()}</label>
        </div>

        <div className="float-right">
          <div>
            <button type="button" className="btn btn-primary calendar-today-btn mr-2" onClick={goToCurrent}>
              Today
            </button>
            <button type="button" className="btn calendar-prev-btn mr-1" onClick={goToBack}>
              <span className="simple-icon-arrow-left" />
            </button>
            <button type="button" className="btn calendar-next-btn" onClick={goToNext}>
              <span className="simple-icon-arrow-right" />
            </button>
          </div>
        </div>
      </div>
    );
  };
  const [events, setEvents] = useState([]);
  const [filledMonths, setFilledMonths] = useState({});
  useEffect(() => {
    let temp = [];
    let currentMonth = moment().format("MMMM YY");
    let tempMonths = { ...filledMonths };
    tempMonths[currentMonth] = true;
    setFilledMonths(tempMonths);
    items.map((item) => {
      let temprow = {};
      temprow["key"] = item.id;
      temprow["title"] = (item.type === "virtual_dining" ? "Virtual Dining" : "Chef's Table") + " (" + item.meal + ")";
      temprow["start"] = item.booking_date;
      temprow["end"] = item.booking_date;
      temp.push(temprow);
    });
    setEvents(temp);
  }, [items]);
  return (
    <Card>
      <CardBody>
        <CardTitle>
          <IntlMessages id="dashboards.calendar" />
        </CardTitle>
        <Calendar
          localizer={localizer}
          style={{ minHeight: "500px" }}
          events={events}
          rtl={getDirection().isRtl}
          views={["month"]}
          components={{
            toolbar: CalendarToolbar,
          }}
          onSelectEvent={(event) => updateAction("view", event.key)}
        />
      </CardBody>
    </Card>
  );
};
export default CalendarCard;
