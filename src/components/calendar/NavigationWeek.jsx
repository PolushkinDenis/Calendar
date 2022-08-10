import React from "react";
import styled from 'styled-components'
import nextImg from '../../images/next.png'
import prevImg from '../../images/prev.png'
import moment from 'moment'

const NavigationWeeks = styled.div`
display: flex;
flex-direction: column;
background-color: #eee;
position: fixed;
width: 100%;
max-width: 740px;

`
const NavigationDays = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr  1fr  1fr  1fr  1fr;
align-items: center;
padding-left: 12.5%;
`
const NavigationDaysName = styled.div`
align-items: center;
padding: 7px 0;
font-size: 16px;
font-weight: bold;


@media (min-width: 740px) {
    width: 50px;
    padding-left: 25px;
}
`
const NavigationDaysNumber = styled.div`
text-align: center;
height: 50px;
line-height: 50px;
@media (min-width: 740px) {
    width: 50px;
    margin-left: 25px;

}
font-weight: bold;
font-size: 26px;
${props => props.today && `
border-radius: 25px;
background-color: red;
color: #fff;;
`}
`
const NavigationChangeWeek = styled.div`
display: flex;
justify-content: space-between;
min-height: 60px;
padding-left: 12.5%;
margin-left: 20px;
margin-right: 20px;
margin-top: 10px;
`
const NavigationChangeWeekTitile = styled.div`
font-size: 24px;
font-weight: bold;
text-align: center;
`
const NavigationChangeWeekButtonPrev = styled.div`
background-image: url(${prevImg});
width: 40px;
height: 40px;
cursor: pointer;
background-size: 25px 25px;
background-repeat: no-repeat;
background-position: 50%;
`
const NavigationChangeWeekButtonNext = styled.div`
background-image: url(${nextImg});
width: 40px;
height: 40px;
cursor: pointer;
background-size: 25px 25px;
background-repeat: no-repeat;
background-position: 50%;
`

const NavigationWeek = (props) => {

    return (
        <NavigationWeeks>
            <NavigationDays>
                {props.week.map(day =>
                    <NavigationDaysName key={day.date()}>{day.format('dd')[0]}</NavigationDaysName>
                )}
            </NavigationDays>
            <NavigationDays>
                {props.week.map(day =>
                    day.format("YYYY-MM-DD") === moment().format("YYYY-MM-DD") ? (
                        <NavigationDaysNumber key={day.date()} today>{day.date()}</NavigationDaysNumber>
                    ) : (
                        <NavigationDaysNumber key={day.date()}>{day.date()}</NavigationDaysNumber>
                    )
                )}
            </NavigationDays>
            <NavigationChangeWeek>
                <NavigationChangeWeekButtonPrev onClick={props.prevWeek}></NavigationChangeWeekButtonPrev>
                <NavigationChangeWeekTitile>{props.startDay.format('MMMM YYYY')}</NavigationChangeWeekTitile>
                <NavigationChangeWeekButtonNext onClick={props.nextWeek}></NavigationChangeWeekButtonNext>
            </NavigationChangeWeek>
        </NavigationWeeks>
    )
}

export default NavigationWeek