import React, { useState } from 'react';
import { Badge, Popover, PopoverBody } from 'reactstrap';

const PopoverItem = ({ id, item }) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  return (
    <span>
      <Badge
        className="m-1"
        color="primary"
        id={`popover_${id}`}
        onClick={() => setPopoverOpen(true)}
      >
        {item.text}
      </Badge>
      <Popover
        placement={item.placement}
        isOpen={popoverOpen}
        target={`popover_${id}`}
        toggle={() => setPopoverOpen(!popoverOpen)}
      >
        <PopoverBody>{item.body}</PopoverBody>
      </Popover>
    </span>
  );
};
export default PopoverItem;
