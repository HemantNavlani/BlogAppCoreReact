import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import {login,logout} from './store/authSlice.js'
import { Footer, Header } from "./components";
import {Outlet} from 'react-router-dom'
function App() {
  const [loading,setIsLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if (userData) dispatch(login(userData));
      else dispatch(logout())
    })
    .finally(()=>setIsLoading(false))
  },[])
  return !loading ? (
    <div className='min-h-screen flex flex-wrap text-center items-center bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
        TODO:  <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : (
    <div className="font-bold text-5xl flex items-center justify-center h-screen">
      Loading.....
    </div>
  );
}

export default App
