import React, { useEffect, useState } from "react";
const Lifecycle_umount = () => {
    const [isVisible, setIsVisible] = useState(false);
    contst toggle = () => {
        setIsVisible(!isVisible);
    }

    return <div style={{ padding: 20 }}>
        <button onClick={toggle}>ON/OFF</button>
        <hr />
    </div >
}
export default Lifecycle_umount;