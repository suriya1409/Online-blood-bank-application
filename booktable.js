import { Card, CardBody, CardTitle, CardSubtitle, Table, Button } from "reactstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const OrdersTable = (props) => {

  const [data, setData] = useState([]);

  useEffect(() => {
    const getDetails = async () => {
      try {
        const res = await axios.get('/getBooks');
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getDetails();
  }, []);

  console.log(data);
  return (
    <div style={{ height: "460px", overflowY: "auto" }}>
      <Card>
        <CardBody>
          <CardTitle tag="h5" className="m-2" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>Bookslots</CardTitle>
          <Table className="no-wrap mt-3 align-middle" responsive borderless striped>
            <thead>
              <tr>
                <th>Center ID</th>
                <th>Location</th>
                <th>Slot Type</th>
                <th>Dose</th>
                <th>Timing</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((data, index) => (
                <tr key={index} className="border-top">
                  <td>{data.id}</td>
                  <td>{data.location}</td>
                  <td>{data.available}</td>
                  <td>{data.dose}</td>
                  <td>{data.timing}</td>
                  <td>{data.genre}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>

  );
};

export default OrdersTable;