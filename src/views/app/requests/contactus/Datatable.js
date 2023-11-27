/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-key */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/display-name */
import React, { useEffect } from "react";
import moment from "moment";
import { Badge, CustomInput } from "reactstrap";
import { useTable, usePagination, useSortBy, useFilters } from "react-table";
import classnames from "classnames";
import DatatablePagination from "../../elements/DataTablePagination";

const Table = ({
  columns,
  data,
  divided = false,
  currentPage,
  totalPage,
  onChangePage,
  selectedPageSize,
  isLoading,
  setSelectedPageSize,
  setSelectedOrderOption,
  selectedOrderOption,
}) => {
  let initial_state = {
    pageIndex: 0,
    pageSize: selectedPageSize,
    
  };
  if(selectedOrderOption.column)
  {
    initial_state['sortBy']= [
      {
        id: selectedOrderOption.column,
        desc: selectedOrderOption.order === "desc" ? true : false,
      },
    ];
  }
  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    page,
    setPageSize,
    state: { sortBy },
  } = useTable(
    {
      columns,
      data,
      initialState: initial_state
    },
    useFilters,
    useSortBy,
    usePagination
  );
  useEffect(() => {
    if (sortBy.length > 0 && (sortBy[0].id != selectedOrderOption.column || selectedOrderOption.order != (sortBy[0].desc ? "desc" : "asc"))) {
      let data = {};
      data["column"] = sortBy[0].id;
      data["order"] = sortBy[0].desc ? "desc" : "asc";
      setSelectedOrderOption(data);
    }

    console.log(sortBy);
  }, [sortBy]);
  return (
    <>
      <table
        {...getTableProps()}
        className={`r-table table table-responsive ${classnames({
          "table-divided": divided,
          "loading-table": isLoading,
        })}`}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, columnIndex) => (
                <th
                  key={`th_${columnIndex}`}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={column.isSorted ? (column.isSortedDesc ? "sorted-desc" : "sorted-asc") : ""}
                >
                  {column.render("Header")}
                  <span />
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell, cellIndex) => (
                  <td
                  style={{ userSelect: 'text', cursor: "default"}} 
                    key={`td_${cellIndex}`}
                    {...cell.getCellProps({
                      className: cell.column.cellClass,
                    })}
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <DatatablePagination
        page={currentPage - 1}
        pages={totalPage}
        canPrevious={currentPage > 1 ? true : false}
        canNext={currentPage < totalPage ? true : false}
        pageSizeOptions={[4, 10, 20, 30, 40, 50]}
        showPageSizeOptions={true}
        showPageJump={true}
        defaultPageSize={selectedPageSize}
        onPageChange={(p) => onChangePage(p + 1)}
        onPageSizeChange={(s) => {
          setSelectedPageSize(s);
          setPageSize(s);
        }}
        paginationMaxSize={10}
      />
    </>
  );
};

const Datatable = ({
  items,
  selectedItems,
  currentPage,
  totalPage,
  onChangePage,
  onCheckItem,
  selectedPageSize,
  isLoading,
  setSelectedPageSize,
  setSelectedOrderOption,
  selectedOrderOption,
  updateAction,
}) => {
  const editFunc = (data) => {
    let newData = { ...data };
    delete newData["Actions"];
    // editSelected(newData);
  };
  const cols = React.useMemo(
    () => [
      {
        Header: "Select",
        accessor: "id",
        cellClass: "  w-10",
        disableSortBy: true,
        Cell: (props) => (
          <>
            <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
              <CustomInput
                className="mb-0"
                type="checkbox"
                id={`check_${props.value}`}
                checked={selectedItems.includes(props.value)}
                onChange={(event) => onCheckItem(event, props.value)}
                label=""
              />
            </div>
          </>
        ),
      },
      {
        Header: "Name",
        accessor: "name",
        cellClass: "w-20",
        Cell: (props) => (
          <>
           
              {props.value}
           
          </>
        ),
      },
      {
        Header: "Email",
        accessor: "email",
        cellClass: "list-item-heading w-15",
        Cell: (props) => (
          <>
            {props.value.includes('@tempemail.com')?'NA':props.value}
           </>
        ),
      },
      {
        Header: "Phone",
        accessor: "mobile",
        cellClass: "text-muted  w-15",
        Cell: (props) => (
          <>
            {props.value}
          </>
        ),
      },
      {
        Header: "Message",
        accessor: "cover_letter",
        cellClass: "w-20",
        Cell: (props) => (
          <>
           
              {props.value}
           
          </>
        ),
      },
      {
        Header: "Date",
        accessor: "createdAt",
        cellClass: "w-20",
        Cell: (props) => (
          <>
           
              { moment(props.value).format('MMM DD, YYYY')}
           
          </>
        ),
      }
    ],
    [selectedItems]
  );
  return (
    <div className="mb-4">
      <Table
        currentPage={currentPage}
        totalPage={totalPage}
        onChangePage={onChangePage}
        columns={cols}
        selectedPageSize={selectedPageSize}
        data={items}
        isLoading={isLoading}
        setSelectedPageSize={setSelectedPageSize}
        setSelectedOrderOption={setSelectedOrderOption}
        selectedOrderOption={selectedOrderOption}
        divided
      />
    </div>
  );
};

export default Datatable;
