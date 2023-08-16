import React from 'react';
import FindGroupItem from "./Item/FindGroupItem";

const FindGroupList = ({groups}) => {
    return (
        <div>
            {groups.map(group => <FindGroupItem key={group.id} item={group}/>)}
        </div>
    );
};

export default FindGroupList;