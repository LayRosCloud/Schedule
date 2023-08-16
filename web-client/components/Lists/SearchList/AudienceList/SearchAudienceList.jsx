import SearchAudienceItem from "./Item/SearchAudienceItem";
import classes from '../SearchList.module.css'
const SearchAudienceList = ({audiences}) => {
    if(!audiences.length){
        return ('')
    }
    return (
        <div className={classes.list}>
            <h4>Аудитории</h4>
            {audiences.map(audience=><SearchAudienceItem key={audience.id} item={audience}/>)}
        </div>
    );
};

export default SearchAudienceList;