import React from "react";
import { useState, useRef } from "react";

const DiaryEditor = ({ onCreate }) => {
    const authorInput = useRef();//dom요소를  선택하는 useRef객체
    const contentInput = useRef();
    const [state, setState] = useState({
        author: "",
        content: "",
        emotion: 1,
    });

    //e.target.name 은 해당 태그의 name, e.target.value는 입력값(value)

    const handleChangeState = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = () => {
        if (state.author.length < 1) {
            authorInput.current.focus();
            return;
        }
        if (state.content.length < 5) {
            contentInput.current.focus();
            return;
        }

        onCreate(state.author, state.content, state.emotion);
        alert("저장 성공");
        setState({
            author: "", content: "", emotion: 1,
        })
    }

    return <div className="DiaryEditor">
        <h2>오늘의 일기</h2>
        <div>
            <input ref={authorInput} name="author" onChange={(e) => { handleChangeState(e) }} value={state.author} placeholder="작성자" />

        </div>
        <div>
            <textarea ref={contentInput} name="content" onChange={(e) => { handleChangeState(e) }} value={state.content} placeholder="일기" />
        </div>
        <div>오늘의 감정점수:
            <select name="emotion" value={state.emotion} onChange={(e) => { handleChangeState(e) }}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
            </select>
        </div>
        <div>
            <button type="submit" onClick={handleSubmit}>일기 저장하기</button>
        </div>
    </div >

}
export default DiaryEditor;