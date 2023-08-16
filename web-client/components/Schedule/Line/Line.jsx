import {useEffect, useState} from 'react';
import ScheduleItem from "../Tile/ScheduleItem";
import classes from "./Line.module.css";
import EmptyTile from "../EmptyTile/EmptyTile";

const Line = ({item, times, index, isList}) => {
    const [result, setResult] = useState([])
    const colorsForDays = ['one', 'two', 'three', 'four', 'five', 'six']
    useEffect(()=> {
        const tiles = []

        let count = 0
        let twoCount = 0;

        while(count < times.length){
            if(item.pairs[twoCount]?.time.id === times[count].id){
                tiles.push(<ScheduleItem key={count} item={item.pairs[twoCount]}/>)
                twoCount++;
            } else{
                tiles.push(<EmptyTile key={count} isList={isList} time={times[count]}/>)
            }
            count++;
        }
        setResult(tiles)

    }, [isList])

    return (
        <tr>
            <td className={`${classes.day} ${colorsForDays[index]} ${isList ? classes.day__isList : ''}`}>
                <p>{item.dayOfWeek.name}</p>
            </td>
            {result.map(res=> res)}
        </tr>
    );
};

export default Line;