#React 강좌를 들으며 학습하는 프로젝트

1. 원 페이지 일기장 만들기
    -일기장 저장 및 출력
    -일기장 삭제 
    -일기장 수정
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
