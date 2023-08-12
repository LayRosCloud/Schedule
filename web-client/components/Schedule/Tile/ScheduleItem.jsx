import React from 'react';
import classes from './ScheduleItem.module.css'

const ScheduleItem = ({item}) => {
    return (
        <td>

        <div className={classes.tile} style={{background: item.typeOfPair.color}}>
            <p>
                {`ауд. ${item.audience.name} к. ${item.audience.corpu.name}`}
            </p>
            <h3>
                {item.teacherSubject.Subject.Name}
            </h3>

            <p>
                {`${item.teacherSubject.Teacher.LastName} 
            ${item.teacherSubject.Teacher.Name[0]}. 
            ${item.teacherSubject.Teacher.Patronymic[0]}.`}
            </p>
            <div className={classes.rectangle}></div>
        </div>
        </td>

    );
};

export default ScheduleItem;