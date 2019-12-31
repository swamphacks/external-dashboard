import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import PageTitle from '../components/PageTitle';
import {PageRootContainer as RootContainer} from '../components/PageRootContainer';

// Styled components
const ContentContainer = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  position: relative;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, auto);
  column-gap: 10px;
  row-gap: 20px;
  justify-items: center;
  align-items: center;
`;

const EventContainer = styled.div`
  padding: 20px;
  background-color: #8daa90;
  opacity: ${props => (props.complete ? '0.5' : '1')}
  border-radius: 5px;
  width: 100%;
  flex-shrink: 0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
`;

const EventName = styled.p`
  font-family: Montserrat-Bold, Helvetica, sans-serif;
  font-size: 1.2rem;
`;

const EventType = styled.p`
  display: inline;
  font-family: Montserrat, Helvetica, sans-serif;
  font-size: 1.3rem;
`;

const EventTime = styled.p`
  font-family: Montserrat, Helvetica, sans-serif;
  font-size: 0.9rem;
`;

const EventLocation = styled.p`
  font-family: Montserrat, Helvetica, sans-serif;
  font-size: 1rem;
`;

const DayText = styled.h3`
  font-family: Montserrat-Bold, Helvetica, sans-serif;
`;

const Schedule = () => {
  const [events, setEvents] = useState(null);
  const [filterType, setFilterType] = useState(null);
  useEffect(() => {
    setEvents(
      [
        createEvent(
          'Test 1',
          'Logistics',
          'Marston Breezeway',
          'Friday',
          '05:30 PM',
          '07:30 PM'
        ),
        createEvent(
          'Test 2',
          'Food',
          'Marston Breezeway',
          'Friday',
          '06:00 PM',
          '07:30 PM'
        ),
        createEvent(
          'Test 4',
          'Activity',
          'Marston Breezeway',
          'Saturday',
          '06:00 PM',
          '07:30 PM'
        ),
        createEvent(
          'Test 3',
          'Activity',
          'Marston Breezeway',
          'Saturday',
          '06:00 AM',
          '07:30 AM'
        )
      ].sort(sortByDateHelper)
    );
  }, []);

  return (
    <RootContainer>
      <PageTitle title='Schedule' />
      {events !== null && (
        <ContentContainer>
          {/* Friday */}
          <React.Fragment>
            <DayText>Friday</DayText>

            <GridContainer>
              {events.map(event => {
                if (event.day === 'Friday') {
                  return renderEvent(event);
                }
              })}
            </GridContainer>
          </React.Fragment>
          {/* Saturday */}
          <React.Fragment>
            <DayText>Saturday</DayText>
            <GridContainer>
              {events.map(event => {
                if (event.day === 'Saturday') {
                  return renderEvent(event);
                }
              })}
            </GridContainer>
          </React.Fragment>
          {/* Sunday */}
          <React.Fragment>
            <DayText>Sunday</DayText>
            <GridContainer>
              {events.map(event => {
                if (event.day === 'Sunday') {
                  return renderEvent(event);
                }
              })}
            </GridContainer>
          </React.Fragment>
        </ContentContainer>
      )}
    </RootContainer>
  );
};

const renderEvent = event => (
  <EventContainer
    key={event.name + event.start}
    complete={checkIfComplete(event)}
  >
    <EventName>
      {event.name}
      <EventType> - {event.type}</EventType>
    </EventName>
    <EventLocation>Location: {event.location}</EventLocation>
    <EventTime>Start: {event.start}</EventTime>
    <EventTime>End: {event.end}</EventTime>
  </EventContainer>
);

const createEvent = (name, type, location, day, start, end) => ({
  name,
  type,
  location,
  day,
  start,
  end,
  startDate: interpolateDate(day, start),
  endDate: interpolateDate(day, end)
});

const interpolateDate = (day, time) => {
  let month = 1;
  let d = 31;
  if (day === 'Friday') month = 0;
  if (day === 'Saturday') d = 1;
  if (day === 'Sunday') d = 2;
  let amPM = time.slice(time.length - 2);
  let hour = parseInt(time.slice(0, time.length - 6));
  let minute = parseInt(time.slice(3, time.length - 3));
  if (amPM === 'PM') hour += 12;
  if (hour > 24) hour -= 24;
  return new Date(2020, month, d, hour, minute);
};

const sortByDateHelper = (a, b) => {
  return a.startDate - b.startDate;
};

const checkIfComplete = a => {
  return a.endDate <= Date.now();
};

const types = ['Logistics', 'Food', 'Activity'];

export default Schedule;
