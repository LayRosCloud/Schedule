import MainContainer from "../components/Containers/MainContainer";
import ListContainer from "../components/Containers/ListContainer/ListContainer";
import CollegeList from "../components/Lists/CollegeList/CollegeList";
import FacultyList from "../components/Lists/FacultyCourseList/FacultyList";
import {useState} from "react";
import GroupList from "../components/Lists/GroupList/GroupList";
import {getColleges, getDataSearch} from "../scripts/get";
import ServerError from "../components/ServerError";

const Index = ({colleges, dataSearch}) => {
    const [selectedCollege, setSelectedCollege] = useState(null)
    const [selectedCourse, setSelectedCourse] = useState(null)

    function setActiveCollege(item){
        setSelectedCollege(item)
        setSelectedCourse(null)
    }

    function setActiveCourse(item){
        setSelectedCourse(item)
    }
    return (
            <MainContainer search={dataSearch}>
                <ListContainer title='Институты' count={colleges.length}>
                    <div className={selectedCollege ? 'container__list' : ''}>

                        <CollegeList colleges={colleges}
                                     setActiveButton={(id) => setActiveCollege(id)}/>
                        {selectedCollege
                            ? <FacultyList faculties={selectedCollege.faculties} setActive={setActiveCourse}/>
                            : ''
                        }
                        {selectedCourse
                            ? <GroupList groups={selectedCourse.groups}/>
                            : ''
                        }
                    </div>

                </ListContainer>
            </MainContainer>
    );
};

export default Index;

export async function getStaticProps(context) {
    try{
        const dataSearch = await getDataSearch()
        const colleges = await getColleges()
        return {
            props: {
                colleges,
                dataSearch
            },
        }
    }catch (e){
        console.log(e.message)
        return {
            props: {
                colleges:[],
                dataSearch:[]
            },
        }
    }



}