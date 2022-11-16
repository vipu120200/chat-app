
import { Button, ButtonGroup } from '@chakra-ui/react'
import {Routes,Route} from 'react-router-dom';
import Home from './components/Home';
import Chat from './components/Chat';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;
