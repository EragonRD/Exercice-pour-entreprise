import Tableau from './composants/tableau'
import './App.css'
import PersistentDrawerLeft from './composants/sidebar'

 export default function App() {
  

  return (
    <>
 
    <div>
    <PersistentDrawerLeft/>
    </div>
       
      <div>
       
    <Tableau/>
      </div>
      
    </>
  )
}


