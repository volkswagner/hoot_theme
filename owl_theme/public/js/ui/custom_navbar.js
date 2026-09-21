
frappe.ui.toolbar.Toolbar = class CustomNavbar extends frappe.ui.toolbar.Toolbar{
    constructor(){
        super();
        $(() => {
            this.changeStyle();
        });
    }
    changeStyle(){
        const apply_style = () => {
            frappe.call({
                method: "owl_theme.owl_theme.doctype.owl_theme_settings.owl_theme_settings.get_skin_settings",
                args: {
                    user: frappe.session.user,
                    theme: $("[data-theme]").attr("data-theme")
                },
                callback: function(r) {
                    if (r.message) {
                        if (r.message.skin) {
                            owl_theme_utils.create_stylesheet(r.message.skin);
                        }

                        if (r.message.autoreload_on_theme_change) {
                            const html = document.querySelector("html");

                            const observerCallback = (mutationList, observer) => {
                                for (const mutation of mutationList) {
                                    if (mutation.type === "attributes" && mutation.attributeName === "data-theme") {
                                        return frappe.ui.toolbar.clear_cache();
                                    }
                                }
                            };

                            const observer = new MutationObserver(observerCallback);
                            observer.observe(html, {attributes: true});
                        }
                    }
                }
            });
        }

        apply_style();

        $(document).on("page-change", () => {
            apply_style();
        });
    }
}