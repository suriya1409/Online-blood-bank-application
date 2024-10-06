import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Container } from "reactstrap";

const FullLayout = () => {
  return (
    <main>
      <Header />
      <div className="pageWrapper d-lg-flex">
        <div className="contentArea">
          <Container className="p-4" fluid>
            <Outlet />
          </Container>
        </div>
      </div>
    </main>
  );
};

export default FullLayout;