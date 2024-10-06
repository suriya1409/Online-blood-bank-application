import { Row, Col, Card, CardText, CardTitle } from "reactstrap";

const About = () => {
  return (
    <Row>
      <div className="mb-3">
        <h3 style={{ fontFamily: 'Poppins', fontWeight: 600 }}>My Profile</h3>
      </div>
      <Col md="6" lg="4">
        <Card body>
          <CardTitle tag="h5" className="m-2">Admin ID : 2561101</CardTitle>
          <CardText className="m-2">
            Contact No : 7305883551
          </CardText>
          <CardText className="m-2">
            Email : lokesh@gmail.com
          </CardText>
          <CardText className="m-2">
            Aadhar No : 9895 9454 6790
          </CardText>
          <div className="m-2">
            <span className="p-2 small bg-light-success rounded d-inline-block">Admin Name : Loky</span>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default About;