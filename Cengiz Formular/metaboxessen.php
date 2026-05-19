/**
 * Kindergeburtstag – Metabox: Essensauswahl (NEU)
 * Lee 1:1 los meta_keys del CORE A+B+C
 */

add_action('add_meta_boxes', function () {
    add_meta_box(
        'kg_essensauswahl_metabox_neu',
        '🍽 Essensauswahl (optional) – NEU',
        'kg_render_essensauswahl_metabox_neu',
        'kindergeburtstag',
        'normal',
        'default'
    );
});

function kg_render_essensauswahl_metabox_neu($post) {

    // Campos y etiquetas (meta_key => label)
    $groups = [
        'Hauptspeisen' => [
            'food_grillwurst'  => 'Grillwurst mit Pommes',
            'food_nuggets'     => 'Chicken Nuggets mit Pommes',
            'food_currywurst'  => 'Currywurst mit Pommes',
        ],
        'Dessert' => [
            'dessert_muffin_oreo'   => 'Muffin Oreo',
            'dessert_muffin_milka'  => 'Muffin Milka',
            'dessert_donut_oreo'    => 'Donut Oreo',
            'dessert_donut_milka'   => 'Donut Milka',
            'dessert_donut_pink'    => 'Donut Pink',
        ],
        'Alternativ (Eistorte)' => [
            'bistorte_bubblegum'    => 'Eistorte Bubblegum',
            'bistorte_tutti_frutti' => 'Eistorte Tutti Frutti',
        ],
        'Extras' => [
            'extra_wundertuete'     => 'Wundertüte',
        ],
    ];

    echo '<style>
      .kg-food-wrap{background:#fff;border:1px solid #e5e5e5;border-radius:10px;padding:12px}
      .kg-food-group{margin:0 0 14px 0}
      .kg-food-title{font-weight:700;margin:10px 0 6px}
      .kg-food-table{width:100%;border-collapse:collapse}
      .kg-food-table th{width:70%;text-align:left;padding:8px;background:#f7f7f7;vertical-align:top}
      .kg-food-table td{padding:8px;text-align:right}
      .kg-food-table tr:not(:last-child) td,
      .kg-food-table tr:not(:last-child) th{border-bottom:1px solid #eee}
      .kg-muted{color:#666;font-style:italic}
      .kg-badge{display:inline-block;padding:2px 8px;border-radius:999px;background:#f1f1f1}
    </style>';

    // Detectar si hay alguna selección > 0
    $has_any = false;
    foreach ($groups as $items) {
        foreach ($items as $key => $label) {
            $val = (int) get_post_meta($post->ID, $key, true);
            if ($val > 0) { $has_any = true; break 2; }
        }
    }

    echo '<div class="kg-food-wrap">';

    if (!$has_any) {
        echo '<p class="kg-muted">Keine Auswahl.</p>';
        echo '</div>';
        return;
    }

    foreach ($groups as $group_title => $items) {

        // Solo mostrar grupos que tengan algo > 0
        $rows = [];
        foreach ($items as $key => $label) {
            $val = (int) get_post_meta($post->ID, $key, true);
            if ($val > 0) {
                $rows[] = [$label, $val];
            }
        }
        if (empty($rows)) continue;

        echo '<div class="kg-food-group">';
        echo '<div class="kg-food-title">' . esc_html($group_title) . '</div>';
        echo '<table class="kg-food-table">';

        foreach ($rows as [$label, $val]) {
            echo '<tr>';
            echo '<th>' . esc_html($label) . '</th>';
            echo '<td><span class="kg-badge">' . esc_html((string)$val) . '</span></td>';
            echo '</tr>';
        }

        echo '</table>';
        echo '</div>';
    }

    echo '</div>';
}
