import React, { useEffect, useMemo, useReducer, useRef } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';


const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      return action.data
    }
    case "CREATE": {
      const create_date = new Date().getTime();
      const newItem = {
        ...action.data,
        create_date,
      }
      return [newItem, ...state];
    }
    case "REMOVE": {
      return state.filter((it) => it.dataId !== action.targetId)
    }
    case "EDIT": {
      return state.map(it => it.dataId === action.targetId ? {
        ...it, content: action.newContent
      } : it)
    }
    default: {
      return state;
    }
  }
}

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const dataId = useRef(0);




  //api를 이용해서 적절히 데이터를 가공해서 초기 값을 설정해봄
  const getData = async () => {
    //원하는 json값들만 출력
    const res = await fetch('https://jsonplaceholder.typicode.com/comments'
    ).then((res) => res.json());


    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        dataId: dataId.current++
      }
    })
    dispatch({ type: "INIT", data: initData })
  };


  useEffect(() => {
    getData();
  }, [])

  const onCreate = (author, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        author,
        content,
        emotion,
        dataId: dataId.current
      }
    })
    dataId.current++;
  }

  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId })
  }

  const onEdit = (targetId, newContent) => {
    dispatch({
      type: "EDIT", targetId, newContent
    })
  }

  //해당 기능들은 절대 재생성되는 일이 없도록 deps를 빈 배열로 사용 
  const memoizeDispatch = useMemo(() => {
    return { onCreate, onRemove, onEdit }
  }, [])

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoizeDispatch}>
        <div className='App'>
          <DiaryEditor />
          <DiaryList />
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
