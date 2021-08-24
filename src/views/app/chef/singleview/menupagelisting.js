import React from 'react';
import { Row } from 'reactstrap';
import Pagination from 'containers/pages/ContextMenuContainer';
import ContextMenuContainer from 'containers/pages/ContextMenuContainer';
import ImageListView from './ImageListView';

function collect(props) {
  return { data: props.data };
}

const Menupagelisting = ({
  items,
  displayMode,
  selectedItems,
  onCheckItem,
  currentPage,
  totalPage,
  onContextMenuClick,
  onContextMenu,
  onChangePage,
}) => {
  return (
    <Row>
      {items.map((menu) => {

          return (
            <ImageListView
              key={menu.id}
              menu={menu}
              isSelect={selectedItems.includes(menu.id)}
              collect={collect}
              onCheckItem={onCheckItem}
            />
          );     
      })}
      <p>Pagination</p>
      <Pagination
        currentPage={currentPage}
        totalPage={totalPage}
        onChangePage={(i) => onChangePage(i)}
      />
    </Row>
  );
};

export default React.memo(Menupagelisting);
