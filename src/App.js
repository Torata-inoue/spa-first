import { createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const App = function() {
  const res = axios.get('http://localhost:3001/comments/2');

  // axios.post('http://localhost:3001/tasks', {body: '追加要素'}, {
  //   headers: {
  //     'Content-Type': 'application/json',
  //   }
  // });

  // axios.put('http://localhost:3001/tasks/3', {body: '変更した要素'}, {
  //   headers: {
  //     'Content-Type': 'application/json',
  //   }
  // });

  // axios.delete('http://localhost:3001/tasks/3', {
  //   headers: {
  //     'Content-Type': 'application/json',
  //   }
  // });

  return (
    <div>
      aaaaaaaa
    </div>
  )

}

export default App;
