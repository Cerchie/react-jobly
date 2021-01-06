import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import Search from './Search'
import CompanyCard from './CompanyCard'
import JoblyApi from './api'
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

function CompanyList({companiesProps}){
    console.debug("CompanyList:", companiesProps);

    const [companies, setCompanies] = useState(null);
  
    useEffect(function getCompaniesOnMount() {
      console.debug("CompanyList useEffect getCompaniesOnMount");
      search();
    }, []);
  
    /** Triggered by search form submit; reloads companies. */
    async function search(name) {
      let companies = await JoblyApi.searchCompanies(name);
      setCompanies(companies);
    }
    return (
        <section className="col-md-4">
            <Search searchFor={search} />
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
          {companiesProps.map(company => (
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