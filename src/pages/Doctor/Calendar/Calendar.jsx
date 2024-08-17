import React, { useState } from 'react'
import left from '../../../assets/img/left.png'
import separator from '../../../assets/img/separator.png'
import right from '../../../assets/img/right.png'
import styles from './Calendar.module.css'

function Calendar() {

    const [activeTab, setActiveTab] = useState("Tydzień")

    function handleActiveTab(tab) {
        setActiveTab(tab)
    }

    const daysOfWeek = ['PN', 'WT', 'SR', 'CZ', 'PT', 'SB', 'ND']
    const timeSlots = Array.from({ length: 30 }, (_, i) => {
        const hour = Math.floor(i / 2) + 7
        const minute = i % 2 === 0 ? '00' : '30'
        return `${hour}:${minute}`
    })

    const CalendarHeader = () => (
        <div className={styles.calendarNavbar}>
            <div className={styles.calendarNavbarButt} style={{ background: '#A6DEF7' }}>
                <button className={styles.changeDate}><img className={styles.opacityLess} id="left-butt" src={left} alt="Left" /></button>
                <img className={styles.separator} src={separator} alt="Separator" />
                <button className={styles.changeDate}><img className={styles.opacityLess} id="right-butt" src={right} alt="Right" /></button>
            </div>
            <span className={styles.calendarNavbarDate}>
                <span className={styles.calendarNavbarDay}>20-26</span>
                <span className={styles.calendarNavbarMonth}>May</span>
                <span className={styles.calendarNavbarYear}>2024</span>
            </span>

            <div className={styles.calendarNavbarButt}>
                <button className={`${activeTab === "Tydzień" ? styles.active : ""} ${styles.changeTypeDate}`}
                    onClick={() => handleActiveTab("Tydzień")}
                >Tydzień</button>

                <button className={`${activeTab === "Miesiąc" ? styles.active : ""} ${styles.changeTypeDate}`}
                    onClick={() => handleActiveTab("Miesiąc") }
                >Miesiąc</button>

            </div>
        </div>
    )

    const CalendarDaysHeader = () => (
        <div className={styles.headerRow}>
            <div className={styles.timeSlotEmptySlot}></div>
            {daysOfWeek.map(day => (
                <div key={day} className={styles.dayHeader}>{day}</div>
            ))}
        </div>
    )

    const TimeColumn = () => (
        <div className={styles.timeColumn}>
            {timeSlots.map(time => (
                <React.Fragment key={time}>
                    <div className={styles.timeSlot}>{time}</div>
                    <div className={styles.timeSlotEmptySlot}></div>
                </React.Fragment>
            ))}
        </div>
    )

    const CalendarDaysGrid = () => {
        const rows = Array.from({ length: 60 }, (_, i) => (
            <div key={i} className={styles.dayRow}>
                {Array.from({ length: 7 }, (_, j) => (
                    <div key={j} className={styles.dayCell}></div>
                ))}
            </div>
        ))
        return <div className={styles.daysGrid}>{rows}</div>
    }

    return (
        <div className="content">
            <CalendarHeader />
            <div className={styles.calendarContainer}>
                <CalendarDaysHeader />
                <div className={styles.timeAndDays}>
                    <TimeColumn />
                    <CalendarDaysGrid />
                </div>
            </div>
        </div>
    )

}


export default Calendar
