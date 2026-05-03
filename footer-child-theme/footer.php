<?php
/**
 * Custom footer — Cengiz Gastro
 * Reemplaza footer.php del tema padre (Astra)
 *
 * PLACEHOLDERS a reemplazar:
 *   https://TU-URL-LOGO.png          → URL del logo en WP Media Library
 *   https://instagram.com/TUUSUARIO  → perfil de Instagram
 *   https://facebook.com/TUPAGINA    → página de Facebook
 *   /standorte/, /speisekarte/ etc.  → slugs reales de las páginas
 *   /impressum/, /datenschutz/       → URLs de páginas legales
 */
?>
  <footer class="cg-footer" role="contentinfo">

    <div class="cg-footer__inner">
      <div class="cg-footer__grid">

        <!-- Columna 1: Logo + Redes sociales -->
        <div class="cg-footer__col">
          <a href="<?php echo esc_url( home_url( '/' ) ); ?>"
             class="cg-footer__logo-link"
             aria-label="Cengiz Gastro – Startseite">
            <img src="https://TU-URL-LOGO.png"
                 alt="Cengiz Gastro"
                 class="cg-footer__logo">
          </a>
          <div class="cg-footer__social">
            <a href="https://instagram.com/TUUSUARIO"
               target="_blank" rel="noopener"
               class="cg-footer__social-icon"
               aria-label="Cengiz Gastro auf Instagram">
              <i class="fab fa-instagram" aria-hidden="true"></i>
            </a>
            <a href="https://facebook.com/TUPAGINA"
               target="_blank" rel="noopener"
               class="cg-footer__social-icon"
               aria-label="Cengiz Gastro auf Facebook">
              <i class="fab fa-facebook-f" aria-hidden="true"></i>
            </a>
          </div>
        </div>

        <!-- Columna 2: Schnellzugang -->
        <div class="cg-footer__col">
          <h3 class="cg-footer__title">Schnellzugang</h3>
          <ul class="cg-footer__nav-list">
            <li><a href="/" class="cg-footer__nav-link">Startseite</a></li>
            <li><a href="/standorte/" class="cg-footer__nav-link">Standorte</a></li>
            <li><a href="/speisekarte/" class="cg-footer__nav-link">Speisekarte</a></li>
            <li><a href="/ueber-uns/" class="cg-footer__nav-link">Über uns</a></li>
            <li><a href="/kontakt/" class="cg-footer__nav-link">Kontakt</a></li>
          </ul>
        </div>

        <!-- Columna 3: Folge uns -->
        <div class="cg-footer__col">
          <h3 class="cg-footer__title">Folge uns</h3>
          <p class="cg-footer__social-hint">
            Aktuelle Angebote, Events<br>
            und Impressionen aus dem Betrieb.
          </p>
        </div>

      </div><!-- /.cg-footer__grid -->
    </div><!-- /.cg-footer__inner -->

    <!-- Barra de copyright -->
    <div class="cg-footer__bar">
      <div class="cg-footer__bar-inner">
        <span class="cg-footer__bar-copy">
          &copy; <?php echo date( 'Y' ); ?> Cengiz Gastro
        </span>
        <span class="cg-footer__bar-links">
          <a href="/impressum/">Impressum</a>
          <a href="/datenschutz/">Datenschutz</a>
        </span>
        <span class="cg-footer__powered">
          Powered by
          <a href="https://studio.am-itsolutions.de"
             target="_blank" rel="noopener">
            studio.am-itsolutions.de
          </a>
        </span>
      </div>
    </div>

  </footer>

<?php wp_footer(); ?>
</body>
</html>
