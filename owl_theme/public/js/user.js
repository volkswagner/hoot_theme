frappe.ui.form.on("User",  {
    refresh: function(frm) {
      frappe.call({
         method: "frappe.client.get",
         args: {
            doctype: "Owl Theme Settings",
            name: "Owl Theme Settings"
         },
         callback: function (r) {
            if (r.message && r.message.allow_user_customization) {
               frm.add_custom_button(
                  __("Choose Skin for Light Theme"),
                  function() {
                     frm.events.set_theme_skin(frm, "Light");
                  },
                  __("Edit Desk Appearance")
               );
               frm.add_custom_button(
                  __("Choose Skin for Dark Theme"),
                  function() {
                     frm.events.set_theme_skin(frm, "Dark");
                  },
                  __("Edit Desk Appearance")
               );
            }
         }
      })
    },

    set_theme_skin(frm, for_theme) {
      if ($("[data-theme]").attr("data-theme") != for_theme.toLowerCase()) {
         frappe.throw(__("You can only change the skin for the current theme. Change theme to customize {0} theme.", [for_theme]));
      }

      frappe.call({
         method: "owl_theme.owl_theme.doctype.hoot_skin.hoot_skin.get_skins_and_user_defaults",
         args: {
            user: frappe.session.user,
            for_theme: for_theme
         },
         callback: function (r) {
            if (r.message) {
               const skins = r.message.skins;
               skins.push({'name': "-", "color_popups": 1});
               const skin_names = skins.map(skin => skin.name);
               owl_theme_utils.create_stylesheet_preview();
               $(".main-section").addClass("skin-preview");

               let edit_appearance_dialog = new frappe.ui.Dialog({
                  title: __("Edit Desk Appearance"),
                  static: true,
                  fields: [
                     {
                        fieldtype: "HTML",
                        options: `<p>${__("Click the dropdown in the middle to select a theme. Click the 'Prev' and 'Next' buttons to thumb through the themes, or just press the left and right keys.")}</p>`
                     },
                     {
                        fieldtype: "Section Break",
                        fieldname: "skin_select_section"
                     },
                     {
                        fieldname: "prev_skin",
                        fieldtype: "Button",
                        label: "Prev",
                        click: function() {
                           prev_skin()
                        }
                     },
                     {
                        fieldtype: "Column Break"
                     },
                     {
                        fieldname: "skin",
                        fieldtype: "Select",
                        options: skin_names,
                        default: for_theme == "Light"? r.message.light_theme_default || "-": r.message.dark_theme_default || "-",
                        onchange: function() {
                           const selected_skin = edit_appearance_dialog.get_values().skin;
                           const skin_index = skin_names.indexOf(selected_skin);
                           const skin_data = skins[skin_index];

                           owl_theme_utils.create_stylesheet(skin_data, true);
                        }
                     },
                     {
                        fieldtype: "Column Break"
                     },
                     {
                        fieldname: "next_skin",
                        fieldtype: "Button",
                        label: "Next",
                        click: function() {
                           next_skin()
                        }
                     },
                     {
                        fieldtype: "Section Break"
                     },
                     {
                        fieldname: "reload_after_saving",
                        fieldtype: "Check",
                        label: "Reload desk after saving",
                        default: 1
                     }
                  ],
                  primary_action_label: __("Save Changes"),
                  primary_action: function (values) {
                     frappe.call({
                        method: "owl_theme.owl_theme.doctype.hoot_skin.hoot_skin.set_user_theme_settings",
                        args: {
                           user: frappe.session.user,
                           skin: values.skin,
                           for_theme: for_theme
                        },
                        callback: function (r) {
                           if (r.message && r.message == "success") {
                              frappe.msgprint({
                                 message: __("Changes saved")
                              });
                              owl_theme_utils.delete_stylesheets();
                              edit_appearance_dialog.hide();

                              if (values.reload_after_saving) frappe.ui.toolbar.clear_cache();
                           }
                        }
                     })
                  },
                  secondary_action_label: __("Cancel"),
                  secondary_action: function (values) {
                     $(".main-section").removeClass("skin-preview");
                     owl_theme_utils.delete_stylesheets();
                     edit_appearance_dialog.hide();
                  },
                  on_page_show: function () {
                     let cols = $(`[data-fieldname="skin_select_section"] .col-sm-4`);
                     
                     if (cols) {
                        cols.eq(0).removeClass("col-sm-4").addClass("col-sm-2");
                        cols.eq(1).removeClass("col-sm-4").addClass("col-sm-8");
                        cols.eq(1).find(".clearfix").remove();
                        cols.eq(1).find("select").css("text-align", "center");
                        cols.eq(2).removeClass("col-sm-4").addClass("col-sm-2");

                     }
                  }
               });

               function prev_skin() {
                  const selected_skin = edit_appearance_dialog.get_values().skin;
                  const skin_index_prev = skin_names.indexOf(selected_skin) - 1;
                  edit_appearance_dialog.set_value("skin", skin_names[skin_index_prev >= 0? skin_index_prev: skin_names.length - 1]);
               }

               function next_skin() {
                  const selected_skin = edit_appearance_dialog.get_values().skin;
                  const skin_index_next = skin_names.indexOf(selected_skin) + 1;
                  edit_appearance_dialog.set_value("skin", skin_names[skin_index_next < skin_names.length? skin_index_next: 0]);
               }
               
               edit_appearance_dialog.show();
               document.addEventListener('keydown', (event) => {
                  switch (event.code) {
                     case 'ArrowRight':
                        next_skin();
                        break;
                     case 'ArrowLeft':
                        prev_skin();
                        break;
                     default:
                           eturn;
                  }
                  event.preventDefault(); 
               });
            }
         }
      })
    }
});