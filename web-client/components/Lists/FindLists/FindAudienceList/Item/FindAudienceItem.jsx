import classes from '../../FindItem.module.css'
import {useRouter} from "next/router";

const FindAudienceItem = ({item}) => {
    const router = useRouter()
    return (
        <div onClick={()=>router.push(`/audience/${item.id}`)}>
            <p className={classes.item}>ауд. <b>{item.name}</b>, к. {item.corpu.name}</p>
        </div>
    );
};

export default FindAudienceItem;