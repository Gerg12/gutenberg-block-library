# Custom Block Plugin

This WordPress plugin enhances the Gutenberg block editor by introducing a custom hero block and a custom flex cards block with unique features.

## Installation

1. Upload the entire `custom-block-plugin` folder to the `/wp-content/plugins/` directory.
2. Activate the plugin through the 'Plugins' menu in WordPress.

## Usage

1. Create or edit a post/page.
2. Insert the "Custom Hero Block" from the "Common Blocks" category in the Gutenberg editor.
3. Customize the block settings, including title, text, image, and buttons.
4. Save the post/page.

![image](https://github.com/Gerg12/gutenberg-block-library/assets/25252407/ed27c68d-61df-4285-b41d-79306b092181)

## Custom Hero Block Features

- **Title:** Add a custom title for the hero block.
- **Image:** Upload an image to be displayed in the hero section.
- **Font Size Settings:** Control the default font size and font size above 768px.

## How to Use the Custom Hero Block

The custom hero block provides a visually appealing and customizable way to enhance the design of your WordPress posts and pages. Follow these steps to make the most of its features:

1. **Title:** Enter a unique and engaging title for your hero block using the RichText editor.

2. **Image:** Upload an image that complements your content. Click the "Select Image" button in the toolbar to choose the perfect image for your hero section.

3. **Font Size Settings:** Fine-tune the font size of your hero block. Use the RangeControl settings in the InspectorControls panel to adjust the default font size and the font size above 768px.

4. **Block Controls:** The toolbar provides additional controls, including the ability to change the hero image. Click "Select Image" to open the MediaUpload and choose or change the hero image.

5. **Save:** Don't forget to save your post or page after customizing the hero block to ensure your changes are applied.

## Flex Cards Block

In addition to the custom hero block, this plugin also introduces a "Flex Cards Block" that allows you to create dynamic and responsive card layouts.

![image](https://github.com/Gerg12/gutenberg-block-library/assets/25252407/ff648cb2-2b82-400d-9f9a-4f0f6e1b06c7)

### Flex Cards Block Features

- **Add and Remove Cards:** Easily add or remove cards to customize your content.
- **Blocks Per Row:** Control the number of blocks displayed per row with the Blocks Per Row radio control.

### How to Use the Flex Cards Block

1. **Add Card:** Click the "Add Card" button in the Flex Cards panel to add a new card. Customize the title, text, image, and link for each card.

2. **Blocks Per Row:** Use the Blocks Per Row radio control in the InspectorControls panel to adjust the layout according to your preferences.

3. **Remove Card:** Each card includes a "Remove Card" button for easy removal, providing flexibility in your design.

4. **Save:** Save your changes to apply the Flex Cards Block layout to your post or page.

Explore the possibilities of these custom blocks to create visually appealing and engaging content on your WordPress site!

### How to Build the Plugin

"npm run build": "webpack --mode=production",
"npm run watch": "webpack --watch --mode=development"
