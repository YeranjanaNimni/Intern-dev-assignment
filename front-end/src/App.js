import './App.css'
import Dashboard from './components/Dashboard'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './components/Login'
import UserList from './components/UserList'
import AddUser from './components/AddUser';


function App() {

  return (
    
    <Router>
      <div>
        <Switch>

          <Route path="/addUser">
            <AddUser />
          </Route>

          <Route path="/userList">
            <UserList />
          </Route>

          <Route path="/dashboard">
            <Dashboard />
          </Route>

          <Route path="/">
            <Login />
          </Route>

        </Switch>
      </div>
    </Router>
  )
}

export default App
