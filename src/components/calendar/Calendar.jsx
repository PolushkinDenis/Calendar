import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import Header from './Header'
import NavigationWeek from './NavigationWeek'
import CalendarHour from './CalendarHour'
import Footer from './Footer'

const CalendarWrapper = styled.div`
text-align: center;
max-width: 740px;
margin: auto;
position: relative;
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
        if (inputData !== null) {
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
            <Header addData={addData} />
            <NavigationWeek week={week} startDay={startDay} prevWeek={prevWeek} nextWeek={nextWeek} />
            <CalendarHour arrayOFHour={arrayOFHour} hours={hours} onClickHandler={onClickHandler} />
            <Footer deleteComponent={deleteComponent} todayClick={todayClick} deleteData={deleteData} />
        </CalendarWrapper>
    )
}

export default Calendar