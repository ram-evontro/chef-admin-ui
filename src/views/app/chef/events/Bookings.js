/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/display-name */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from "react";
import { useTable, usePagination, useSortBy } from "react-table";
import DatatablePagination from "components/DatatablePagination";
import { NavLink } from "react-router-dom";
import { adminRoot } from "constants/defaultValues";
function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        pageSize: 10,
        sortBy: [
          {
            id: "total_orders",
            desc: true,
          },
        ],
      },
    },
    useSortBy,
    usePagination
  );

  return (
    <>
      <table {...getTableProps()} className="r-table table table-responsive table-divided">
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
        page={pageIndex}
        pages={pageCount}
        canPrevious={canPreviousPage}
        canNext={canNextPage}
        pageSizeOptions={[4, 10, 20, 30, 40, 50]}
        showPageSizeOptions={false}
        showPageJump={false}
        defaultPageSize={pageSize}
        onPageChange={(p) => gotoPage(p)}
        onPageSizeChange={(s) => setPageSize(s)}
        paginationMaxSize={pageCount}
      />
    </>
  );
}

const Bookings = ({ diners }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    if (diners) {
      let tempdata = [];
      diners.map((diner) => {
        let row = {
          name: diner.user.name,
          mobile: diner.user.mobile,
          date: diner.date,
          hostname: diner.hostname,
          hostmobile: diner.hostmobile,
          booking_id: diner.booking_id,
          order_number: diner.order_number,
        };
        row["meal_type"] = diner.meal_type ? diner.meal_type : "NA";
        row["allergen"] = diner.allergen.length > 0 ? diner.allergen.join(",") : "NA";
        tempdata.push(row);
      });
      setData(tempdata);
    }
  }, [diners]);
  const cols = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        cellClass: "text-muted w-10",
        Cell: (props) => <>{props.value}</>,
        sortType: "basic",
      },
      {
        Header: "Mobile",
        accessor: "mobile",
        cellClass: "text-muted w-10",
        Cell: (props) => <>{props.value}</>,
        sortType: "basic",
      },
      {
        Header: "Date",
        accessor: "date",
        cellClass: "text-muted w-10",
        Cell: (props) => <>{props.value}</>,
        sortType: "basic",
      },
      {
        Header: "Meal Type",
        accessor: "meal_type",
        cellClass: "text-muted w-10",
        Cell: (props) => <>{props.value}</>,
        sortType: "basic",
      },
      {
        Header: "Allergen",
        accessor: "allergen",
        cellClass: "text-muted w-10",
        Cell: (props) => <>{props.value}</>,
        sortType: "basic",
      },
      {
        Header: "Host Name",
        accessor: "hostname",
        cellClass: "text-muted w-10",
        Cell: (props) => <>{props.value}</>,
        sortType: "basic",
      },
      {
        Header: "Host Mobile",
        accessor: "hostmobile",
        cellClass: "text-muted w-10",
        Cell: (props) => <>{props.value}</>,
        sortType: "basic",
      },
      {
        Header: "Order No",
        accessor: "order_number",
        cellClass: "text-muted w-20",
        Cell: (props) => <> <NavLink location={{}} to={`${adminRoot}/booking/view/?b=${props.row.original.booking_id}`}>{props.value}</NavLink></>,
        sortType: "basic",
      },
    ],
    []
  );

  return (
    <div className="mb-4">
      <Table columns={cols} data={data} />
    </div>
  );
};

export default Bookings;
