import SearchTeacherItem from "./Item/SearchTeacherItem";
import classes from '../SearchList.module.css'
const SearchTeacherList = ({teachers}) => {
    if(!teachers.length){
        return ('')
    }
    return (
        <div className={classes.list}>
            <h4>Преподаватели</h4>
            { teachers.map(teacher => <SearchTeacherItem key={teacher.id} item={teacher}/>)}
        </div>
    );
};

export default SearchTeacherList;