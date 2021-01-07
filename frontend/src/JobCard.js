import React, {useContext, useState} from "react";
import {  useParams } from "react-router-dom";
import UserContext from "./UserContext";
import "./styles.css";
import {
  Card,
  CardBody,
  CardTitle,
  CardText
} from "reactstrap";


function JobCard({id, title, salary, equity}){
 
  console.debug("JobCard");
  console.log(id, title, salary, equity)

  const { hasAppliedToJob, applyToJob } = useContext(UserContext);
  const [applied, setApplied] = useState();

  React.useEffect(function updateAppliedStatus() {
    console.debug("JobCard useEffect updateAppliedStatus", "id=", id);

    setApplied(hasAppliedToJob(id));

  }, [id, hasAppliedToJob]);

  /** Apply for a job */
  async function handleApply(evt) {
    evt.preventDefault()
    if (hasAppliedToJob(id)) return;
    applyToJob(id);
    setApplied(true);
  }

  if (applied === true){
    return (
      <section className="col-md-4">
    <Card>
      <CardBody>
        <CardTitle className="font-weight-bold text-center">
         {title}
        </CardTitle>
        <CardText>
          {equity}
          {salary}
          <button onClick={handleApply}>You've applied!</button>
        </CardText>
      </CardBody>
    </Card>
  </section>
  )
  }
    return (
        <section className="col-md-4">
      <Card>
        <CardBody>
          <CardTitle className="font-weight-bold text-center">
           {title}
          </CardTitle>
          <CardText>
            {equity}
            {salary}
            <button onClick={handleApply}>Apply to Job</button>
          </CardText>
        </CardBody>
      </Card>
    </section>
    )
}

export default JobCard;