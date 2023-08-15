import React from 'react';
import Schedule from "../../components/Schedule/Schedule";
import MainContainer from "../../components/Containers/MainContainer";
import {getPairs, getTypeOfPairs, getFullTimes, getDays, getShortTimes} from '../../scripts/get'
import Image from "next/image";
import {domainTeacher} from "../../api";

const Teacher = ({pairs, times ,days, fullTimes, typeOfPairs}) => {
    const teacher = pairs[0]?.teacherSubject.Teacher;
    const fullName = `${teacher.LastName} ${teacher.Name} ${teacher.Patronymic}`
    const src = `${domainTeacher}/avatars/${teacher.Image}`

    return (
        <MainContainer>
            <Image width={400} height={400} loader={()=>src} className='img__page'
                   objectFit='contain' src={src} alt={`фотография преподавателя: ${fullName}.`}/>
            <h1 className='title'>{`${fullName}`}</h1>
            {pairs.length
                ?<Schedule pairs={pairs} times={times} days={days} fullTimes={fullTimes} typeOfPairs={typeOfPairs}/>
                :<h1>Пар нет...</h1>}
        </MainContainer>
    );
};

export default Teacher;

export async function getServerSideProps(context) {
    try{
        let [pairs, fullTimes, days, typeOfPairs] = await Promise.all([
            getPairs(),
            getFullTimes(),
            getDays(),
            getTypeOfPairs()
        ])
        const res = []

        for (const pair of pairs){
            if(pair.teacherSubject.Teacher.id === Number(context.query.id)){
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
                typeOfPairs
            },
        }

    }catch (e){
        return {
            props: {
                pairs: [],
                times: [],
                days: [],
                fullTimes: [],
                typeOfPairs: []
            },
        }
    }
}