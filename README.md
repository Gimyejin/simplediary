# React 강좌를 들으며 학습하는 프로젝트 #

## 1. 원 페이지 일기장 만들기 ##
### 일기장 작성, 저장 ###
```javascript
    //일기장 작성은 DiaryEditor.js에서 진행
    //App.js에서 useState가 들어간 function을 props받아 값을 저장할때 쓰였다.
    
    //App.js
    const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      dataId: dataId.current
    };
    dataId.current++;
    setData([newItem, ...data]);
  }
  
  //DiaryEditor.js
  const DiaryEditor = ({ onCreate }) => {
  ...
  const handleSubmit = () => {
       ...
        onCreate(state.author, state.content, state.emotion);
        alert("저장 성공");
        setState({
            author: "", content: "", emotion: 1,
        })
    }
  ...
  return <div className="DiaryEditor">
  ...
  <button type="submit" onClick={handleSubmit}>일기 저장하기</button>
  ...
 ```
 
 ### 일기장 출력 ###
 ```javascript
    //App.js -> DiaryList.js -> DiaryItem.js 
    //각 일기장들의 출력은 DiaryItem.js에서 작성하였다.
    
    
    //DiaryList.js
    <DiaryItem key={it.dataId} {...it} onRemove={onRemove} onEdit={onEdit} />
    //DiaryList에서는 DiayItem.js에 ...it의 형태로 data 값을 넘겼다.
    
    //DiaryItem.js
    const DiaryItem = ({
    author,
    content,
    created_date,
    emotion,
    dataId,
    onRemove,
    onEdit }) => {
    //DiaryItem.js에서는 위와 같이 값들을 받아 사용하고 있다.
 ```
 ### 일기장 삭제
 ```javascript
    //App.js
    const onRemove = (targetId) => {
        const newDiaryList = data.filter((data) => data.dataId !== targetId);
        setData(newDiaryList);
    }
    //App.js에서 onRemove function을 작성하고 그 안에 setData를 사용하여 state를 갱신할 수 있게 했다.
    
    <DiaryList onEdit={onEdit} diaryList={data} onRemove={onRemove} />
    //DiaryList태그에 넣어 props로 보내어 하위 컴포넌트에서 onRemove()를 사용할 수 있게 함.
    
    //DiaryList.js
    const DiaryList = ({ diaryList, onRemove, onEdit }) => {
    ...
    <DiaryItem key={it.dataId} {...it} onRemove={onRemove} onEdit={onEdit} />
    ...
    //DiaryList에서는 DiaryItem.js로 onRemove()를 전달
    
    //DiaryItem.js
    const DiaryItem = ({
    author,
    content,
    created_date,
    emotion,
    dataId,
    onRemove,
    onEdit }) => {
    ...
    const handleRemove = () => {
        if (window.confirm(`${dataId}번째 일기를 정말 삭제하시겠습니까?`)) {
            onRemove(dataId);
        }
    };
    ...
    <button onClick={handleRemove}>삭제하기</button>
    
    //DiaryItem.js에서 onRemove()를 받아 handleRemove() function 내부에서 사용하도록 함
 
 ```
 ### 일기장 수정
2. React Lifecycle 제어하기
3. React에서 API 호출하기
```javascript
 const res = await fetch('https://jsonplaceholder.typicode.com/comments').then((res) => res.json());
 //에서 fetch 로 리로스를 비동기 요청을 할 수 있다.
 //fetch에는 기본적으로 첫번째 인자에 요청할 url이 들어간다
 
 const initData = res.slice(0, 20).map((it) => {
       return {
         author: it.email,
         content: it.body,
         emotion: Math.floor(Math.random() * 5) + 1,
         created_date: new Date().getTime(),
         id: dataId.current++
       }
     })
     setData(initData);
//res에는 500개의 데이터가 들어있는데 res.slice를 이용하여 20개만 자른 뒤 필요한 데이터만 사용하였다.
```
