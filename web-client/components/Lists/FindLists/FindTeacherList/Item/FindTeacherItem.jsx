import classes from '../../FindItem.module.css'
import {useRouter} from "next/router";

const FindTeacherItem = ({item}) => {
    const router = useRouter()
    return (
        <div onClick={()=>router.push(`/teacher/${item.id}`)}>
            <p className={classes.item}>{item.LastName} {item.Name} {item.Patronymic}</p>
        </div>
    );
};

export default FindTeacherItem;