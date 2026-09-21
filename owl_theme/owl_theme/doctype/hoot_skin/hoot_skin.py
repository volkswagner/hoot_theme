# Copyright (c) 2026, tahirzaqout and contributors
# For license information, please see license.txt

import frappe
from frappe import _
from frappe.model.document import Document

class HootSkin(Document):
	def validate(self):
		if self.default and not self.enabled:
			frappe.throw(_("Default skins can't be enabled."))

	def get_indicator(self):
		if self.default:
			return [frappe._("Global Default"), "green", "default,=,1"]
		return [frappe._("Enabled"), "blue", "enabled,=,1"]

	@frappe.whitelist()
	def set_skin(self):
		target_field = "light_theme_skin" if self.for_theme == "Light" else "dark_theme_skin"
		current_default = frappe.db.get_single_value("Owl Theme Settings", target_field)
		
		try:
			frappe.db.set_single_value("Owl Theme Settings", target_field, self.name)

		except Exception as e:
			frappe.throw(str(e))

		set_default_hoot_skin(target_field, current_default, self.name)

		return 'success'

def set_default_hoot_skin(target_field, current_default, new_default):
	try:
		if current_default:
			frappe.db.set_value("Hoot Skin", current_default, "default", 0)

		frappe.db.set_value("Hoot Skin", new_default, "default", 1)

	except Exception as e:
		frappe.throw(str(e))

@frappe.whitelist()
def get_skins_and_user_defaults(user, for_theme):
	return {
		'skins': frappe.db.get_all("Hoot Skin", fields=["*"], filters={'enabled': 1, 'for_theme': for_theme}),
		'light_theme_default': frappe.db.get_value("User Theme Settings", user, "light_theme_skin"),
		'dark_theme_default': frappe.db.get_value("User Theme Settings", user, "dark_theme_skin")
	}

@frappe.whitelist()
def set_user_theme_settings(user, skin, for_theme):
	user_theme_settings = frappe.db.exists("User Theme Settings", {'user': user})
	if user_theme_settings:
		user_theme_settings_doc = frappe.get_doc("User Theme Settings", user_theme_settings)
	else:
		user_theme_settings_doc = frappe.new_doc("User Theme Settings")

	user_theme_settings_doc.user = user
	skin_to_modify = "light_theme_skin" if for_theme == "Light" else "dark_theme_skin"
	user_theme_settings_doc.update({
		skin_to_modify:  skin if skin != "-" else None
	})

	try:
		user_theme_settings_doc.save()

	except Exception as e:
		frappe.throw(str(e))

	return "success"
