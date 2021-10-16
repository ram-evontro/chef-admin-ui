import React, { useEffect, useState } from "react";
import api from "helpers/api";
import * as axiosURLS from "helpers/endpoints";
import {
  Row,
  Button,
  Collapse,
  Card,
  CardBody,
  Input,
  Label,
  FormGroup,
  ButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  CustomInput,
} from "reactstrap";
import IntlMessages from "helpers/IntlMessages";
import { NotificationManager } from "components/common/react-notifications";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Colxx, Separator } from "components/common/CustomBootstrap";
import Breadcrumb from "containers/navs/Breadcrumb";
import Datatable from "./viewall/Datatable";
import { adminRoot } from "constants/defaultValues";
import download from "downloadjs";
const Viewall = ({ match, history }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(4);
  const [selectedOrderOption, setSelectedOrderOption] = useState({});
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]);
  const [collapse, setCollapse] = useState(false);
  const [resetData, setResetData] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [filterdata, setFilterdata] = useState({});
  const [lastChecked, setLastChecked] = useState(null);
  const [dropdownSplitOpen, setDropdownSplitOpen] = useState(false);
  const updateAction = (action, id) => {
    if (action === "view") {
      history.push(`${adminRoot}/booking/view/?b=` + id);
    }
  };
  const onCheckItem = (event, id) => {
    if (lastChecked === null) {
      setLastChecked(id);
    }
    let selectedList = [...selectedItems];
    if (selectedList.includes(id)) {
      selectedList = selectedList.filter((x) => x !== id);
    } else {
      selectedList.push(id);
    }
    setSelectedItems(selectedList);
    if (event.shiftKey) {
      let newItems = [...items];
      const start = getIndex(id, newItems, "id");
      const end = getIndex(lastChecked, newItems, "id");
      newItems = newItems.slice(Math.min(start, end), Math.max(start, end) + 1);
      selectedItems.push(
        ...newItems.map((item) => {
          return item.id;
        })
      );
      selectedList = Array.from(new Set(selectedItems));
      setSelectedItems(selectedList);
    }
    document.activeElement.blur();
    return false;
  };
  const handleChangeSelectAll = (isToggle) => {
    if (selectedItems.length >= items.length) {
      if (isToggle) {
        setSelectedItems([]);
      }
    } else {
      setSelectedItems(items.map((x) => x.id));
    }
    document.activeElement.blur();
    return false;
  };
  const handleChange = (e) => {
    let tempdata = { ...filterdata };
    let val = e.target.value;
    let name = e.target.name;
    if (val !== "") {
      tempdata[name] = val;
    } else {
      delete tempdata[name];
    }
    setFilterdata(tempdata);
  };
  const exportCSV = async () => {
    setIsLoading(true);
    try {
      let response = await api.post(axiosURLS.BOOKING + "/exportcsv", {
        selected: selectedItems,
      });
      const content = response.headers["content-type"];
      download(response.data, "export.csv", content);
    } catch (err) {
      if (err.response && err.response.data) {
        NotificationManager.error(err.response.data.message, "Error", 3000, null, null, "");
      }
    }
    setIsLoading(false);
  };
  const fetchFilteredData = () => {
    setIsLoading(true);
    if (currentPage === 1) {
      fetchData();
    } else {
      setCurrentPage(1);
    }
  };
  const resetFilteredData = () => {
    setIsLoading(true);
    setResetData(true);
    setFilterdata({});
  };
  const fetchData = async () => {
    let senddata = {
      limit: selectedPageSize,
      page: currentPage,
      sortBy: selectedOrderOption.column + ":" + selectedOrderOption.order,
    };
    if (!resetData) {
      Object.assign(senddata, filterdata);
    } else {
      setResetData(false);
    }
    try {
      let { data } = await api.get(axiosURLS.BOOKING, { params: senddata });
      setTotalPage(data.totalPages);
      setItems(data.results);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      if (err.response && err.response.data) {
        NotificationManager.error(err.response.data.message, "Error", 3000, null, null, "");
      }
    }
    setIsLoading(false);
  };
  const setDate = (fordate, val) => {
    let temp = { ...filterdata };
    temp[fordate + "_date"] = val;
    setFilterdata(temp);
  };
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedPageSize, selectedOrderOption, search]);
  useEffect(() => {
    if (resetData) {
      fetchData();
    }
  }, [resetData]);
  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, [selectedPageSize, currentPage, selectedOrderOption, search]);
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.booking" match={match} />
          <Separator className="mb-1" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12">
          <ButtonDropdown isOpen={dropdownSplitOpen} toggle={() => setDropdownSplitOpen(!dropdownSplitOpen)}>
            <div className="btn btn-primary btn-lg pl-4 pr-0 check-button check-all">
              <CustomInput
                className="custom-checkbox mb-0 d-inline-block"
                type="checkbox"
                id="checkAll"
                checked={selectedItems.length >= items.length}
                onChange={() => handleChangeSelectAll(true)}
                label={<span className={`custom-control-label ${selectedItems.length > 0 && selectedItems.length < items.length ? "indeterminate" : ""}`} />}
              />
            </div>
            <DropdownToggle caret color="primary" className="dropdown-toggle-split btn-lg" />
            <DropdownMenu right>
              <DropdownItem onClick={exportCSV}>
                <IntlMessages id="pages.export_csv" />
              </DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
          <div className="text-zero top-right-button-container">
            <Button
              onClick={() => {
                setCollapse(!collapse);
              }}
              color="primary"
              size="lg"
              className="top-right-button"
            >
              <IntlMessages id="pages.advanced_filters" />
            </Button>
          </div>

          <Collapse isOpen={collapse}>
            <Row className="mt-2 mt-2">
              <Colxx xxs="12">
                <Card>
                  <CardBody>
                    <Row>
                      <Colxx xxs="12" md="3">
                        <FormGroup>
                          <Label>From Date:</Label>
                          <DatePicker selected={Date.parse(filterdata.from_date)} onChange={(val) => setDate("from", val)} shouldCloseOnSelect />
                        </FormGroup>
                      </Colxx>
                      <Colxx xxs="12" md="3">
                        <FormGroup>
                          <Label>To Date:</Label>
                          <DatePicker selected={Date.parse(filterdata.to_date)} onChange={(val) => setDate("to", val)} shouldCloseOnSelect />
                        </FormGroup>
                      </Colxx>
                      <Colxx xxs="12" md="3">
                        <FormGroup>
                          <Label>Experience Type:</Label>
                          <select
                            className="form-control"
                            onChange={handleChange}
                            name="type"
                            value={filterdata && filterdata.type ? filterdata.type : ""}
                            id="type"
                          >
                            <option value="">Select Value</option>
                            <option value="virtual_dining">Virtual Dining</option>
                            <option value="chef_table">Chefs Table</option>
                          </select>
                        </FormGroup>
                      </Colxx>
                      <Colxx xxs="12" md="3">
                        <FormGroup>
                          <Label>Booking Status:</Label>
                          <select
                            className="form-control"
                            onChange={handleChange}
                            name="status"
                            value={filterdata && filterdata.status ? filterdata.status : ""}
                            id="status"
                          >
                            <option value="">Select Value</option>
                            <option value="Order Placed">Placed</option>
                            <option value="Order Paid">Paid</option>
                            <option value="Order Completed">Completed</option>
                            <option value="Order Cancelled">Cancelled</option>
                          </select>
                        </FormGroup>
                      </Colxx>
                      <Colxx xxs="12" md="3">
                        <FormGroup>
                          <Label>Order No:</Label>
                          <Input type="text" onChange={handleChange} value={filterdata && filterdata.order_no ? filterdata.order_no : ""} name="order_no" />
                        </FormGroup>
                      </Colxx>
                      <Colxx xxs="12" md="3">
                        <FormGroup>
                          <Label>Host Email:</Label>
                          <Input
                            type="text"
                            onChange={handleChange}
                            value={filterdata && filterdata.host_email ? filterdata.host_email : ""}
                            name="host_email"
                          />
                        </FormGroup>
                      </Colxx>
                      <Colxx xxs="12" md="3">
                        <FormGroup>
                          <Label>Host Mobile:</Label>
                          <Input
                            type="mobile"
                            onChange={handleChange}
                            value={filterdata && filterdata.host_mobile ? filterdata.host_mobile : ""}
                            name="host_mobile"
                          />
                        </FormGroup>
                      </Colxx>
                    </Row>
                    <Row>
                      <Colxx xxs="12">
                        <Button onClick={fetchFilteredData} color="primary">
                          <IntlMessages id="pages.filter" />
                        </Button>
                        <Button onClick={resetFilteredData} color="primary" className="ml-3">
                          <IntlMessages id="pages.reset" />
                        </Button>
                      </Colxx>
                    </Row>
                  </CardBody>
                </Card>
              </Colxx>
            </Row>
          </Collapse>

          <Datatable
            onCheckItem={onCheckItem}
            selectedItems={selectedItems}
            items={items}
            currentPage={currentPage}
            totalPage={totalPage}
            onChangePage={setCurrentPage}
            selectedPageSize={selectedPageSize}
            isLoading={isLoading}
            setSelectedPageSize={setSelectedPageSize}
            setSelectedOrderOption={setSelectedOrderOption}
            selectedOrderOption={selectedOrderOption}
            updateAction={updateAction}
          />
        </Colxx>
      </Row>
    </>
  );
};
export default Viewall;
