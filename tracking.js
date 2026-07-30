
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

track("page_view", { path: window.location.pathname });
