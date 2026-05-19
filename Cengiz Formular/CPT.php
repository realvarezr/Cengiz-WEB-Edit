
/**
 * Custom Post Type: Kindergeburtstage
 */

function cg_register_kindergeburtstag_cpt() {

    register_post_type('kindergeburtstag', [
        'labels' => [
            'name'               => 'Kindergeburtstage',
            'singular_name'      => 'Kindergeburtstag',
            'add_new'            => 'Neue Anfrage',
            'add_new_item'       => 'Neue Geburtstagsanfrage',
            'edit_item'          => 'Anfrage bearbeiten',
            'new_item'           => 'Neue Anfrage',
            'view_item'          => 'Anfrage ansehen',
            'search_items'       => 'Anfragen suchen',
            'not_found'          => 'Keine Anfragen gefunden',
            'not_found_in_trash' => 'Keine Anfragen im Papierkorb',
        ],
        'public'       => false,
        'show_ui'      => true,
        'menu_icon'    => 'dashicons-buddicons-buddypress-logo',
        'supports'     => ['title'],
        'capability_type' => 'post',
    ]);
}

add_action('init', 'cg_register_kindergeburtstag_cpt');
