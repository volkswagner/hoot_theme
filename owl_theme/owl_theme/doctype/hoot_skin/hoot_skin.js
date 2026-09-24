// Copyright (c) 2025, tahirzaqout and contributors
// For license information, please see license.txt

const theme_bg = { 'light': "white", 'dark': "var(--gray-900)" };
const theme_color = { 'light': "var(--gray-800)", 'dark': "white"};
const system_theme = $("[data-theme]").attr("data-theme");

let for_theme = null;
let default_skin = null;
let get_background_color, get_background_button, get_foreground, get_text_color, get_scrollbar_color;

frappe.ui.form.on("Hoot Skin", {
   onload(frm) {
      get_text_color = owl_theme_utils.get_text_color;
      get_background_color = owl_theme_utils.get_background_color;
      get_background_button = owl_theme_utils.get_background_button;
      get_foreground = owl_theme_utils.get_foreground;
      get_scrollbar_color = owl_theme_utils.get_scrollbar_color;
      lighten_color = owl_theme_utils.lighten_color;
   },

	refresh(frm) {
      for_theme = frm.doc.for_theme.toLocaleLowerCase();
      frm.events.inject_css(frm);
      frm.events.add_default_logic(frm);
      frm.events.add_set_skin_button(frm);
      frm.events.add_clear_fields_button(frm);

      frm.events.set_buttons_preview(frm);
      frm.events.set_app_preview(frm);
      frm.events.set_website_preview(frm);
      frm.events.set_additional_color_checkboxes(frm);
	},

   add_default_logic(frm) {
      if (frm.doc.default) {
         frm.set_df_property("enabled", "read_only", 1);
      }
   },

   inject_css(frm) {
      frappe.dom.set_style(`
         .pe-none * {
            pointer-events: none;
         }
         .square {
            aspect-ratio: 1 / 1;
         }
         .border-transparent {
            border: 1px solid #0000000d !important;
         }
         .border-transparent.border-2 {
            border-width: 2px !important;
         }
         .overflow-scroll {
            overflow-y: scroll !important;
         }

         #login-page {
            background-color: var(--bg-light-gray);
            padding: 30px 20px;
         }

         #login-page {
         

         .page-card-head {
            margin: 0 auto;
            text-align: center;
            font-size: var(--text-xl);
            font-weight: 600;
         }

         .page-card-head h4 {
            margin-top: 1rem;
            font-size: var(--text-xl);
            font-weight: var(--weight-semibold);
            letter-spacing: .01em;
            color: #383838;
         }

            
         .for-login .page-card, .for-forgot .page-card, .for-login-with-email-link .page-card, .for-signup .page-card, .for-email-login .page-card {
            overflow: hidden;
            background-color: #fff;
            max-width: 400px;
            margin: 0 auto;
            border-radius: var(--border-radius-md);
            border: 1px solid var(--border-color);
         }

         .for-login .page-card .page-card-actions, .for-forgot .page-card .page-card-actions, .for-login-with-email-link .page-card .page-card-actions, .for-signup .page-card .page-card-actions, .for-email-login .page-card .page-card-actions {
            margin-top: var(--margin-lg);
         }

         .for-login .page-card .page-card-body .social-logins, .for-forgot .page-card .page-card-body .social-logins, .for-login-with-email-link .page-card .page-card-body .social-logins, .for-signup .page-card .page-card-body .social-logins, .for-email-login .page-card .page-card-body .social-logins {
            margin-top: var(--margin-md);
            font-size: var(--text-base);
            font-weight: var(--weight-regular);
            letter-spacing: .02em;
         }

         .for-login .page-card form .form-group, .for-forgot .page-card form .form-group, .for-login-with-email-link .page-card form .form-group, .for-signup .page-card form .form-group, .for-email-login .page-card form .form-group {
            margin-bottom: var(--margin-sm);
         }

         .for-login .page-card .page-card-body .forgot-password-message, .for-forgot .page-card .page-card-body .forgot-password-message, .for-login-with-email-link .page-card .page-card-body .forgot-password-message, .for-signup .page-card .page-card-body .forgot-password-message, .for-email-login .page-card .page-card-body .forgot-password-message {
            text-align: right;
            line-height: 1;
         }

         .for-login .page-card .page-card-body .forgot-password-message>*, .for-forgot .page-card .page-card-body .forgot-password-message>*, .for-login-with-email-link .page-card .page-card-body .forgot-password-message>*, .for-signup .page-card .page-card-body .forgot-password-message>*, .for-email-login .page-card .page-card-body .forgot-password-message>* {
            color: var(--text-light);
            font-size: var(--text-sm);
            font-weight: var(--weight-regular);
            letter-spacing: .02em;
         }

         .for-login .page-card .page-card-body .form-label, .for-forgot .page-card .page-card-body .form-label, .for-login-with-email-link .page-card .page-card-body .form-label, .for-signup .page-card .page-card-body .form-label, .for-email-login .page-card .page-card-body .form-label {
            font-size: var(--text-base);
            font-weight: var(--weight-regular);
            letter-spacing: .02em;
         }
         .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
         }

         label {
            display: inline-block;
            margin-bottom: .5rem;
         }

         .for-login .page-card .page-card-body .email-field, .for-login .page-card .page-card-body .password-field, .for-forgot .page-card .page-card-body .email-field, .for-forgot .page-card .page-card-body .password-field, .for-login-with-email-link .page-card .page-card-body .email-field, .for-login-with-email-link .page-card .page-card-body .password-field, .for-signup .page-card .page-card-body .email-field, .for-signup .page-card .page-card-body .password-field, .for-email-login .page-card .page-card-body .email-field, .for-email-login .page-card .page-card-body .password-field {
            position: relative;
         }

         .for-login .page-card .page-card-body .email-field input, .for-login .page-card .page-card-body .password-field input, .for-forgot .page-card .page-card-body .email-field input, .for-forgot .page-card .page-card-body .password-field input, .for-login-with-email-link .page-card .page-card-body .email-field input, .for-login-with-email-link .page-card .page-card-body .password-field input, .for-signup .page-card .page-card-body .email-field input, .for-signup .page-card .page-card-body .password-field input, .for-email-login .page-card .page-card-body .email-field input, .for-email-login .page-card .page-card-body .password-field input {
            padding-left: 35px;
         }

         .for-login .page-card .page-card-body input[type=text], .for-login .page-card .page-card-body input[type=email], .for-login .page-card .page-card-body input[type=password], .for-forgot .page-card .page-card-body input[type=text], .for-forgot .page-card .page-card-body input[type=email], .for-forgot .page-card .page-card-body input[type=password], .for-login-with-email-link .page-card .page-card-body input[type=text], .for-login-with-email-link .page-card .page-card-body input[type=email], .for-login-with-email-link .page-card .page-card-body input[type=password], .for-signup .page-card .page-card-body input[type=text], .for-signup .page-card .page-card-body input[type=email], .for-signup .page-card .page-card-body input[type=password], .for-email-login .page-card .page-card-body input[type=text], .for-email-login .page-card .page-card-body input[type=email], .for-email-login .page-card .page-card-body input[type=password] {
            border: none;
            color: var(--text-color);
            font-size: var(--text-base);
            font-weight: var(--weight-regular);
            letter-spacing: .02em;
            background-color: var(--control-bg);
            margin-bottom: 1rem;
         }
            
         .form-control {
            display: block;
            width: 100%;
            height: 28px;
            padding: .375rem .75rem;
            font-size: 1rem;
            font-weight: 400;
            line-height: 1.5;
            color: #525252;
            background-color: #f3f3f3 !important;
            background-clip: padding-box;
            border: 1px solid #f3f3f3;
            border-radius: .375rem;
            transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
         }

         svg {
            overflow: hidden;
            vertical-align: middle;
         }

         .for-login .page-card .page-card-body .field-icon, .for-forgot .page-card .page-card-body .field-icon, .for-login-with-email-link .page-card .page-card-body .field-icon, .for-signup .page-card .page-card-body .field-icon, .for-email-login .page-card .page-card-body .field-icon {
            left: 9px;
            top: 5px;
            position: absolute;
            z-index: 2;
         }

         .for-login .page-card .page-card-body .email-field .toggle-password, .for-login .page-card .page-card-body .password-field .toggle-password, .for-forgot .page-card .page-card-body .email-field .toggle-password, .for-forgot .page-card .page-card-body .password-field .toggle-password, .for-login-with-email-link .page-card .page-card-body .email-field .toggle-password, .for-login-with-email-link .page-card .page-card-body .password-field .toggle-password, .for-signup .page-card .page-card-body .email-field .toggle-password, .for-signup .page-card .page-card-body .password-field .toggle-password, .for-email-login .page-card .page-card-body .email-field .toggle-password, .for-email-login .page-card .page-card-body .password-field .toggle-password {
            right: 9px;
            top: 5px;
            position: absolute;
            z-index: 2;
            cursor: pointer;
            font-size: 12px;
         }
               
         .toggle-password {
            color: #7c7c7c !important;
         }
      }

      .btn-login-option {
         color: #383838 !important;
      }
      `, "previews-css");
   },

   add_set_skin_button(frm) {
      if (!frm.is_new() && !frm.doc.default) {
         const set_skin_button_name = __("Set as Default for ") + frm.doc.for_theme + __(" Theme");
         const set_skin = (after_update) => {
            frm.call("set_skin", { doc: frm.doc })
            .then((r) => {
               if (r.message && r.message == "success") {
                  after_update();
               }
            });
         }
         
         frm.add_custom_button(set_skin_button_name,
            function () {
               if (frm.is_dirty()) frappe.throw({'title': __("Action Not Permitted"), 'message': "Save the changes first."})

               if (system_theme == for_theme) {
                  frappe.dom.freeze(__("Loading Preview"));
                  setTimeout(() => {
                     frappe.dom.unfreeze();

                     owl_theme_utils.create_stylesheet(frm.doc, true);
                     owl_theme_utils.create_stylesheet_preview();
                     $(".main-section").addClass("skin-preview");

                     const confirm_dialog = new frappe.ui.Dialog({
                        title: __("Confirmation Required"),
                        static: true,
                        indicator: 'orange',
                        fields: [
                           {
                              fieldtype: 'HTML',
                              fieldname: 'message',
                              options: `<p>${__("Save Changes?")}</p>`
                           }
                        ],
                        primary_action_label: __('Yes'),
                        primary_action() {
                           set_skin(frappe.ui.toolbar.clear_cache());
                        },
                        secondary_action_label: __('No'),
                        secondary_action() {
                           $(".main-section").removeClass("skin-preview");
                           owl_theme_utils.delete_stylesheets();
                           confirm_dialog.hide();
                        }
                     });

                     confirm_dialog.show();
                  }, 1500);
               }

               else {
                  set_skin(
                     function () {
                        frappe.msgprint( __("Skin successfully set as default for {0} theme. Change your theme to see the changes.", [for_theme]));
                        frm.reload_doc();
                     }
                  );
               }

            }
         );
         
         $(`[data-label="${encodeURI(set_skin_button_name)}"]`)
         .attr("title", __("Sets the {0} Theme Skin in Owl Theme Settings", [frm.doc.for_theme]))
         .attr("data-toggle", "tooltip")
         .tooltip();
      }
   },

   add_clear_fields_button(frm) {
      frm.add_custom_button(__("Clear Fields"), function () {
         [
            "primary_buttons_background_color",
            "primary_buttons_text_color",
            "color_button_dropdowns",
            "secondary_buttons_background_color",
            "secondary_buttons_border_color",
            "secondary_buttons_text_color",
            "default_buttons_background_color",
            "splash_image",
            "favicon",
            "navbar_background_color",
            "navbar_text_color",
            "color_navbar_dropdowns",
            "main_page_background_color",
            "workspace_background_color",
            "workspace_scrollbar_color",
            "workspace_card_container_background_color",
            "cards_background_color",
            "cards_title_text_color",
            "cards_text_color",
            "sidebar_background_color",
            "sidebar_muted_color",
            "sidebar_text_color",
            "sidebar_scrollbar_color",
            "list_page_background_color",
            "list_page_muted_color",
            "form_background_color",
            "form_muted_color",
            "color_popups",
            "app_name",
            "app_name_color",
            "app_logo",
            "background_color",
            "card_background_image",
            "card_text_color",
            "app_logo_height",
            "login_message",
            "background_image_blur",
            "background_image_brightness"
         ]
         .forEach((field => frm.set_value(field, null)));
         frm.set_value("primary_buttons_hover_animation", "None");
         frm.refresh();
      });
   },

   for_theme(frm) {
      for_theme = frm.doc.for_theme.toLocaleLowerCase();
      frm.events.set_buttons_preview(frm);
      frm.events.set_app_preview(frm);
      frm.events.set_website_preview(frm);
   },
   primary_buttons_background_color(frm) {
      frm.events.set_buttons_preview(frm);
   },
   primary_buttons_text_color(frm) {
      frm.events.set_buttons_preview(frm);
   },
   color_button_dropdowns(frm) {
      frm.events.set_buttons_preview(frm);
   },
   secondary_buttons_background_color(frm) {
      frm.events.set_buttons_preview(frm);
   },
   secondary_buttons_border_color(frm) {
      frm.events.set_buttons_preview(frm);
   },
   secondary_buttons_text_color(frm) {
      frm.events.set_buttons_preview(frm);
   },
   default_buttons_background_color(frm) {
      frm.events.set_buttons_preview(frm);
   },
   navbar_background_color(frm) {
      frm.events.set_app_preview(frm);
   },
   navbar_text_color(frm) {
      frm.events.set_app_preview(frm);
   },
   color_navbar_dropdowns(frm) {
      frm.events.set_app_preview(frm);
   },
   main_page_background_color(frm) {
      frm.events.set_app_preview(frm);
   },
   workspace_background_color(frm) {
      frm.events.set_app_preview(frm);
   },
   workspace_scrollbar_color(frm) {
      frm.events.set_app_preview(frm);
   },
   workspace_card_container_background_color(frm) {
      frm.events.set_app_preview(frm);
   },
   cards_background_color(frm) {
      frm.events.set_app_preview(frm);
   },
   cards_title_text_color(frm) {
      frm.events.set_app_preview(frm);
   },
   cards_text_color(frm) {
      frm.events.set_app_preview(frm);
   },
   sidebar_background_color(frm) {
      frm.events.set_app_preview(frm);
   },
   sidebar_muted_color(frm) {
      frm.events.set_app_preview(frm);
   },
   sidebar_text_color(frm) {
      frm.events.set_app_preview(frm);
   },
   sidebar_scrollbar_color(frm) {
      frm.events.set_app_preview(frm);
   },
   list_page_background_color(frm) {
      frm.events.set_app_preview(frm);
   },
   list_page_muted_color(frm) {
      frm.events.set_app_preview(frm);
   },
   form_background_color(frm) {
      frm.events.set_app_preview(frm);
   },
   form_muted_color(frm) {
      frm.events.set_app_preview(frm);
   },
   color_popups(frm) {
      frm.events.set_app_preview(frm);
   },
   app_name(frm) {
    frm.events.set_website_preview(frm);
   },
   app_name_color(frm) {
      frm.events.set_website_preview(frm);
   },
   app_logo(frm) {
      frm.events.set_website_preview(frm);
   },
   background_color(frm) {
      frm.events.set_website_preview(frm);
   },
   app_logo_height(frm) {
      frm.events.set_website_preview(frm);
   },
   login_message(frm) {
      frm.events.set_website_preview(frm);
   },
   card_text_color(frm) {
      frm.events.set_website_preview(frm);
   },
   card_background_color(frm) {
      frm.events.set_website_preview(frm);
   },
   card_background_image(frm) {
      frm.events.set_website_preview(frm);
   },
   background_image_blur(frm) {
      frm.events.set_website_preview(frm);
   },
   background_image_brightness(frm) {
      frm.events.set_website_preview(frm);
   },

   set_additional_color_checkboxes(frm) {
      ["color_navbar_dropdowns", "color_popups"].forEach((field) => {
         frm.set_value(field, frm.doc.main_page_background_color? frm.doc[field] : 0 );
         frm.set_df_property(field, "read_only", !frm.doc.main_page_background_color);
      });

      frm.set_value("color_button_dropdowns", frm.doc.default_buttons_background_color? frm.doc.color_button_dropdowns : 0 );
      frm.set_df_property("color_button_dropdowns", "read_only", !frm.doc.default_buttons_background_color);
   },

   set_buttons_preview(frm) {
      frm.set_df_property(
         "hoot_skin_preview_buttons",
         "options",
         render_buttons_preview(frm.doc)
      );
   },

   set_app_preview(frm) {
      frm.set_df_property(
         "hoot_skin_preview_app",
         "options",
         render_app_preview(frm.doc)
      )
   },

   set_website_preview(frm) {
      frm.set_df_property(
         "hoot_skin_preview_web",
         "options",
         render_site_preview(frm.doc)
      )
      
   },

   autotheme(frm) {
      for_theme = frm.doc.for_theme.toLocaleLowerCase();
      const base_color = frm.doc.primary_buttons_background_color;
      const background = get_background_color(base_color, for_theme);
      const background_button = get_background_button(base_color, for_theme);
      const foreground = get_foreground(base_color, for_theme);
      const primary_btn_text = get_text_color(base_color);
      // const form_list_muted_color = for_theme == "light"? background : lighten_color(background, 0.15);
      const palette_base = {
         'accent': base_color,
         'background': background,
         'background_button': background_button,
         'foreground': foreground,
         'foreground_button': background
      }
      const palette = {
         'primary_buttons_background_color': base_color,
         'primary_buttons_text_color': primary_btn_text,
         'secondary_buttons_background_color': undefined,
         'secondary_buttons_border_color': base_color,
         'secondary_buttons_text_color': undefined,
         'default_buttons_background_color': foreground,
         'color_button_dropdowns': true,
         'navbar_background_color': base_color,
         'navbar_text_color': primary_btn_text,
         'color_navbar_dropdowns': true,
         'main_page_background_color': background,
         'workspace_background_color': background,
         'workspace_scrollbar_color': get_scrollbar_color(background, for_theme),
         'workspace_card_container_background_color': foreground,
         'cards_background_color': foreground,
         'cards_title_text_color': undefined,
         'cards_text_color': undefined,
         'sidebar_background_color': foreground,
         'sidebar_muted_color': background,
         'sidebar_text_color': undefined,
         'sidebar_scrollbar_color': get_scrollbar_color(foreground, for_theme),
         'list_page_background_color': foreground,
         'list_page_muted_color': background,
         'form_background_color': foreground,
         'form_muted_color': background,
         'app_name_color': for_theme == "light"? base_color : undefined,
         'background_color': for_theme == "light"? background : undefined
      };

      let autotheme_dialog = new frappe.ui.Dialog({
         title: __("Auto-Theme"),
         size: 'extra-large',
         fields: [
            {
               fieldtype: "HTML",
               options: __("Select a background color for the primary button and Autotheme will generate a palette based on it. Checkboxes are available below wherein you can customize the color generation.")
            },
            {
               fieldtype: "Section Break"
            },
            {
               fieldtype: "Color",
               fieldname: "primary_buttons_background_color",
               label: "Primary Button Background Color",
               read_only: 1,
               default: base_color
            },
            {
               fieldtype: "Data",
               fieldname: "theme",
               label: "Theme",
               default: frm.doc.for_theme,
               read_only: 1
            },
            {
               fieldtype: "Column Break"
            },
            {
               fieldtype: "HTML",
               options: render_color_palette(palette_base)
            },
            {
               fieldtype: "Section Break",
            },
            {
               fieldtype: "HTML",
               options: "<h5>Buttons</h5>"
            },
            {
               fieldtype: "Check",
               fieldname: "dont_colorize_secondary_button",
               label: "Don't colorize Secondary Button",
               default: 0,
               onchange: function () {
                  let values = autotheme_dialog.get_values();
                  palette.secondary_buttons_border_color = values.dont_colorize_secondary_button? undefined : base_color;
                  
                  autotheme_dialog.set_df_property("buttons_preview", "options", render_buttons_preview(palette))
               }
            },
            {
               fieldtype: "Check",
               fieldname: "dont_colorize_default_button",
               label: "Don't colorize Default Button",
               default: 0,
               onchange: function () {
                  let values = autotheme_dialog.get_values();
                  palette.default_buttons_background_color = values.dont_colorize_default_button? undefined : foreground;

                  autotheme_dialog.set_df_property("buttons_preview", "options", render_buttons_preview(palette))
               }
            },
            {
               fieldtype: "Column Break"
            },
            {
               fieldtype: "HTML",
               fieldname: "buttons_preview",
               options: render_buttons_preview(palette)
            },
            {
               fieldtype: "Section Break",
            },
            {
               fieldtype: "HTML",
               options: "<h5>App</h5>"
            },
            {
               fieldtype: "Check",
               fieldname: "dont_colorize_navbar",
               label: "Don't colorize Navigation Bar",
               default: 0,
               onchange: function () {
                  let values = autotheme_dialog.get_values();
                  palette.navbar_background_color = values.dont_colorize_navbar? undefined : base_color;
                  palette.navbar_text_color = values.dont_colorize_navbar? undefined : primary_btn_text;
                  palette.color_navbar_dropdowns = values.dont_colorize_navbar? 0: 1;

                  autotheme_dialog.set_df_property("app_preview", "options", render_app_preview(palette, true))
               }
            },
            {
               fieldtype: "Check",
               fieldname: "dont_colorize_app_background",
               label: "Don't colorize Main Background",
               default: 0,
               onchange: function () {
                  let values = autotheme_dialog.get_values();
                  palette.main_page_background_color = values.dont_colorize_app_background? undefined : background;

                  autotheme_dialog.set_df_property("app_preview", "options", render_app_preview(palette, true))
               }
            },
            {
               fieldtype: "Check",
               fieldname: "dont_colorize_workspace_background",
               label: "Don't colorize Workspace Background",
               default: 0,
               onchange: function () {
                  let values = autotheme_dialog.get_values();
                  palette.workspace_background_color = values.dont_colorize_workspace_background? undefined : background;
                  palette.workspace_card_container_background_color = values.dont_colorize_workspace_background? undefined : foreground;
                  palette.cards_background_color = values.dont_colorize_workspace_background? undefined : foreground;
                  autotheme_dialog.set_df_property("app_preview", "options", render_app_preview(palette, true))
               }
            },
            {
               fieldtype: "Check",
               fieldname: "dont_colorize_sidebar",
               label: "Don't colorize Sidebar",
               default: 0,
               onchange: function () {
                  let values = autotheme_dialog.get_values();
                  palette.sidebar_background_color = values.dont_colorize_sidebar? undefined : foreground;
                  palette.sidebar_scrollbar_color = values.dont_colorize_sidebar? undefined : get_scrollbar_color(foreground, for_theme);

                  autotheme_dialog.set_df_property("app_preview", "options", render_app_preview(palette, true))
               }
            },
            {
               fieldtype: "Column Break"
            },
            {
               fieldtype: "HTML",
               fieldname: "app_preview",
               options: render_app_preview(palette)
            }
         ],
         primary_action_label: __("Apply Colors"),
         primary_action: (values) => {
            for (const key of Object.keys(palette)) {
               frm.set_value(key, palette[key])
            }

            autotheme_dialog.hide();
         }
      });
      autotheme_dialog.show();
   },

   after_save(frm) {
      frappe.call({
         method: "frappe.client.get",
         freeze: true,
         freeze_message: __("Updating Theme"),
         args: {
            doctype: 'Owl Theme Settings',
            name: 'Owl Theme Settings'
         },
         callback: function (r) {
            const field = frm.doc.for_theme == "Light"? "light_theme_skin" : "dark_theme_skin";

            if (r.message[field] == frm.doc.name && field.includes(system_theme)) frappe.ui.toolbar.clear_cache();
         }
      })
   }
});


