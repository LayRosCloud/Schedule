import MainContainer from "../../components/Containers/MainContainer";
import Schedule from "../../components/Schedule/Schedule";
import {getDays, getFullTimes, getPairs, getTypeOfPairs} from "../../scripts/get";

const Audience = ({pairs, times ,days, typeOfPairs}) => {
    return (
        <MainContainer>
            <h1 className='title'>{`${pairs[0]?.audience.name} аудитория`}</h1>
            <h3 className='under__tile'>{`корпус ${pairs[0]?.audience.corpu.name}`}</h3>
            <Schedule pairs={pairs} times={times} days={days} fullTimes={times} typeOfPairs={typeOfPairs}/>
        </MainContainer>
    );
};

export default Audience;

export async function getServerSideProps(context) {

    try{
        const [pairs, times, typeOfPairs, days] = await Promise.all([
            getPairs(undefined, undefined, context.query.id),
            getFullTimes(),
            getTypeOfPairs(),
            getDays()
        ])

        return {
            props:{
                pairs,
                times,
                typeOfPairs,
                days
            }
        }
    } catch (e){
        return {
            props: {
                pairs: [],
                times: [],
                days: [],
                typeOfPairs: []
            },
        }
    }



}