import React from "react";
import ReactDOM from "react-dom";
import { Card, CardBody, CardTitle } from "reactstrap";

function Home() {

  return (
<section className="col-md-8">
      <Card>
        <CardBody className="text-center">
          <CardTitle>
            <h3 className="font-weight-bold">
              Welcome to Jobly, your center for job applications!
            </h3>
          </CardTitle>
        </CardBody>
      </Card>
    </section>
  );
}

export default Home;