function render_buttons_preview(palette, theme) {
   const preview_background_color = palette.main_page_background_color || get_background_color(palette.primary_buttons_background_color, for_theme);
   const preview_text_color = get_text_color(preview_background_color);
   let secondary_buttons_style = "";

   if (palette.secondary_buttons_background_color) secondary_buttons_style = `background-color: ${palette.secondary_buttons_background_color} !important; color: ${palette.secondary_buttons_text_color} !important;`
   if (palette.secondary_buttons_border_color) secondary_buttons_style = `background-color: transparent !important; border: 2px solid ${palette.secondary_buttons_border_color} !important; color: ${preview_text_color}`;

   return `
      <h5>Buttons Preview</h5>
      <div class="w-100 border-2 rounded px-5 py-3 mb-2 pe-none" data-theme="${for_theme}" style="background-color: ${preview_background_color} !important; border: 1px solid ${palette.primary_buttons_background_color} !important">
         <div class="d-flex align-items-center">
            <button class="btn btn-primary btn-sm mr-3" style="background-color: ${palette.primary_buttons_background_color} !important; color: ${palette.primary_buttons_text_color} !important">
               Primary
            </button>
            <button class="btn btn-default icon-btn mr-3" style="${secondary_buttons_style}">
               Secondary
            </button>
            <button class="btn btn-default icon-btn" style="background-color: ${palette.default_buttons_background_color} !important; color: ${preview_text_color}">
               Default
            </button>
         </div>

      </div>
   `
}

