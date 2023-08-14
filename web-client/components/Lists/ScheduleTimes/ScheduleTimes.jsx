import classes from './ScheduleTimes.module.css'

const ScheduleTimes = ({fullTimes}) => {
    return (
        <div className={classes.container}>
            {fullTimes.map(time => <p key={time.id} className={classes.time}>{time.name}</p>)}
        </div>
    );
};

export default ScheduleTimes;