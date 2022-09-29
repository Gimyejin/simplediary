import React, { useEffect, useState } from "react";

const UnmountTest = () => {
    useEffect(() => {
        console.log("Mount!!!!");
        return () => {
            //umount 시점에 실행되게 됨
            console.log("unmount!")
        }
    }, [])
    return <div>Unmount Testing Component</div>
}

const Lifecycle_umount = () => {
    const [isVisible, setIsVisible] = useState(false);
    const toggle = () => {
        setIsVisible(!isVisible);
    }

    return <div style={{ padding: 20 }}>
        <button onClick={toggle}>ON/OFF</button>
        {isVisible && <UnmountTest />}
        <hr />
    </div >
}
export default Lifecycle_umount;