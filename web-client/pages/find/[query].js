import React, {useState} from 'react';
import MainContainer from "../../components/Containers/MainContainer";
import {getDataSearch} from "../../scripts/get";
import FindTeacherList from "../../components/Lists/FindLists/FindTeacherList/FindTeacherList";
import FindGroupList from "../../components/Lists/FindLists/FindGroupList/FindGroupList";
import FindAudienceList from "../../components/Lists/FindLists/FindAudienceList/FindAudienceList";
import {getFilteredArray} from "../../scripts/sort";

const FindPage = ({query, dataSearch, dataForFind}) => {
    const pageNumbers = {audience: 0, groups: 1, teachers: 2}
    let select = 0
    if(dataForFind.audiences.length){
        select = pageNumbers.audience
    }
    else if(dataForFind.groups.length){
        select = pageNumbers.groups
    }
    else if(dataForFind.teachers.length){
        select = pageNumbers.teachers
    }

    const [selectedPage, setSelectedPage] = useState(select)

    return (
        <MainContainer search={dataSearch}>
            <h1>Результат поиска по запросу {query}</h1>
            <div className='container__buttons'>
                {dataForFind.audiences.length
                    ?<button
                        className={`button__find ${selectedPage === pageNumbers.audience ? 'active' : ''}`}
                        onClick={()=>setSelectedPage(pageNumbers.audience)}>
                        Аудитории
                    </button>
                    : ''}
                {dataForFind.groups.length
                    ?<button
                        className={`button__find middle__button ${selectedPage === pageNumbers.groups ? 'active' : ''}`}
                        onClick={()=>setSelectedPage(pageNumbers.groups)}>
                        Группы
                    </button>
                    : ''}
                {dataForFind.teachers.length
                    ?<button
                        className={`button__find ${selectedPage === pageNumbers.teachers ? 'active' : ''}`}
                        onClick={()=>setSelectedPage(pageNumbers.teachers)}>
                        Преподаватели
                    </button>
                    : ''}
            </div>
            {selectedPage === pageNumbers.audience
                ?<FindAudienceList audiences={dataForFind.audiences}/>
                : ''}
            {selectedPage === pageNumbers.groups
                ?<FindGroupList groups={dataForFind.groups}/>
                : ''}
            {selectedPage === pageNumbers.teachers
                ? <FindTeacherList teachers={dataForFind.teachers}/>
                : ''}
        </MainContainer>
    );
};

export default FindPage;

export async function getServerSideProps({query}) {
    const urlQuery = query.query === 'unique-property-undefined' ? null : query.query;

    try {
        const dataSearch = await getDataSearch();
        const dataForFind = await getDataSearch();
        if(!urlQuery){
            dataForFind.audiences.sort((a, b) => a.name - b.name)
        }
        else {
            dataForFind.audiences = getFilteredArray(dataForFind.audiences, ['name'], urlQuery, 0.5)
            dataForFind.teachers = getFilteredArray(dataForFind.teachers, ['Name', 'LastName', 'Patronymic'], urlQuery, 0.5)
            dataForFind.groups = getFilteredArray(dataForFind.groups, ['name'], urlQuery, 0.5)
        }
        return{
            props:{
                query: urlQuery,
                dataSearch: dataSearch,
                dataForFind: dataForFind
            }
        }
    }catch (e){
        return{
            props:{
                query: urlQuery,
                dataSearch: [],
                dataForFind: []
            }
        }
    }
}