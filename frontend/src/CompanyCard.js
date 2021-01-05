import React, {useState} from "react";
import { Link } from "react-router-dom";
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

function CompanyCard({companies}){
    const { handle } = useParams();
    let company = companies.find(company => company.handle === handle);
    return (
        <section className="col-md-4">
      <Card>
        <CardBody>
          <CardTitle className="font-weight-bold text-center">
           {company.name}
          </CardTitle>
          <CardText>
            {company.description}
          </CardText>
        </CardBody>
      </Card>
    </section>
    )
}

export default CompanyCard;