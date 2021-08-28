const smsTemplateVariables = 
  {
    order_placed_virtual_dining_host: [
      { key: 1, title: 'Order Number', val: '{bookings.order_number}' },
      { key: 2, title: 'Host Name', val: '{bookings.user.name}' },
      { key: 3, title: 'Host Phone', val: '{bookings.user.phone}' },
      { key: 4, title: 'Order Total', val: '{bookings.total}' },
    ],
    order_placed_virtual_dining_diner: [
      { key: 1, title: 'Order Number', val: '{bookings.order_number}' },
      { key: 2, title: 'Host Name', val: '{bookings.user.name}' },
      { key: 3, title: 'Host Phone', val: '{bookings.user.phone}' },
      { key: 4, title: 'Order Total', val: '{bookings.total}' },
      { key: 4, title: 'Order Link', val: '{bookings.order_link}' },
    ],
    order_placed_chefs_table: [
      { key: 1, title: 'Order Number', val: '{bookings.order_number}' },
      { key: 2, title: 'Host Name', val: '{bookings.user.name}' },
      { key: 3, title: 'Host Phone', val: '{bookings.user.phone}' },
      { key: 4, title: 'Order Total', val: '{bookings.total}' },
    ],
    order_paid_host: [
      { key: 1, title: 'Order Number', val: '{bookings.order_number}' },
      { key: 2, title: 'Host Name', val: '{bookings.user.name}' },
      { key: 3, title: 'Host Phone', val: '{bookings.user.phone}' },
      { key: 4, title: 'Order Total', val: '{bookings.total}' },
      { key: 4, title: 'Order Link', val: '{bookings.order_link}' },
    ],
    order_paid_diner: [
      { key: 1, title: 'Order Number', val: '{bookings.order_number}' },
      { key: 2, title: 'Host Name', val: '{bookings.user.name}' },
      { key: 3, title: 'Host Phone', val: '{bookings.user.phone}' },
      { key: 4, title: 'Order Total', val: '{bookings.total}' },
      { key: 4, title: 'Order Link', val: '{bookings.order_link}' },
    ],
    order_details_submitted_diner: [
      { key: 1, title: 'Order Number', val: '{bookings.order_number}' },
      { key: 2, title: 'Host Name', val: '{bookings.user.name}' },
      { key: 3, title: 'Host Phone', val: '{bookings.user.phone}' },
      { key: 4, title: 'Order Total', val: '{bookings.total}' },
      { key: 4, title: 'Order Link', val: '{bookings.order_link}' },
    ],
    order_reminder_virtual_dining_host: [
      { key: 1, title: 'Order Number', val: '{bookings.order_number}' },
      { key: 2, title: 'Host Name', val: '{bookings.user.name}' },
      { key: 3, title: 'Host Phone', val: '{bookings.user.phone}' },
      { key: 4, title: 'Order Total', val: '{bookings.total}' },
    ],
    order_reminder_virtual_dining_diner: [
      { key: 1, title: 'Order Number', val: '{bookings.order_number}' },
      { key: 2, title: 'Host Name', val: '{bookings.user.name}' },
      { key: 3, title: 'Host Phone', val: '{bookings.user.phone}' },
      { key: 4, title: 'Order Total', val: '{bookings.total}' },
      { key: 4, title: 'Order Link', val: '{bookings.order_link}' },
    ],
    order_reminder_chefs_table: [
      { key: 1, title: 'Order Number', val: '{bookings.order_number}' },
      { key: 2, title: 'Host Name', val: '{bookings.user.name}' },
      { key: 3, title: 'Host Phone', val: '{bookings.user.phone}' },
      { key: 4, title: 'Order Total', val: '{bookings.total}' },
    ],
    order_completed_virtual_dining_host: [
      { key: 1, title: 'Order Number', val: '{bookings.order_number}' },
      { key: 2, title: 'Host Name', val: '{bookings.user.name}' },
      { key: 3, title: 'Host Phone', val: '{bookings.user.phone}' },
      { key: 4, title: 'Order Total', val: '{bookings.total}' },
    ],
    order_completed_virtual_dining_diner: [
      { key: 1, title: 'Order Number', val: '{bookings.order_number}' },
      { key: 2, title: 'Host Name', val: '{bookings.user.name}' },
      { key: 3, title: 'Host Phone', val: '{bookings.user.phone}' },
      { key: 4, title: 'Order Total', val: '{bookings.total}' },
      { key: 4, title: 'Order Link', val: '{bookings.order_link}' },
    ],
    order_completed_chefs_table: [
      { key: 1, title: 'Order Number', val: '{bookings.order_number}' },
      { key: 2, title: 'Host Name', val: '{bookings.user.name}' },
      { key: 3, title: 'Host Phone', val: '{bookings.user.phone}' },
      { key: 4, title: 'Order Total', val: '{bookings.total}' },
    ],
    order_feedback_virtual_dining_host: [
      { key: 1, title: 'Order Number', val: '{bookings.order_number}' },
      { key: 2, title: 'Host Name', val: '{bookings.user.name}' },
      { key: 3, title: 'Host Phone', val: '{bookings.user.phone}' },
      { key: 4, title: 'Order Total', val: '{bookings.total}' },
    ],
    order_feedback_virtual_dining_diner: [
      { key: 1, title: 'Order Number', val: '{bookings.order_number}' },
      { key: 2, title: 'Host Name', val: '{bookings.user.name}' },
      { key: 3, title: 'Host Phone', val: '{bookings.user.phone}' },
      { key: 4, title: 'Order Total', val: '{bookings.total}' },
      { key: 4, title: 'Order Link', val: '{bookings.order_link}' },
    ],
    order_feedback_chefs_table: [
      { key: 1, title: 'Order Number', val: '{bookings.order_number}' },
      { key: 2, title: 'Host Name', val: '{bookings.user.name}' },
      { key: 3, title: 'Host Phone', val: '{bookings.user.phone}' },
      { key: 4, title: 'Order Total', val: '{bookings.total}' },
    ],
  };

export default smsTemplateVariables;
