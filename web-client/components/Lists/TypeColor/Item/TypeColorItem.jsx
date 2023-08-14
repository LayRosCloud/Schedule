import classes from './TypeColorItem.module.css'

const TypeColorItem = ({item}) => {
    return (
        <div className={classes.container}>
            <div style={{background: `${item.color}`}} className={classes.rectangle}></div>
            <p>{item.name}</p>
        </div>
    );
};

export default TypeColorItem;