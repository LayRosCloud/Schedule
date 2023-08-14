import classes from './CollegeItem.module.css'
const CollegeItem = ({item, clickActive, isActive}) => {

    function clickOnItem(){
        clickActive(item)
    }

    return (
        <div onClick={()=>clickOnItem()} className={`${classes.container} ${isActive ? classes.active : ''}`}>
            <h1 className={isActive ? classes.active__h1 : ''}>{item.shortName}</h1>
            <p className={isActive ? classes.active__p : ''}>{item.fullName}</p>
        </div>
    );
};

export default CollegeItem;