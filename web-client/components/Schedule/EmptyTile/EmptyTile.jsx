import classes from './EmptyTile.module.css'

const EmptyTile = ({time, isList}) => {
    return (
        <td>
            {isList ? <div className={classes.tile}>
                    <h2>{time.name}</h2>
            </div>
                :<div className={classes.tile} >
                    <h1 data-title={time.name}></h1>
                </div>}
        </td>
    );
};

export default EmptyTile;