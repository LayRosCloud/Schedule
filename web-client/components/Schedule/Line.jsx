import React, {useEffect, useState} from 'react';
import ScheduleItem from "./Tile/ScheduleItem";

const Line = ({item, times}) => {
    const [result, setResult] = useState([])
    useEffect(()=> {
        const res = []
        let count = 0
        let twoCount = 0;
        while(twoCount < item.pairs.length){
            if(item.pairs[twoCount].time.id === times[count].id){
                res.push(<ScheduleItem item={item.pairs[twoCount]}/>)
                twoCount++;
            }
            else{
                res.push(<td></td>)
            }
            count++;
        }
        setResult(res)

    }, [])

    return (
        <tr>
            <td>
                {item.dayOfWeek.name}
            </td>
            {result.map(res=>res)}
        </tr>
    );
};

export default Line;