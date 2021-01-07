import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Redirect, useParams } from "react-router-dom";
import JobList from "./JobList";
import JoblyApi from "./api";
import "./styles.css";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import { v4 as uuid } from "uuid";

function CompanyCard({ company, companies }) {
  const { handle } = useParams();
  const [stateCompany, setStateCompany] = useState(null);

  useEffect(
    function getCompanyAndJobsForUser() {
      async function getCompany() {
        setStateCompany(await JoblyApi.getCompany(handle));
      }

      getCompany();
    },
    [handle],
  );

  if (!stateCompany) {
    return <p>loading..</p>;
  }
  // let company = companies.find(company => company.handle === handle);
  console.log("company =", company);
  // jobs where company.handle = handle
  return (
    <section className="col-md-4">
      <Card>
        <CardBody>
          <CardTitle className="font-weight-bold text-center">
            {stateCompany.name}
          </CardTitle>
          <CardText>{stateCompany.description}</CardText>
          {/* 
           lodash used to have a useful, verbose way of doing this
           nullish coalescing operator https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator
           optional chaining https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining*/}
          <JobList jobs={stateCompany?.jobs ?? []} />
        </CardBody>
      </Card>
    </section>
  );
}

export default CompanyCard;
