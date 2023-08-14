import MainContainer from "../../components/Containers/MainContainer";
import Schedule from "../../components/Schedule/Schedule";
import {getCollege, getDays, getFullTimes, getPairs, getShortTimes, getTypeOfPairs} from "../../scripts/get";
const Group = ({pairs, times, days, fullTimes, college, typeOfPairs}) => {

    return (
        <MainContainer>
            <h1 className='title'>{`${college.shortName} ${pairs[0]?.group.name}`}</h1>
            {pairs.length
                ?<Schedule pairs={pairs} times={times} days={days} fullTimes={fullTimes} typeOfPairs={typeOfPairs}/>
                :<h1>Пар нет...</h1>}
        </MainContainer>
    );
};

export default Group;

export async function getServerSideProps(context) {
    try {
        const [pairs, typeOfPairs, fullTimes, days] = await Promise.all([
            getPairs(context.query.id, undefined, undefined),
            getTypeOfPairs(),
            getFullTimes(),
            getDays()
        ]);
        const college = await getCollege(pairs[0].group);
        const times = getShortTimes(pairs, fullTimes);

        return {
            props: {
                pairs,
                times,
                college,
                typeOfPairs,
                fullTimes,
                days
            }
        };
    } catch (e) {
        console.log("Error fetching data:", e);
        return {
            props: {
                pairs: [],
                times: [],
                days: [],
                fullTimes: [],
                college: [],
                typeOfPairs: []
            }
        };
    }
}