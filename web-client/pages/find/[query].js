import React, {useState} from 'react';
import MainContainer from "../../components/Containers/MainContainer";
import {getDataSearch} from "../../scripts/get";
import FindTeacherList from "../../components/Lists/FindLists/FindTeacherList/FindTeacherList";
import FindGroupList from "../../components/Lists/FindLists/FindGroupList/FindGroupList";
import FindAudienceList from "../../components/Lists/FindLists/FindAudienceList/FindAudienceList";

const FindPage = ({query, dataSearch}) => {
    const pageNumbers = {audience: 0, groups: 1, teachers: 2}
    const [selectedPage, setSelectedPage] = useState(0)

    return (
        <MainContainer search={dataSearch}>
            <h1>Результат поиска по запросу {query}</h1>
            <div>
                <button onClick={()=>setSelectedPage(pageNumbers.audience)}>Аудитории</button>
                <button onClick={()=>setSelectedPage(pageNumbers.groups)}>Группы</button>
                <button onClick={()=>setSelectedPage(pageNumbers.teachers)}>Преподаватели</button>
            </div>
            {selectedPage === pageNumbers.audience
                ?<FindAudienceList audiences={dataSearch.audiences}/>
                : ''}
            {selectedPage === pageNumbers.groups
                ?<FindGroupList groups={dataSearch.groups}/>
                : ''}
            {selectedPage === pageNumbers.teachers
                ? <FindTeacherList teachers={dataSearch.teachers}/>
                : ''}
        </MainContainer>
    );
};

export default FindPage;

export async function getServerSideProps({query}) {
    const urlQuery = query.query === 'unique-property-undefined' ? null : query.query;

    try {
        const dataSearch = await getDataSearch();
        if(!urlQuery){
            dataSearch.audiences.sort((a, b) => a.name - b.name)
        }
        return{
            props:{
                query: urlQuery,
                dataSearch: dataSearch
            }
        }
    }catch (e){
        return{
            props:{
                query: urlQuery,
                dataSearch: []
            }
        }
    }
}