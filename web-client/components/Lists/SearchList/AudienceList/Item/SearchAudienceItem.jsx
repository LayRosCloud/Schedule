import classes from '../../SearchItem.module.css'
import {useRouter} from "next/router";
const SearchAudienceItem = ({item}) => {
    const router = useRouter()
    return (
        <p className={classes.item} onClick={()=>router.push(`/audience/${item.id}`)}>
            {item.name}
        </p>
    );
};

export default SearchAudienceItem;