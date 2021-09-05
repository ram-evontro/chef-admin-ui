import React, { useEffect, useState } from "react";
import api from "helpers/api";
import * as axiosURLS from "helpers/endpoints";
import { Row, Button, ButtonDropdown, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, CustomInput, Collapse } from "reactstrap";
import { NotificationManager } from "components/common/react-notifications";
import IntlMessages from "helpers/IntlMessages";
import { Colxx, Separator } from "components/common/CustomBootstrap";
import Breadcrumb from "containers/navs/Breadcrumb";
import Datatable from "./viewall/Datatable";
import { adminRoot } from "constants/defaultValues";
const Viewall = ({ match, history }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(4);
  const [selectedOrderOption, setSelectedOrderOption] = useState({});
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]);

  const updateAction = (action, id) => {
    if (action === "view") {
      history.push(`${adminRoot}/booking/view/?b=` + id);
    }
  };

  const fetchData = async () => {
    let senddata = {
      limit: selectedPageSize,
      page: currentPage,
      sortBy: selectedOrderOption.column + ":" + selectedOrderOption.order,
    };
    if (search && search != "") {
      senddata["name"] = search;
    }
    try {
      let { data } = await api.get(axiosURLS.BOOKING, { params: senddata });
      setTotalPage(data.totalPages);
      setItems(data.results);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      //NotificationManager
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedPageSize, selectedOrderOption, search]);
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
          <div className="search-sm d-inline-block  ml-1 mb-1 ">
            <input
              type="text"
              name="keyword"
              id="search"
              placeholder={"Search"}
              onChange={(e) => {
                setSearch(e.target.value.toLowerCase());
              }}
              value={search}
            />
          </div>
          <Button
            color="primary"
            className="top-left-button ml-3"
            onClick={() => {
              setSearch("");
            }}
          >
            <IntlMessages id="pages.clear_search" />
          </Button>

          <Datatable
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
