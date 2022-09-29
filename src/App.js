import { useRef, useState } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import Lifecycle_mount from './Lifecycle_mount';
import Lifecycle_umount from './Lifecycle_unmount';

function App() {
  const [data, setData] = useState([]);
  const dataId = useRef(0);

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

  const onRemove = (targetId) => {
    const newDiaryList = data.filter((data) => data.dataId !== targetId);
    setData(newDiaryList);
  }

  const onEdit = (targetId, newContent) => {
    setData(
      data.map(it => it.dataId === targetId ? { ...it, content: newContent } : it
      )
    );
  };
  return (
    <div className='App'>
      <Lifecycle_mount />
      <Lifecycle_umount />
      <DiaryEditor onCreate={onCreate} />
      <DiaryList onEdit={onEdit} diaryList={data} onRemove={onRemove} />
    </div>
  );
}

export default App;
