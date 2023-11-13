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

    // Register the block type
    register_block_type('custom-block-plugin/hero-general', array(
        'editor_script' => 'custom-block',
        'render_callback' => 'custom_block_render_callback',
        'attributes' => array(
            'heroGeneralTitle' => array(
                'type' => 'string',
                'default' => 'Default Title',
                'source' => 'html',
                'selector' => '.hero-general__title',
            ),
            'heroGeneralImage' => array(
                'type' => 'string',
                'default' => null,
            ),
        ),
    ));
}

add_action('init', 'custom_block_register_block');

function custom_block_render_callback($attributes, $content) {
    // Check if heroGeneralImage key exists in attributes, if not, provide a default value
    $heroGeneralImage = isset($attributes['heroGeneralImage']) ? esc_url($attributes['heroGeneralImage']) : '';

    ob_start(); ?>

    <section id="hero-general" class="hero-general-section render">

        <div class="hero-general__image-box burns-container">
            <img class="burns-background-image" src="<?php echo $heroGeneralImage; ?>">
            <div class="hero-general-content">
							<h2 class="hero-general__title"><?php echo esc_html($attributes['heroGeneralTitle']); ?></h2>
            </div>
        </div>

    </section>

<?php
    return ob_get_clean();
}
