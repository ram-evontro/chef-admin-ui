import React from "react";
import { NavLink } from "react-router-dom";
import { injectIntl } from "react-intl";
import moment from "moment";

const Logcard = ({ intl, className, data,handleDelete }) => {
  return (
    <div className={`d-flex flex-row mb-3 border-bottom justify-content-between ${className}`}>
      <div className="pl-3 flex-grow-1">
        <p className="font-weight-medium mb-0">{data.message}</p>
        <p className="text-muted mb-0 text-small">{moment(data.date).format("MMM,D Y")}</p>
       </div>
      <div className="comment-likes">
        <span className="post-icon">
          <a
            href="javascript:;"
            onClick={() => {
              handleDelete(data._id);
            }}
          >
            <i className="simple-icon-trash ml-2" />
          </a>
        </span>
      </div>
    </div>
  );
};

export default injectIntl(Logcard);
