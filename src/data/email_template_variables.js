import * as tagvariables from './tagvariables';
const emailTemplateVariables = 
  {
    user_subscribe:[...tagvariables.common],
    order_placed_virtual_dining_host:[...tagvariables.common,...tagvariables.order],
    order_placed_virtual_dining_diner:[...tagvariables.common,...tagvariables.order] ,
    order_placed_chefs_table:[...tagvariables.common,...tagvariables.order],
    order_paid_host:[...tagvariables.common,...tagvariables.order] ,
    order_reminder_virtual_dining_host:[...tagvariables.common,...tagvariables.order],
    order_reminder_chefs_table:[...tagvariables.common,...tagvariables.order],
    order_completed_virtual_dining_host:[...tagvariables.common,...tagvariables.order],
    order_completed_chefs_table:[...tagvariables.common,...tagvariables.order],
    order_feedback_virtual_dining_host:[...tagvariables.common,...tagvariables.order],
    order_feedback_chefs_table:[...tagvariables.common,...tagvariables.order],
    number_verify_otp:[...tagvariables.otp],
  };

export default emailTemplateVariables;
