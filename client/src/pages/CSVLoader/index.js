import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import MetaTags from "react-meta-tags";
import { MDBDataTable } from "mdbreact";
import moment from "moment";
import {
  Alert,
  Container,
  Row,
  Col,
  Button,
  Card,
  CardTitle,
  CardBody,
  Progress,
  CustomInput,
} from "reactstrap";

// Actions
import { uploadCSV, uploadCSVFailed, clearAll } from "../../store/actions";

// import images
import user1 from "../../assets/images/users/user-1.jpg";
import user2 from "../../assets/images/users/user-2.jpg";
import user3 from "../../assets/images/users/user-3.jpg";
import user4 from "../../assets/images/users/user-4.jpg";
import user5 from "../../assets/images/users/user-5.jpg";
import user6 from "../../assets/images/users/user-6.jpg";
import servicesIcon1 from "../../assets/images/services-icon/01.png";
import servicesIcon2 from "../../assets/images/services-icon/02.png";
import servicesIcon3 from "../../assets/images/services-icon/03.png";

// Charts
import Doughnut from "../AllCharts/echart/doughnutchart";
import Pie from "../AllCharts/echart/piechart";

import Breadcrumbs from "../../components/Common/Breadcrumb";

function CSVLoader(props) {
  const inputRef = useRef(null);

  const { error, loading, uploading, csv } = useSelector(
    ({ currentCSV }) => currentCSV
  );
  const dispatch = useDispatch();

  const uploadCSVChange = async event => {
    event.stopPropagation();
    event.preventDefault();
    dispatch(clearAll());

    const file = event.target.files[0];

    if (!file) return;

    const ext = file?.name.split(".").pop();

    if (ext !== "csv" && ext !== "xls" && ext !== "xlsx") {
      dispatch(uploadCSVFailed("Only CSV files are allowed"));
      return;
    }

    dispatch(uploadCSV(file));
  };

  const tableData = {
    columns: [
      {
        label: "#",
        field: "id",
        sort: "asc",
        width: 50,
      },
      {
        label: "Date",
        field: "Date",
        sort: "asc",
        width: 150,
      },
      {
        label: "Attendent Name",
        field: "AttendentName",
        sort: "asc",
        width: 200,
      },
      {
        label: "Customer Name",
        field: "CustomerName",
        sort: "asc",
        width: 200,
      },
      {
        label: "Product",
        field: "Name",
        sort: "asc",
        width: 150,
      },
      {
        label: "Product Type",
        field: "ProductType",
        sort: "asc",
        width: 150,
      },
      {
        label: "Unit Price",
        field: "ProductUnitPrice",
        sort: "asc",
        width: 80,
      },
      {
        label: "Quantity",
        field: "ProductQuantityTotal",
        sort: "asc",
        width: 80,
      },
      {
        label: "Amount",
        field: "Amount",
        sort: "asc",
        width: 80,
      },
    ],
    rows: (csv?.csvData || []).map((data, index) => ({
      id: index + 1,
      Date: moment(data.Date).format("DD/MM/YYYY"),
      AttendentName: data.AttendentName,
      CustomerName: data.CustomerName,
      Name: data.Name,
      ProductType: data.ProductType,
      ProductUnitPrice: data.ProductUnitPrice,
      ProductQuantityTotal: data.ProductQuantityTotal,
      Amount: data.Amount,
    })),
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>CSV Loader | Petromin Admin Dashboard</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Petromin" breadcrumbItem="CSV Loader" noSetting />

          {/* CSV Upload */}
          <Card>
            <CardBody>
              <Row className="align-items-center justify-content-center">
                <Col xs="8" sm="10" lg="10">
                  <Progress animated color="primary" value={uploading} />
                </Col>
                <Col xs="4" sm="2" lg="2" className="text-end">
                  <Button
                    color="primary"
                    onClick={() => inputRef.current.click()}
                  >
                    <input
                      type="file"
                      id="csv"
                      name="csv"
                      className="hidden"
                      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                      ref={inputRef}
                      onChange={event => uploadCSVChange(event)}
                    />
                    Upload a CSV
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>

          {/* CSV Upload Error */}
          {error && (
            <Alert color="danger" className="mb-4">
              <strong>Oh snap!</strong> {error}.
            </Alert>
          )}

          {/* Stats number */}
          <Row>
            <Col xl={4} md={6}>
              <Card className="mini-stat bg-primary text-white">
                <CardBody>
                  <div className="mb-4">
                    <div className="float-start mini-stat-img me-4">
                      <img src={servicesIcon1} alt="" />
                    </div>
                    <h5 className="font-size-16 text-uppercase mt-0 text-white-50">
                      Sales
                    </h5>
                    <h4 className="fw-medium font-size-24">
                      {csv?.salesData?.length || 0}
                      <i className="mdi mdi-arrow-split-horizontal text-muted ms-2"></i>
                    </h4>
                  </div>
                  <div className="pt-2">
                    <p className="text-white-50 mb-0 mt-1">In this CSV</p>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl={4} md={6}>
              <Card className="mini-stat bg-primary text-white">
                <CardBody>
                  <div className="mb-4">
                    <div className="float-start mini-stat-img me-4">
                      <img src={servicesIcon2} alt="" />
                    </div>
                    <h5 className="font-size-16 text-uppercase mt-0 text-white-50">
                      Service
                    </h5>
                    <h4 className="fw-medium font-size-24">
                      {csv?.servicesData?.length || 0}
                      <i className="mdi mdi-arrow-split-horizontal text-muted ms-2"></i>
                    </h4>
                  </div>
                  <div className="pt-2">
                    <p className="text-white-50 mb-0 mt-1">In this CSV</p>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl={4} md={6}>
              <Card className="mini-stat bg-primary text-white">
                <CardBody>
                  <div className="mb-4">
                    <div className="float-start mini-stat-img me-4">
                      <img src={servicesIcon3} alt="" />
                    </div>
                    <h5 className="font-size-16 text-uppercase mt-0 text-white-50">
                      Total Amount
                    </h5>
                    <h4 className="fw-medium font-size-24">
                      {csv?.totalAmount}
                      <i className="mdi mdi-arrow-up text-success ms-2"></i>
                    </h4>
                  </div>
                  <div className="pt-2">
                    <p className="text-white-50 mb-0 mt-1">In this CSV</p>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* Charts */}
          <Row>
            <Col lg="6">
              <Card>
                <CardBody>
                  <h4 className="mt-0 header-title mb-4">Sale Stats</h4>
                  <div id="doughnut-chart" className="e-chart">
                    <Doughnut
                      label={csv?.salesItems}
                      data={csv?.salesChartData}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="6">
              <Card>
                <CardBody>
                  <h4 className="mt-0 header-title mb-4">Service Stats</h4>
                  <div id="pie-chart" className="e-chart">
                    <Pie
                      labels={csv?.servicesItems}
                      data={csv?.servicesChartData}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* Table */}
          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <CardTitle className="h4">Summary of Uploaded CSV</CardTitle>
                  <p className="card-title-desc">
                    Sort, search, filer, and enjoy with the summary view of your
                    uploaded csv.
                  </p>

                  <MDBDataTable
                    responsive
                    striped
                    bordered
                    data={tableData || []}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default CSVLoader;
