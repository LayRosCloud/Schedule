import classes from '../../SearchItem.module.css'
import {useRouter} from "next/router";
const SearchGroupItem = ({item}) => {
    const router = useRouter()
    return (
        <p className={classes.item} onClick={()=>router.push(`/group/${item.id}`)}>
            {item.name}
        </p>
    );
};

export default SearchGroupItem;