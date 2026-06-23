(() => {
  // Simple in-page cart + product view; sends tracking events like the tracker
  const CART_KEY = "demo_cart";

  function getSessionId() {
    let id = localStorage.getItem("session_id");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("session_id", id);
    }
    return id;
  }

  function sendEvent(data) {
    fetch("http://localhost:5000/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).catch(() => {
      // ignore network errors for demo
    });
  }

  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    const el = document.getElementById("cart-count");
    if (el) el.textContent = cart.length;
  }

  function addToCart(productId, productName) {
    const cart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    cart.push({ id: productId, name: productName, ts: new Date().toISOString() });
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartCount();

    const event = {
      sessionId: getSessionId(),
      eventType: "add_to_cart",
      pageUrl: window.location.href,
      timestamp: new Date().toISOString(),
      productId,
      productName,
    };
    sendEvent(event);
    showToast(`${productName} added to cart`);
  }

  function viewProduct(productId, productName) {
    const modal = document.getElementById("product-modal");
    const content = document.getElementById("modal-content");
    if (!modal || !content) return;
    content.innerHTML = `<h2>${productName}</h2><p>Simple product details for <strong>${productName}</strong>.</p><p><button class="btn primary" id="modal-add">Add to Cart</button></p>`;
    modal.setAttribute("aria-hidden", "false");
    modal.style.display = "flex";

    document.getElementById("modal-close").focus();

    document.getElementById("modal-add").addEventListener("click", () => {
      addToCart(productId, productName);
    });

    // send tracking event
    sendEvent({
      sessionId: getSessionId(),
      eventType: "product_view",
      pageUrl: window.location.href,
      timestamp: new Date().toISOString(),
      productId,
      productName,
    });
  }

  function showToast(text) {
    let t = document.getElementById("demo-toast");
    if (!t) {
      t = document.createElement("div");
      t.id = "demo-toast";
      t.className = "demo-toast";
      document.body.appendChild(t);
    }
    t.textContent = text;
    t.classList.add("visible");
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.remove("visible"), 2000);
  }

  // Wire up buttons
  document.addEventListener("click", (e) => {
    const add = e.target.closest(".add-to-cart");
    if (add) {
      const id = add.dataset.productId;
      const name = add.dataset.productName;
      addToCart(id, name);
      return;
    }

    const view = e.target.closest(".view-product");
    if (view) {
      const id = view.dataset.productId;
      const name = view.dataset.productName;
      viewProduct(id, name);
      return;
    }

    const cartBtn = e.target.closest("#cart-btn");
    if (cartBtn) {
      const cart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
      showToast(`Cart: ${cart.length} item(s)`);
      return;
    }
  });

  // Modal close
  document.getElementById("modal-close").addEventListener("click", () => {
    const modal = document.getElementById("product-modal");
    modal.setAttribute("aria-hidden", "true");
    modal.style.display = "none";
  });

  // init
  updateCartCount();

  // Explore button smooth scroll
  const exploreBtn = document.getElementById('explore-btn');
  if (exploreBtn) {
    exploreBtn.addEventListener('click', (ev) => {
      ev.preventDefault();
      const target = document.getElementById('products');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // focus first product for accessibility
        const first = target.querySelector('.product');
        if (first) first.focus();
      }
    });
  }

})();
