import {useEffect, useState} from 'react';
import FinderInput from "../UI/Input/FinderInput";
import diff from 'difflib'
import classes from './Search.module.css'
const Search = ({array}) => {
    const [value, setValue] = useState('')
    const [timeoutHandler, setTimeoutHandler] = useState({handle: null})

    const [filteredAudiences, setFilteredAudiences] = useState([])
    const [filteredGroups, setFilteredGroups] = useState([])
    const [filteredTeachers, setFilteredTeachers] = useState([])

    useEffect(()=>{
        console.log('Search отрисовался')
    },[])

    function setText(text){
        setValue(text)

        if(timeoutHandler.handle){
            clearTimeout(timeoutHandler.handle);
        }

        const handle = setTimeout(()=> {

            const resultAudience = []
            const resultGroup = []
            const resultTeachers = []
            for(const obj of array.audiences){
                const sequence = new diff.SequenceMatcher(null, obj.name.toLowerCase(), text.toLowerCase())
                if(sequence.ratio() > 0.7){
                    resultAudience.push(obj)
                }
            }

            for (const obj of array.groups){
                const sequence = new diff.SequenceMatcher(null, obj.name.toLowerCase(), text.toLowerCase())
                if(sequence.ratio() > 0.7){
                    resultGroup.push(obj)
                }
            }
            for (const obj of array.teachers){
                const name = obj.Name.toLowerCase()
                const lastName = obj.LastName.toLowerCase()
                const patronymic = obj.Patronymic.toLowerCase()
                const sequenceName = new diff.SequenceMatcher(null,name, text.toLowerCase())
                const sequenceLastName = new diff.SequenceMatcher(null,lastName, text.toLowerCase())
                const sequencePatronymic = new diff.SequenceMatcher(null, patronymic, text.toLowerCase())
                const sequenceFull = new diff.SequenceMatcher(null, `${lastName} ${name} ${patronymic}`, text.toLowerCase())
                if(sequenceName.ratio() > 0.7 || sequenceLastName.ratio() > 0.7 || sequencePatronymic.ratio() > 0.7 || sequenceFull.ratio() > 0.7){
                    resultTeachers.push(obj)
                }
            }
            setFilteredAudiences(resultAudience)
            setFilteredGroups(resultGroup)
            setFilteredTeachers(resultTeachers)
        },1000)

        setTimeoutHandler({...timeoutHandler, handle})

    }

    return (
        <div>
            <FinderInput value={value} setValue={setText} placeholder='поиск...'/>
            {filteredGroups.length || filteredTeachers.length || filteredAudiences.length
                ?<div className={classes.list}>
                    {filteredGroups.length
                        ? filteredGroups.map(group => <div className='list__item'>{group.name}</div>)
                        : ''
                    }
                    {filteredTeachers.length
                        ? filteredTeachers.map(teacher => <div className='list__item'>{teacher.LastName} {teacher.Name} {teacher.Patronymic}</div>)
                        : ''
                    }
                    {filteredAudiences.length
                        ? filteredAudiences.map(audience => <div className='list__item'>{audience.name}</div>)
                        : ''
                    }
                </div>:''
            }

        </div>
    );
};

export default Search;