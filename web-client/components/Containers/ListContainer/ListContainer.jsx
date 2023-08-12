import React from 'react';
import classes from './ListContainer.module.css'

const ListContainer = ({title, count, children}) => {
    return (
        <div className={classes.upper__container}>
            <div className={classes.title__container}>
                <h4 className={classes.title}>{title} <span> - {count}</span></h4>
            </div>
            {children}
        </div>
    );
};

export default ListContainer;