import React, {useState} from "react";
import { Link } from "react-router-dom";
import Api from "./api";
import JobCard from './JobCard'
import "./styles.css";

import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  ListGroup,
  ListGroupItem
} from "reactstrap";
import {v4 as uuid} from 'uuid';

function JobList({jobs}){
        const [postedJobs, setPostedJobs] = useState([]); 
        return (
            <section className="col-md-4">
          <Card>
            <CardBody>
              <CardTitle className="font-weight-bold text-center">
                Job List
              </CardTitle>
              <CardText>
                Here's a list of available jobs.
              </CardText>
              <ListGroup>
              {jobs.map(job => (
                    <JobCard key={uuid()} title={job.title} id={job.id} salary={job.salary} equity={job.equity} ></JobCard>
                ))};
              </ListGroup>
              <ListGroup>
              </ListGroup>
            </CardBody>
          </Card>
        </section>
    )
}

export default JobList;

