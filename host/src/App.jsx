import './App.css';
import RemoteButton from 'remote/Button';
import RemoteApp2 from 'remote2/App';

function App() {
  return (
    <div className="App">
      <h1>Welcome to the Host App</h1>
      <RemoteButton />
      <RemoteApp2 />
    </div>
  );
}

export default App;
