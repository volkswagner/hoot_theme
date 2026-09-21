frappe.ui.Sidebar = class CustomSidebar extends frappe.ui.Sidebar{
    constructor(){
        super();
        this.changeStyle();
    }
    changeStyle(){
        frappe.db.get_doc("Owl Theme Settings", "Owl Theme Settings")
            .then(doc => {
                const skin = $("[data-theme]").attr("data-theme") == "light"? doc.light_theme_skin : doc.dark_theme_skin;
                if (skin) {
                    frappe.db.get_doc("Hoot Skin", skin)
                    .then(skin_doc => {
                        const skin = $("[data-theme]").attr("data-theme") == "light"? skin_doc.light_theme_skin : skin_doc.dark_theme_skin;
                        if (skin_doc) {
                            // $(".standard-sidebar-item a").css("color", skin_doc.sidebar_text_color);
                            // $(".standard-sidebar-item").css("background-color", undefined);
                            // $(".standard-sidebar-item.selected").css("background-color", skin_doc.secondary_buttons_background_color);
                        }
                    }).catch(error => {
                        console.error("Error details:", error);
                    });
                }
            }).catch(error => {
                console.error("Error details:", error);
            });
    }
}