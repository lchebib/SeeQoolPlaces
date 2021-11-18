import React from 'react';
import { Col, Card } from 'antd';
import { Calendar, momentLocalizer } from "react-big-calendar";
// import BigCalendar from 'react-big-calendar';
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
// import HTML5Backend from "react-dnd-html5-backend";
// import { DragDropContext } from "react-dnd";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import '../style/scheduler.css'

const DnDCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);

const initialEvents = [
  {
    id: 0,
    title: "All Day Event very long title",
    allDay: false,
    start: new Date('November 18, 2021 0:00:00'),
    end: new Date("November 18, 2021 0:30:00"),
    resource: { duration: 2 }
  },
  {
    id: 1,
    allDay: true,
    title: "Long Event",
    start: new Date("11/19/21"),
    end: new Date("11/20/21"),
    resource: { duration: 1 }
  },
  {
    id: 20,
    title: "Dinner",
    allDay: false,
    start: new Date('November 18, 2021 1:00:00'),
    end: new Date('November 18, 2021 3:00:00'),
    resource: { duration: 0.5 }

  },
  {
    id: 21,
    title: "Dinner 2",
    allDay: false,
    start: new Date('November 18, 2021 1:00:00'),
    end: new Date('November 18, 2021 3:00:00'),
    resource: { duration: 0.5 }
  },

  // {
  //   id: 2,
  //   title: "DTS STARTS",
  //   start: new Date(2016, 2, 13, 0, 0, 0),
  //   end: new Date(2016, 2, 20, 0, 0, 0)
  // },

  // {
  //   id: 3,
  //   title: "DTS ENDS",
  //   start: new Date(2016, 10, 6, 0, 0, 0),
  //   end: new Date(2016, 10, 13, 0, 0, 0),
  //   desc: "Description is shown here"
  // },
];




class Scheduler extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      events: [],
      startDate: "",
      endDate: "",
      tripName: "",
      tripID: null
    }
    this.moveEvent = this.moveEvent.bind(this);
    this.addEvent = this.addEvent.bind(this)
    // this.onEventDrop = this.onEventDrop.bind(this);
    this.onEventResize = this.onEventResize.bind(this);
  }

  componentDidMount() {
    var tripID = this.props.tripID
    this.setState({ tripID: this.props.tripID })
    var trip = JSON.parse(localStorage.getItem(tripID))
    this.setState({ tripName: trip.name })
    this.setState({ startDate: trip.startDate })
    this.setState({ endDate: trip.startDate })

    // var event = [{
    //   id: 0,
    //   title: "Very long title",
    //   allDay: true,
    //   // start: moment().toDate(),
    //   // end: new Date("11/19/21"),
    //   start: this.props.startDate,
    //   end: this.props.endDate,
    //   resource: "does this work?"
    // }];



    // var events = [event,]
    this.setState({ events: initialEvents })
  }

  onEventResize({ event, start, end }) {
    const { events } = this.state
    const nextEvents = events.map(existingEvent => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent
    })

    this.setState({
      events: nextEvents,
    })
  }

  // onEventDrop({ event, start, end }) {
  //   const { events } = this.state;
  //   const idx = events.indexOf(event);
  //   const updatedEvent = { ...event, start, end };
  //   const nextEvents = [...events];
  //   nextEvents.splice(idx, 1, updatedEvent);
  //   this.setState({
  //     events: nextEvents,
  //   })
  // }

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

  // onEventDrop(event, start, end, allDay) {
  //   console.log("event clicked");
  //   console.log(start, event, end, allDay);
  // };

  moveEvent = ({ event, start, end, isAllDay: droppedOnAllDaySlot }) => {

    console.log(`event: ${event.title}, ${event.start}, ${event.end}, ${event.allDay}`)
    console.log(`start: ${start}`)
    console.log(`end: ${end}`)
    console.log(`droppedOnAllDaySlot: ${droppedOnAllDaySlot}`)

    const { events } = this.state

    let allDay = event.allDay
    // console.log(`allDay: ${allDay}`)

    if (!event.allDay && droppedOnAllDaySlot) {
      allDay = true
      start = start.setHours(0, 0, 0, 0)
      end = end.setHours(23, 59, 59, 59)
    } else if (event.allDay && !droppedOnAllDaySlot) {
      allDay = false
      // end.setHours(start.getHours() + event.resource.duration)
      // start = start.setHours(1, 0, 0, 0)
      start = start.getHours()

      end = start.setHours(start.getHours() + event.resource.duration)


    }

    const nextEvents = events.map(existingEvent => {
      return existingEvent.id == event.id
        ? { ...existingEvent, start, end, allDay }
        : existingEvent

    })

    this.setState({
      events: nextEvents,
    })
    // alert(`${event.title} was dropped onto ${updatedEvent.start}`)
  }
  // moveEvent({ event, start, end }) {
  //   const { events } = this.state;
  //   // var events = this.state.events

  //   const idx = events.indexOf(event);
  //   console.log(idx)
  //   const updatedEvent = { ...event, start, end };
  //   updatedEvent.allDay = false;

  //   const nextEvents = [...events];
  //   nextEvents.splice(idx, 1, updatedEvent);

  //   this.setState({
  //     events: nextEvents
  //   });
  //   console.log(updatedEvent);
  // }

  // resizeEvent = (resizeType, { event, start, end }) => {
  //   const { events } = this.state;

  //   const nextEvents = events.map(existingEvent => {
  //     return existingEvent.id === event.id
  //       ? { ...existingEvent, start, end }
  //       : existingEvent;
  //   });

  //   this.setState({
  //     events: nextEvents
  //   });
  // };

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
              defaultDate={this.state.startDate}
              localizer={localizer}
              toolbar
              resizable
              onEventResize={this.onEventResize}
              onEventDrop={this.moveEvent}
              components={{
                event: EventComponent,
                agenda: {
                  event: EventAgenda
                }
              }}
            // onSelectSlot={this.addEvent}
            // onSelectEvent={event => alert(event.desc)}
            />
          </div>
        </Card>
      </Col>
    );
  }
}

export default Scheduler

