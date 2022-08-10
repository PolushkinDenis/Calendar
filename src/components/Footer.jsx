import React from "react";
import styled from 'styled-components'

const CalendarFooter = styled.div`
position: fixed;
bottom: 0;
width: 100%;
max-width: 740px;
height: 80px;
z-index: 99;
background-color: #eee;
`;
const Today = styled.div`
display: flex;
justify-content: space-between;
padding-left: 50px;
padding-right: 50px;
padding-top: 25px;
color: red;
height: 60px;
font-size: 28px;
`
const TodayText = styled.div`
cursor: pointer;
`
const DeleteText = styled.div`
cursor: pointer;
`

const Footer = (props) => {
    return (
        <CalendarFooter>
        <Today>
            <TodayText onClick={props.todayClick}>Today</TodayText>
            {props.deleteComponent && <DeleteText onClick={props.deleteData}>Delete</DeleteText>}
        </Today>
    </CalendarFooter>
    )
}

export default Footer