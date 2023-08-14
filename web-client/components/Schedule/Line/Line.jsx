import {useEffect, useState} from 'react';
import ScheduleItem from "../Tile/ScheduleItem";
import classes from "./Line.module.css";
import EmptyTile from "../EmptyTile/EmptyTile";

const Line = ({item, times, index}) => {
    const [result, setResult] = useState([])
    const colorsForDays = ['one', 'two', 'three', 'four', 'five', 'six']
    useEffect(()=> {
        const res = []

        let count = 0
        let twoCount = 0;

        while(count < times.length){
            if(item.pairs[twoCount]?.time.id === times[count].id){
                res.push(<ScheduleItem key={count} item={item.pairs[twoCount]}/>)
                twoCount++;
            } else{
                res.push(<EmptyTile key={count}/>)
            }
            count++;
        }
        setResult(res)

    }, [])

    return (
        <tr>
            <td className={`${classes.day} ${colorsForDays[index]}`}>
                <p>{item.dayOfWeek.name}</p>
            </td>
            {result.map(res=> res)}
        </tr>
    );
};

export default Line;