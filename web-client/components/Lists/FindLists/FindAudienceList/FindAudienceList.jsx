import React from 'react';
import FindAudienceItem from "./Item/FindAudienceItem";

const FindAudienceList = ({audiences}) => {
    return (
        <div>
            {audiences.map(audience => <FindAudienceItem key={audience.id} item={audience}/>)}
        </div>
    );
};

export default FindAudienceList;