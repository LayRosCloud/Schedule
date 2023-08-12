import React from 'react';
import GroupItem from "./Item/GroupItem";
import classes from './GroupList.module.css'

const GroupList = ({groups}) => {
    return (
        <div className={classes.list}>
            {groups.map(group => <GroupItem key={group.id} item={group}/>)}
        </div>
    );
};

export default GroupList;