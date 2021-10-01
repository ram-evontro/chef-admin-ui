import React, { useEffect, useState } from "react";
import api from "helpers/api";
import * as axiosURLS from "helpers/endpoints";
import { Row, Button, ButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle, CustomInput } from "reactstrap";
import { NotificationManager } from "components/common/react-notifications";
import IntlMessages from "helpers/IntlMessages";
import { Colxx, Separator } from "components/common/CustomBootstrap";
import Breadcrumb from "containers/navs/Breadcrumb";
import Datatable from "./chefrequests/Datatable";
import Deletealert from "../elements/Deletealert";
import download from "downloadjs";
const Chefrequests = ({ match }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(4);
  const [selectedOrderOption, setSelectedOrderOption] = useState({
    column: "",
    order: "",
  });
  const [action, setAction] = useState("");
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [items, setItems] = useState([]);
  const [lastChecked, setLastChecked] = useState(null);
  const [dropdownSplitOpen, setDropdownSplitOpen] = useState(false);
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
  const changeSelected = async (res) => {
    setIsLoading(true);
    try {
      if (res && action != "") {
        await Promise.all(
          selectedItems.map(async (item) => {
            await api.get(axiosURLS.USER_JOIN_REQUESTS + "/" + item + "/" + action);
          })
        );
        setSelectedItems([]);
        fetchData();
        NotificationManager.success(`Join Request ${action}ed successfully`, "Saved", 3000, null, null, "");
      }
    } catch (err) {
      NotificationManager.error(`Some error occured`, "Update Error", 3000, null, null, "");
    }
    setAction("");
    setIsLoading(false);
  };
  const updateAction = (action, id) => {
    setSelectedItems([id]);
    setAction(action);
    showDeleteAlert();
  };
  const showDeleteAlert = () => {
    setDeleteAlert(!deleteAlert);
  };

  const fetchData = async () => {
    let senddata = {
      limit: selectedPageSize,
      page: currentPage,
    };
    if (selectedOrderOption.column != "" && selectedOrderOption.order) {
      senddata["sortBy"] = selectedOrderOption.column + ":" + selectedOrderOption.order;
    }
    if (search && search != "") {
      senddata["name"] = search;
    } else {
    }
    try {
      let { data } = await api.get(axiosURLS.USER_JOIN_REQUESTS, { params: senddata });
      setTotalPage(data.totalPages);
      setItems(data.results);
      setSelectedItems([]);
      setTotalItemCount(data.totalResults);
    } catch (err) {
      if (err.response && err.response.data) {
        NotificationManager.error(err.response.data.message, "Fetch Error", 3000, null, null, "");
      }
    }
    setIsLoading(false);
  };
  const exportCSV = async () => {
    setIsLoading(true);
    try {
      let response = await api.post(axiosURLS.USER_JOIN_REQUESTS + "/exportcsv", {
        selected: selectedItems,
      });
      const content = response.headers["content-type"];
      download(response.data, "export.csv", content);
    } catch (err) {
      console.log(err);
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
          <Breadcrumb heading="menu.chefrequests" match={match} />
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
              <DropdownItem
                onClick={() => {
                  setAction("approve");
                  showDeleteAlert();
                }}
              >
                <IntlMessages id="pages.approve" />
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  setAction("reject");
                  showDeleteAlert();
                }}
              >
                <IntlMessages id="pages.reject" />
              </DropdownItem>
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
      <Deletealert modalOpen={deleteAlert} toggleModal={() => setDeleteAlert(!deleteAlert)} setSureDelete={changeSelected} />
    </>
  );
};
export default Chefrequests;
