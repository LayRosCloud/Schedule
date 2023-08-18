import {useEffect, useState} from 'react';
import FinderInput from "../UI/Input/FinderInput";
import diff from 'difflib'
import classes from './Search.module.css'
import {getFilteredArray, getSortedArrayRatio} from "../../scripts/sort";
import SearchAudienceList from "../Lists/SearchList/AudienceList/SearchAudienceList";
import SearchGroupList from "../Lists/SearchList/GroupList/SearchGroupList";
import SearchTeacherList from "../Lists/SearchList/TeacherList/SearchTeacherList";
const Search = ({array, myClass}) => {
    const [filterText, setFilterText] = useState('')
    const [timeoutHandler, setTimeoutHandler] = useState({handle: null})

    const [filteredAudiences, setFilteredAudiences] = useState([])
    const [filteredGroups, setFilteredGroups] = useState([])
    const [filteredTeachers, setFilteredTeachers] = useState([])
    const [isFocused, setFocused] = useState(false)
    useEffect(()=>{
        document.addEventListener('click', handleFocus)
        return () => {
            document.removeEventListener("click", handleFocus);
        };
    },[])

    const handleFocus = (event) => {
        if(!event.target.classList.contains('ignore-click')){
            setFocused(false)
        }
    }

    const setText = (text)=>{
        setFilterText(text)

        if(timeoutHandler.handle){
            clearTimeout(timeoutHandler.handle);
        }

        const handle = setTimeout(()=> {
            const percent = 0.7;
            const lowerText = text.toLowerCase();

            setFilteredAudiences(getFilteredArray(array.audiences,['name'], lowerText, percent))
            setFilteredGroups(getFilteredArray(array.groups, ['name'], lowerText, percent))
            setFilteredTeachers(getFilteredArray(array.teachers, ['Name', 'LastName', 'Patronymic'], lowerText, percent))
            setFocused(true)
        },1000)

        setTimeoutHandler({...timeoutHandler, handle})

    }

    return (
        <div className={`${classes.search} ${myClass}`}>
            <FinderInput value={filterText} setValue={setText} placeholder='поиск...' onFocus={setFocused}/>
            {(filteredGroups.length || filteredTeachers.length || filteredAudiences.length) && isFocused
                ?<div className={classes.list}>
                    <SearchAudienceList audiences={filteredAudiences}/>
                    <SearchGroupList groups={filteredGroups}/>
                    <SearchTeacherList teachers={filteredTeachers}/>
                </div>:''
            }

        </div>
    );
};

export default Search;