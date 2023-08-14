import {useRef} from 'react';
import classes from "./FinderInput.module.css";
import Image from "next/image";

const FinderInput = ({value, setValue, placeholder}) => {
    const inputRef = useRef(null);

    const handleIconClick = () => {
        inputRef.current.focus();
    };

    return (
        <div>
            <Image onClick={handleIconClick}
                   className={classes.icon}
                   src='/glass.svg'
                   alt=''
                   width={20}
                   height={20}
            placeholder='blur'
            blurDataURL='data:image/webp;base64,UklGRtIDAABXRUJQVlA4WAoAAAAgAAAAiAAAiAAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDgg5AEAADAWAJ0BKokAiQA+7WisUSm/u66ssotr8B2JZW7evc3yk3JrghGE2QuWt97YYYZgZbXdDerYCEbVnAop/VK9z2OPIUg2tEv9m0QZmM1d7W1gAq9feTCq1wOfR1KX7Eb+6q6AqeNOOWeYBbG3p1RIOovFtcRVszg8/dqT8i1ytnxXDCf+Qeei03497Ovg427mR7+2wCD9VEUpOSjXAZuUtx5uf1hlWfxQGdFXJgvTtHExMraNG4Ugc7npOAD+9Wx4Q8xKYgrGXQqjqVyN/i8RLQFHOk/GIeb37HWkmGFKpuWsONgbGpeA9AoWVpa79dVr2i5t80Bl81TQUSE80orGIjBP+BcxytSRK5HrERu+4cPH+ApM1g14I9vQQW3BKdUvmpmh1tp6iFpMPEda636yXA7aWfk/9GSXSRSyuzM+47LBxsPkMtDz8WXNEdLw7bAOQQ1inFCVbC01Rzykee5LdMVT0oXjk3Ys+p5izW8yk9Jx4tpqMm8RmF4Pw9vdVx39OqHjl+mGV1LHNxkR6oxiUNO+OfFBP0bh3XQGWIN93jpdZIHY7d+kXFEtfxBH5rZBvOLrGb0wQ68mWbSHWhBFWsKnh1vuIWjbQGwVGBRG+JnccvJKMUaDSxw0Af9p3gNG4ici4AA='/>
            <input ref={inputRef} className={classes.inp}
                   value={value}
                   onChange={(e)=>setValue(e.target.value)}
                   placeholder={placeholder}
            />
            <Image onClick={()=>{setValue(''); handleIconClick()}}
                   className={classes.btn}
                   src='/close.svg'
                   alt=''
                   width={26}
                   height={26}/>
        </div>

    );
};

export default FinderInput;