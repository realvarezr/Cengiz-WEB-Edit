/**
 * Kindergeburtstag – CORE (A+B+C) + E-Mail + .ICS (Outlook)
 * A) Max. 2 Reserven pro Block & Filiale
 * B) Juni–August NICHT buchbar
 * C) Termin mindestens 72h in der Zukunft
 * D) Denzlingen: Mittwochs geschlossen
 */

add_action('wp_ajax_test_form_submit', 'kg_core_handle');
add_action('wp_ajax_nopriv_test_form_submit', 'kg_core_handle');

function kg_ics_escape($text) {
    $text = (string) $text;
    $text = str_replace(["\r\n", "\r", "\n"], "\\n", $text);
    $text = str_replace("\\", "\\\\", $text);
    $text = str_replace(";", "\;", $text);
    $text = str_replace(",", "\,", $text);
    return $text;
}

function kg_core_handle() {

    // ===== 1) BASIS-VALIDIERUNG =====
    $required = ['child_name', 'event_date', 'event_block', 'filiale'];
    foreach ($required as $field) {
        if (empty($_POST[$field])) {
            wp_send_json_success(['message' => 'Bitte alle Pflichtfelder ausfüllen.']);
        }
    }

    $child_name  = sanitize_text_field($_POST['child_name']);
    $event_date  = sanitize_text_field($_POST['event_date']);
    $event_block = sanitize_text_field($_POST['event_block']);
    $filiale     = sanitize_text_field($_POST['filiale']);

    // ===== 2) B) JUNI–AUGUST NICHT BUCHBAR =====
    $month = (int) date('n', strtotime($event_date));
    if (in_array($month, [6, 7, 8], true)) {
        wp_send_json_success(['message' => 'In den Monaten Juni, Juli und August sind keine Kindergeburtstage buchbar.']);
    }

    // ===== 3) C) TERMIN MINDESTENS 72H =====
    $now = current_time('timestamp');
    $event_ts = strtotime($event_date . ' 00:00');
    if ($event_ts < ($now + 72 * 3600)) {
        wp_send_json_success(['message' => 'Reservierungen sind nur möglich, wenn der Termin mindestens 72 Stunden in der Zukunft liegt.']);
    }

    // ===== 3.1) D) DENZLINGEN MITTWOCHS GESCHLOSSEN =====
    $weekday = (int) date('N', strtotime($event_date)); // 3 = Mittwoch
    if (stripos($filiale, 'denzlingen') !== false && $weekday === 3) {
        wp_send_json_success(['message' => 'In der Filiale Denzlingen sind mittwochs keine Reservierungen möglich.']);
    }
	// ===== 3.2 E) ETTLINGEN MONTAGS GESCHLOSSEN =====
$weekday = (int) date('N', strtotime($event_date)); // 1 = Montag
if (stripos($filiale, 'ettlingen') !== false && $weekday === 1) {
    wp_send_json_success([
        'message' => 'In der Filiale Ettlingen sind montags keine Reservierungen möglich.'
    ]);
}

// ===== 3.3 F) FREIBURG HASLACH – LETZTER BLOCK NICHT BUCHBAR =====
if (stripos($filiale, 'haslach') !== false && $event_block === '17:30-20:00') {
    wp_send_json_success([
        'message' => 'Im Standort Freiburg Haslach ist der Zeitblock 17:30–20:00 Uhr derzeit nicht buchbar.'
    ]);
}

// ===== TEMPORÄR: DENZLINGEN GESCHLOSSEN (13.04 – 20.04.2026) =====
$start_closed = '2026-04-13';
$end_closed   = '2026-04-20';

if (
    stripos($filiale, 'denzlingen') !== false &&
    $event_date >= $start_closed &&
    $event_date <= $end_closed
) {
    wp_send_json_success([
        'message' => 'Die Filiale Denzlingen bleibt vom 13.04. bis 20.04.2026 wegen Renovierungsarbeiten geschlossen. In diesem Zeitraum sind keine Reservierungen möglich.'
    ]);
}
	// ===== TEMPORÄR: OFFENBURG GESCHLOSSEN (14.09 – 24.09.2026) =====
$start_closed = '2026-09-14';
$end_closed   = '2026-09-24';

if (
    stripos($filiale, 'offenburg') !== false &&
    $event_date >= $start_closed &&
    $event_date <= $end_closed
) {
    wp_send_json_success([
        'message' => 'Die Filiale Offenburg bleibt vom 14.09. bis 24.09.2026 wegen Renovierungsarbeiten geschlossen. In diesem Zeitraum sind keine Reservierungen möglich.'
    ]);
}
    // ===== 4) A) MAX. 2 RESERVEN =====
    $existing = get_posts([
        'post_type' => 'kindergeburtstag',
        'post_status' => 'publish',
        'numberposts' => -1,
        'meta_query' => [
            ['key' => 'event_date', 'value' => $event_date],
            ['key' => 'event_block', 'value' => $event_block],
            ['key' => 'filiale', 'value' => $filiale],
        ],
    ]);

    if (count($existing) >= 2) {
        wp_send_json_success(['message' => 'Dieser Zeitblock ist in dieser Filiale bereits ausgebucht.']);
    }
	

    // ===== 5) POST =====
    $post_id = wp_insert_post([
        'post_type' => 'kindergeburtstag',
        'post_title' => $child_name . ' – ' . $event_date,
        'post_status' => 'publish',
    ]);

    if (!$post_id || is_wp_error($post_id)) {
        wp_send_json_success(['message' => 'Fehler beim Speichern der Anfrage.']);
    }

    // ===== 6) METAS =====
    update_post_meta($post_id, 'child_name', $child_name);
    update_post_meta($post_id, 'child_birthdate', sanitize_text_field($_POST['child_birthdate'] ?? ''));
    update_post_meta($post_id, 'filiale', $filiale);
    update_post_meta($post_id, 'phone', sanitize_text_field($_POST['phone'] ?? ''));
    update_post_meta($post_id, 'email', sanitize_email($_POST['email'] ?? ''));
    update_post_meta($post_id, 'children_count', intval($_POST['children_count'] ?? 0));
    update_post_meta($post_id, 'adults_count', intval($_POST['adults_count'] ?? 0));
    update_post_meta($post_id, 'package', sanitize_text_field($_POST['package'] ?? ''));
    update_post_meta($post_id, 'event_date', $event_date);
    update_post_meta($post_id, 'event_block', $event_block);

    foreach ([
        'food_grillwurst','food_nuggets','food_currywurst',
        'dessert_muffin_oreo','dessert_muffin_milka',
        'dessert_donut_oreo','dessert_donut_milka','dessert_donut_pink',
        'bistorte_bubblegum','bistorte_tutti_frutti','extra_wundertuete'
    ] as $k) {
        update_post_meta($post_id, $k, intval($_POST[$k] ?? 0));
    }

    // ==============================
// EMAIL NOTIFICATION
// ==============================

$to = [
    
	'event@cengiz-gastro.de'
	
];

$subject = 'Neue Kindergeburtstag-Anfrage';


// ----- BASISDATEN -----
$child_name = sanitize_text_field($_POST['child_name'] ?? '');

$message  = "Neue Anfrage für einen Kindergeburtstag\n\n";
$message .= "==============================\n";
$message .= "Name des Geburtstagskindes: {$child_name}\n";
$message .= "Geburtsdatum des Kindes: " . sanitize_text_field($_POST['child_birthdate'] ?? '-') . "\n";
$message .= "Filiale: " . sanitize_text_field($_POST['filiale'] ?? '-') . "\n";
$message .= "Datum der Feier: " . sanitize_text_field($_POST['event_date'] ?? '-') . "\n";
$message .= "Zeitblock: " . sanitize_text_field($_POST['event_block'] ?? '-') . "\n\n";

$message .= "Paket: " . sanitize_text_field($_POST['package'] ?? '-') . "\n";
$message .= "Kinder: " . intval($_POST['children_count'] ?? 0) . "\n";
$message .= "Erwachsene: " . intval($_POST['adults_count'] ?? 0) . "\n\n";

$message .= "Kontakt:\n";
$message .= "Telefon: " . sanitize_text_field($_POST['phone'] ?? '-') . "\n";
$message .= "E-Mail: " . sanitize_email($_POST['email'] ?? '-') . "\n\n";


// ==============================
// AUTO-REPLY AL CLIENTE
// ==============================

$client_email = sanitize_email($_POST['email'] ?? '');

if (!empty($client_email)) {

    $full_name = trim($child_name);
    $parts = preg_split('/\s+/', $full_name);
    $last_name = end($parts);

    $reply_subject = 'Ihre Anfrage zum Kindergeburtstag';

    $reply_message  = "Liebe Familie {$last_name},\n\n";
    $reply_message .= "vielen Dank für Ihre Anfrage zu unseren Kindergeburtstagspaketen und das Interesse an Cengiz Schwimmbad- und Eventgastronomie.\n\n";
    $reply_message .= "Wir haben Ihre Anfrage erhalten und prüfen aktuell die Verfügbarkeit sowie die gewünschten Details.\n";
    $reply_message .= "Sie erhalten in Kürze eine persönliche Rückmeldung von uns mit allen weiteren Informationen.\n\n";
    $reply_message .= "Sollten Sie in der Zwischenzeit noch Fragen oder Ergänzungen haben, können Sie uns jederzeit gerne antworten.\n\n";
    $reply_message .= "Mit entspannten Grüßen\n\n";
    $reply_message .= "Katharina Diener\n";
    $reply_message .= "- Eventmanagement -\n\n";
    $reply_message .= "Cengiz Schwimmbad- und Eventgastronomie\n";
    $reply_message .= "Am Kapellenberg 18\n";
    $reply_message .= "77723 Gengenbach-Bermersbach\n";
    $reply_message .= "Mobil: +49 176 614 183 92\n";
    $reply_message .= "Mail: event@cengiz-gastro.de\n";
    $reply_message .= "www.cengiz-gastro.de\n";

    $reply_headers = [
    'Content-Type: text/plain; charset=UTF-8',
    'Reply-To: event@cengiz-gastro.de'
];


    wp_mail($client_email, $reply_subject, $reply_message, $reply_headers);
}


// ----- ESSENSAUSWAHL -----
$message .= "==============================\n";
$message .= "Essensauswahl:\n";

$food_fields = [
    'food_grillwurst'        => 'Grillwurst mit Pommes',
    'food_nuggets'           => 'Chicken Nuggets mit Pommes',
    'food_currywurst'        => 'Currywurst mit Pommes',
    'dessert_muffin_oreo'    => 'Muffin Oreo',
    'dessert_muffin_milka'   => 'Muffin Milka',
    'dessert_donut_oreo'     => 'Donut Oreo',
    'dessert_donut_milka'    => 'Donut Milka',
    'dessert_donut_pink'     => 'Donut Pink',
    'bistorte_bubblegum'     => 'Bistorte Bubblegum',
    'bistorte_tutti_frutti'  => 'Bistorte Tutti Frutti',
    'extra_wundertuete'      => 'Wundertüte'
];

$has_food = false;

foreach ($food_fields as $key => $label) {
    $value = intval($_POST[$key] ?? 0);
    if ($value > 0) {
        $has_food = true;
        $message .= "- {$label}: {$value}\n";
    }
}

if (!$has_food) {
    $message .= "- Keine Auswahl\n";
}

$headers = ['Content-Type: text/plain; charset=UTF-8'];


// ==============================
// .ICS
// ==============================

$block_times = [
    '11:30-14:00' => ['11:30', '14:00'],
    '14:30-17:00' => ['14:30', '17:00'],
    '17:30-20:00' => ['17:30', '20:00'],
];

$start = $block_times[$event_block][0] ?? '00:00';
$end   = $block_times[$event_block][1] ?? '00:00';

$dt_start = date('Ymd\THis', strtotime("$event_date $start"));
$dt_end   = date('Ymd\THis', strtotime("$event_date $end"));
$dt_stamp = gmdate('Ymd\THis\Z');

$ics  = "BEGIN:VCALENDAR\r\nVERSION:2.0\r\nBEGIN:VEVENT\r\n";
$ics .= "DTSTAMP:$dt_stamp\r\nDTSTART:$dt_start\r\nDTEND:$dt_end\r\n";
$ics .= "SUMMARY:" . kg_ics_escape("Kindergeburtstag – $filiale") . "\r\n";
$ics .= "DESCRIPTION:" . kg_ics_escape($message) . "\r\n";
$ics .= "END:VEVENT\r\nEND:VCALENDAR\r\n";

$upload_dir = wp_upload_dir();
$ics_file = trailingslashit($upload_dir['basedir']) . "kindergeburtstag-$post_id.ics";

file_put_contents($ics_file, $ics);

wp_mail($to, $subject, $message, $headers, [$ics_file]);

@unlink($ics_file);

wp_send_json_success(['message' => 'Anfrage erfolgreich gesendet.']);

}

