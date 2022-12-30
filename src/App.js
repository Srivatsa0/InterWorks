import Home from "./components/Home";
import { BrowserRouter as Router , Route ,  Switch } from "react-router-dom";
import AddData from "./components/AddData";
import Userlist from "./components/Userlist";
import Updateuser from "./components/Updateuser"

function App() {
  return (
    <Router>
      <div className="App">

      <Route exact path="/">
        <Home/>
      </Route>

      <Route exact path="/adduser">
        <AddData/>
      </Route>

      <Route exact path="/users">
        <Userlist/>
      </Route>

      <Route exact path="/updateuser:id">
        <Updateuser/>
      </Route>
      
    </div>
    </Router>
  );
}

export default App;
