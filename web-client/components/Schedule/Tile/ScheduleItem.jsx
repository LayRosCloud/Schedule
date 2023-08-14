import {useEffect, useState} from 'react';
import classes from './ScheduleItem.module.css'
import Link from "next/link";
const ScheduleItem = ({item}) => {

    const [endDate, setEndDate] = useState('')

    useEffect(()=>{
        const endDate = new Date(item.dateStart)
        endDate.setDate(endDate.getDate() + (item.numberOfWeeks - 1) * 7);

        const options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            timezone: 'UTC'
        };
        setEndDate(`${endDate.toLocaleString("ru", options)}`)
        },
        [])

    return (
        <td>
            <div className={classes.tile} style={{background: item.typeOfPair.color}}>
                    <span>{item.time.name}</span>
                    <Link href={`/audience/${item.audience.id}`} className='link'>
                        <p>
                            {`ауд. ${item.audience.name} к. ${item.audience.corpu.name}`}
                        </p>
                    </Link>
                    <h3>
                        {item.teacherSubject.Subject.Name}
                    </h3>
                    <Link href={`/teacher/${item.teacherSubject.Teacher.id}`} className='link'>
                        <p>
                            {`${item.teacherSubject.Teacher.LastName} 
                        ${item.teacherSubject.Teacher.Name[0]}. 
                        ${item.teacherSubject.Teacher.Patronymic[0]}.`}
                        </p>
                    </Link>
                <p>{endDate}</p>
            </div>
        </td>

    );
};

export default ScheduleItem;