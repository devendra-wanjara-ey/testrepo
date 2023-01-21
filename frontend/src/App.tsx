
import './App.css';
import Minter from './Minter'
import Tabs from './components/Tabs';
import Header from './components/Header';
declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // extends React's HTMLAttributes
    label?: string;
    class?:string
  }
}

function App() {
  return (
    <div >
     <Header/>
      <Tabs>
        <div label="Search NFT">
           Please add Search Screen !1
        </div>
        <div label="Mint NFT">
          <Minter/>
        </div>
        
      </Tabs>
    </div>
  );
}
export default App;
