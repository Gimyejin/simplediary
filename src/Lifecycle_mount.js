import React, { useEffect, useState } from "react";
const Lifecycle = () => {
    const [count, setCount] = useState(0);
    const [text, setText] = useState("");


    //리렌더링 한 직후 1회
    useEffect(() => {
        console.log("Mount!");
    }, []);

    //리렌더링 될때마다 계속
    useEffect(() => {
        console.log("update")
    })

    useEffect(() => {
        console.log("count up", count)
        if (count > 5) {
            alert("count가 5가 넘었습니다");
            setCount(1)
        }
    }, [count])
    useEffect(() => {
        console.log("text up", text)
    }, [text])

    return <div style={{ padding: 20 }}>
        <div>
            {count}
            <button onClick={() => { setCount(count + 1) }}>+</button>
        </div>
        <div>
            <input value={text} onChange={(e) => setText(e.target.value)} />
        </div>
        <hr />
    </div >
}
export default Lifecycle;