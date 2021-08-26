import React, { useEffect, useState } from 'react';
import api from 'helpers/api';
import * as axiosURLS from 'helpers/endpoints';
import {
  Row,
  Button,
  ButtonDropdown,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  CustomInput,
  Collapse,
} from 'reactstrap';
import toast from 'react-hot-toast';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import Datatable from '../elements/Datatable';
import Addmodal from './cheftypes/Addmodal';
import Deletealert from './cheftypes/Deletealert';
const Cheftypes = ({ match }) => {
  const [isLoading ,setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(4);
  const [selectedOrderOption, setSelectedOrderOption] = useState({
    column: 'name',
    order: 'asc',

  });
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [items, setItems] = useState([]);
  const [lastChecked, setLastChecked] = useState(null);
  const [dropdownSplitOpen, setDropdownSplitOpen] = useState(false);

  const onCheckItem = (event, id) => {
    if (
      event.target.tagName === 'A' ||
      (event.target.parentElement && event.target.parentElement.tagName === 'A')
    ) {
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
      const start = getIndex(id, newItems, 'id');
      const end = getIndex(lastChecked, newItems, 'id');
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
  const deleteSelected = (res) => {
    setIsLoading(true);
    if (res) {
      selectedItems.map(async (item) => {
        await api.delete(axiosURLS.CHEF_TYPES + '/' + item);
      });
      setSelectedItems([]);
      fetchData();      
      toast.success('Chef Type Deleted successfully');
    }
    setIsLoading(false);
  };
  const showDeleteAlert = () => {
    if(selectedItems.length>0){
      setDeleteAlert(!deleteAlert);
    }    
  };
  const editSelected = () => {};
  const fetchData = async ()=> {
    api
      .get(axiosURLS.CHEF_TYPES, {
        params: {
          limit: selectedPageSize,
          page: currentPage,
          sortBy: selectedOrderOption.column + ':'+selectedOrderOption.order,
        },
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
  }
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedPageSize, selectedOrderOption]);
  useEffect(() => {
    setIsLoading(true);    
    fetchData();
  }, [selectedPageSize, currentPage, selectedOrderOption, search]);
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <div className="text-zero top-right-button-container">
            <Button
              color="primary"
              size="lg"
              className="top-right-button"
              onClick={() => setModalOpen(!modalOpen)}
            >
              <IntlMessages id="pages.add-new" />
            </Button>

            <ButtonDropdown
              isOpen={dropdownSplitOpen}
              toggle={() => setDropdownSplitOpen(!dropdownSplitOpen)}
            >
              <div className="btn btn-primary btn-lg pl-4 pr-0 check-button check-all">
                <CustomInput
                  className="custom-checkbox mb-0 d-inline-block"
                  type="checkbox"
                  id="checkAll"
                  checked={selectedItems.length >= items.length}
                  onChange={() => handleChangeSelectAll(true)}
                  label={
                    <span
                      className={`custom-control-label ${
                        selectedItems.length > 0 &&
                        selectedItems.length < items.length
                          ? 'indeterminate'
                          : ''
                      }`}
                    />
                  }
                />
              </div>
              <DropdownToggle
                caret
                color="primary"
                className="dropdown-toggle-split btn-lg"
              />
              <DropdownMenu right>
                <DropdownItem onClick={showDeleteAlert}>
                  <IntlMessages id="pages.delete" />
                </DropdownItem>
                <DropdownItem>
                  <IntlMessages onClick={editSelected} id="pages.edit" />
                </DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </div>
          <Breadcrumb heading="menu.chef_types" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12">
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
          />
        </Colxx>
      </Row>
      <Addmodal
        modalOpen={modalOpen}
        toggleModal={() => setModalOpen(!modalOpen)}
        fetchData={fetchData}
      />
      <Deletealert
        modalOpen={deleteAlert}
        toggleModal={() => setDeleteAlert(!deleteAlert)}
        setSureDelete={deleteSelected}
      />
    </>
  );
};
export default Cheftypes;
