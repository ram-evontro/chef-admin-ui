import React, { useEffect, useState } from "react";
import api from "helpers/api";
import * as axiosURLS from "helpers/endpoints";
import { Row, Button, ButtonDropdown, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, CustomInput, Collapse } from "reactstrap";
import { NotificationManager } from "components/common/react-notifications";
import IntlMessages from "helpers/IntlMessages";
import { Colxx, Separator } from "components/common/CustomBootstrap";
import Breadcrumb from "containers/navs/Breadcrumb";
import Datatable from "./list/Datatable";
import Addmodal from "./list/Addmodal";
import Deletealert from "../elements/Deletealert";
import { adminRoot } from "constants/defaultValues";

const List = ({ match,history }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [chefTypes, setChefTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(4);
  const [selectedOrderOption, setSelectedOrderOption] = useState({
    column: "name",
    order: "asc",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalFor, setModalFor] = useState("");
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [formdata, setFormdata] = useState({});
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
  const deleteSelected = async (res) => {
    setIsLoading(true);
    if (res) {
      await Promise.all(
        selectedItems.map(async (item) => {
          await api.delete(axiosURLS.USERS + "/" + item);
        })
      );
      setSelectedItems([]);
      fetchData();
      NotificationManager.success("User Deleted successfully", "Deleted", 3000, null, null, "");
    }
    setIsLoading(false);
  };
  const deleteSingle = (id) => {
    setSelectedItems([id]);
    showDeleteAlert();
  };
  const showDeleteAlert = () => {
    // if (selectedItems.length > 0) {
    setDeleteAlert(!deleteAlert);
    // }
  };
  const editSelected = (data) => {
    setModalFor("edit");
    setFormdata(data);
    setModalOpen(!modalOpen);
  };
  const fetchData = async () => {
    let senddata = {
      limit: selectedPageSize,
      role: "chef",
      page: currentPage,
      sortBy: selectedOrderOption.column + ":" + selectedOrderOption.order,
    };
    if (search && search != "") {
      senddata["name"] = search;
    }
    api
      .get(axiosURLS.USERS, {
        params: senddata,
      })
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        setTotalPage(data.totalPages);
        setItems(data.results);
        setSelectedItems([]);
        setTotalItemCount(data.totalResults);
        setIsLoading(false);
      });
  };
  const setStatusSelected = async (status) => {
    setIsLoading(true);
    let formdata = { status: status };
    await Promise.all(
      selectedItems.map(async (item) => {
        await api.patch(axiosURLS.USERS + "/" + item, formdata);
      })
    );
    setSelectedItems([]);
    fetchData();
    NotificationManager.success("Chef status changed successfully", "Changed", 3000, null, null, "");
    setIsLoading(false);
  };
  const toggleStatusSingle = async (id, setto) => {
    setIsLoading(true);
    let formdata = { status: setto };
    try{
    await api.patch(axiosURLS.USERS + "/" + id, formdata);
    fetchData();
    NotificationManager.success("Chef status changed successfully", "Changed", 3000, null, null, "");
    }
    catch(err)
    {
      console.log(err);
      console.log(err.response);
      if (err.response) {
        NotificationManager.error(err.response.data.message, "Error occured", 3000, null, null, "");
      }
    }
    setIsLoading(false);
  };
  const featuredSingle = async (id, setto) => {
    setIsLoading(true);
    let formdata = { details:{is_featured: setto} };
    try{
    await api.post(axiosURLS.USER_DETAILS_UPDATE + "/" + id, formdata);
    fetchData();
    NotificationManager.success("Chef status changed successfully", "Changed", 3000, null, null, "");
    }
    catch(err)
    {
      console.log(err);
      console.log(err.response);
      if (err.response) {
        NotificationManager.error(err.response.data.message, "Error occured", 3000, null, null, "");
      }
    }
    setIsLoading(false);
  };
  const updateAction = async (action,id) =>{
    if(action ==="activate")
    {
      toggleStatusSingle(id,true);
    }
    if(action ==="deactivate")
    {
      toggleStatusSingle(id,false);
    }
    if(action ==="featured")
    {
      featuredSingle(id,true);
    }
    if(action ==="notfeatured")
    {
      featuredSingle(id,false);
    }
    if(action ==="view")
    {
      history.push(`${adminRoot}/chef/view/?p=`+id);
    }
  }
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedPageSize, selectedOrderOption, search]);
  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, [selectedPageSize, currentPage, selectedOrderOption, search]);
  useEffect(async () => {
    try {
      let { data } = await api.get(axiosURLS.CHEF_TYPES_ALL);
      setChefTypes(data);
    } catch (err) {
      NotificationManager.error(`Some error occured`, "Chef Types Error", 3000, null, null, "");
    }
  }, []);
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.list" match={match} />
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
              <DropdownItem onClick={showDeleteAlert}>
                <IntlMessages id="pages.delete" />
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  setStatusSelected(true);
                }}
              >
                <IntlMessages id="pages.activate" />
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  setStatusSelected(false);
                }}
              >
                <IntlMessages id="pages.deactivate" />
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
          <Button
            color="primary"
            size="lg"
            className="top-left-button ml-3"
            onClick={() => {
              setSearch("");
            }}
          >
            <IntlMessages id="pages.clear_search" />
          </Button>
          <div className="text-zero top-right-button-container">
            <Button
              color="primary"
              size="lg"
              className="top-right-button"
              onClick={() => {
                setModalFor("add");
                setModalOpen(!modalOpen);
              }}
            >
              <IntlMessages id="pages.add-new" />
            </Button>
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
            editSelected={editSelected}
            deleteSingle={deleteSingle}
            toggleStatusSingle={toggleStatusSingle}
            updateAction={updateAction}
          />
        </Colxx>
      </Row>
      <Addmodal
        modalOpen={modalOpen}
        toggleModal={() => setModalOpen(!modalOpen)}
        fetchData={fetchData}
        editformdata={formdata}
        modalFor={modalFor}
        chefTypes={chefTypes}
      />
      <Deletealert modalOpen={deleteAlert} toggleModal={() => setDeleteAlert(!deleteAlert)} setSureDelete={deleteSelected} />
    </>
  );
};
export default List;
