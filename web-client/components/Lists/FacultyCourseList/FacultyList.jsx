import React, {useState} from 'react';
import FacultyItem from "./Item/FacultyItem";

const FacultyList = ({faculties, setActive}) => {
    const [selectedFaculty, setSelectedFaculty] = useState(0)
    function clickOnItem(item, faculty){
        setActive(item)
        setSelectedFaculty(faculty.id)
    }

    return (
        <div className='list'>
            {faculties.map(faculty =>
                <FacultyItem key={faculty.id}
                             item={faculty}
                             setActive={clickOnItem} 
                             activeList={selectedFaculty === faculty.id}/>
            )}
        </div>
    );
};

export default FacultyList;