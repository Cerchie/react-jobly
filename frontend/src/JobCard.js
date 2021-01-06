import React from "react";
import { Redirect, useParams } from "react-router-dom";
import Api from "./api";
import "./styles.css";
import {
  Card,
  CardBody,
  CardTitle,
  CardText
} from "reactstrap";
import {v4 as uuid} from 'uuid';

function JobCard({jobs}){
    console.log(jobs)
    const { id } = useParams();
    let job = jobs.find(job => job === job);
    console.log(job)
    if (!job){
       return ('Job not found');
    } 
    return (
        <section className="col-md-4">
      <Card>
        <CardBody>
          <CardTitle className="font-weight-bold text-center">
           {job.title}
          </CardTitle>
          <CardText>
            {job.company_handle}
            {job.equity}
            {job.salary}
          </CardText>
        </CardBody>
      </Card>
    </section>
    )
}

export default JobCard;