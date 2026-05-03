<?php
/**
 * Astra Child Theme — Cengiz Gastro
 */

add_action( 'wp_enqueue_scripts', function() {
    wp_enqueue_style(
        'cg-font-awesome',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
        [],
        '6.5.1'
    );
    wp_enqueue_style(
        'cg-footer-css',
        get_stylesheet_directory_uri() . '/assets/css/footer.css',
        [ 'cg-font-awesome' ],
        filemtime( get_stylesheet_directory() . '/assets/css/footer.css' )
    );
} );

// Inyectar el footer personalizado después del footer de Astra
add_action( 'astra_footer_after', function() {
    include get_stylesheet_directory() . '/template-parts/footer.php';
} );
