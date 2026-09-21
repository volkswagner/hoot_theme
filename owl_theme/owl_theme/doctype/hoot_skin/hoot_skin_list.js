frappe.listview_settings["Hoot Skin"] = {
    add_fields: ["default", "enabled"],

    get_indicator(doc) {
        if (doc.default) {
            return [__("Global Default"), "green", "default,=,1"];
        }
        else if (doc.enabled) {
            return [__("Enabled"), "blue", "enabled,=,1"];
        }

        return [__("Disabled"), "gray", "enabled,=,0"];
    }
};