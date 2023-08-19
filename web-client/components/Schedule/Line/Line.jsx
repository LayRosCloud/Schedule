import {useEffect, useState} from 'react';
import ScheduleItem from "../Tile/ScheduleItem";
import classes from "./Line.module.css";
import EmptyTile from "../EmptyTile/EmptyTile";

const Line = ({item, times, index, isList}) => {
    const [result, setResult] = useState([])
    const colorsForDays = ['one', 'two', 'three', 'four', 'five', 'six']

    const [visibleLine, setVisibleLine] = useState(!isList)

    useEffect(()=> {
        setVisibleLine(!isList)

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

    const setVisible = (value) => {
        if(isList || window.innerWidth <= 768){
            setVisibleLine(value)
        }
    }

    return (
        <tr>
            <td onClick={()=>setVisible(!visibleLine)}
                className={`${classes.day} ${colorsForDays[index]} ${isList ? classes.day__isList : ''}  ${colorsForDays[index] === 'one'?classes.first:''}`}>
                <p>{item.dayOfWeek.name}</p>
            </td>
            {visibleLine
                ?result.map(res=> res)
                :''
            }

        </tr>
    );
};

export default Line;