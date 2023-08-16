import classes from './ScheduleItem.module.css'
import Link from "next/link";
const ScheduleItem = ({item}) => {

    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        timezone: 'UTC'
    };
    const dateEnd = new Date(item.dateEnd).toLocaleString("ru", options)
    const dateStart = new Date(item.dateStart).toLocaleString("ru", options)
    return (
        <td>
            <div className={classes.tile} style={{background: item.typeOfPair.color}}>
                    <span>{item.time.name}</span>
                    <Link href={`/audience/${item.audience.id}`} className='link'>
                        <p>
                            <b>ауд. {item.audience.name}</b> к. {item.audience.corpu.name}
                        </p>
                    </Link>
                {item.teacherSubject.Subject.Name
                    ?<h3 className={classes.title} data-title={`${item.teacherSubject.Subject.FullName}`}>
                        {item.teacherSubject.Subject.Name}
                    </h3>
                    :<h3 className={classes.title__without}>
                        {item.teacherSubject.Subject.FullName}
                    </h3>}

                    <Link href={`/teacher/${item.teacherSubject.Teacher.id}`} className='link'>
                        <p>
                            {item.teacherSubject.Teacher.LastName} {item.teacherSubject.Teacher.Name[0]}. {item.teacherSubject.Teacher.Patronymic[0]}.
                        </p>
                    </Link>
                <p className={classes.date}>{dateStart}-<strong>{dateEnd}</strong></p>
            </div>
        </td>

    );
};

export default ScheduleItem;