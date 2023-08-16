import {useRef} from 'react';
import classes from "./FinderInput.module.css";
import Image from "next/image";
import {useRouter} from "next/router";

const FinderInput = ({value, setValue, placeholder, onFocus}) => {
    const router = useRouter();
    const inputRef = useRef(null);

    const handleIconClick = () => {
        inputRef.current.focus();
        onFocus(true)
    };
    return (
        <div>
            <Image onClick={()=> router.push(value?`/find/${value}`:`/find/unique-property-undefined`)}
                   className={classes.icon}
                   src='/glass.svg'
                   alt=''
                   width={20}
                   height={20}/>
            <input ref={inputRef} className={`${classes.inp} ignore-click`}
                   value={value}
                   onClick={(e)=>e.preventDefault()}
                   onFocus={()=>onFocus(true)}
                   onChange={(e)=>setValue(e.target.value)}
                   placeholder={placeholder}
            />
            <Image onClick={()=>{setValue(''); handleIconClick()}}
                   className={`${classes.btn} ignore-click`}
                   src='/close.svg'
                   alt=''
                   width={26}
                   height={26}/>
        </div>

    );
};

export default FinderInput;