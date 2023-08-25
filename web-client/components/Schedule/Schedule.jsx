import {useEffect, useState} from 'react';
import classes from './Schedule.module.css'
import PairGroupedDto from "../../api/PairGroupedDto";
import Line from "./Line/Line";
import ScheduleTimes from "../Lists/ScheduleTimes/ScheduleTimes";
import TypeColor from "../Lists/TypeColor/TypeColor";
import Link from "next/link";
const Schedule = ({pairs, times, days, fullTimes, typeOfPairs}) => {
    const [groupedPairs, setGroupedPairs] = useState([])
    const [isList, setIsList] = useState(false)
    const [isToday, setIsToday] = useState(false)
    const [visibleButton, setVisibleButton] = useState(true)

    useEffect(()=>{
        window.addEventListener('resize', setVisible)
        setVisible();
    },[])

    useEffect(()=>{
        const dayMap = new Map()

        for (const day of days) {
            dayMap.set(day.id, new PairGroupedDto(day))
        }

        for (const pair of pairs) {
            const dayId = pair.dayOfWeek.id

            if(dayMap.has(dayId)){
                dayMap.get(dayId).pairs.push(pair)
            }
        }
        let todayResult = []
        if(isToday){
            const dateNow = new Date();
            const options = { weekday: 'long' };

            let weekDay = dateNow.toLocaleString('ru', options)

            if(weekDay === 'воскресенье'){
                weekDay = 'суббота'
            }

            for (const obj of dayMap.values()){
                if(obj.dayOfWeek.name.toLowerCase() === weekDay){
                    todayResult = obj
                }
            }
            setGroupedPairs([todayResult])
        }
        else{
            setGroupedPairs([...dayMap.values()])
        }

    },[isToday])

    const setVisible = ()=> {
        const mobileWidth = window.innerWidth <= 768;
        setVisibleButton(!(mobileWidth))
        setIsList(mobileWidth)
    }

    const setList = (value) => {
        setIsList(value)
        if(!value){
            setToday(false)
        }
    }

    const setToday = (value) => {
        setIsToday(value)
        if(value){
            setList(true)
        }
    }

    return (
        <>
            {visibleButton
                ?<button className={classes.btn} onClick={()=>setList(!isList)}>
                    {isList
                        ?<img className={classes.btn__icon} src='/list-icon.png' alt='лист'/>
                        :<img className={classes.btn__icon} src='/table-icon.png' alt='таблица'/>
                    }
                </button>
                :''}

            <button className={classes.btn} onClick={()=>setToday(!isToday)}>
                {isToday
                    ?<img className={classes.btn__icon} src='/calendar-today.png' alt='сегодня'/>
                    :<img className={classes.btn__icon} src='/calendar.png' alt='все дни'/>}
            </button>
            <table className={`${classes.resp__tab} ${isList ? classes.linear_table : ''}`}>
                <thead>
                    <tr>
                        <th className={classes.head}></th>
                        {times.map(time => <th className={classes.head} key={time.id}>{time.name}</th>)}
                    </tr>
                </thead>

                <tbody>
                {groupedPairs.map((groupedPair, index) =>
                    <Line key={groupedPair.dayOfWeek.id}
                          item={groupedPair}
                          times={times}
                          index={index}
                          isList={isList}/>)}
                </tbody>
            </table>
            <div className={classes.footer}>
                <ScheduleTimes fullTimes={fullTimes}/>
                <Link href='/' className='link'>
                    <h3>Так же доступна мобильная версия!</h3>
                </Link>
                <TypeColor typeOfPairs={typeOfPairs}/>
            </div>
        </>

    );
};

export default Schedule;