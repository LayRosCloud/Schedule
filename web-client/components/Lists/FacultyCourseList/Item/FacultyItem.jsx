import React from 'react';
import CourseList from "../../CourseList/CourseList";

const FacultyItem = ({item, setActive, activeList}) => {

    function clickOnButton(obj){
        setActive(obj, item)
    }

    return (
        <div>
            <p>{item.name}</p>
            <CourseList courses={item.courses} setActive={clickOnButton} activeList={activeList}/>
        </div>
    );
};

export default FacultyItem;