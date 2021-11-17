import React from 'react';
import { Col, Card } from 'antd';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import '../style/calendar.css'

const DnDCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);

// const initialEvents = [
//   {
//     id: 0,
//     title: "All Day Event very long title",
//     allDay: true,
//     start: new Date("11/19/21"),
//     end: new Date("11/19/21")
//   },
//   {
//     id: 1,
//     title: "Long Event",
//     start: new Date("11/19/21"),
//     end: new Date("11/20/21")
//   },

//   {
//     id: 2,
//     title: "DTS STARTS",
//     start: new Date(2016, 2, 13, 0, 0, 0),
//     end: new Date(2016, 2, 20, 0, 0, 0)
//   },

//   {
//     id: 3,
//     title: "DTS ENDS",
//     start: new Date(2016, 10, 6, 0, 0, 0),
//     end: new Date(2016, 10, 13, 0, 0, 0),
//     desc: "Description is shown here"
//   },
// ];


class Scheduler extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      events: [{
        id: 0,
        title: "All Day Event very long title",
        allDay: true,
        start: moment().toDate(),
        end: new Date("11/19/21")
      }],
      // startDate: JSON.parse(localStorage.getItem("trips"))

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

  moveEvent({ event, start, end }) {
    const { events } = this.state;

    const idx = events.indexOf(event);
    const updatedEvent = { ...event, start, end };

    const nextEvents = [...events];
    nextEvents.splice(idx, 1, updatedEvent);

    this.setState({
      events: nextEvents
    });
  }

  resizeEvent = (resizeType, { event, start, end }) => {
    const { events } = this.state;

    const nextEvents = events.map(existingEvent => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent;
    });

    this.setState({
      events: nextEvents
    });
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
        <Card style={{ borderBottom: 'none' }}>
          <div className="wrapper" style={{ fontFamily: 'Work Sans', maxHeight: "40vh" }}>
            <DnDCalendar
              selectable
              defaultView='week'
              views={['week', 'day', 'agenda']}
              events={this.state.events}
              startAccessor="start"
              endAccessor="end"
              defaultDate={moment().toDate()}
              localizer={localizer}
              toolbar
              resizable
              onEventDrop={this.moveEvent}
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
        </Card>
      </Col>
    );
  }
}

export default Scheduler

