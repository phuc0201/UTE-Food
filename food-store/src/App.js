import Footer from "./components/Footer/Footer.jsx";
import Header from "./components/Header/Header.jsx";
import Sidebar from './components/Sidebar/Sidebar.jsx'
import Routers from "./utils/Routers/Routers.jsx";
import './responsive.scss'

const Admin = ()=>{
  return (
    <div id="admin">
        <Header/>
        <div className="MyApp">
          <Routers/>
        </div>
    </div>
  )
}
const User = ()=>{
  return (
    <div id="user">
        <Header/>
        <div className="MyApp">
          <Routers/>
        </div>
        <Footer/>
    </div>
  )
}
function App() {
  
  return window.location.href.includes("admin") ? <Admin/> : <User/>
  
}

export default App;
