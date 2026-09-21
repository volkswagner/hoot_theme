// Copyright (c) 2025, tahirzaqout and contributors
// For license information, please see license.txt

frappe.ui.form.on("Owl Theme Settings", {
	refresh(frm) {

	},

	after_save(frm) {
		frappe.ui.toolbar.clear_cache();
	}
});