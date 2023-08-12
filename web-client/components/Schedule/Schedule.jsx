import React, {useEffect, useState} from 'react';
import classes from './Schedule.module.css'
import PairGroupedDto from "../../api/PairGroupedDto";
import ScheduleItem from "./Tile/ScheduleItem";
import Line from "./Line";
const Schedule = ({pairs, times, days}) => {
    const [groupedPairs, setGroupedPairs] = useState([])

    useEffect(()=>{
        const data = []

        for (let i = 0; i < days.length; i++) {
            data.push(new PairGroupedDto(days[i]))
        }
        for (let i = 0; i < pairs.length; i++) {
            for (let j = 0; j < days.length; j++) {
                if(days[j].id === pairs[i].dayOfWeek.id){
                    data[j].pairs.push(pairs[i])
                }
            }
        }

        setGroupedPairs(data)
    },[])


    return (
        <table className={classes.resp__tab}>
            <thead>
            <tr>
                <th></th>
                {times.map(time => <th key={time.id}>{time.name}</th>)}
            </tr>
            </thead>

            <tbody>
            {groupedPairs.map(groupedPair => <Line item={groupedPair} times={times}/>)}

            </tbody>
        </table>
    );
};

export default Schedule;