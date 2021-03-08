import React from 'react'
import UserList from './UserList'
import AddUser from './AddUser'
import { Link, useRouteMatch } from 'react-router-dom'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function Dashboard() {
  let match = useRouteMatch();

  return (

    <div className='dashboard-background'>
      <div className='dashboard-head'> DASHBOARD </div>

      <div className='admin-users'>

        <div className='heading'>
          <Link to={`${match.url}/userList`}> <button className='nav-btn'> All Users </button> </Link>
          <Link to={`${match.url}/addUser`}>  <button className='nav-btn'> Add a User </button>  </Link>
        </div>

        <div className='admin-user-list'>

        </div>

        <Switch>

        <Route path={`${match.path}/userList`}>
          <UserList />
          </Route>

        <Route path={`${match.path}`}>
        <AddUser />
          </Route>
          

          
          
        </Switch>

      </div>
    </div>
  )

}

export default Dashboard