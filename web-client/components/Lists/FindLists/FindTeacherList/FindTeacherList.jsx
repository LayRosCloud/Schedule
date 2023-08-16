import React from 'react';
import FindTeacherItem from "./Item/FindTeacherItem";

const FindTeacherList = ({teachers}) => {
    return (
        <div>
            {teachers.map(teacher => <FindTeacherItem key={teacher.id} item={teacher}/>)}
        </div>
    );
};

export default FindTeacherList;