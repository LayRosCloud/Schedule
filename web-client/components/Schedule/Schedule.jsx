import {useEffect, useState} from 'react';
import classes from './Schedule.module.css'
import PairGroupedDto from "../../api/PairGroupedDto";
import Line from "./Line/Line";
import ScheduleTimes from "../Lists/ScheduleTimes/ScheduleTimes";
import TypeColor from "../Lists/TypeColor/TypeColor";
import Link from "next/link";
const Schedule = ({pairs, times, days, fullTimes, typeOfPairs}) => {
    const [groupedPairs, setGroupedPairs] = useState([])

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
        setGroupedPairs([...dayMap.values()])
    },[])


    return (
        <>
            <table className={classes.resp__tab}>
                <thead>
                    <tr>
                        <th className={classes.head}></th>
                        {times.map(time => <th className={classes.head} key={time.id}>{time.name}</th>)}
                    </tr>
                </thead>

                <tbody>
                {groupedPairs.map((groupedPair, index) =>
                    <Line key={groupedPair.dayOfWeek.id} item={groupedPair} times={times} index={index}/>)}
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