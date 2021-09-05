import React from 'react';
import { NavLink } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import moment from 'moment';

const Logcard = ({ intl, className, data }) => {
  const getLikeLabel = (likeCount) => {
    if (likeCount === 1) {
      return intl.messages['pages.like'];
    }
    return intl.messages['pages.likes'];
  };

  return (
    <div
      className={`d-flex flex-row mb-3 border-bottom justify-content-between ${className}`}
    >

      <div className="pl-3 flex-grow-1">
        <NavLink to="#" location={{}}>
          <p className="font-weight-medium mb-0">{moment(data.date).format('MMM,D Y')}</p>
          <p className="text-muted mb-0 text-small">{data.message}</p>
        </NavLink>
        <p className="mt-3">{data.detail}</p>
      </div>
      <div className="comment-likes">
        <span className="post-icon">
          <NavLink to="#" location={{}}>
            <i className="simple-icon-trash ml-2" />
          </NavLink>
        </span>
      </div>
    </div>
  );
};

export default injectIntl(Logcard);
