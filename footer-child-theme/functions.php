<?php
/**
 * Astra Child Theme — Cengiz Gastro
 * functions.php
 */

add_action( 'wp_enqueue_scripts', function() {
    wp_enqueue_style(
        'cg-footer-css',
        get_stylesheet_directory_uri() . '/assets/css/footer.css',
        [],
        '1.0.0'
    );
} );
