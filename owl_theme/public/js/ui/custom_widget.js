frappe.widget.widget_factory.base.prototype.make_widget = function() {
    this.widget = $(`<div class="widget" data-widget-name="${this.name ? this.name : ""}">
        <div class="widget-head">
            <div class="widget-label">
                <div class="widget-title"></div>
                <div class="widget-subtitle"></div>
            </div>
            <div class="widget-control"></div>
        </div>
        <div class="widget-body"></div>
        <div class="widget-footer"></div>
    </div>`);

    this.title_field = this.widget.find(".widget-title");
    this.subtitle_field = this.widget.find(".widget-subtitle");
    this.body = this.widget.find(".widget-body");
    this.action_area = this.widget.find(".widget-control");
    this.head = this.widget.find(".widget-head");
    this.footer = this.widget.find(".widget-footer");
    if (this.widget_type == "number_card") {
        let widget_container = this['container'];
        let checkExist = setInterval(() => {
            // Works whether myVar is native DOM element or jQuery object
            let widget_container_node = widget_container.jquery ? widget_container[0] : widget_container;
            let widget_node = widget_container_node ? widget_container_node.querySelector('.number-widget-box') : null;

            if (widget_node) {
                console.log("Found inner div:", widget_node);
            
                const background_color_rgb = $(widget_node).css("background-color");
                const background_color_hex = owl_theme_utils.rbg_to_hex(background_color_rgb);
                const text_color = owl_theme_utils.get_text_color(background_color_hex);

                widget_node.querySelector(".dropdown").style.color = text_color;
                widget_node.querySelector(".widget-title").style.color = text_color;
                widget_node.querySelector(".widget-subtitle").style.color = owl_theme_utils.add_transparency(text_color, 0.75);
                clearInterval(checkExist);
            }
        }, 100);
    }

    this.refresh();
}