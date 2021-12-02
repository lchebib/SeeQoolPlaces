import React from 'react';
import { Col, Card } from 'antd';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import '../style/scheduler.css'

const DnDCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);


class Scheduler extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      trip: null,
      events: [],

    }
    this.moveEvent = this.moveEvent.bind(this);
    this.onEventResize = this.onEventResize.bind(this);
    this.onSelectEvent = this.onSelectEvent.bind(this);
  }

  componentDidMount() {
    this.setState({ trip: this.props.trip })
    this.setState({ events: this.props.events })



  }

  componentDidUpdate(prevProps, prevState) {

    if (this.props.scheduledPOIS !== prevProps.scheduledPOIS) {
      this.addEvent(this.props.scheduledPOIS.pop())
    }
    if (this.state.events !== prevState.events) {
      this.props.updateEvents(this.state.events)
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

    console.log(POI)
    var newEvents = [...this.state.events]
    var eid = 1
    if (this.state.events.length > 0) {
      eid = this.state.events.at(-1).id + 1
    }

    var start = new Date(this.state.trip.startDate)
    console.log(start)
    start.setHours(0, 0, 0, 0)
    var duration = Math.floor(POI.duration_high * 60)
    var end = new Date(start)
    end.setMinutes(end.getMinutes() + duration)
    var category = POI.category

    var event = {
      title: POI.name,
      id: eid,
      start: start,
      end: end,
      allDay: false,
      pid: POI.pid,
      category: category
    }

    newEvents.push(event)
    this.setState({ events: newEvents })
    console.log(event)
  }



  moveEvent = ({ event, start, end, isAllDay: droppedOnAllDaySlot }) => {

    const { events } = this.state
    let allDay = false

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
              defaultDate={this.state.trip.startDate}
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
            />
          </div>
        </Card>
      </Col>
    );
  }
}

export default Scheduler
