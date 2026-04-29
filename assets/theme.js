/* ============================================================
   PETCARE SMART — Theme Utilities
   ============================================================ */

/* Cart drawer / notification (lightweight) */
class CartNotification extends HTMLElement {
  connectedCallback() {
    this.addEventListener('cart:item-added', this.show.bind(this));
  }

  show(event) {
    this.textContent = `✓ ${event.detail?.title || 'Produit'} ajouté au panier`;
    this.classList.add('visible');
    setTimeout(() => this.classList.remove('visible'), 3000);
  }
}

if (customElements && !customElements.get('cart-notification')) {
  customElements.define('cart-notification', CartNotification);
}

/* Variant picker — dispatches variant change events */
class VariantPicker extends HTMLElement {
  connectedCallback() {
    this.querySelectorAll('input[type="radio"]').forEach(input => {
      input.addEventListener('change', () => {
        this.dispatchEvent(new CustomEvent('variant:change', {
          bubbles: true,
          detail: { variantId: input.value }
        }));

        // Update add-to-cart button data attribute
        const btn = document.querySelector('[data-add-to-cart]');
        if (btn) btn.dataset.variantId = input.value;
      });
    });
  }
}

if (customElements && !customElements.get('variant-picker')) {
  customElements.define('variant-picker', VariantPicker);
}
