import classes from '../../SearchItem.module.css'
import {useRouter} from "next/router";
const SearchTeacherItem = ({item}) => {
    const router =useRouter()
    return (
        <p className={classes.item} onClick={()=>router.push(`/teacher/${item.id}`)}>
            {item.LastName} {item.Name[0]}. {item.Patronymic[0]}.
        </p>
    );
};

export default SearchTeacherItem;