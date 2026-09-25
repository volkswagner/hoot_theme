Based on tahir-3's [Owl Theme](https://github.com/tahir-3/owl_theme)

## Owl Theme (AKA Hoot Theme)

### Overview
Owl Theme is a theming app for Frappe 15 that allows users to freely customize their site and make it their own.

### Features
1. **Individual customization for Light and Dark themes called skins (Hoot Skin)**

    You can assign a different skin for Light and Dark themes so your site can have distinct looks.
<img width="1920" height="947" alt="individual customization for Light and Dark themes called skins" src="https://github.com/user-attachments/assets/52cfcd3c-4af2-48c8-9b55-073b1380f1fa" />

2. **Specific theming for buttons, the desk and the portal page**

    Customization is not only limited to the desk. You can showcase your company identity by applying your brand colors from the buttons, desk and portal page.
<img width="1920" height="947" alt="Screenshot 2026-09-21 at 21-57-35 Sky" src="https://github.com/user-attachments/assets/daab953d-58e7-4c51-ae91-b1d7b032dc10" />

3. **Full adaptive theming for the desk including dropdowns, form fields, scrollbars, and icons**

    Colors are not only applied to the background or text but also to the surrounding UI elements.
<img width="1919" height="944" alt="full adaptive theming for the desk including dropdowns, form fields, scrollbars, and icons" src="https://github.com/user-attachments/assets/da539066-8d3e-4e4c-9b9c-fecfbdeecb3b" />

4. **Auto-Theme feature that generates a whole color palette based on a color accent**

   Owl Theme can lay the groundwork for you through Auto-Theme. Just select a background color for the primary button and click the Auto-Theme button. Automatically, a color palette will be generated for you.
<img width="1920" height="947" alt="Auto-Theme feature that generates a whole color palette based on a color accent" src="https://github.com/user-attachments/assets/030a2440-bc1d-4ae2-9d0a-01b3a13f3718" />

6. **Separate site-wide skin and user-specific skin**

    You can let your users personalize their desks and select skins.
<img width="1920" height="947" alt="separate site-wide skin and user-specific skin" src="https://github.com/user-attachments/assets/b45e8990-54de-4d64-810e-15ddf4583d5e" />

6. **Real-time preview**

    Each change in the skin is automatically reflected in the preview so you won’t second guess if your edits would look right.
<img width="1920" height="947" alt="real-time preview" src="https://github.com/user-attachments/assets/e8c2109a-fe11-4b95-a9b5-e2fd83af5f89" />

7. **Advanced portal page theming**

    Not only can you change the portal page background color but also the welcome message and the login form appearance.
<img width="1920" height="947" alt="advanced portal page theming" src="https://github.com/user-attachments/assets/4c511f47-e4f1-4aa3-85e8-cd022845d1a9" />

### Enhancements
1. **Adaptive text coloring for Number Card widgets**

    The Number Card title and subtitle are automatically colored white or black depending on the brightness of the background color.
<img width="1920" height="947" alt="adaptive text coloring for Number Card widgets" src="https://github.com/user-attachments/assets/c2a78ba6-f59d-4cba-9da7-5f7121fe9d98" />

### Installation
````
bench get-app https://github.com/volkswagner/erpusa/owl_theme
bench --site [site_name] install-app owl_theme
bench --site [site_name] migrate
bench --site [site_name] build
bench restart
````
