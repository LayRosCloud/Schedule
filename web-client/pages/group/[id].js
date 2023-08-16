import MainContainer from "../../components/Containers/MainContainer";
import Schedule from "../../components/Schedule/Schedule";
import {
    getCollege,
    getDataSearch,
    getDays,
    getFullTimes,
    getPairs,
    getShortTimes,
    getTypeOfPairs
} from "../../scripts/get";
import groupController from "../../api/group-controller";
const Group = ({pairs, times, days, fullTimes, college, typeOfPairs, group, dataSearch}) => {

    return (
        <MainContainer search={dataSearch}>
            {college.shortName && group.name
                ?<h1 className='title'>{`${college.shortName} ${group.name}`}</h1>
                :''}

            {pairs.length
                ?<Schedule pairs={pairs} times={times} days={days} fullTimes={fullTimes} typeOfPairs={typeOfPairs}/>
                :group.name
                    ? <h1>Пар нет...</h1>
                    : <h1>Группы не существует</h1>}
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
            getDays(),
        ]);
        const group = (await groupController.get(context.query.id)).data
        const college = await getCollege(group);
        const times = getShortTimes(pairs, fullTimes);
        const dataSearch = await getDataSearch();
        return {
            props: {
                pairs,
                times,
                college,
                typeOfPairs,
                fullTimes,
                days,
                group,
                dataSearch
            }
        };
    } catch (e) {
        console.log("Error fetching data: ", e);
        return {
            props: {
                pairs: [],
                times: [],
                days: [],
                fullTimes: [],
                college: [],
                typeOfPairs: [],
                group: {},
                dataSearch: []
            }
        };
    }
}