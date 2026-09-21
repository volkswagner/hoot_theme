# Copyright (c) 2025, tahirzaqout and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from owl_theme.owl_theme.doctype.hoot_skin.hoot_skin import set_default_hoot_skin


class OwlThemeSettings(Document):
	def validate(self):
		self.change_splash_image_or_favicon()
		
		old_doc = self.get_doc_before_save()
		for target_field in ["light_theme_skin", "dark_theme_skin"]:
			set_default_hoot_skin(target_field, old_doc.get(target_field), self.get(target_field))


	def change_splash_image_or_favicon(self):
		# change splash image or favicon in wbsite settings after change in owl theme settings
		if self.has_value_changed("splash_image"):
			self.apply_changes_to_website_settings("splash_image")

		if self.has_value_changed("favicon"):
			self.apply_changes_to_website_settings("favicon")


	def apply_changes_to_website_settings(self, fieldname):
		website_settings = frappe.get_single("Website Settings")
		website_settings.set(fieldname, self.get(fieldname))
		website_settings.save()
		frappe.clear_cache()

@frappe.whitelist()
def get_skin_settings(user, theme):
	skin = frappe.db.get_single_value("Owl Theme Settings", "light_theme_skin" if theme == "light" else "dark_theme_skin")

	if frappe.db.get_single_value("Owl Theme Settings", "allow_user_customization"):
		user_settings = frappe.db.exists("User Theme Settings", {'user': user})

		if user_settings:
			user_skin = frappe.db.get_value("User Theme Settings", user_settings, "light_theme_skin" if theme == "light" else "dark_theme_skin")

			if user_skin:
				skin = user_skin

	return {
		'skin': frappe.get_doc("Hoot Skin", skin) if skin else {},
		'autoreload_on_theme_change': frappe.db.get_single_value("Owl Theme Settings", "autoreload_on_theme_change")
	}