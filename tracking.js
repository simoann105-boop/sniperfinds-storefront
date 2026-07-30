
function track(eventName, payload) {
  const event = {
    event: eventName,
    payload: payload || {},
    at: new Date().toISOString()
  };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
  console.info("[tracking]", event);
}

document.querySelectorAll("[data-track]").forEach((element) => {
  element.addEventListener("click", () => {
    track("cta_click", { id: element.getAttribute("data-track"), href: element.getAttribute("href") });
  });
});

const waitlistForm = document.querySelector("[data-waitlist-form]");
function updateLocalLeadCount() {
  const countElement = document.querySelector("[data-local-lead-count]");
  if (!countElement) return;
  const leads = JSON.parse(localStorage.getItem("sniperfinds_waitlist") || "[]");
  if (leads.length > 0) {
    countElement.hidden = false;
    countElement.textContent = `Demo leads saved in this browser: ${leads.length}`;
  }
}

if (waitlistForm && waitlistForm.getAttribute("method") === "dialog") {
  updateLocalLeadCount();
  waitlistForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(waitlistForm);
    const lead = Object.fromEntries(formData.entries());
    const leads = JSON.parse(localStorage.getItem("sniperfinds_waitlist") || "[]");
    leads.push({ ...lead, at: new Date().toISOString() });
    localStorage.setItem("sniperfinds_waitlist", JSON.stringify(leads));
    track("waitlist_saved_demo", { product: lead.product, intent: lead.purchase_intent, country: lead.country });
    const success = document.querySelector("[data-form-success]");
    if (success) success.hidden = false;
    waitlistForm.reset();
    updateLocalLeadCount();
  });
}

track("page_view", { path: window.location.pathname });
