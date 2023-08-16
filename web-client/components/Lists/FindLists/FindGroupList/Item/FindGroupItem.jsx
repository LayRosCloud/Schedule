import classes from '../../FindItem.module.css'
import {useRouter} from "next/router";

const FindGroupItem = ({item}) => {
    const router = useRouter();
    return (
        <div onClick={()=>router.push(`/group/${item.id}`)}>
            <p className={classes.item}>гр. <b>{item.name}</b></p>
        </div>
    );
};

export default FindGroupItem;