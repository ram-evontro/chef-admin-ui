import React, { useEffect, useState } from "react";
import api from "helpers/api";
import * as axiosURLS from "helpers/endpoints";
import { Row, Button, ButtonDropdown, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, CustomInput, Collapse } from "reactstrap";
import { NotificationManager } from "components/common/react-notifications";
import IntlMessages from "helpers/IntlMessages";
import { Colxx, Separator } from "components/common/CustomBootstrap";
import Breadcrumb from "containers/navs/Breadcrumb";
import Datatable from "./patron/Datatable";
import { adminRoot } from "constants/defaultValues";
import download from "downloadjs";
const Patron = ({ match, history }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(4);
  const [selectedOrderOption, setSelectedOrderOption] = useState({});
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [lastChecked, setLastChecked] = useState(null);
  const [dropdownSplitOpen, setDropdownSplitOpen] = useState(false);

  const updateAction = (action, id) => {
    if (action === "view") {
      history.push(`${adminRoot}/diner/view/?b=` + id);
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
  const exportCSV = async () => {
    setIsLoading(true);
    try {
      let response = await api.post(axiosURLS.PATRONS + "/exportcsv", {
        selected: selectedItems,
        role: "diner",
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
  const fetchData = async () => {
    let senddata = {
      limit: selectedPageSize,
      page: currentPage,
      sortBy: selectedOrderOption.column + ":" + selectedOrderOption.order,
    };
    if (search && search != "") {
      senddata["name"] = search;
    }
    senddata["role"] = "diner";
    try {
      let { data } = await api.get(axiosURLS.PATRONS, { params: senddata });
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
          <Breadcrumb heading="menu.patron" match={match} />
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
export default Patron;