function render_app_preview(palette, for_dialog=false) {
   const bg_color = theme_bg[for_theme];
   const text_color = theme_color[for_theme];
   const navbar_text = for_theme == "light"? "#383838": "white";
   const sidebar_selected_background = for_theme == "light"? "#f3f3f3": "#232323";
   const sidebar_selected_text = get_text_color(sidebar_selected_background);

   return `
      <h5>Workspace/Sidebar Preview</h5>
      <div id="" class="w-100 border-2 rounded mb-2 scale-50 pe-none overflow-hidden" style="border: 1px solid ${palette.primary_buttons_background_color} !important">
         <div class="d-flex flex-column align-items-center">
           <header id="app-preview" class="navbar navbar-expand w-100" style="background-color: ${palette.navbar_background_color || bg_color} !important; border-bottom: 1px solid ${palette.navbar_background_color || bg_color} !important; margin-right: 0 !important">
               <div class="container">
                  <a class="navbar-brand navbar-home" href="/app">
                     <img class="app-logo" src="/assets/frappe/images/frappe-framework-logo.png" alt="App Logo">
                  </a>
                  <div class="collapse navbar-collapse justify-content-end">
                     <form class="form-inline fill-width justify-content-end">
                        <div class="input-group search-bar text-muted mx-0" style="max-width: 150px">
                           <div class="awesomplete">
                              <input type="text" class="form-control" style="background-color: ${palette.color_navbar_dropdowns? palette.main_page_background_color : bg_color}">
                              <ul hidden="" role="listbox"></ul>
                           </div>
                           <span class="search-icon">
                              <svg class="icon icon-sm">
                                 <use href="#icon-search"></use>
                              </svg>
                           </span>
                        </div>
                     </div>
                     <ul class="navbar-nav">
                        <li class="nav-item">
                        <svg viewBox="0 0 24 24" width="16" height="16" stroke="${palette.navbar_text_color || navbar_text}" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1">
                           <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                        </svg>
                        </li>
                        <li class="vertical-bar d-none d-sm-block"></li>
                        <li class="nav-item dropdown dropdown-navbar-user dropdown-mobile">
                           <button class="btn-reset nav-link">
                              <span class="avatar avatar-medium" title="Administrator">
                                 <div class="avatar-frame standard-image" style="background-color: var(--dark-green-avatar-bg); color: var(--dark-green-avatar-color)" title="Administrator">
                                    A
                                 </div>
                              </span>
                           </button>
                        </li>
                     </ul>
                  </div>
               </div>
            </header>
            <div class="content page-container" data-page-route="Workspaces" style="background-color: ${palette.workspace_background_color || (palette.main_page_background_color || bg_color)} !important">
               <div class="page-head flex" style="z-index: 0 !important; background-color: ${palette.workspace_background_color || (palette.main_page_background_color || bg_color)} !important">
                  <div class="container">
                     <div class="row flex align-center page-head-content justify-between">
                        <div class="col-md-4 col-sm-6 col-xs-7 page-title">
                           <button class="btn-reset sidebar-toggle-btn" title="" aria-label="Toggle Sidebar" data-original-title="Toggle Sidebar">
                              <svg viewBox="0 0 24 24" width="24" height="24" stroke="${text_color}" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                           </button>
                           <div class="flex fill-width title-area">
                              <div>
                                 <div class="flex">
                                    <h3 class="ellipsis title-text" title="Home" style="color: ${text_color} !important">Item 1</h3>
                                    <span class="indicator-pill whitespace-nowrap"></span>       
                                 </div>
                                 <div class="ellipsis sub-heading hide text-muted"></div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="container page-body">
                  <div class="page-wrapper">
                     <div class="page-content">
                        <div class="workflow-button-area btn-group pull-right hide"></div>
                        <div class="clearfix"></div>
                        <div class="row layout-main px-3" style="height: auto">
                           <div class="col-3 layout-side-section px-3" style="background-color: ${palette.sidebar_background_color || bg_color} !important">
                              <div class="list-sidebar overlay-sidebar">
                                 <div class="desk-sidebar list-unstyled sidebar-menu">
                                    <div class="standard-sidebar-section nested-container" data-title="Public">
                                       <div class="sidebar-item-container is-draggable" item-parent="" item-name="Home" item-public="1" item-is-hidden="0">
                                          <div class="desk-sidebar-item standard-sidebar-item selected" style="background-color: ${palette.sidebar_background_color? palette.primary_buttons_background_color : sidebar_selected_background} !important">
                                             <a href="/app/home" class="item-anchor">
                                                <span class="sidebar-item-icon d-flex align-items-center" item-icon="stock">
                                                   <svg viewBox="0 0 24 24" width="16" height="16" stroke="${palette.sidebar_background_color? palette.primary_buttons_text_color : sidebar_selected_text}" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                                                </span>
                                                <span class="sidebar-item-label" style="color: ${palette.sidebar_background_color? palette.primary_buttons_text_color : sidebar_selected_text} !important">Item 1<span>
                                                </span></span>
                                             </a>
                                          </div>
                                          <div class="sidebar-child-item nested-container"></div>
                                       </div>
                                       <div class="sidebar-item-container is-draggable" item-parent="" item-name="" item-public="1" item-is-hidden="0">
                                          <div class="desk-sidebar-item standard-sidebar-item ">
                                             <a href="" class="item-anchor" title="">
                                                <span class="sidebar-item-icon d-flex align-items-center" item-icon="users">
                                                   <svg viewBox="0 0 24 24" width="16" height="16" stroke="${text_color}"stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                                                </span>
                                                <span class="sidebar-item-label" style="color: ${text_color} !important">Item 2<span>
                                                </span></span>
                                             </a>
                                          </div>
                                          <div class="sidebar-child-item nested-container"></div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div class="col layout-main-section-wrapper overflow-scroll" style=${palette.workspace_scrollbar_color? palette.workspace_scrollbar_color + " transparent" : ""}>
                              <div class="layout-main-section" style="background-color: ${palette.workspace_card_container_background_color || bg_color} !important; border: 1px solid ${palette.workspace_page_card_container_background_color || bg_color} !important;">
                                 <div class="page-form row hide"></div>
                                 <div class="editor-js-container">
                                    <div class="desk-page page-main-content">
                                       <div class="codex-editor"  style="min-height: 0;">
                                          <div class="codex-editor__redactor" style="padding-bottom: 300px;">
                                             <div class="ce-block col-xs-12">
                                                <div class="ce-block__content">
                                                   <div class="ce-header" data-placeholder=""><span class="h4" style="color: ${text_color} !important"><b>Widget</b></span></div>
                                                </div>
                                             </div>
                                             <div class="ce-block col-6">
                                                <div class="ce-block__content">
                                                   <div shortcut_name="Shortcut">
                                                      <div class="widget shortcut-widget-box" style="background-color: ${palette.cards_background_color || bg_color}">
                                                         <div class="widget-head">
                                                            <div class="widget-label">
                                                               <div class="widget-title"><span class="ellipsis" style="color: ${palette.cards_title_text_color || text_color} !important">Shortcut Action</span></div>
                                                               <div class="widget-subtitle"></div>
                                                            </div>
                                                         </div>
                                                      </div>
                                                   </div>
                                                </div>
                                             </div>
                                             <div class="ce-block col-6">
                                                <div class="ce-block__content">
                                                   <div shortcut_name="Shortcut">
                                                      <div class="widget shortcut-widget-box" style="background-color: ${palette.cards_background_color || bg_color}">
                                                         <div class="widget-head">
                                                            <div class="widget-label">
                                                               <div class="widget-title"><span class="ellipsis" style="color: ${palette.cards_title_text_color || text_color} !important">Shortcut Action</span></div>
                                                               <div class="widget-subtitle"></div>
                                                            </div>
                                                         </div>
                                                      </div>
                                                   </div>
                                                </div>
                                             </div>
                                             <div class="ce-block col-6">
                                                <div class="ce-block__content">
                                                   <div card_name="Links">
                                                      <div class="widget links-widget-box" data-widget-name="e6b487fff0" style="background-color: ${palette.cards_background_color || bg_color} !important">
                                                         <div class="widget-head">
                                                            <div class="widget-label">
                                                               <div class="widget-title"><span class="ellipsis" title="Master Lists" style="color: ${palette.cards_title_text_color || text_color} !important">Links</span></div>
                                                               <div class="widget-subtitle"></div>
                                                            </div>
                                                         </div>
                                                         <div class="widget-body">
                                                            <a href="/app/sales-invoice" class="link-item ellipsis
                                                               " type="Link">
                                                               <span class="link-content ellipsis">
                                                                  <span class="link-text" style="color: ${palette.cards_title_text_color || text_color} !important">Link 1</span>
                                                                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="${palette.cards_title_text_color || text_color}" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                                                               </span>
                                                            </a>
                                                            <a href="/app/sales-order" class="link-item ellipsis
                                                               " type="Link">
                                                               <span class="link-content ellipsis">
                                                                  <span class="link-text" style="color: ${palette.cards_title_text_color || text_color} !important">Link 2</span>
                                                                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="${palette.cards_title_text_color || text_color}" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                                                               </span>
                                                            </a>
                                                         </div>
                                                      </div>
                                                   </div>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   `
}

