import './App.css';
import RemoteButton from 'remote/Button';
import RemoteButton2 from 'remote2/Button';

function App() {
  return (
    <div className="App">
      <h1>Welcome to the Host App</h1>
      <RemoteButton />
      <p>This button is loaded from the remote application.</p>
      <RemoteButton2 />
      <p>This button is loaded from the remote2 application.</p>
    </div>
  );
}

export default App;
