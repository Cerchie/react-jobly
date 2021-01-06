import React, {useState, useEffect} from 'react';
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
import './App.css';


function App() {
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

  return (
<div className="App">
  
      <BrowserRouter>
        <NavBar />
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
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route>
              <p>Hmmm. This page seems to be missing.</p>
            </Route>
            <Redirect to="/" />
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
