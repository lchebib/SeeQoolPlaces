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
    title: "Event very long title",
    allDay: false,
    start: new Date('December 1, 2021 3:00:00'),
    end: new Date("December 1, 2021 6:00:00"),
    resource: { duration: 6 },
    category: 'trails'
  },
  {
    id: 20,
    title: "Dinner",
    allDay: false,
    start: new Date('December 3, 2021 1:00:00'),
    end: new Date('December 3, 2021 3:00:00'),
    resource: { duration: 2 }

  },
  {
    id: 21,
    title: "Dinner 2",
    allDay: false,
    start: new Date('December 4, 2021 1:00:00'),
    end: new Date('December 4, 2021 3:00:00'),
    resource: { duration: 2 }
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
      trip: null,
      events: [],
      // startDate: "",
      // endDate: "",
      // tripName: "",
      // tripID: null
    }
    this.moveEvent = this.moveEvent.bind(this);
    // this.addEvent = this.addEvent.bind(this)
    // this.onEventDrop = this.onEventDrop.bind(this);
    this.onEventResize = this.onEventResize.bind(this);
    this.onSelectEvent = this.onSelectEvent.bind(this);
  }

  componentDidMount() {
    this.setState({ trip: this.props.trip })
    this.setState({ events: initialEvents })
  }

  componentDidUpdate(prevProps, prevState) {

    // console.log(prevProps.newEvent)
    // console.log(this.props.newEvent)
    // console.log(this.state.events[0])


    if (this.props.scheduledPOIS !== prevProps.scheduledPOIS) {
      this.addEvent(this.props.scheduledPOIS.pop())
      // var events = (this.state.events).push(this.props.newEvent)
      // this.setState({ events: events })
    }
    if (this.state.events !== prevState.events) {
      this.props.updateEvents(this.state.events)
      // var events = (this.state.events).push(this.props.newEvent)
      // this.setState({ events: events })
    }
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

  //Clicking an existing event allows you to remove it
  onSelectEvent(pEvent) {
    const r = window.confirm("Would you like to remove this event?")
    if (r === true) {

      this.setState((prevState, props) => {
        const events = [...prevState.events]
        const idx = events.indexOf(pEvent)
        events.splice(idx, 1);
        return { events };
      });
    }
  }

  eventStyleGetter(event, start, end, isSelected) {
    // console.log(event);
    var backgroundColor;
    if (event.category === 'trails') {
      backgroundColor = '#9CDA86';
    } else if (event.category === 'attractions') {
      backgroundColor = '#FFC93F';
    } else {
      backgroundColor = '#EC7878';
    }
    var style = {
      backgroundColor: backgroundColor,
      borderRadius: '0px',
      opacity: 0.8,
      color: 'black',
      border: '0px',
      display: 'block'
    };
    return {
      style: style
    };
  }


  addEvent(POI) {

    // console.log(POI)
    var newEvents = [...this.state.events]
    var eid = 1
    if (this.state.events.length > 0) {
      eid = this.state.events[0].id + 1
    }

    var start = new Date(this.state.trip.dates[0])
    start.setHours(0, 0, 0, 0)
    // var start = new Date(this.state.trip.dates[0])
    var duration = POI.durationHigh
    var end = new Date(start)
    end.setHours(end.getHours() + duration)
    // var end = new Date(this.state.trip.dates[0])
    var category = POI.category

    var event = {
      title: POI.name,
      id: eid,
      start: start,
      end: end,
      allDay: false,
      resource: [{ pid: POI.pid, duration: duration }],
      category: category
    }

    newEvents.push(event)
    this.setState({ events: newEvents })
    // console.log(event)
  }


  // addEvent(event, start, end, allDay) {
  //   var newEvent = {
  //     id: this.state.events.length,
  //     tid: this.state.trip.id,
  //     title: "New event",
  //     start: new Date(new Date(start).setHours(new Date().getHours() - 3)),
  //     end: new Date(new Date(end).setHours(new Date().getHours() + 3)),
  //     desc: "This is a new event"
  //   }

  //   var newEvents = this.state.events
  //   newEvents.push(newEvent)

  //   this.state.events = newEvents
  // };


  moveEvent = ({ event, start, end, isAllDay: droppedOnAllDaySlot }) => {

    // console.log(`event: ${event.title}, ${event.start}, ${event.end}, ${event.allDay}`)
    // console.log(`start: ${start}`)
    // console.log(`end: ${end}`)
    // console.log(`droppedOnAllDaySlot: ${droppedOnAllDaySlot}`)

    const { events } = this.state

    // let allDay = event.allDay
    let allDay = false

    // console.log(`allDay: ${allDay}`)

    // if (!event.allDay && droppedOnAllDaySlot) {
    //   allDay = true
    //   start = start.setHours(0, 0, 0, 0)
    //   end = end.setHours(23, 59, 59, 59)
    // } else if (event.allDay && !droppedOnAllDaySlot) {
    //   allDay = false
    // end.setHours(start.getHours() + event.resource.duration)
    // start = start.setHours(1, 0, 0, 0)
    // var startHours = start.getHours()

    // end = start.setHours(start.getHours() + event.resource.duration)

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
    if (!this.state.trip) {
      return null
    }

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
              defaultDate={this.state.trip.dates[0]}
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
              onSelectEvent={event => this.onSelectEvent(event)} //Fires selecting existing event
              eventPropGetter={(this.eventStyleGetter)}
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

