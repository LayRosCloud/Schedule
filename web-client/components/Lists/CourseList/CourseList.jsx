import {useState} from 'react';
import CourseItem from "./Item/CourseItem";
import classes from './CourseList.module.css'

const CourseList = ({courses, setActive, activeList}) => {
    const [activeId, setActiveId] = useState(0)

    function clickOnActive(item){
        setActiveId(item.id)
        setActive(item)
    }

    return (
        <div className={classes.container}>
            {courses.map(course =>
                <CourseItem key={course.id}
                           item={course}
                           isActive={course.id === activeId && activeList}
                            setActive={(item)=>clickOnActive(item)}
            />)}
        </div>
    );
};

export default CourseList;