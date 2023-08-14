import classes from "./GroupItem.module.css";
import Router from "next/router";
const GroupItem = ({item}) => {
    return (
        <div className={classes.container} onClick={()=> Router.push(`/group/${item.id}`)}>
            <h3>{item.name}</h3>
        </div>

    );
};

export default GroupItem;