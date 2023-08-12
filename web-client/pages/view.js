import React from 'react';
import Router from 'next/router'
import MainContainer from "../components/Containers/MainContainer";
import pairController from "../api/pair-controller";
import timeController from "../api/time-controller";
import Schedule from "../components/Schedule/Schedule";
import dayOfWeekController from "../api/dayOfWeek-controller";

const View = ({pairs, times, days}) => {
    return (
        <MainContainer>
            <Schedule times={times} pairs={pairs} days={days}/>
        </MainContainer>
    );
};

export default View;

export async function getServerSideProps({query}) {
    let pairs = []
    let times = []
    let days = []
    try{
        const responsePairs = await pairController.getAll(query.groupId)
        pairs = responsePairs.data
        let min = 9;
        let max = 0;
        for (let i = 0; i < pairs.length; i++) {
            const timeId = pairs[i].time.id
            if(min > timeId){
                min = timeId
            }
            if(max < timeId){
                max = timeId
            }
        }
        const responseTime = await timeController.getAll()
        const time = responseTime.data;
        const resultTimes = [];
        for (let i = 0; i < time.length; i++) {
            if(time[i].id >= min && time[i].id <= max)
                resultTimes.push(time[i])

        }
        times = resultTimes;
        const responseDays = await dayOfWeekController.getAll();
        days = responseDays.data
    }catch (e){
        Router.push('/').then()
    }


    return {
        props: {
           pairs,
            times,
            days
        },
    }
}