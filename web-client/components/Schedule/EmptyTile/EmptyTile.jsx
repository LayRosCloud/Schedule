import classes from './EmptyTile.module.css'

const EmptyTile = () => {
    return (
        <td>
           <div className={classes.tile}>
                <h1>-</h1>
           </div>
        </td>
    );
};

export default EmptyTile;