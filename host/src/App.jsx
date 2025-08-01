import './App.css';
import RemoteApp1 from 'remote/App';
import RemoteApp2 from 'remote2/App';

function App() {
  return (
    <div className="App">
      <h1>Welcome to the Host App</h1>
      <RemoteApp1 />
      <RemoteApp2 />
    </div>
  );
}

export default App;
