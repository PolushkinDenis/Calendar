import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import plusImg from '../../images/plus.png'
import nextImg from '../../images/next.png'
import prevImg from '../../images/prev.png'

const CalendarWrapper = styled.div`
text-align: center;
max-width: 740px;
margin: auto;
position: relative;
`
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
const NavigationWeek = styled.div`
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

const Calendar = () => {
    moment.updateLocale('en', { week: { dow: 1 } })
    const [selectedDate, setSelectedDate] = useState()
    const [listData, setListData] = useState([])
    const [startDay, setStartDay] = useState(moment().startOf('week'))
    const [endDay, setEndDay] = useState(moment().endOf('week'))
    const arrayOFHour = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', ' ']
    // Неделя
    const week = []
    const day = startDay.clone()
    while (!day.isAfter(endDay)) {
        week.push(day.clone())
        day.add(1, 'day')
    }

    // Дни по часам
    const hours = []

    week.map((day) => {
        let startHour = moment(day).startOf('day')
        startHour = startHour.add(8, 'hour')
        const arrayOfHour = []
        while (startHour.hour() >= 8 && startHour.hour() <= 20) {

            const newDataItem = {
                id: startHour.clone().format(),
                time: startHour.clone(),

            }

            if (selectedDate && selectedDate.unix() === startHour.unix()) {
                newDataItem.active = true
            }
            else {
                newDataItem.active = false
            }
            let check = false
            listData.map(data => {
                const startMinute = startHour.clone().startOf('hour').unix()
                const endMinute = startHour.clone().endOf('hour').unix()
                const currentMinute = data.unix()

                if (currentMinute >= startMinute && currentMinute < endMinute) {
                    newDataItem.state = true
                    check = true
                }
            })
            if (check === false) {
                newDataItem.state = false
            }
            arrayOfHour.push(newDataItem)
            startHour.add(1, 'hour')
        }
        hours.push(arrayOfHour)
    })

    const onClickHandler = (time) => {
        if (selectedDate === time.unix()) {
            setSelectedDate()
        }
        else {
            setSelectedDate(time)
        }
    }

    let deleteComponent = false
    listData.map((data) => {
        if (selectedDate && data.format("YYYY-MM-DD HH") === selectedDate.format("YYYY-MM-DD HH")) {
            deleteComponent = true
        }
    })

    const nextWeek = () => {
        const sday = startDay.clone()
        const eday = endDay.clone()
        setStartDay(sday.add(1, 'week'))
        setEndDay(eday.add(1, 'week'))
    }
    const prevWeek = () => {
        const sday = startDay.clone()
        const eday = endDay.clone()
        setStartDay(sday.subtract(1, 'week'))
        setEndDay(eday.subtract(1, 'week'))
    }
    if (listData) {
        listData.map((data) => {
            console.log(data.unix())
        })
    }

    const addData = () => {
        let inputData = window.prompt('Enter event time: YYYY-MM-DD HH:mm:ss');
        let newData = moment(inputData, 'YYYY-MM-DD HH:mm:ss', true);
        if (newData.isValid()) {
            const newListData = [...listData]
            newListData.push(newData)
            setListData(newListData)
        }
        else {
            alert('Не верный формат даты');
        }
    }

    const todayClick = () => {
        setStartDay(moment().startOf('week'))
        setEndDay(moment().endOf('week'))
    }

    const deleteData = () => {
        const newListData = listData.filter((data) => { return data.format("YYYY-MM-DD HH") !== selectedDate.format("YYYY-MM-DD HH") })
        setListData(newListData)
    }

    useEffect(() => {
        const week = []
        const day = startDay.clone()
        while (!day.isAfter(endDay)) {

            week.push(day.clone())
            day.add(1, 'day')
        }

        const hours = []
        week.map((day) => {
            let startHour = moment(day).startOf('day')
            startHour = startHour.add(8, 'hour')
            const arrayOfHour = []
            while (startHour.hour() >= 8 && startHour.hour() <= 20) {
                arrayOfHour.push({
                    id: startHour.clone().format(),
                    time: startHour.clone(),
                    state: false,
                    active: false
                })
                startHour.add(1, 'hour')
            }
            hours.push(arrayOfHour)
        })
    }, [startDay])

    return (
        <CalendarWrapper>
            <CalendarHeader>
                <HeaderTitle>
                    Interview Calendar
                </HeaderTitle>
                <HeaderPlus onClick={addData} />
            </CalendarHeader>
            <NavigationWeek>
                <NavigationDays>
                    {week.map(day =>
                        <NavigationDaysName key={day.date()}>{day.format('dd')[0]}</NavigationDaysName>
                    )}
                </NavigationDays>
                <NavigationDays>
                    {week.map(day =>
                        day.format("YYYY-MM-DD") === moment().format("YYYY-MM-DD") ? (
                            <NavigationDaysNumber key={day.date()} today>{day.date()}</NavigationDaysNumber>
                        ) : (
                            <NavigationDaysNumber key={day.date()}>{day.date()}</NavigationDaysNumber>
                        )
                    )}
                </NavigationDays>
                <NavigationChangeWeek>
                    <NavigationChangeWeekButtonPrev onClick={prevWeek}></NavigationChangeWeekButtonPrev>
                    <NavigationChangeWeekTitile>{startDay.format('MMMM YYYY')}</NavigationChangeWeekTitile>
                    <NavigationChangeWeekButtonNext onClick={nextWeek}></NavigationChangeWeekButtonNext>
                </NavigationChangeWeek>
            </NavigationWeek>
            <TimeGrid>
                <TimeHours>
                    {arrayOFHour.map(hour =>
                        <TimeHoursItem key={hour}>{hour}</TimeHoursItem>
                    )}
                </TimeHours>
                <TimeCell>
                    {hours.map(day =>
                        <TimeCellItems key={day[0].id + 1}>
                            {day.map(hour =>
                                (<TimeCellItem key={hour.id} onClick={e => onClickHandler(hour.time)} active={hour.active} state={hour.state}> </TimeCellItem>)
                            )}
                        </TimeCellItems>
                    )}
                </TimeCell>
            </TimeGrid>
            <CalendarFooter>
                <Today>
                    <TodayText onClick={todayClick}>Today</TodayText>
                    {deleteComponent && <DeleteText onClick={deleteData}>Delete</DeleteText>}
                </Today>
            </CalendarFooter>
        </CalendarWrapper>
    )
}

export default Calendar