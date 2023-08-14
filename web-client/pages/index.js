import MainContainer from "../components/Containers/MainContainer";
import ListContainer from "../components/Containers/ListContainer/ListContainer";
import collegeController from '../api/college-controller'
import CollegeList from "../components/Lists/CollegeList/CollegeList";
import FacultyList from "../components/Lists/FacultyCourseList/FacultyList";
import {useState} from "react";
import GroupList from "../components/Lists/GroupList/GroupList";

const Index = ({colleges}) => {
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
            <MainContainer>
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
    const response = await collegeController.getAll()
    const colleges = response.data

    return {
        props: {
            colleges,
        },
    }
}