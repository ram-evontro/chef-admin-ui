import React,{useEffect,useState} from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import CalendarToolbar from 'components/CalendarToolbar';
import IntlMessages from 'helpers/IntlMessages';
import { getDirection } from 'helpers/Utils';

const localizer = momentLocalizer(moment);

const CalendarCard = ({items,updateAction}) => {
  const [events,setEvents] = useState([]);
  useEffect(()=>{
    let temp =[];
    items.map((item)=>{
      let temprow = {};
      temprow['key'] = item.id;
      temprow['title'] = (item.type==="virtual_dining"?"Virtual Dining":"Chef's Table")+' ('+item.meal+')';
      temprow['start'] = item.booking_date;
      temprow['end'] = item.booking_date;
      temp.push(temprow);
    });
    setEvents(temp);
  },[items])
  return (
    <Card>
      <CardBody>
        <CardTitle>
          <IntlMessages id="dashboards.calendar" />
        </CardTitle>
        <Calendar
          localizer={localizer}
          style={{ minHeight: '500px' }}
          events={events}
          rtl={getDirection().isRtl}
          views={['month']}
          components={{
            toolbar: CalendarToolbar,
          }}
          onSelectEvent={event => updateAction('view',event.key)}
        />
      </CardBody>
    </Card>
  );
};
export default CalendarCard;
