import React from "react";
import styled from 'styled-components'
import plusImg from '../../images/plus.png'

const CalendarHeader = styled.div`
position: sticky;
top: 0;
left: 0;
right: 0;
z-index: 1;
background: white;
display: flex;
justify-content: space-between;
height: 50px;
padding: 25px 50px 0 50px;
`
const HeaderTitle = styled.div`
float: left;
text-align: left;
font-size: 24px;
`
const HeaderPlus = styled.div`
width: 24px;
height: 24px;
background-image: url(${plusImg});
background-size: contain;
cursor: pointer;
`

const Header = (props) => {
    return (
        <CalendarHeader>
                <HeaderTitle>
                    Interview Calendar
                </HeaderTitle>
                <HeaderPlus onClick={props.addData} />
            </CalendarHeader>
    )
}

export default Header