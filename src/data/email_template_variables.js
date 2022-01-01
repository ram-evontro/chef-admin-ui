import * as tagvariables from './tagvariables';
const emailTemplateVariables = 
  {
    user_subscribe:[...tagvariables.common],
    user_email_verify:[...tagvariables.common],
    order_paid_virtual_dining_host:[...tagvariables.common,...tagvariables.order],
    order_paid_virtual_dining_host_also_diner:[...tagvariables.common,...tagvariables.order],
    order_placed_chefs_table:[...tagvariables.common,...tagvariables.order],
    order_paid_chefs_table:[...tagvariables.common,...tagvariables.order] ,
    order_reminder_virtual_dining_host:[...tagvariables.common,...tagvariables.order],
    order_reminder_chefs_table:[...tagvariables.common,...tagvariables.order],
    order_completed_virtual_dining_host:[...tagvariables.common,...tagvariables.order],
    order_completed_chefs_table:[...tagvariables.common,...tagvariables.order],
    order_feedback_virtual_dining_host:[...tagvariables.common,...tagvariables.order],
    order_feedback_chefs_table:[...tagvariables.common,...tagvariables.order],
    number_verify_otp:[...tagvariables.otp],
    order_placed_vd_forchef:[...tagvariables.common,...tagvariables.order,...tagvariables.selected_menu,...tagvariables.chef],
    order_placed_ct_forchef:[...tagvariables.common,...tagvariables.order,...tagvariables.chef],
    order_reminder_ct_forchef:[...tagvariables.common,...tagvariables.order,...tagvariables.chef],
    order_reminder_vd_forchef:[...tagvariables.common,...tagvariables.order,...tagvariables.chef],
    chef_chosen:[...tagvariables.common,...tagvariables.order,...tagvariables.chef],
    order_placed_vdx_foradmin:[...tagvariables.common,...tagvariables.order],
    order_placed_pdx_foradmin:[...tagvariables.common,...tagvariables.order],
    order_placed_tdx_foradmin:[...tagvariables.common,...tagvariables.order],
    order_paid_chef_event_host:[...tagvariables.common,...tagvariables.order,...tagvariables.event],
    order_paid_chef_event_host_also_diner:[...tagvariables.common,...tagvariables.order,...tagvariables.event],
    order_reminder_chef_event_host:[...tagvariables.common,...tagvariables.order,...tagvariables.event],
    order_completed_chef_event_host:[...tagvariables.common,...tagvariables.order,...tagvariables.event],
    order_feedback_chef_event_host:[...tagvariables.common,...tagvariables.order,...tagvariables.event,...tagvariables.feedback],
    chef_joinrequest_foruser:[...tagvariables.common,...tagvariables.joinRequest],
    chef_joinrequest_foradmin:[...tagvariables.common,...tagvariables.joinRequest]
  };

export default emailTemplateVariables;
