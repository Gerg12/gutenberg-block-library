<?php
/**
 * Plugin Name: Custom Block Plugin
 * Description: Custom Hero Block for WordPress.
 * Version: 1.0.0
 * Author: Your Name
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

// Enqueue the block assets.
function custom_block_enqueue_assets() {
    // Enqueue styles for both frontend and backend
    wp_enqueue_style(
        'custom-block-styles',
        plugins_url('dist/style.css', __FILE__), // Change to the compiled stylesheet
        array(), // Add dependencies if needed
        filemtime(plugin_dir_path(__FILE__) . 'dist/style.css')
    );

    // Enqueue the block script
    wp_enqueue_script(
        'custom-block-script',
        plugins_url('dist/block.build.js', __FILE__),
        array('wp-blocks', 'wp-i18n', 'wp-editor', 'wp-components'),
        filemtime(plugin_dir_path(__FILE__) . 'dist/block.build.js'),
        true
    );
}

// Hook into the editor and enqueue assets.
add_action('enqueue_block_assets', 'custom_block_enqueue_assets');

// Register the block and define its behavior.
function custom_block_register_block() {
    // Register the block script
    wp_register_script(
        'custom-block',
        plugins_url('dist/block.build.js', __FILE__),
        array('wp-blocks', 'wp-i18n', 'wp-editor', 'wp-components'),
        filemtime(plugin_dir_path(__FILE__) . 'dist/block.build.js'),
        true
    );


}
