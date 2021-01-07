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


function JobCard({id, title, salary, company_handle, equity}){
 
  console.debug("JobCard");

  const { hasAppliedToJob, applyToJob } = useContext(UserContext);
  const [applied, setApplied] = useState();

  React.useEffect(function updateAppliedStatus() {
    console.debug("JobCard useEffect updateAppliedStatus", "id=", id);

    setApplied(hasAppliedToJob(id));
  }, [id, hasAppliedToJob]);

  /** Apply for a job */
  async function handleApply(evt) {
    if (hasAppliedToJob(id)) return;
    applyToJob(id);
    setApplied(true);
  }


    return (
        <section className="col-md-4">
      <Card>
        <CardBody>
          <CardTitle className="font-weight-bold text-center">
           {title}
          </CardTitle>
          <CardText>
            {company_handle}
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