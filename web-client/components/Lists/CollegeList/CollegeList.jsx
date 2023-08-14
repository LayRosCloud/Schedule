import {useState} from 'react';
import CollegeItem from "./Item/CollegeItem";

const CollegeList = ({colleges, setActiveButton}) => {
    const [activeId, setActiveId] = useState(0)

    function setActive(item){
        setActiveId(item.id)
        setActiveButton(item)
    }

    return (
        <div className={`${activeId ? 'list' : ''}`}>
            {colleges.map(college =>
                <CollegeItem key={college.id}
                             item={college}
                             isActive={activeId === college.id}
                            clickActive={(item) => setActive(item)}
                            />)}
        </div>
    );
};

export default CollegeList;