import './App.css';
import Minter from './Minter';
import App1 from './App1';
import Tabs from './components/Tabs';
import Search from './components/Search';
import  Login  from './components/Login';
import Header from './components/Header';
declare module 'react' {

  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {

    // extends React's HTMLAttributes

    label?: string;

  }

}

function App() {
  return (
    <div>
      {/* <h1>NFT Team 2</h1>
      <br></br>
       <Header/>
      <Tabs>
      <div label="Main">
           <App1/>
        </div>
        <div label="Search NFT">
           <Search/>
        </div>
        <div label="Mint NFT">
          <Minter/>
        </div>
      </Tabs> */}
      <div>
        <Header/>
        <Login componentName="LoginComponent" />
      </div>
    </div>
  );
}
export default App;
