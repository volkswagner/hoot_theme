function lighten_color(hex, percentage) {
   hex = hex.replace(/^#/, '');
  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('');
  }

  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  r = Math.floor(r + (255 - r) * percentage);
  g = Math.floor(g + (255 - g) * percentage);
  b = Math.floor(b + (255 - b) * percentage);

  const toHex = (c) => c.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function gray_color(hex, percentage) {
  hex = hex.replace(/^#/, '');
  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('');
  }

  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  let gray = (r + g + b) / 3;

  r = Math.floor(r + (gray - r) * percentage);
  g = Math.floor(g + (gray - g) * percentage);
  b = Math.floor(b + (gray - b) * percentage);

  const toHex = (c) => c.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function darken_color(hex, percentage) {
  hex = hex.replace(/^#/, '');

  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('');
  }

  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  r = Math.max(0, Math.floor(r * percentage));
  g = Math.max(0, Math.floor(g * percentage));
  b = Math.max(0, Math.floor(b * percentage));

  const toHex = (c) => c.toString(16).padStart(2, '0');

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function get_background_color(hex, theme) {
   return theme == "light"? gray_color(lighten_color(hex, 0.8), 0.1) : darken_color(hex, .2);
}

function hex_to_hsl(hex) {
  hex = hex.replace(/^#/, '');
  if (hex.length === 3) {
    hex = hex.split('').map(c => c + c).join('');
  }
  let r = parseInt(hex.substring(0, 2), 16) / 255;
  let g = parseInt(hex.substring(2, 4), 16) / 255;
  let b = parseInt(hex.substring(4, 6), 16) / 255;

  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: h * 360, s: s * 100, l: l * 100 };
}

function hsl_to_hex(h, s, l) {
  s /= 100;
  l /= 100;
  let c = (1 - Math.abs(2 * l - 1)) * s;
  let x = c * (1 - Math.abs((h / 60) % 2 - 1));
  let m = l - c / 2;
  let r = 0, g = 0, b = 0;

  if (0 <= h && h < 60) { r = c; g = x; b = 0; }
  else if (60 <= h && h < 120) { r = x; g = c; b = 0; }
  else if (120 <= h && h < 180) { r = 0; g = c; b = x; }
  else if (180 <= h && h < 240) { r = 0; g = x; b = c; }
  else if (240 <= h && h < 300) { r = x; g = 0; b = c; }
  else if (300 <= h && h < 360) { r = c; g = 0; b = x; }

  r = Math.round((r + m) * 255).toString(16).padStart(2, '0');
  g = Math.round((g + m) * 255).toString(16).padStart(2, '0');
  b = Math.round((b + m) * 255).toString(16).padStart(2, '0');

  return `#${r}${g}${b}`.toUpperCase();
}

function get_text_color(hexColor) {
  const cleanHex = hexColor.replace('#', '');
  
  const fullHex = cleanHex.length === 3 
    ? cleanHex.split('').map(char => char + char).join('') 
    : cleanHex;

  const r = parseInt(fullHex.substring(0, 2), 16);
  const g = parseInt(fullHex.substring(2, 4), 16);
  const b = parseInt(fullHex.substring(4, 6), 16);

  const yiqIntensity = (r * 299 + g * 587 + b * 114) / 1000;

  return yiqIntensity >= 150 ? "#1F272E" : "#fff";
}

function get_scrollbar_color(hex, theme) {
  const background_color = get_background_color(hex, theme);
  return theme == "light"? darken_color(background_color, 0.5) : lighten_color(background_color, 0.4);
}

function add_transparency(hex, alpha) {
    const cleanHex = hex.replace('#', '');

    const alphaScale = Math.round(alpha * 255);
    const alphaHex = alphaScale.toString(16).padStart(2, '0').toUpperCase();

    return `#${cleanHex}${alphaHex}`;
}

window.owl_theme_utils = {
   get_text_color: get_text_color,
   get_scrollbar_color: get_scrollbar_color,
   add_transparency: add_transparency,
   lighten_color : lighten_color,
   darken_color : darken_color,
   gray_color : gray_color,
   get_background_color: get_background_color,

   get_background_button: function (hex, theme) {
      return theme == "light"? lighten_color(hex, .5) : darken_color(hex, .5);
   },

   get_foreground: function (hex, theme) {
      return lighten_color(
        get_background_color(hex, theme),
        theme == "light"? 0.6 : 0.1
      );
   },

    rbg_to_hex: function (rgbString) {
        const rgbValues = rgbString.match(/\d+/g);
        
        if (!rgbValues || rgbValues.length < 3) {
            throw new Error("Invalid RGB string format");
        }

        const hex = rgbValues.slice(0, 3).map(x => {
            return parseInt(x).toString(16).padStart(2, '0');
        }).join('');

        return `#${hex}`;
    },

    create_stylesheet: function (skin_doc, is_preview=false) {
        if (skin_doc.name == "-" || !skin_doc) return;
        if (is_preview) skin_doc.color_popups = 1;

        const navlink_hover_background_color = lighten_color(skin_doc.primary_buttons_background_color, 0.85);
        const navlink_hover_text_color = get_text_color(navlink_hover_background_color);
        const primary_buttons_background_color_transparent = add_transparency(skin_doc.primary_buttons_background_color, 0.4);
        const id_prefix = is_preview? "-preview" : "";
        
        frappe.dom.set_style(`
            .btn.btn-primary, 
            .btn.btn-primary:hover, 
            .btn.btn-primary:active, 
            .btn.btn-primary:focus {
                background-color: ${skin_doc.primary_buttons_background_color} !important;
                border-color: ${skin_doc.primary_buttons_background_color} !important;
            }

            .btn.btn-primary:focus,
            .btn.btn-secondary:focus,
            .btn-default:focus {
                box-shadow: inset 0 1px ${primary_buttons_background_color_transparent}, 0 1px 1px ${primary_buttons_background_color_transparent}, 0 0 0 2px ${primary_buttons_background_color_transparent} !important; 
            }
            
            .btn.btn-primary,
            .btn.btn-primary * {
                color: ${skin_doc.primary_buttons_text_color} !important;
            }

        `, "basic" + id_prefix);

        if (skin_doc.secondary_buttons_background_color) {
            frappe.dom.set_style(`
                .btn.btn-secondary:not(.btn-new), 
                .btn.btn-secondary:not(.btn-new):hover, 
                .btn.btn-secondary:not(.btn-new):active, 
                .btn.btn-secondary:not(.btn-new):focus,
                .filter-chart, 
                .filter-chart:hover, 
                .filter-chart:active, 
                .filter-chart:focus  {
                    background-color: ${skin_doc.secondary_buttons_background_color} !important;
                    border-color: ${skin_doc.secondary_buttons_background_color} !important;
                }

                .filter-chart *,
                .btn.btn-secondary:not(.btn-new),
                .btn.btn-secondary:not(.btn-new) * {
                    color: ${skin_doc.secondary_buttons_text_color} !important;
                }

                [data-theme="dark"] {
                    .btn.btn-:not(.btn-new), 
                    .btn.btn-secondary:not(.btn-new):not(.drag-handle):not(.setting-btn):not(.edit-button):hover, 
                    .btn.btn-secondary:not(.btn-new):not(.drag-handle):not(.setting-btn):not(.edit-button):active, 
                    .btn.btn-secondary:not(.btn-new):not(.drag-handle):not(.setting-btn):not(.edit-button):focus,
                    .filter-chart, 
                    .filter-chart:hover, 
                    .filter-chart:active, 
                    .filter-chart:focus  {
                        --icon-stroke: ${skin_doc.secondary_buttons_text_color} !important;
                    }
                }

                [data-theme="light"] {
                    .btn.btn-secondary:not(.btn-new):not(.drag-handle):not(.setting-btn):not(.edit-button), 
                    .btn.btn-secondary:not(.btn-new):not(.drag-handle):not(.setting-btn):not(.edit-button):hover, 
                    .btn.btn-secondary:not(.btn-new):not(.drag-handle):not(.setting-btn):not(.edit-button):active, 
                    .btn.btn-secondary:not(.btn-new):not(.drag-handle):not(.setting-btn):not(.edit-button):focus,
                    .filter-chart, 
                    .filter-chart:hover, 
                    .filter-chart:active, 
                    .filter-chart:focus  {
                        --icon-stroke: ${skin_doc.secondary_buttons_text_color} !important;
                    }
                }

            `, "secondary-btn" + id_prefix)
        }
        else if(skin_doc.secondary_buttons_border_color) {
            frappe.dom.set_style(`
                .btn.btn-secondary:not(.btn-new):not(.drag-handle):not(.setting-btn):not(.edit-button),
                .filter-chart {
                    background-color: transparent !important;
                    border: 2px solid ${skin_doc.secondary_buttons_border_color} !important;
                }

                [data-theme="dark"] .btn.btn-secondary:not(.btn-new),
                [data-theme="dark"] .filter-chart,
                [data-theme="light"] .btn.btn-secondary:not(.btn-new),
                [data-theme="light"] .filter-chart {
                    color: ${skin_doc.secondary_buttons_text_color} !important;
                }

                .btn.btn-secondary:not(.btn-new):not(.drag-handle):not(.setting-btn):not(.edit-button):hover, 
                .btn.btn-secondary:not(.btn-new):not(.drag-handle):not(.setting-btn):not(.edit-button):active, 
                .btn.btn-secondary:not(.btn-new):not(.drag-handle):not(.setting-btn):not(.edit-button):focus,
                .btn.btn-secondary:not(.btn-new):not(.drag-handle):not(.setting-btn):not(.edit-button):hover *, 
                .btn.btn-secondary:not(.btn-new):not(.drag-handle):not(.setting-btn):not(.edit-button):active *, 
                .btn.btn-secondary:not(.btn-new):not(.drag-handle):not(.setting-btn):not(.edit-button):focus *,
                .filter-chart:hover, 
                .filter-chart:active, 
                .filter-chart:focus,
                .filter-chart:hover *, 
                .filter-chart:active *, 
                .filter-chart:focus * {
                    background-color: ${skin_doc.secondary_buttons_border_color} !important;
                    color: ${skin_doc.primary_buttons_text_color} !important;
                }

                [data-theme="light"] {
                    .btn.btn-secondary:not(.btn-new):not(.drag-handle):not(.setting-btn):not(.edit-button):hover, 
                    .btn.btn-secondary:not(.btn-new):not(.drag-handle):not(.setting-btn):not(.edit-button):active, 
                    .btn.btn-secondary:not(.btn-new):not(.drag-handle):not(.setting-btn):not(.edit-button):focus,
                    .filter-chart:hover, 
                    .filter-chart:active, 
                    .filter-chart:focus  {
                        --icon-stroke: ${skin_doc.primary_buttons_text_color} !important;
                    }
                }

                [data-theme="dark"] {
                    .btn.btn-secondary:not(.btn-new):not(.drag-handle):not(.setting-btn):not(.edit-button):hover, 
                    .btn.btn-secondary:not(.btn-new):not(.drag-handle):not(.setting-btn):not(.edit-button):active, 
                    .btn.btn-secondary:not(.btn-new):not(.drag-handle):not(.setting-btn):not(.edit-button):focus,
                    .filter-chart:hover, 
                    .filter-chart:active, 
                    .filter-chart:focus  {
                        --icon-stroke: ${skin_doc.primary_buttons_text_color} !important;
                    }
                }

                [data-theme="light"] {
                    .btn.btn-secondary:not(.btn-new):not(.drag-handle):not(.setting-btn):not(.edit-button):hover, 
                    .btn.btn-secondary:not(.btn-new):not(.drag-handle):not(.setting-btn):not(.edit-button):active, 
                    .btn.btn-secondary:not(.btn-new):not(.drag-handle):not(.setting-btn):not(.edit-button):focus,
                    .filter-chart:hover, 
                    .filter-chart:active, 
                    .filter-chart:focus  {
                        --icon-stroke: ${skin_doc.primary_buttons_text_color} !important;
                    }
                }
            `, "secondary-btn-border" + id_prefix)
        }

        if (skin_doc.main_page_background_color) {
            frappe.dom.set_style(`
                body,
                html,
                .page-container,
                .main-section, 
                .page-head {
                    background-color: ${skin_doc.main_page_background_color} !important;
                }

                .layout-main-section-wrapper {
                    scrollbar-color: ${skin_doc.workspace_scrollbar_color} transparent !important;
                }

                .standard-sidebar-item:hover,
                .standard-sidebar-item.selected {
                    background-color: ${skin_doc.primary_buttons_background_color} !important;
                }

                .standard-sidebar-item:hover .sidebar-item-label,
                .standard-sidebar-item.selected .sidebar-item-label {
                    color: ${skin_doc.primary_buttons_text_color} !important;
                }

                .standard-sidebar-item:hover .sidebar-item-control,
                .standard-sidebar-item.selected .sidebar-item-control {
                    background-color: ${owl_theme_utils.darken_color(skin_doc.primary_buttons_background_color, 0.35)} !important;
                }

                .standard-sidebar-item:hover .btn,
                .standard-sidebar-item.selected .btn {
                    border-radius: 0 !important;
                    margin-right: 0 !important;
                    margin-left: 0 !important;
                    padding-left: 6px !important;
                    padding-right: 6px !important;
                }

                .standard-sidebar-item:hover .drag-handle,
                .standard-sidebar-item.selected .drag-handle,
                .standard-sidebar-item:hover .dropdown-btn,
                .standard-sidebar-item.selected .dropdown-btn {
                    border-right: 1px solid ${skin_doc.primary_buttons_text_color} !important;
                }

                .sidebar-item-control .btn.btn-secondary.drag-handle {
                    background: transparent !important;
                }

                [data-theme="dark"] .standard-sidebar-item:hover,
                [data-theme="dark"] .standard-sidebar-item.selected,
                [data-theme="light"] .standard-sidebar-item:hover,
                [data-theme="light"] .standard-sidebar-item.selected {
                    --icon-stroke: ${skin_doc.primary_buttons_text_color} !important;
                }
            `, "main" + id_prefix)
        }

        if (skin_doc.default_buttons_background_color) {
            frappe.dom.set_style(`
                .page-head-content .btn.btn-default, 
                .page-head-content .btn.btn-default:hover, 
                .page-head-content .btn.btn-default:active, 
                .page-head-content .btn.btn-default:focus {
                    background-color: ${skin_doc.default_buttons_background_color} !important;
                    border-color: ${skin_doc.default_buttons_background_color} !important;
                }
                
                .page-head-content .dropdown-item:hover {
                    background-color: ${skin_doc.primary_buttons_background_color} !important;
                    color: ${skin_doc.primary_buttons_text_color} !important;
                }
                

            `, "default-btn" + id_prefix)

            if (skin_doc.color_button_dropdowns) {
                const default_buttons_background_color_dark =  darken_color(skin_doc.default_buttons_background_color, 0.5);

                frappe.dom.set_style(`
                    .standard-actions .dropdown-menu,
                    .standard-actions .dropdown-menu .btn-reset,
                    .custom-actions .dropdown-menu,
                    .custom-actions .dropdown-menu .btn-reset {
                        background-color: ${skin_doc.default_buttons_background_color} !important;
                        border: 1px solid ${skin_doc.default_buttons_background_color} !important;
                    }

                    .standard-actions .dropdown-menu .btn-reset,
                    .custom-actions .dropdown-menu .btn-reset {
                        background-color: ${skin_doc.default_buttons_background_color} !important;
                    }

                    ${skin_doc.for_theme == "Dark" && `
                        .standard-actions .dropdown-menu kbd {
                            background-color: ${default_buttons_background_color_dark} !important;
                        }

                        .standard-actions .dropdown-menu .dropdown-divider {
                            border-color: ${default_buttons_background_color_dark} !important;
                        }
                    `}
                `, "button-dropdowns" + id_prefix);

                frappe.dom.set_style(`
                    .standard-actions .dropdown-menu .btn-reset:hover,
                    .standard-actions .dropdown-menu .dropdown-item:hover,
                    .custom-actions .dropdown-menu .btn-reset:hover,
                    .custom-actions .dropdown-menu .dropdown-item:hover {
                        background-color: ${skin_doc.primary_buttons_background_color} !important;
                    }

                    .standard-actions .dropdown-menu .btn-reset:hover,
                    .standard-actions.dropdown-menu .dropdown-item:hover,
                    .custom-actions .dropdown-menu .btn-reset:hover,
                    .custom-actions .dropdown-menu .dropdown-item:hover {
                        color: ${skin_doc.primary_buttons_text_color} !important;
                    }

                    [data-theme="dark"] .custom-actions .dropdown-menu .dropdown-item:hover,
                    [data-theme="light"] .custom-actions .dropdown-menu .dropdown-item:hover {
                        --icon-stroke: var(--text-color) !important;
                    }
                `, "button-dropdowns-items" + id_prefix)
            }
        }

        if (skin_doc.navbar_background_color) {
            const arrow_color = skin_doc.navbar_text_color.replace("#", "%23");

            frappe.dom.set_style(`
                .navbar.navbar-expand {
                    background-color: ${skin_doc.navbar_background_color} !important;
                    border-bottom: 1px solid ${skin_doc.navbar_background_color} !important;
                }

                .nav.navbar-nav a,
                .navbar .vertical-bar {
                    color: ${skin_doc.navbar_text_color} !important;
                }

                .navbar .vertical-bar {
                    border-right: 1px solid ${skin_doc.navbar_text_color} !important;
                }
                

                .dropdown-help span {
                    color: ${skin_doc.navbar_text_color} !important;
                }
                
                [data-theme="dark"] .navbar.navbar-expand,
                [data-theme="light"] .navbar.navbar-expand {
                    --icon-stroke: ${skin_doc.navbar_text_color} !important;
                } 

                [data-theme="light"] {
                    --right-arrow-svg: url("data:image/svg+xml;utf8,<svg width='6' height='8' viewBox='0 0 6 8' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M1.25 7.5L4.75 4L1.25 0.5' stroke='${arrow_color}' stroke-linecap='round' stroke-linejoin='round'/></svg>");
                    --left-arrow-svg: url("data:image/svg+xml;utf8,<svg width='6' height='8' viewBox='0 0 6 8' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M1.25 7.5L4.75 4L1.25 0.5' stroke='${arrow_color}' stroke-linecap='round' stroke-linejoin='round'/></svg>");
                }

                [data-theme="dark"] {
                    --right-arrow-svg: url("data:image/svg+xml;utf8,<svg width='6' height='8' viewBox='0 0 6 8' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M1.25 7.5L4.75 4L1.25 0.5' stroke='${arrow_color}' stroke-linecap='round' stroke-linejoin='round'/></svg>");
                    --left-arrow-svg: url("data:image/svg+xml;utf8,<svg width='6' height='8' viewBox='0 0 6 8' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M1.25 7.5L4.75 4L1.25 0.5' stroke='${arrow_color}' stroke-linecap='round' stroke-linejoin='round'/></svg>");
                }

            `, "navbar-basics" + id_prefix);
        }
        

        if (skin_doc.color_navbar_dropdowns) {
            if (skin_doc.main_page_background_color) {
                const scrollbar_color = get_scrollbar_color(skin_doc.main_page_background_color, skin_doc.for_theme.toLowerCase());

                frappe.dom.set_style(`
                    #navbar-search,
                    .navbar.navbar-expand .awesomplete>[role=listbox],
                    .navbar .dropdown-menu,
                    .navbar .dropdown-menu .btn-reset {
                        background-color: ${skin_doc.main_page_background_color} !important;
                        border: 1px solid ${skin_doc.main_page_background_color} !important;
                    }

                    .navbar .dropdown-menu .btn-reset {
                        background-color: ${skin_doc.main_page_background_color} !important;
                    }

                    .notification-list-body,
                    .navbar.navbar-expand .awesomplete>[role=listbox] {
                        scrollbar-color: ${scrollbar_color} transparent !important;
                    }
                    
                `, "navbar-bg" + id_prefix);
            }

            frappe.dom.set_style(`
                .navbar.navbar-expand {
                    .awesomplete li:hover,
                    .dropdown-menu .btn-reset:hover,
                    .dropdown-menu .dropdown-item:hover,
                    .recent-item:not(.no-hover):hover {
                        background-color: ${skin_doc.primary_buttons_background_color} !important;
                    }

                    .awesomplete li:hover a,
                    .dropdown-menu .btn-reset:hover,
                    .dropdown-menu .dropdown-item:hover,
                    .recent-item:not(.no-hover):hover,
                    .recent-item:not(.no-hover):hover .notification-timestamp {
                        color: ${skin_doc.primary_buttons_text_color} !important;
                    }

                    .awesomplete>[role=listbox]>li[aria-selected=true],
                    .awesomplete>[role=listbox]>li[aria-selected=true]:hover {
                        background-color: ${skin_doc.primary_buttons_background_color} !important;
                    }
                    
                    .awesomplete [aria-selected="true"] a,
                    .awesomplete [aria-selected="true"]:hover a {
                        color: ${skin_doc.primary_buttons_text_color} !important;
                    }
                }

                .notification-list-header {
                    margin: 0 !important;
                    padding: 0 10px !important;
                    background-color: ${skin_doc.primary_buttons_background_color} !important;
                }

                .notification-list-header li {
                    margin-right: 0 !important;
                    padding: var(--padding-md) var(--margin-sm) !important;
                    color: ${skin_doc.primary_buttons_text_color} !important;
                }

                .notification-list-header li:hover {
                    background-color: ${navlink_hover_background_color} !important;
                    color: ${navlink_hover_text_color} !important;
                }

                .notification-list-header li.active {
                    border-width: 2px !important;
                }

                [data-theme="dark"] .notification-list-header .header-actions,
                [data-theme="light"] .notification-list-header .header-actions {
                    --icon-stroke: ${skin_doc.primary_buttons_text_color} !important;
                }
            `, "navbar-dropdowns" + id_prefix)
        }

        if (skin_doc.sidebar_background_color) {
            frappe.dom.set_style(`
                .layout-side-section,
                .comment-box,
                .timeline-item,
                .timeline-items,
                .new-timeline,
                .new-timeline .timeline-item .timeline-badge,
                .new-timeline .timeline-item .timeline-dot {
                    background-color: ${skin_doc.sidebar_background_color} !important;
                    scrollbar-color: ${skin_doc.sidebar_scrollbar_color} transparent !important;
                }

                .new-timeline {
                    border-top-left-radius: 10px !important;
                    border-top-right-radius: 10px !important;
                    margin-top: var(--padding-lg) !important;
                    padding: 0 !important;
                }

                .new-timeline .timeline-item .timeline-content.frappe-card {
                    background-color: ${skin_doc.background} !important;
                    border: 1px solid ${skin_doc.background} !important;
                }

                .standard-sidebar-item:hover,
                .standard-sidebar-item.selected {
                    background-color: ${skin_doc.primary_buttons_background_color} !important;
                }

                .standard-sidebar-item:hover *,
                .standard-sidebar-item.selected * {
                    color: ${skin_doc.primary_buttons_text_color} !important;
                }

                [data-theme="dark"] .standard-sidebar-item:hover,
                [data-theme="dark"] .standard-sidebar-item.selected,
                [data-theme="light"] .standard-sidebar-item:hover,
                [data-theme="light"] .standard-sidebar-item.selected {
                    --icon-stroke: ${skin_doc.primary_buttons_text_color} !important;
                }
            `, "sidebar-background" + id_prefix);
        }

        if (skin_doc.sidebar_muted_color) {
            const sidebar_muted_color_light = lighten_color(skin_doc.sidebar_muted_color, 0.15);

            frappe.dom.set_style(`
                .list-sidebar .btn.btn-default,
                .list-sidebar .btn.btn-default:hover,
                .list-sidebar .list-filters input:not([data-fieldtype="Check"]),
                .comment-box .comment-input-container .frappe-control .ql-editor,
                .comment-box .comment-input-container .frappe-control .ql_editor {
                    background-color: ${skin_doc.sidebar_muted_color} !important;
                    border: 1px solid ${skin_doc.sidebar_muted_color} !important;
                }   
                    
                .list-sidebar {
                    .dropdown-search,
                    .dropdown-menu {
                        background-color: ${skin_doc.sidebar_muted_color} !important;
                    }

                    input {
                        background-color: ${sidebar_muted_color_light} !important;
                        border-color: ${sidebar_muted_color_light} !important;
                    }

                    .dropdown-item:hover,
                    .dropdown-item:focus,
                    .btn.btn-default.filter-pill {
                        background-color: ${skin_doc.primary_buttons_background_color} !important;
                        border-color: ${sidebar_muted_color_light} !important;
                    }

                    .dropdown-item:hover *,
                    .dropdown-item:focus *,
                    .btn.btn-default.filter-pill * {
                        color: ${skin_doc.primary_buttons_text_color} !important;
                    }
                }
            `, "sidebar-foreground" + id_prefix)
        }

        if (skin_doc.sidebar_background_color != skin_doc.main_page_background_color) { 
            frappe.dom.set_style(`
                .layout-side-section {
                    padding-top: 15px !important;
                    border-radius: 10px!important;
                    height: max-content !important;
                }

                .comment-box {
                    padding: 15px !important;
                    border-radius: 10px !important;
                }

                .timeline-item {
                    padding-left: 15px !important;
                    padding-right: 15px !important;
                    border-top-left-radius: 10px !important;
                    border-top-right-radius: 10px !important;
                }

                .timeline-items {
                    padding-bottom: 15px !important;
                    border-bottom-left-radius: 10px !important;
                    border-bottom-right-radius: 10px !important;
                }   
            `, "sidebar-main" + id_prefix)

        }

        if (skin_doc.workspace_background_color) {
            const cards_background_color_dark = owl_theme_utils.darken_color(skin_doc.workspace_background_color, 0.95);

            frappe.dom.set_style(`
                body:has(#page-Workspaces:not([style*="display: none"])),
                #page-Workspaces:not([style*="display: none"]).page-container {
                    background-color: ${skin_doc.workspace_background_color} !important;
                }

                #page-Workspaces {
                    .main-section, 
                    .page-head {
                        background-color: ${skin_doc.workspace_background_color} !important;
                    }

                    .layout-main-section-wrapper {
                        scrollbar-color: ${skin_doc.workspace_scrollbar_color} transparent !important;
                    }
                        
                    .layout-main-section {
                        background-color: ${skin_doc.workspace_card_container_background_color} !important;
                        border: 1px solid ${skin_doc.workspace_card_container_background_color} !important;
                    }

                    .widget,
                    .widget .dropdown-list,
                    .widget .dropdown-menu {
                        background-color: ${skin_doc.cards_background_color}
                    }
                    
                    .widget.edit-mode,
                    .codex-editor .codex-editor__redactor .ce-block .ce-block__content .widget.paragraph .paragraph-control {
                        background-color: ${skin_doc.workspace_background_color} !important;
                    }

                    .widget.edit-mode .drag-handle,
                    .widget.edit-mode .setting-btn,
                    .widget.edit-mode .edit-button {
                        background-color: ${cards_background_color_dark} !important;
                    }

                    .widget .dropdown-list .dropdown-item:hover,
                    .widget .dropdown-menu .dropdown-item:hover {
                        background-color: ${skin_doc.primary_buttons_background_color} !important;
                        color: ${skin_doc.primary_buttons_text_color} !important;
                    }

                    .number_card .widget-head {

                    }

                    .link-text {
                        ${skin_doc.cards_text_color ? `color: ${skin_doc.cards_text_color} !important;` : ""}
                    }
                    
                    .layout-main-section .indicator-pill,
                    .spacer,
                    .cdx-block,
                    .onboarding-step.active,
                    .onboarding-step-footer .btn {
                        background-color: ${skin_doc.workspace_background_color} !important;
                    }

                    .workspace-footer .btn.btn-default {
                        background-color: ${skin_doc.workspace_background_color} !important;
                    }
                }
            `, "workspace" + id_prefix);
        }

        if (skin_doc.form_background_color) {
            const form_border_color = skin_doc.for_theme == "Light"? darken_color(skin_doc.form_background_color, 0.90) : lighten_color(skin_doc.form_background_color, 0.10);
            const navlink_hover_background_color = lighten_color(skin_doc.primary_buttons_background_color, 0.5);
            const navlink_hover_text_color = get_text_color(navlink_hover_background_color);

            frappe.dom.set_style(`
                .page-container .form-page:not(.form-in-grid .form-page),
                .search-box {
                    background-color: ${skin_doc.form_background_color} !important;
                    border: 1px solid ${skin_doc.form_background_color} !important;
                }
                
                .grid-footer,
                .form-in-grid,
                .form-tabs-list,
                .form-sidebar .actions,
                .form-sidebar .empty-state,
                .form-sidebar .header,
                .form-sidebar .control-data,
                .search-box,
                .form-tabs .nav-item,
                .form-tabs .nav-link {
                    background-color: ${skin_doc.form_background_color} !important;
                }
                
                .form-tabs-list {
                    padding: 0 !important;
                    overflow: hidden !important;
                    border: 0 !important;
                    border-bottom: 1px solid ${skin_doc.primary_buttons_background_color} !important;
                }

                .form-tabs .nav-link {
                    margin: 0 !important;
                    padding: 10px var(--margin-md) !important;
                }

                .form-tabs .nav-item:has(.active),
                .form-tabs .nav-link.active {
                    background-color: ${skin_doc.primary_buttons_background_color} !important;
                    color: ${skin_doc.primary_buttons_text_color} !important;
                    border-bottom: 0 !important;
                    font-weight: normal !important;

                }

                .form-tabs .nav-item:hover,
                .form-tabs .nav-link:hover {
                    background-color: ${navlink_hover_background_color} !important;
                    color: ${navlink_hover_text_color} !important;
                    border-bottom: 0 !important;
                    font-weight: normal !important;

                }

                .form-section.card-section, .form-dashboard-section {
                    border-color: ${form_border_color};
                }

                
            `, "form-background" + id_prefix)

            if (skin_doc.form_muted_color) {
                const disabled_input_color = skin_doc.for_theme == "Light"? lighten_color(gray_color(skin_doc.form_muted_color, 0.35), 0.25) : lighten_color(skin_doc.form_muted_color, 0.10);
                const muted_color_dark = darken_color(skin_doc.form_muted_color, 0.5);

                frappe.dom.set_style(`
                    .selected-color:not(.no-value) {
                        border: 1px solid ${get_text_color(skin_doc.form_muted_color)}};
                    }
                        
                    .page-container:not(#page-DocType) .form-page {
                        border: 1px solid ${skin_doc.form_muted_color} !important;
                    }

                    .btn-new,
                    .document-link-badge {
                        background-color: ${skin_doc.form_muted_color} !important;
                    }
                    
                    .page-container:not(#page-DocType) {
                        .frappe-control:not([data-fieldname*="hoot_skin_preview"]) {
                            input:not([type="checkbox"]),
                            select,
                            button:not(.grid-delete-row),
                            textarea,
                            .attached-file,
                            .ace_editor {
                                background-color: ${skin_doc.form_muted_color} !important;
                                border: 1px solid ${skin_doc.form_muted_color} !important;
                            }

                            input[type="checkbox"]:disabled {
                                background-color: ${navlink_hover_background_color} !important;
                            }

                            .ace_gutter,
                            .link-btn,
                            input[type="checkbox"],
                            kbd {
                                background-color: ${skin_doc.form_muted_color} !important;
                            }
                                
                            .ace_scrollbar,
                            .ace_scrollbar-v,
                            .ace_scrollbar-h,
                            .ace_scrollbar-inner {
                                scrollbar-color: ${navlink_hover_background_color} transparent !important;
                            }

                        
                            .like-disabled-input,
                            .cancelled-form input,
                            .cancelled-form [data-fieldtype="Table"] .grid-heading-row,
                            .cancelled-form [data-fieldtype="Table"] .grid-body,
                            .submitted-form input,
                            .submitted-form [data-fieldtype="Table"] .grid-heading-row,
                            .submitted-form [data-fieldtype="Table"] .grid-body {
                                background-color: ${disabled_input_color} !important;
                                border: 1px solid ${disabled_input_color} !important;
                            }

                            .attached-file .btn {
                                background-color: ${skin_doc.form_background_color} !important;
                                border: 1px solid ${skin_doc.form_background_color} !important;
                            }
                        }
                        
                        [data-fieldtype="Table"] .grid-heading-row,
                        .editable-row .col,
                        .grid-body .editable-row .link-btn {
                            background-color: ${skin_doc.form_muted_color} !important;
                        }

                        [data-fieldtype="Table"] .grid-body {
                            background-color: ${skin_doc.form_background_color} !important;
                        }

                        [data-fieldtype="Table"] {
                            .grid-heading-row,
                            .grid-body,
                            .form-grid,
                            .grid-static-col,
                            .grid-row,
                            .grid-row>.row .col {
                                border-color: ${skin_doc.form_muted_color} !important;
                            }
                        }
                    }

                    #page-DocType {
                        .form-page,
                        .tab-header,
                        .actions,
                        .section-columns .column, {
                            border-color: ${skin_doc.primary_buttons_background_color} !important;
                        }

                        .form-builder-container .form-main {
                            border: 1px solid ${skin_doc.primary_buttons_background_color} !important;
                        }
                        
                        .default-state .actions,
                        .form-section-container {
                            border-bottom: 1px solid ${skin_doc.primary_buttons_background_color} !important;
                        }

                        .form-container,
                        .form-main,
                        .form-section-container,
                        .column,
                        .tab-header,
                        .frappe-control .link-btn,
                        kbd {
                            background-color: ${skin_doc.form_muted_color} !important;
                        }

                        .control-label {
                            background-color: ${skin_doc.form_background_color} !important;
                        }

                        #doctype-settings_tab {
                            input:not([type="checkbox"]),
                            select,
                            button:not(.grid-delete-row),
                            textarea,
                            .attached-file {
                                background-color: ${skin_doc.form_muted_color} !important;
                                border: 1px solid ${skin_doc.form_muted_color} !important;
                            }

                            input[type="checkbox"]:disabled {
                                background-color: ${navlink_hover_background_color} !important;
                            }
                        
                            input[type="checkbox"],
                            [data-fieldtype="Table"] .grid-heading-row,
                            .editable-row .col,
                            .grid-body .editable-row .link-btn {
                                background-color: ${skin_doc.form_muted_color} !important;
                            }

                            [data-fieldtype="Table"] .grid-body {
                                background-color: ${skin_doc.form_background_color} !important;
                            }

                            [data-fieldtype="Table"] {
                                .grid-heading-row,
                                .grid-body,
                                .form-grid,
                                .grid-static-col,
                                .grid-row,
                                .grid-row>.row .col  {
                                    border-color: ${skin_doc.form_muted_color} !important;
                                }
                            }
                        }
                    }
                        
                    #page-DocType .form-container {
                        input,
                        select,
                        button:not(.grid-delete-row),
                        textarea {
                            background-color: ${skin_doc.form_background_color} !important;
                            border: 1px solid ${skin_doc.form_background_color} !important;
                        },

                        [data-fieldtype="Table"] .grid-heading-row,
                        [data-fieldtype="Table"] .grid-body {
                            background-color: ${skin_doc.form_background_color} !important;
                            border-color: ${skin_doc.form_background_color} !important;
                        }

                        .field {
                            background-color: ${skin_doc.form_muted_color} !important;
                        }
                    }

                    #page-DocType .tab-contents,
                    .ace_scrollbar {
                        scrollbar-color: ${muted_color_dark} transparent !important;
                    }

                    #page-DocType .control-data {
                        scrollbar-color: ${skin_doc.form_muted_color} transparent !important;
                    }

                    #page-DocType .form-sidebar {
                        input,
                        select,
                        button,
                        textarea,
                        .ace_editor {
                            background-color: ${skin_doc.form_muted_color} !important;
                            border: 1px solid ${skin_doc.form_muted_color} !important;
                        }

                        .ace_gutter {
                            background-color: ${muted_color_dark} !important;
                        }
                    }


                `, "form-foreground" + id_prefix)
            }

            if (skin_doc.color_popups) {
                frappe.dom.set_style(`
                    .modal .modal-content {
                        background-color: ${skin_doc.form_background_color} !important;
                        border: 0 !important;
                    }

                    .modal .modal-header {
                        background-color: ${skin_doc.primary_buttons_background_color} !important;
                    }

                    .modal .modal-header * {
                        color: ${skin_doc.primary_buttons_text_color} !important;
                    }

                    .modal-header .btn:active {
                        background-color: #dc3545 !important;
                    }

                    [data-theme="dark"] .modal-header,
                    [data-theme="light"] .modal-header {
                        --icon-stroke: ${skin_doc.primary_buttons_text_color} !important;
                        --icon-stroke: ${skin_doc.primary_buttons_text_color} !important;
                    }
                `, "form-popups" + id_prefix);

                if (skin_doc.form_muted_color) {
                    
                const disabled_input_color = lighten_color(gray_color(skin_doc.form_muted_color, 0.35), 0.25);
                frappe.dom.set_style(`
                    .modal {
                        .modal-header,
                        .modal-body,
                        .modal-footer {
                            border-color: ${skin_doc.form_muted_color} !important;
                        }

                        .frappe-control:not([data-fieldtype="HTML"]) {
                            input,
                            select,
                            button,
                            textarea,
                            .attached-file,
                            [data-fieldtype="Table"] .grid-heading-row,
                            [data-fieldtype="Table"] .grid-body {
                                background-color: ${skin_doc.form_muted_color} !important;
                                border-color: ${skin_doc.form_muted_color} !important;
                            }
                            
                            .like-disabled-input {
                                background-color: ${disabled_input_color} !important;
                                border: 1px solid ${disabled_input_color} !important;
                            }

                            .attached-file .btn {
                                background-color: ${skin_doc.form_background_color} !important;
                                border: 1px solid ${skin_doc.form_background_color} !important;
                            }
                        
                        }
                    }
                `, "form-popups-border" + id_prefix);
                }
            }
        }

        if (skin_doc.list_page_background_color) {
            frappe.dom.set_style(`
                .frappe-list,
                .page-form,
                [id*="page-List"]:not([style*="display: none"]) .layout-main-section,
                .filter-popover,
                .sort-selector .dropdown-menu {
                    background-color: ${skin_doc.list_page_background_color} !important;
                }

                .bs-popover-bottom>.arrow:after {
                    border-bottom-color: ${skin_doc.list_page_background_color} !important;
                }

                [id*="page-List"]:not([style*="display: none"]) .layout-main-section {
                    border: 1px solid ${skin_doc.list_page_background_color} !important;
                }

                .list-paging-area .btn-group {
                    border: 1px solid ${skin_doc.primary_buttons_background_color} !important;
                }

                .btn-paging.btn-info,
                .btn-paging:hover {
                    background-color: ${skin_doc.primary_buttons_background_color} !important;
                    color: ${skin_doc.primary_buttons_text_color} !important;
                }

                .filter-box {
                    .awesomplete>[role=listbox],
                    .awesomplete>[role=listbox] [role="option"],
                    select {
                        background-color: ${skin_doc.list_page_background_color} !important;
                    }

                    .awesomplete>[role=listbox] [role="option"]:hover,
                    select option:hover {
                        background-color: ${skin_doc.primary_buttons_background_color} !important;
                        color: ${skin_doc.primary_buttons_text_color} !important;
                    }
                }

                .sort-selector  {
                    .dropdown-menu .btn-reset:hover,
                    .dropdown-menu .dropdown-item:hover,
                    .recent-item:not(.no-hover):hover {
                        background-color: ${skin_doc.primary_buttons_background_color} !important;
                    }

                    .dropdown-menu .btn-reset:hover,
                    .dropdown-menu .dropdown-item:hover,
                    .recent-item:not(.no-hover):hover,
                    .recent-item:not(.no-hover):hover .notification-timestamp {
                        color: ${skin_doc.primary_buttons_text_color} !important;
                    }
                }
            `, "list-background" + id_prefix)

            if (skin_doc.list_page_muted_color) {
                frappe.dom.set_style(`
                    .page-form {
                        border-bottom: 1px solid ${skin_doc.list_page_muted_color} !important;
                    }

                    .list-paging-area {
                        border-top: 1px solid ${skin_doc.list_page_muted_color} !important;
                    }

                    .list-row:hover:not(.list-row-head), .list-row-head:hover:not(.list-row-head),
                    .frappe-list input.list-check-all, input.list-row-checkbox {
                        background-color: ${skin_doc.list_page_muted_color} !important;
                    }

                    .btn-paging,
                    .list-row-head,
                    .page-form input,
                    .page-form select,
                    .page-form button,
                    .list-paging-area button,
                    .filter-popover .form-control {
                        background-color: ${skin_doc.list_page_muted_color} !important;
                        border: 1px solid ${skin_doc.list_page_muted_color} !important;
                    }

                    .filter-field {
                        .awesomplete>[role=listbox] {
                            background-color: ${skin_doc.list_page_background_color} !important;
                            scrollbar-color: ${skin_doc.list_page_muted_color} transparent !important;
                        }
                    }
                `, "list-foreground" + id_prefix)
            }

            const hover_background = skin_doc.primary_buttons_text_color == "#fff"? darken_color(skin_doc.primary_buttons_background_color, 0.4) : lighten_color(skin_doc.primary_buttons_background_color, 1);
            const hover_text = get_text_color(hover_background);
            if (skin_doc.primary_buttons_hover_animation == "Radial Fill") {
                frappe.dom.set_style(`
                    @keyframes radialFill {
                        0% {
                            background: radial-gradient(circle at center, ${hover_background} 100%, ${skin_doc.primary_buttons_background_color} 50%);
                        }
                        10% {
                            background: radial-gradient(circle at center, ${hover_background} 15%, ${skin_doc.primary_buttons_background_color} 10%);
                        }
                        20% {
                            background: radial-gradient(circle at center, ${hover_background} 30%, ${skin_doc.primary_buttons_background_color} 10%);
                        }
                        30% {
                            background: radial-gradient(circle at center, ${hover_background} 45%, ${skin_doc.primary_buttons_background_color} 50%);
                        }
                        40% {
                            background: radial-gradient(circle at center, ${hover_background} 60%, ${skin_doc.primary_buttons_background_color} 50%);
                        }
                        50% {
                            background: radial-gradient(circle at center, ${hover_background} 75%, ${skin_doc.primary_buttons_background_color} 50%);
                        }
                        60% {
                            background: radial-gradient(circle at center, ${hover_background} 90%, ${skin_doc.primary_buttons_background_color} 50%);
                        }
                        70% {
                            background: radial-gradient(circle at center, ${hover_background} 105%, ${skin_doc.primary_buttons_background_color} 50%);
                        }
                        80% {
                            background: radial-gradient(circle at center, ${hover_background} 120%, ${skin_doc.primary_buttons_background_color} 50%);
                        }
                        90% {
                            background: radial-gradient(circle at center, ${hover_background} 135%, ${skin_doc.primary_buttons_background_color} 50%);
                        }
                        100% {
                            background: radial-gradient(circle at center, ${hover_background} 150%, ${skin_doc.primary_buttons_background_color} 50%);
                        }
                    }

                    .page-head {
                        .btn.btn-primary:hover, 
                        .btn.btn-primary:active, 
                        .btn.btn-primary:focus {
                            animation: radialFill 0.4s forwards;
                            color: ${hover_text} !important;
                        }
                    }
                `, "animation-radial-fill" + id_prefix)
            }
            else if (skin_doc.primary_buttons_hover_animation == "Wipe") {
                frappe.dom.set_style(`
                    @keyframes wipe {
                        from {
                            background-size: 0% 100%;
                        }
                        to {
                            background-size: 100% 100%;
                        }
                    }

                    .page-head {
                        .btn.btn-primary {
                            background-image: linear-gradient(90deg, ${hover_background} 0%, ${hover_background} 100%);
                            background-repeat: no-repeat;
                            background-size: 0% 100%;
                        }

                        .btn.btn-primary:hover, 
                        .btn.btn-primary:active, 
                        .btn.btn-primary:focus {
                            animation: wipe 0.3s forwards ;
                            color: ${hover_text} !important;
                        }
                    }
                `, "animation-wipe" + id_prefix)
            }
            else if (skin_doc.primary_buttons_hover_animation == "Grow") {
                frappe.dom.set_style(`
                    .page-head {
                        .btn.btn-primary {
                            transition: scale 0.3s ease-in-out;
                        }

                        .btn.btn-primary:hover, 
                        .btn.btn-primary:active, 
                        .btn.btn-primary:focus {
                            scale: 1.1;
                        }
                    }
                `, "animation-grow" + id_prefix)
            }
            else if (skin_doc.primary_buttons_hover_animation == "Shrink") {
                frappe.dom.set_style(`
                    .page-head {
                        .btn.btn-primary {
                            transition: scale 0.3s ease-in-out;
                        }

                        .btn.btn-primary:hover, 
                        .btn.btn-primary:active, 
                        .btn.btn-primary:focus {
                            scale: 0.9;
                        }
                    }
                `, "animation-shrink" + id_prefix)
            }
        }
    },

    delete_stylesheets: function () {
        [
            "set-skin-effect",
            "basic-preview",
            "secondary-btn-border-preview",
            "button-dropdowns-preview",
            "button-dropdowns-items-preview",
            "main-preview",
            "default-btn-preview",
            "navbar-basics-preview",
            "navbar-bg-preview",
            "navbar-dropdowns-preview",
            "sidebar-background-preview",
            "sidebar-foreground-preview",
            "sidebar-main-preview",
            "workspace-preview",
            "form-background-preview",
            "form-foreground-preview",
            "form-popups-preview",
            "form-popups-border-preview",
            "list-background-preview",
            "list-foreground-preview"
        ].forEach((style_id) => {
            let style_node = $(`#${style_id}`);
            if (style_node.length > 0) $(`#${style_id}`).remove();
        });
    },

    create_stylesheet_preview: function () {
        frappe.dom.set_style(`
            @keyframes colorBorder {
                0% {
                    box-shadow: 0px 0px 0px 10px #ff5959;
                }

                25% {
                    box-shadow: 0px 0px 0px 10px #8fbaff;
                }

                50% {
                    box-shadow: 0px 0px 0px 10px #fdff76;
                }

                75% {
                    box-shadow: 0px 0px 0px 10px #8fbaff;
                }

                100% {
                    box-shadow: 0px 0px 0px 10px #ff5959;
                }
            }

            .main-section {
                transition: scale 0.125s ease-in;
            }

            .main-section.skin-preview {
                animation: colorBorder 5s linear infinite;
                overflow: hidden;
                box-sizing: border-box;
                scale: 0.95;
                border-radius: 20px;
                height: 100vh;
                width: 100vw;
            }

            .modal-backdrop.show {
                opacity: 1 !important;
            }

            .modal-backdrop {
                background: linear-gradient(90deg,rgba(8, 0, 0, 0) 75%, rgba(10, 0, 0, 0.45) 100%) !important;
            }

            .modal-dialog {
                width: 400px !important;
                margin: 2.5rem !important;
            }

            .modal.show[style*="display: block"] {
                display: flex !important;
                justify-content: flex-end !important;
            }

            .modal.show[style*="display: block"] {
                display: flex !important;
                justify-content: flex-end !important;
            }
        `, "set-skin-effect");
    }
}