import * as tagvariables from './tagvariables';
const smsTemplateVariables = 
  {
    number_verify_otp:[...tagvariables.otp],
    order_paid_virtual_dining_host:[...tagvariables.common,...tagvariables.order],
    order_paid_virtual_dining_host_also_diner:[...tagvariables.common,...tagvariables.order],
    order_paid_virtual_dining_diner:[...tagvariables.common,...tagvariables.order,...tagvariables.diner] ,
    order_paid_virtual_dining_diner_common_menu:[...tagvariables.common,...tagvariables.order,...tagvariables.diner,...tagvariables.orderCommonMenu] ,
    details_filled_virtual_dining_diner:[...tagvariables.common,...tagvariables.order,...tagvariables.diner] ,
    order_placed_chefs_table:[...tagvariables.common,...tagvariables.order],
    order_paid_chefs_table:[...tagvariables.common,...tagvariables.order] ,
    order_details_submitted_diner:[...tagvariables.common,...tagvariables.order] ,
    order_reminder_virtual_dining_host:[...tagvariables.common,...tagvariables.order,...tagvariables.selected_menu],
    order_reminder_virtual_dining_diner:[...tagvariables.common,...tagvariables.order,...tagvariables.selected_menu,...tagvariables.diner] ,
    order_reminder_chefs_table:[...tagvariables.common,...tagvariables.order,...tagvariables.chosenChef],
    order_completed_virtual_dining_host:[...tagvariables.common,...tagvariables.order],
    order_completed_virtual_dining_diner:[...tagvariables.common,...tagvariables.order,...tagvariables.diner,...tagvariables.selected_menu] ,
    order_completed_chefs_table:[...tagvariables.common,...tagvariables.order],
    order_feedback_virtual_dining_host:[...tagvariables.common,...tagvariables.order,...tagvariables.feedback,...tagvariables.selected_menu],
    order_feedback_virtual_dining_diner:[...tagvariables.common,...tagvariables.order,...tagvariables.feedback,...tagvariables.diner,...tagvariables.selected_menu] ,
    order_feedback_chefs_table:[...tagvariables.common,...tagvariables.order,...tagvariables.feedback,...tagvariables.chosenChef],
    order_placed_vd_forchef:[...tagvariables.common,...tagvariables.order,...tagvariables.selected_menu,...tagvariables.chef],
    chef_chosen:[...tagvariables.common,...tagvariables.order,...tagvariables.chef],
    order_placed_foradmin:[...tagvariables.common,...tagvariables.order],
    order_paid_chef_event_host:[...tagvariables.common,...tagvariables.order,...tagvariables.event],
    order_paid_chef_event_host_also_diner:[...tagvariables.common,...tagvariables.order,...tagvariables.event],
    order_paid_chef_event_diner:[...tagvariables.common,...tagvariables.order,...tagvariables.event,...tagvariables.diner] ,
    order_reminder_chef_event_host:[...tagvariables.common,...tagvariables.order,...tagvariables.event],
    order_reminder_chef_event_diner:[...tagvariables.common,...tagvariables.order,...tagvariables.event,...tagvariables.diner] ,
    order_completed_chef_event_host:[...tagvariables.common,...tagvariables.order,...tagvariables.event],
    order_completed_chef_event_diner:[...tagvariables.common,...tagvariables.order,...tagvariables.event,...tagvariables.diner] ,
    order_feedback_chef_event_host:[...tagvariables.common,...tagvariables.order,...tagvariables.event,...tagvariables.feedback],
    order_feedback_chef_event_diner:[...tagvariables.common,...tagvariables.order,...tagvariables.event,...tagvariables.feedback,...tagvariables.diner] ,
    chef_joinrequest_foruser:[...tagvariables.common,...tagvariables.joinRequest]
  };

export default smsTemplateVariables;
