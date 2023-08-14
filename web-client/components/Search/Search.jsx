import {useState} from 'react';
import FinderInput from "../UI/Input/FinderInput";

const Search = () => {
    const [value, setValue] = useState('')
    function setText(text){
        setValue(text)
    }

    return (
        <div>
            <FinderInput value={value} setValue={setText} placeholder='поиск...'/>
        </div>
    );
};

export default Search;