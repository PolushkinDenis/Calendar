import React from "react";
import styled from 'styled-components'

const TimeGrid = styled.div`
display: grid;
grid-template-columns: 1fr 7fr;
margin-top: 155px;
margin-bottom: 70px;
`
const TimeHours = styled.div`
display: flex;
flex-direction: column;
@media (min-width: 740px) {
    margin-left: 25px;
}
margin-top: 12px;
`
const TimeHoursItem = styled.div`
display: flex;
flex-direction: column;
color: #c0c0c0;
@media (min-width: 740px) {
    font-size: 20px;
}
font-size: 14px;
justify-content: flex-end;
min-height: 62px;
`
const TimeCell = styled.div`
//margin-left: 12.5%;
display: grid;
grid-template-columns: 1fr 1fr 1fr  1fr  1fr  1fr  1fr;

`
const TimeCellItems = styled.div`
display: flex;
flex-direction: column;
`

const TimeCellItem = styled.div`
display: flex;
flex-direction: column;
height: 60px;
border: 1px solid #e6e6e6;

background-color: ${props => (props.state ? `#ebecff` : `white`)};
background-color: ${props => (props.active && `#b3b7ff`)};
`

const CalendarHour = (props) => {

    return (
        <TimeGrid>
                <TimeHours>
                    {props.arrayOFHour.map(hour =>
                        <TimeHoursItem key={hour}>{hour}</TimeHoursItem>
                    )}
                </TimeHours>
                <TimeCell>
                    {props.hours.map(day =>
                        <TimeCellItems key={day[0].id + 1}>
                            {day.map(hour =>
                                (<TimeCellItem key={hour.id} onClick={e => props.onClickHandler(hour.time)} active={hour.active} state={hour.state}> </TimeCellItem>)
                            )}
                        </TimeCellItems>
                    )}
                </TimeCell>
            </TimeGrid>
    )
}

export default CalendarHour