function render_site_preview(palette, theme) {
   let card_style = `background-color: ${palette.card_background_color}`
   let form_style = ""
   let texts_style = `color: ${palette.card_text_color} !important`;
   let app_logo = $(".navbar .app-logo").attr("src") || "/assets/frappe/images/frappe-framework-logo.png";

   if (palette.card_background_image) {
      card_style = `background: url('${palette.card_background_image}') no-repeat center center / cover;`
      
      let card_bg_blur = palette.background_image_blur != 0? parseInt(5*((palette.background_image_blur/100))) : 0;
      let card_bg_brightness = palette.background_image_brightness + 100;

      form_style = `padding: 45px; margin: 0; max-width: 100%; backdrop-filter: blur(${card_bg_blur}px) brightness(${card_bg_brightness}%);`
   }
   
   return `
      <div id="login-page" class="border-2 rounded pe-none" style="border: 1px solid ${palette.primary_buttons_background_color} !important; background-color: ${palette.background_color}" data-theme="light" >
	      <section class="for-login" style="">
            <div class="page-card-head">
               <img class="mb-3" src="${palette.app_logo || app_logo}" style="height: ${palette.app_logo_height || 42}px">
               <h4 style="color: ${palette.app_name_color}">${palette.login_message || (__('Login to ') + (palette.app_name || "Frappe"))}</h4>
            </div>
            <div class="login-content page-card" style="${card_style}">
               <div class="form-signin form-login" role="form" style="${form_style}">
                  <div class="page-card-body">
                     <div class="form-group">
                        <label class="form-label sr-only" for="login_email_preview">Email or Username</label>
                        <div class="email-field">
                           <input type="text" id="login_email_preview" class="form-control" placeholder="jane@example.com" required="" autofocus="" autocomplete="off">
                           <svg class="field-icon email-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <use class="es-lock" href="#es-line-email"></use>
                           </svg>
                        </div>
                     </div>
                     <div class="form-group">
                        <label class="form-label sr-only" for="login_password_preview">Password</label>
                        <div class="password-field">
                           <input type="password" id="login_password_preview" class="form-control" placeholder="•••••" autocomplete="new-password">
                           <svg class="field-icon password-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <use class="es-lock" href="#es-line-lock"></use>
                           </svg>
                           <span toggle="#login_password_preview" class="toggle-password">Show</span>
                        </div>
                     </div>
                     <p class="forgot-password-message">
                        <a href="#forgot" style="${texts_style}">${__('Forgot Password?')}</a>
                     </p>
                  </div>

               <div class="page-card-actions">
                  <button class="btn btn-sm btn-primary btn-block btn-login" type="submit" style="background-color: ${palette.primary_buttons_background_color} !important; color: ${palette.primary_buttons_text_color} !important">Login</button>
               </div>
               <div class="social-logins text-center">
                  <p class="text-muted login-divider" style="${texts_style}">${__('or')}</p>
                  <div class="social-login-buttons"></div>
                     <div class="login-with-email-link social-login-buttons">
                        <div class="login-button-wrapper">
                           <a href="#login-with-email-link" class="btn btn-block btn-default btn-sm btn-login-option btn-login-with-email-link">
                              Login with Email Link</a>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </div>
   `
}

function render_color_palette(palette) {
   return  `
         <h5>Color Palette</h5>
         <div class="d-flex w-50 ml-1 mb-3 flex-column border rounded overflow-hidden" style="border: 1px solid ${palette.accent} !important">
            <div class="p-2 px-3" style="background-color: ${palette.accent}; color: ${get_text_color(palette.accent)}">
               ${palette.accent.toLocaleLowerCase()}
            </div>
            <div class="p-2 px-3" style="background-color: ${palette.background_button}; color: ${get_text_color(palette.background_button)}">
               ${palette.background_button}
            </div>
            <div class="p-2 px-3" style="background-color: ${palette.background}; color: ${get_text_color(palette.background)}">
               ${palette.background}
            </div>
            <div class="p-2 px-3" style="background-color: ${palette.foreground}; color: ${get_text_color(palette.foreground)}">
               ${palette.foreground}
            </div>
         </div>
      `
}