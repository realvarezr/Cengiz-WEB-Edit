<script>
document.addEventListener('DOMContentLoaded', function () {

  const form = document.getElementById('test-form');
  const result = document.getElementById('result');

  if (!form) return;

  let isSubmitting = false;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (isSubmitting) return;

    let hasError = false;
    result.innerText = '';

    const submitBtn = form.querySelector('.kg-submit');

    // Validación obligatorios
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
      if (
        (field.type === 'checkbox' && !field.checked) ||
        (field.type !== 'checkbox' && !field.value.trim())
      ) {
        field.classList.add('kg-error');
        hasError = true;
      }
    });

    if (hasError) {
      result.innerText = 'Bitte alle Pflichtfelder ausfüllen.';
      return;
    }

    // 🔒 Bloqueo
    isSubmitting = true;

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = '⏳ Wird verarbeitet...';
    }

    const formData = new FormData(form);
    formData.append('action', 'test_form_submit');

    fetch('/wp-admin/admin-ajax.php', {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(data => {

      if (!data.success) {
        result.innerText = 'Fehler beim Senden.';
        unlock();
        return;
      }

      if (data.data && data.data.message) {

        if (data.data.message !== 'Anfrage erfolgreich gesendet.') {
          result.innerText = data.data.message;
          unlock();
          return;
        }

        // ✅ Éxito real
        result.innerText = data.data.message;
        form.reset();
        unlock();
      }

    })
    .catch(() => {
      result.innerText = 'Server Fehler';
      unlock();
    });

    function unlock() {
      isSubmitting = false;
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Anfrage absenden';
      }
    }

  });

});
</script>