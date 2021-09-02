import React, { useState, useEffect } from "react";
import api from "helpers/api";
import * as axiosURLS from "helpers/endpoints";
import { connect } from "react-redux";
import Menupageheading from "./menupageheading";
import AddNewModal from "containers/pages/AddNewModal";
import Menupagelisting from "./menupagelisting";
import useMousetrap from "hooks/use-mousetrap";
import Menuadd from "./menuadd";
import { NotificationManager } from "components/common/react-notifications";
const getIndex = (value, arr, prop) => {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i][prop] === value) {
      return i;
    }
  }
  return -1;
};

const orderOptions = [
  { column: "name", label: "Name" },
  { column: "chef_type", label: "Chef Type" },
];
const pageSizes = [4, 8, 12, 20];

const categories = [
  { label: "Cakes", value: "Cakes", key: 0 },
  { label: "Cupcakes", value: "Cupcakes", key: 1 },
  { label: "Desserts", value: "Desserts", key: 2 },
];

const Menu = ({ currentUser, chefTypes, id }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [displayMode, setDisplayMode] = useState("imagelist");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(8);
  const [selectedOrderOption, setSelectedOrderOption] = useState({
    column: "name",
    label: "Name",
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [items, setItems] = useState([]);
  const [lastChecked, setLastChecked] = useState(null);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedPageSize, selectedOrderOption]);

  const fetchData = async () => {
    if (id !== "") {
      let params = { limit: selectedPageSize, page: currentPage, sortBy: selectedOrderOption.column + ":asc" };
      try {
        let { data } = await api.get(axiosURLS.USER_MENUS + "/" + id, { params: params });
        setTotalPage(data.totalPages);
        setItems(data.results);
        setSelectedItems([]);
        setTotalItemCount(data.totalResults);
        setIsLoaded(true);
      } catch (err) {
        console.log(err);
        console.log(err.response);
        if (err.response) {
          NotificationManager.error(err.response.data.message, "Error occured", 3000, null, null, "");
        }
      }
    }
  };
  useEffect(() => {
    fetchData();
  }, [selectedPageSize, currentPage, selectedOrderOption, search, id]);

  const onCheckItem = (event, id) => {
    if (event.target.tagName === "A" || (event.target.parentElement && event.target.parentElement.tagName === "A")) {
      return true;
    }
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

  const onContextMenuClick = (e, data) => {
    console.log("onContextMenuClick - selected items", selectedItems);
    console.log("onContextMenuClick - action : ", data.action);
  };

  const onContextMenu = (e, data) => {
    const clickedProductId = data.data;
    if (!selectedItems.includes(clickedProductId)) {
      setSelectedItems([clickedProductId]);
    }

    return true;
  };
  const handleAction = (action) =>{
    console.log(action);
  }
  useMousetrap(["ctrl+a", "command+a"], () => {
    handleChangeSelectAll(false);
  });

  useMousetrap(["ctrl+d", "command+d"], () => {
    setSelectedItems([]);
    return false;
  });

  const startIndex = (currentPage - 1) * selectedPageSize;
  const endIndex = currentPage * selectedPageSize;

  return !isLoaded ? (
    <div className="loading" />
  ) : (
    <>
      <div className="disable-text-selection">
        <Menupageheading
          heading="menu.data-list"
          
          handleChangeSelectAll={handleChangeSelectAll}
          changeOrderBy={(column) => {
            setSelectedOrderOption(orderOptions.find((x) => x.column === column));
          }}
          changePageSize={setSelectedPageSize}
          selectedPageSize={selectedPageSize}
          totalItemCount={totalItemCount}
          selectedOrderOption={selectedOrderOption}
          startIndex={startIndex}
          endIndex={endIndex}
          selectedItemsLength={selectedItems ? selectedItems.length : 0}
          itemsLength={items ? items.length : 0}
          onSearchKey={(e) => {
            if (e.key === "Enter") {
              setSearch(e.target.value.toLowerCase());
            }
          }}
          orderOptions={orderOptions}
          pageSizes={pageSizes}
          handleAction={handleAction}
          toggleModal={() => setModalOpen(!modalOpen)}
        />
        <Menuadd
          fetchData={fetchData}
          id={id}
          chefTypes={chefTypes}
          modalOpen={modalOpen}
          toggleModal={() => setModalOpen(!modalOpen)}
          categories={categories}
        />
        <Menupagelisting
          items={items}
          displayMode={displayMode}
          selectedItems={selectedItems}
          onCheckItem={onCheckItem}
          currentPage={currentPage}
          totalPage={totalPage}
          onContextMenuClick={onContextMenuClick}
          onContextMenu={onContextMenu}
          onChangePage={setCurrentPage}
        />
      </div>
    </>
  );
};

const mapStateToProps = ({ authUser }) => {
  const { currentUser } = authUser;
  return { currentUser };
};

export default connect(mapStateToProps)(Menu);
