/**
 * Kindergeburtstag – Metabox Basisdaten (NEU)
 * Compatible 1:1 con CORE A+B+C
 */

add_action('add_meta_boxes', function () {
    add_meta_box(
        'kg_basisdaten_metabox_neu',
        '🧒 Kindergeburtstag – Basisdaten (NEU)',
        'kg_render_basisdaten_metabox_neu',
        'kindergeburtstag',
        'normal',
        'high'
    );
});

function kg_render_basisdaten_metabox_neu($post) {

    $fields = [
        'child_name'       => 'Name des Geburtstagskindes',
        'child_birthdate'  => 'Geburtsdatum des Kindes',
        'filiale'          => 'Schwimmbad – Filiale',
        'event_date'       => 'Datum der Feier',
        'event_block'      => 'Zeitblock',
        'package'          => 'Paket',
        'children_count'   => 'Anzahl der Kinder',
        'adults_count'     => 'Anzahl der Erwachsenen',
        'phone'            => 'Telefon',
        'email'            => 'E-Mail',
    ];

    echo '<style>
      .kg-box{background:#fff;border:1px solid #ddd;border-radius:8px;padding:12px}
      .kg-table{width:100%;border-collapse:collapse}
      .kg-table th{width:30%;text-align:left;padding:6px;background:#f5f5f5}
      .kg-table td{padding:6px}
      .kg-table tr:not(:last-child) td,
      .kg-table tr:not(:last-child) th{border-bottom:1px solid #eee}
    </style>';

    echo '<div class="kg-box"><table class="kg-table">';

    foreach ($fields as $key => $label) {
        $value = get_post_meta($post->ID, $key, true);
        if ($value === '' || $value === null) {
            $value = '–';
        } else {
            $value = esc_html($value);
        }

        echo '<tr>';
        echo '<th>' . esc_html($label) . '</th>';
        echo '<td>' . $value . '</td>';
        echo '</tr>';
    }

    echo '</table></div>';
}
