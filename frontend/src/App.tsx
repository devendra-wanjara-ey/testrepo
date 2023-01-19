import './App.css';
import Minter from './Minter'
import Tabs from './components/Tabs';

function App() {
  return (
    <div>
      <h1>NFT Team 2</h1>
      <br></br>
      <Tabs>
        <div label="Search NFT">
           Please add Search 
        </div>
        <div label="Mint NFT">
          <Minter/>
        </div>
        
      </Tabs>
    </div>
  );
}
export default App;
