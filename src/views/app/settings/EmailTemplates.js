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
import Datatable from './emailtemplates/Datatable';
import Addmodal from './emailtemplates/Addmodal';
import Previewmodal from './emailtemplates/Previewmodal';
import Deletealert from '../elements/Deletealert';
const EmailTemplates = ({ match }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(4);
  const [selectedOrderOption, setSelectedOrderOption] = useState({
    column: 'name',
    order: 'asc',
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [preview, setPreview] = useState(false);
  const [bodyHtml, setBodyHtml] = useState(false);
  const [modalFor, setModalFor] = useState('');
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [formdata, setFormdata] = useState({});
  const [items, setItems] = useState([]);
  const [lastChecked, setLastChecked] = useState(null);
  const [dropdownSplitOpen, setDropdownSplitOpen] = useState(false);
  const onCheckItem = (event, id) => {
    // if (
    //   event.target.tagName === 'A' ||
    //   (event.target.parentElement && event.target.parentElement.tagName === 'A')
    // ) {
    //   return true;
    // }
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
  const deleteSelected = async (res) => {
    setIsLoading(true);
    if (res) {
      await Promise.all(
        selectedItems.map(async (item) => {
          await api.delete(axiosURLS.EMAIL_TEMPLATES + '/' + item);
        })
      );
      setSelectedItems([]);
      fetchData();
      toast.success('Email Template Deleted successfully');
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
    setModalFor('edit');
    setFormdata(data);
    setModalOpen(!modalOpen);
  };
  const fetchData = async () => {
    let senddata = {
      limit: selectedPageSize,
      page: currentPage,
      sortBy: selectedOrderOption.column + ':' + selectedOrderOption.order,
    };
    if (search && search != '') {
      senddata['code'] = search;
    }
    api
      .get(axiosURLS.EMAIL_TEMPLATES, {
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

  const previewTemplate = (html) =>{
    setBodyHtml(html);
    setPreview(!preview);
  }

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
          <Breadcrumb heading="menu.email_templates" match={match} />
          <Separator className="mb-1" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12">
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
            </DropdownMenu>
          </ButtonDropdown>
          <div className="search-sm d-inline-block  ml-1 mb-1 ">
            <input
              type="text"
              name="keyword"
              id="search"
              placeholder={'Search'}
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
              setSearch('');
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
                setModalFor('add');
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
            previewTemplate={previewTemplate}
          />
        </Colxx>
      </Row>
      <Addmodal
        modalOpen={modalOpen}
        toggleModal={() => setModalOpen(!modalOpen)}
        fetchData={fetchData}
        editformdata={formdata}
        modalFor={modalFor}
      />
      <Deletealert
        modalOpen={deleteAlert}
        toggleModal={() => setDeleteAlert(!deleteAlert)}
        setSureDelete={deleteSelected}
      />
      <Previewmodal
        modalOpen={preview}
        toggleModal={() => setPreview(!preview)}
        bodyHtml={bodyHtml}
      />
    </>
  );
};
export default EmailTemplates;
