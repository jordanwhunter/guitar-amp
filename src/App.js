import './App.css';
import Header from './components/Header';
import Mixer from './components/Mixer';
import Canvas from './components/Canvas';

function App() {
  return (
    <div className="app">
      <Header />
      <Mixer />
      <Canvas />   
    </div>
  );
}

export default App;
