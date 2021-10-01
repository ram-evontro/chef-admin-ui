import * as tagvariables from './tagvariables';
const smsTemplateVariables = 
  {
    number_verify_otp:[...tagvariables.otp],
    order_paid_virtual_dining_host:[...tagvariables.common,...tagvariables.order],
    order_paid_virtual_dining_host_also_diner:[...tagvariables.common,...tagvariables.order],
    order_paid_virtual_dining_diner:[...tagvariables.common,...tagvariables.order,...tagvariables.diner] ,
    order_placed_chefs_table:[...tagvariables.common,...tagvariables.order],
    order_paid_chefs_table:[...tagvariables.common,...tagvariables.order] ,
    order_details_submitted_diner:[...tagvariables.common,...tagvariables.order] ,
    order_reminder_virtual_dining_host:[...tagvariables.common,...tagvariables.order],
    order_reminder_virtual_dining_diner:[...tagvariables.common,...tagvariables.order] ,
    order_reminder_chefs_table:[...tagvariables.common,...tagvariables.order],
    order_completed_virtual_dining_host:[...tagvariables.common,...tagvariables.order],
    order_completed_virtual_dining_diner:[...tagvariables.common,...tagvariables.order] ,
    order_completed_chefs_table:[...tagvariables.common,...tagvariables.order],
    order_feedback_virtual_dining_host:[...tagvariables.common,...tagvariables.order,...tagvariables.feedback],
    order_feedback_virtual_dining_diner:[...tagvariables.common,...tagvariables.order,...tagvariables.feedback,...tagvariables.diner] ,
    order_feedback_chefs_table:[...tagvariables.common,...tagvariables.order,...tagvariables.feedback],
  };

export default smsTemplateVariables;
