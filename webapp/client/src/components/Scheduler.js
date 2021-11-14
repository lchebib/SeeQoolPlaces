import React from 'react';
import { Layout, Row, Col, Card, Button, Divider } from 'antd';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import '../style/calendar.css'

const { Content } = Layout;

const DnDCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);

const initialEvents = [
  {
    id: 0,
    title: "All Day Event very long title",
    allDay: true,
    start: new Date(2015, 3, 0),
    end: new Date(2015, 3, 1)
  },
  {
    id: 1,
    title: "Long Event",
    start: new Date(2015, 3, 7),
    end: new Date(2015, 3, 10)
  },

  {
    id: 2,
    title: "DTS STARTS",
    start: new Date(2016, 2, 13, 0, 0, 0),
    end: new Date(2016, 2, 20, 0, 0, 0)
  },

  {
    id: 3,
    title: "DTS ENDS",
    start: new Date(2016, 10, 6, 0, 0, 0),
    end: new Date(2016, 10, 13, 0, 0, 0),
    desc: "Description is shown here"
  },

  // {
  //   id: 4,
  //   title: "Leave",
  //   start: new Date(new Date().setHours(new Date().getHours() - 3)),
  //   end: new Date(new Date().setHours(new Date().getHours() + 3)),
  //   desc: "Description is shown here"
  // }
];


class Scheduler extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      events: []

    }

    this.addEvent = this.addEvent.bind(this)
    this.onEventDrop = this.onEventDrop.bind(this)
  }



  addEvent(event, start, end, allDay) {
    var newEvent = {
      id: this.state.events.length,
      title: "New event",
      start: new Date(new Date(start).setHours(new Date().getHours() - 3)),
      end: new Date(new Date(end).setHours(new Date().getHours() + 3)),
      desc: "This is a new event"
    }

    var newEvents = this.state.events
    newEvents.push(newEvent)

    // this.setState({ events: newEvents })
    this.state.events = newEvents
  };

  onEventDrop(event, start, end, allDay) {
    console.log("event clicked");
    console.log(start, event, end, allDay);
  };




  render() {


    const EventComponent = ({ start, end, title }) => {
      return (
        <>
          <p>{title}</p>
          <p>{start}</p>
          <p>{end}</p>
        </>
      );
    };

    const EventAgenda = ({ event }) => {
      return (
        <span>
          <em style={{ color: "magenta" }}>{event.title}</em>
          <p>{event.desc}</p>
        </span>
      );
    };

    return (
      <Col span={24}>
        <div className="wrapper" style={{ maxHeight: "40vh" }}>
          <DnDCalendar
            selectable
            events={initialEvents}
            startAccessor="start"
            endAccessor="end"
            defaultDate={moment().toDate()}
            localizer={localizer}
            toolbar
            resizable
            onEventDrop={this.onEventDrop}
            components={{
              event: EventComponent,
              agenda: {
                event: EventAgenda
              }
            }}
            onSelectSlot={this.addEvent}
            onSelectEvent={event => alert(event.desc)}
          />
        </div>
      </Col>
    );
  }
}

export default Scheduler

