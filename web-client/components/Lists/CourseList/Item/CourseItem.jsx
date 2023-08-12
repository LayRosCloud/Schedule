import classes from "./CourseItem.module.css";

const CourseItem = ({item,isActive, setActive}) => {
    return (
        <>
            <p onClick={()=>setActive(item)}
               className={`${classes.item} ${isActive? classes.active:''}`}>
                {item.name}
            </p>
        </>
    );
};

export default CourseItem;