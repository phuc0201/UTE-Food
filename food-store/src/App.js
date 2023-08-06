import Footer from "./components/Footer/Footer.jsx";
import Header from "./components/Header/Header.jsx";
import Routers from "./utils/Routers/Routers.jsx";
import './responsive.scss'
function App() {
  return (
    <div>
      <Header/>
      <div className="MyApp">
        <Routers/>
      </div>
      <Footer/>
    </div>
  )
}

export default App;
