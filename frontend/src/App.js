import React, {useState, useEffect, useContext} from 'react';
import { BrowserRouter, Redirect } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import NavBar from './NavBar';
import Home from './Home';
import CompanyList from './CompanyList';
import CompanyCard from './CompanyCard';
import JobList from './JobList';
import JobCard from './JobCard';
import Login from './Login';
import Signup from './Signup';
import Profile from './Profile'
import JoblyApi from './api'
import UserContext from "./UserContext";
import useLocalStorage from "./useLocalStorage";
import jwt from "jsonwebtoken";

import './App.css';

export const TOKEN_STORAGE_ID = "jobly-token";

function App() {
  //USER AUTH FUNCTIONS
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null)
  const [applicationIds, setApplicationIds] = useState(new Set([]));

  useEffect(function loadUserInfo() {
    console.debug("App useEffect loadUserInfo", "token=", token);

  async function getCurrentUser() {
    if (token) {
      try {
        let { username } = jwt.decode(token);
        // put the token on the Api class so it can use it to call the API.
        JoblyApi.token = token;
        let currentUser = await JoblyApi.getCurrentUser(username);
        setCurrentUser(currentUser);
        setApplicationIds(new Set(currentUser.applications));
      } catch (err) {
        console.error("App loadUserInfo: problem loading", err);
        setCurrentUser(null);
      }
    }
    setInfoLoaded(true);
  }

  // set infoLoaded to false while async getCurrentUser runs; once the
  // data is fetched (or even if an error happens!), this will be set back
  // to false to control the spinner.
  setInfoLoaded(false);
  getCurrentUser();
}, [token]);

  async function signupUser(signupData) {
    try {
      let token = await JoblyApi.signup(signupData);
      setToken(token);
      let currentUser = await JoblyApi.getCurrentUser(signupData.username);
      setCurrentUser(currentUser);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }
  async function loginUser(signupData) {
    try {
      let token = await JoblyApi.login(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  async function updateUser(newData) {
    try {
      let token = await JoblyApi.saveProfile(newData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }
  /** Handles site-wide logout. */
  function logout() {
    setCurrentUser(null);
    setToken(null);
  }
  //FUNCTIONS TO HELP LOAD PROPS FOR COMPONENTS
  const [isLoading, setIsLoading] = useState(true);
  const [companies, setCompanies] = useState([]); 
  const [jobs, setJobs] = useState([]); 
  // make API call to get all companies to pass to CompanyList
  useEffect(() => {
    async function getCompanies() {
      let companies = await JoblyApi.getAllCompanies();
      setCompanies(companies);
      setIsLoading(false);
    }
    async function getJobs() {
      let jobs = await JoblyApi.getAllJobs();
      setJobs(jobs);
      setIsLoading(false);
    }
  
    getCompanies();
    getJobs();
 
  }, []);

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }
if (currentUser)
  { return (
<div className="App">
  
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <NavBar logout={logout} />
        <main>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/companies">
            <CompanyList companiesProps={companies}/>
            </Route>
            <Route exact path="/companies/:handle">
              <CompanyCard companies={companies}/>
            </Route>
            <Route exact path="/jobs">
              <JobList jobs={jobs}/>
            </Route>
            <Route exact path="/jobs/:id">
              <JobCard jobs={jobs}/>
            </Route>
            <Route exact path="/login">
              <Login login={loginUser}/>
            </Route>
            <Route exact path="/signup">
              <Signup signupUser={signupUser}/>
            </Route>
            <Route exact path="/profile">
              <Profile updateUser={updateUser}/>
            </Route>
            <Route>
              <p>Hmmm. This page seems to be missing.</p>
            </Route>
            <Redirect to="/" />
          </Switch>
        </main>
        </UserContext.Provider >
      </BrowserRouter>
    </div>
  );}

  return (
    <div className="App">
      
        <BrowserRouter>
          <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            <NavBar logout={logout} />
            <main>
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route exact path="/login">
                  <Login login={loginUser}/>
                </Route>
                <Route exact path="/signup">
                  <Signup signupUser={signupUser}/>
                </Route>
                <Route>
                  <p>Hmmm. This page seems to be missing.</p>
                </Route>
                <Redirect to="/" />
              </Switch>
            </main>
            </UserContext.Provider >
          </BrowserRouter>
        </div>
      );
}

export default App;
