import classes from './TypeColor.module.css'
import TypeColorItem from "./Item/TypeColorItem";

const TypeColor = ({typeOfPairs}) => {

    return (
        <div className={classes.container}>
            {typeOfPairs.map(typeColor => <TypeColorItem key={typeColor.id} item={typeColor}/>)}
        </div>
    );
};

export default TypeColor;