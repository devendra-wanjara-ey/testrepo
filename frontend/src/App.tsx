
import './App.css';
import Minter from './Minter'
import Tabs from './components/Tabs';
declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // extends React's HTMLAttributes
    label?: string;
  }
}

function App() {
  return (
    <div>
      <h1>NFT Team 2</h1>
      <br></br>
      <Tabs>
        <div label="Search NFT">
           Please add Search Screen !
        </div>
        <div label="Mint NFT">
          <Minter/>
        </div>
        
      </Tabs>
    </div>
  );
}
export default App;
