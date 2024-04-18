
import { useState } from 'react';
import './App.css';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Routes,Route } from 'react-router';
import ChatScreen from './components/ChatScreen';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});


function App() {
  const [isloggedin,setisloggedin]=useState(localStorage.getItem("jwt")?true:false)

  console.log(isloggedin)
  return( 
    
    <> 
  <Routes>
       <Route path="/" element={isloggedin ? <Home setisloggedin={setisloggedin} /> : <Login setisloggedin={setisloggedin} />} />
          <Route path="/signin" element={<Login setisloggedin={setisloggedin} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/:id/:name" element={<ChatScreen />} /> 
          </Routes>
    </>

  )
  
}

export default App;
