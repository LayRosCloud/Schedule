import MainContainer from "../../components/Containers/MainContainer";
import Schedule from "../../components/Schedule/Schedule";
import {getDataSearch, getDays, getFullTimes, getPairs, getTypeOfPairs} from "../../scripts/get";
import {useEffect} from "react";
import {useRouter} from "next/router";
import cacheController from "../../api/cache-controller";
import {domainAudience} from '../../api/index'
const Audience = ({pairs, times ,days, typeOfPairs, audience, dataSearch}) => {
    const router = useRouter();

    useEffect(()=>{
        if(!audience){
            router.push('/')
        }
    },[])

    return (
        <MainContainer search={dataSearch}>
            <p className='img__center'>
            {audience.corpu.image
                ? <img className='img__page' src={`${domainAudience}/corpuses/${audience.corpu.image}`} alt=''/>
                : <img className='img__page' src='/undefined-home.png' alt='фото корпуса'/>}
            </p>
            <h1 className='title'>{`${audience.name} аудитория`}</h1>
            <h3 className='under__tile'>{`корпус ${audience.corpu.name}`}</h3>
            <div className='more__info'>
                <h3>Дополнительная информация</h3>
                <p><b>Адрес</b>: {audience.corpu.street.name}, {audience.corpu.numberOfHome}</p>
            </div>
            <Schedule pairs={pairs} times={times} days={days} fullTimes={times} typeOfPairs={typeOfPairs}/>
        </MainContainer>
    );
};

export default Audience;

export async function getServerSideProps({query}) {

    try{
        const [pairs, times, typeOfPairs, days,dataSearch] = await Promise.all([
            getPairs(undefined, undefined, query.id),
            getFullTimes(),
            getTypeOfPairs(),
            getDays(),
            getDataSearch()
        ])
        const audience = (await cacheController.getByIdAudience(query.id)).data
        return {
            props:{
                pairs,
                times,
                typeOfPairs,
                days,
                audience,
                dataSearch
            }
        }
    } catch (e){
        return {
            props: {
                pairs: [],
                times: [],
                days: [],
                typeOfPairs: [],
                audience: {},
                dataSearch: []
            },
        }
    }



}