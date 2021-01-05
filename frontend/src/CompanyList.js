import React, {useState} from "react";
import { Link } from "react-router-dom";
import CompanyCard from './CompanyCard'
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

function CompanyList({companies}){
    const [postedCompanies, setPostedCompanies] = useState([]); 
    return (
        <section className="col-md-4">
      <Card>
        <CardBody>
          <CardTitle className="font-weight-bold text-center">
            Company List
          </CardTitle>
          <CardText>
            Some quick example text to build on the card title and make up the
            bulk of the card's content. 
          </CardText>
          <ListGroup>
          {companies.map(company => (
              <Link to={`/companies/${company.handle}`} key={company.id}>
                <ListGroupItem>{company.name}</ListGroupItem>
              </Link>
            ))};
          </ListGroup>
          <ListGroup>
          </ListGroup>
        </CardBody>
      </Card>
    </section>
    )
}

export default CompanyList;

