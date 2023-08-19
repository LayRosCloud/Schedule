import React, {useEffect} from 'react';
import Schedule from "../../components/Schedule/Schedule";
import MainContainer from "../../components/Containers/MainContainer";
import {getPairs, getTypeOfPairs, getFullTimes, getDays, getShortTimes, getDataSearch} from '../../scripts/get'
import {domainTeacher} from "../../api";
import {useRouter} from "next/router";
import cacheController from "../../api/cache-controller";
import ServerError from "../../components/ServerError";

const Teacher = ({pairs, times ,days, fullTimes, typeOfPairs, dataSearch, teacher}) => {
    const fullName = `${teacher?.LastName} ${teacher?.Name} ${teacher?.Patronymic}`
    const src = `${domainTeacher}/avatars/${teacher?.Image}`
    const router = useRouter()
    useEffect(()=>{
        if(!teacher){
            router.push('/')
        }
    },[])
    if(!dataSearch.groups?.length){
        if(!dataSearch.length){
            return (
                <ServerError/>
            )
        }
    }
    return (
        <MainContainer search={dataSearch}>
            <p className='img__center'>
            {teacher?.Image
                ?<img className='img__page' src={src} alt={`фотография преподавателя: ${fullName}.`}/>
                :<img className='img__page' src='/undefined-person.png' alt=''/>
            }
            </p>

            <h1 className='title'>{`${fullName}`}</h1>
            {teacher.Phone || teacher.Study || teacher.DateFired
                ? <div className='more__info'>
                    <h3>Дополнительная информация</h3>
                    {teacher.Phone
                        ? <p><b>Телефон</b>: {teacher.Phone}</p>
                        : ''}
                    {teacher.Study
                        ? <p><b>Образование</b>: {teacher.Study.Name}</p>
                        : ''}
                    {teacher.DateFired
                        ? <p><b>Уволен(а)</b>: {teacher.DateFired}</p>
                        : ''}
                </div>
                : ''}

            {pairs.length
                ?<Schedule pairs={pairs} times={times} days={days} fullTimes={fullTimes} typeOfPairs={typeOfPairs}/>
                :<h1>Занятий нет, отдыхайте...</h1>}
        </MainContainer>
    );
};

export default Teacher;

export async function getServerSideProps({query}) {
    try{
        let [pairs, fullTimes, days, typeOfPairs, dataSearch] = await Promise.all([
            getPairs(),
            getFullTimes(),
            getDays(),
            getTypeOfPairs(),
            getDataSearch()
        ])
        const res = []
        const teacher = (await cacheController.getByIdTeacher(query.id)).data;
        for (const pair of pairs){
            if(pair.teacherSubject.Teacher.id === Number(query.id)){
                res.push(pair)
            }
        }

        pairs = res;

        const times = getShortTimes(pairs, fullTimes);
        return {
            props: {
                pairs,
                times,
                days,
                fullTimes,
                typeOfPairs,
                dataSearch,
                teacher
            },
        }

    }catch (e){
        return {
            props: {
                pairs: [],
                times: [],
                days: [],
                fullTimes: [],
                typeOfPairs: [],
                dataSearch: [],
                teacher: {}
            },
        }
    }
}