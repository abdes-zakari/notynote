import React,{ Component } from 'react';
import { BrowserRouter,Route } from 'react-router-dom';
import Settings from './Settings.js'



class SecondePage extends Component {
   constructor(props) {
      super(props);

    }

   render() {
    
     return (
       <div className="App">
           <Settings/>
       </div>
     );
   }
 }


export default SecondePage;
