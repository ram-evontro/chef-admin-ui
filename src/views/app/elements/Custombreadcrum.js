/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import IntlMessages from 'helpers/IntlMessages';
import { adminRoot } from 'constants/defaultValues';

const getMenuTitle = (sub) => {
  if (`/${sub}` === adminRoot) return <IntlMessages id="menu.home" />;
  return <IntlMessages id={`menu.${sub}`} />;
};

const getUrl = (path, sub) => {
  return path.split(sub)[0] + sub;
};

const Custombreadcrumb = ({ heading, match, append, appendname }) => {
  return (
    <>
      {heading && (
        <h1>
          <IntlMessages id={heading} />
        </h1>
      )}
      <BreadcrumbItems append={append} appendname={appendname} match={match} />
    </>
  );
};

const BreadcrumbItems = ({ append,appendname,match }) => {
  const path = match.path.substr(1);
  let paths = path.split('/');
  if (paths[paths.length - 1].indexOf(':') > -1) {
    paths = paths.filter((x) => x.indexOf(':') === -1);
  }
  return (
    <>
      <Breadcrumb className="pt-0 breadcrumb-container d-none d-sm-block d-lg-inline-block">
        {paths.map((sub, index) => {
          return (
            <BreadcrumbItem key={index} active={paths.length === index + 1}>
              {paths.length !== index + 1 ? (
                <NavLink to={`/${getUrl(path, sub, index)}`}>
                  {getMenuTitle(sub)}
                </NavLink>
              ) : (                
                  <NavLink to={`/${getUrl(path, paths[index-1], index)+append}`}>
                    {appendname}
                  </NavLink>
              )}
            </BreadcrumbItem>
          );
        })}
      </Breadcrumb>
    </>
  );
};

export default Custombreadcrumb;
