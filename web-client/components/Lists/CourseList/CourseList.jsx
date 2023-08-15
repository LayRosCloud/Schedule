import {useState} from 'react';
import CourseItem from "./Item/CourseItem";

const CourseList = ({courses, setActive, activeList}) => {
    const [activeId, setActiveId] = useState(0)

    function clickOnActive(item){
        setActiveId(item.id)
        setActive(item)
    }

    return (
        <div className='container__list'>
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