import React from 'react';
import { Col, Card } from 'antd';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import '../style/style.css'

const DnDCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);


/**
 * @name Scheduler
 * @description Drag-and-drop calendar that displays scheduled POIs
 * API Documentation: https://jquense.github.io/react-big-calendar/examples/index.html#api
 * 
 * PROPS
 * @name startDate
 * @description Date that will initialize the calendar week.
 * Also used as initial date to add new events to.
 * 
 * @name events
 * @description Array of event objects
 * 
 * @name scheduledPOIS
 * @description Array of POIs that have been scheduled. 
 * Used as a means to distinguish when a POI is intended to be scheduled as a new event, 
 * rather than an event just being updated.
 * 
 * @name updateEvents
 * @description Callback function when any changes made to local events.
 * @param {Array} events
 * 
 * APPEARS IN:
 * TripPage
 */

class Scheduler extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      events: [],
    }
    this.moveEvent = this.moveEvent.bind(this);
    this.onEventResize = this.onEventResize.bind(this);
    this.onSelectEvent = this.onSelectEvent.bind(this);
  }


  componentDidMount() {
    this.setState({ events: this.props.events })
  }

  componentDidUpdate(prevProps, prevState) {
    // Detects changes in scheduledPOIS and creates a new event from recently added POI
    if (this.props.scheduledPOIS !== prevProps.scheduledPOIS) {
      this.addEvent(this.props.scheduledPOIS.pop())
    }

    // Detects changes in events and updates props events
    if (this.state.events !== prevState.events) {
      this.props.updateEvents(this.state.events)
    }
  }

  /**
   * @description Callback function when event is resized. Updates start and end times of event.
   * @param {Object} event
   * @param {Date} start
   * @param {Date} end
   */
  onEventResize({ event, start, end }) {
    const nextEvents = this.state.events.map(existingEvent => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent
    })

    this.setState({
      events: nextEvents,
    })
  }

  /**
   * @description Callback function when event is clicked. Prompts user to remove event.
   * @param {Object} event
   */
  onSelectEvent(event) {
    const r = window.confirm("Would you like to remove this event?")
    if (r === true) {
      this.setState((prevState) => {
        const events = [...prevState.events]
        const idx = events.indexOf(event)
        events.splice(idx, 1);
        return { events };
      });
    }
  }

  /**
   * @description Callback function that applies style to events on calendar based on category.
   * @param {Object} event
   */
  eventStyleGetter(event) {
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

  /**
   * @description Creates an event object and adds it to this.state.events
   * @param {Object} POI
   */
  addEvent(POI) {
    var newEvents = [...this.state.events]
    var eid = 1
    if (this.state.events.length > 0) {
      eid = this.state.events.at(-1).id + 1
    }
    var start = new Date(this.props.startDate)
    start.setHours(0, 0, 0, 0)

    // Set the end time of the event according to its suggested duration
    var duration = Math.floor(POI.duration_high * 60)
    var end = new Date(start)
    end.setMinutes(end.getMinutes() + duration)

    var category = POI.category

    // Create event object
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
  }


  /**
   * @description Callback function when event is moved. Updates start and end date.
   * @param {Object} event
   * @param {Date} start
   * @param {Date} end
   */
  moveEvent = ({ event, start, end }) => {
    const nextEvents = this.state.events.map(existingEvent => {
      return existingEvent.id == event.id
        ? { ...existingEvent, start, end }
        : existingEvent
    })

    this.setState({ events: nextEvents })
  }


  render() {

    // Do not render component until startDate props ready
    if (!this.props.startDate) {
      return null
    }

    /**
     * @description Customize how different sections of the calendar render by providing custom Components
     * @param {Date} start
     * @param {Date} end
     * @param {String} title
     */
    const EventComponent = ({ start, end, title }) => {
      return (
        <>
          <p>{title}</p>
          <p>{start}</p>
          <p>{end}</p>
        </>
      );
    };

    /**
     * @description Customize how events appear in Agenda tab
     * @param {Date} start
     * @param {Date} end
     * @param {String} title
     */
    const EventAgenda = ({ event }) => {
      return (
        <span>
          <em style={{ color: "#d60063" }}>{event.title}</em>
          <p>{event.desc}</p>
        </span>
      );
    };

    return (
      <Col span={24}>
        <Card style={{ marginBottom: 20 }}>
          <div className='sched-wrapper'>
            <DnDCalendar
              selectable
              defaultView='week'
              views={['week', 'day', 'agenda']}
              events={this.state.events}
              startAccessor="start"
              endAccessor="end"
              defaultDate={this.props.startDate}
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
              onSelectEvent={event => this.onSelectEvent(event)}
              eventPropGetter={this.eventStyleGetter}
            />
          </div>
        </Card>
      </Col>
    );
  }
}

export default Scheduler
