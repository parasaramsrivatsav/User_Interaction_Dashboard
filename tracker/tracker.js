(function () {

  let sessionId = localStorage.getItem("session_id");

  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem("session_id", sessionId);
  }

  function sendEvent(data) {
    fetch("http://localhost:5000/api/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
  }

  sendEvent({
    sessionId,
    eventType: "page_view",
    pageUrl: window.location.href,
    timestamp: new Date(),
    pageWidth: window.innerWidth,
    pageHeight: window.innerHeight
  });

  document.addEventListener("click", (e) => {
    sendEvent({
      sessionId,
      eventType: "click",
      pageUrl: window.location.href,
      timestamp: new Date(),
      clickX: e.clientX,
      clickY: e.clientY,
      pageWidth: window.innerWidth,
      pageHeight: window.innerHeight
    });
  });

})();