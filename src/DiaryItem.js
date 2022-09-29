import React, { useRef, useState } from "react";
const DiaryItem = ({
    author,
    content,
    created_date,
    emotion,
    dataId,
    onRemove,
    onEdit }) => {

    const [isEdit, setIsEdit] = useState(false); //true: 수정중 | false: 수정중 아님
    const [localContent, setLocalContent] = useState(content);
    const localContentInput = useRef();

    const toggleIsEdit = () => { setIsEdit(!isEdit); };

    const handleQuitEdit = () => {
        setLocalContent(content);
        setIsEdit(false);
    };
    const handleEdit = () => {
        // 글자 검사
        if (localContent.length < 5) {
            localContentInput.current.focus();
            return;
        }
        if (window.confirm(`${dataId}번째 일기를 수정하시겠습니까?`)) {
            onEdit(dataId, localContent);
            console.log(content)
            toggleIsEdit();
        }
    };
    const handleRemove = () => {
        if (window.confirm(`${dataId}번째 일기를 정말 삭제하시겠습니까?`)) {
            onRemove(dataId);
        }
    };
    return (
        <div className="DiaryItem">
            <div className="info">
                <span>작성자 : {author} | 감정점수 : {emotion} </span>
                <br />
                <span className="date">{new Date(created_date).toLocaleString()}</span>
                {/* new Date()에 아무 값도 안넣으면 현재 시간이지만 ms숫자를 넣고 
                toLocalString()을 사용하면 사람이 보기 편하게 출력됨 */}
            </div>
            <div className="content" >
                {isEdit ? (
                    <textarea
                        ref={localContentInput}
                        value={localContent}
                        onChange={(e) => { setLocalContent(e.target.value) }}
                    />
                ) : (
                    content
                )}
            </div>
            {isEdit ? <>
                <button onClick={handleQuitEdit}>수정 취소</button>
                <button onClick={handleEdit}>수정 완료</button>
            </> : <>
                <button onClick={handleRemove}>삭제하기</button>
                <button onClick={toggleIsEdit} >수정하기</button>
            </>}

        </div>
    );

}
export default DiaryItem;