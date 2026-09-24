frappe.listview_settings["Hoot Skin"] = {
    add_fields: ["default", "enabled", "for_theme"],

    get_indicator(doc) {
        if (doc.default) {
            return [__("Global Default"), "green", "default,=,1"];
        }
        else if (doc.enabled) {
            return [__("Enabled"), "blue", "enabled,=,1"];
        }

        return [__("Disabled"), "gray", "enabled,=,0"];
    },

    formatters: {
        for_theme(val, df, doc) {
            // Render a custom HTML badge in the list row column
            if (val === "Dark") {
                return `<span class="filterable indicator-pill no-indicator-dot ellipsis" data-filter="for_theme,=,Dark" style="background-color: black; color: white">
					<span class="ellipsis"> Dark Theme </span>
				</span>`;
            } else {
                return `<span class="filterable indicator-pill no-indicator-dot ellipsis" data-filter="for_theme,=,Light" style="background-color: white; color: black">
					<span class="ellipsis"> Light Theme </span>
				</span>`;
            }
        }
    }
};