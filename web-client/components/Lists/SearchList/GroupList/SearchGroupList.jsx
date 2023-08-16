import SearchGroupItem from "./Item/SearchGroupItem";
import classes from '../SearchList.module.css'
const SearchGroupList = ({groups}) => {
    if(!groups.length){
        return ('')
    }
    return (
        <div className={classes.list}>
            <h4>Группы</h4>
            {groups.map(group=><SearchGroupItem key={group.id} item={group}/>)}
        </div>
    );
};

export default SearchGroupList;