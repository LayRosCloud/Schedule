import React, {useEffect} from 'react';
import {useRouter} from "next/router";
import Router from 'next/router'
import MainContainer from "../components/Containers/MainContainer";

const View = () => {
    const {query} = useRouter()
    useEffect(()=> {
        if(!query.groupId && !query.teacherId && !query.audienceId){
            Router.push('/').then()
        }

    }, [])
    return (
        <MainContainer>

        </MainContainer>
    );
};

export default View;