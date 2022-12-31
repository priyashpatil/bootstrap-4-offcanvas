const _bsBody = document.querySelector("body");

// Init Offcanvas listeners.
document
  .querySelectorAll('[data-toggle="offcanvas"]')
  .forEach(function (toggleTrigger) {
    // TODO: improve parsing target ID.
    const targetId =
      toggleTrigger.tagName == "A"
        ? toggleTrigger.hash
        : toggleTrigger.dataset.target;
    const target = document.querySelector(targetId);

    if (target) {
      const staticBackdrop = target.dataset.backdrop == "static";
      const backdrop = document.createElement("div");

      // Setup event listeners.
      toggleTrigger.addEventListener("click", function () {
        _bsShowOffcanvas(target, backdrop);

        // Setup non static backdrop.
        if (!staticBackdrop) {
          backdrop.addEventListener("click", function () {
            _bsHideOffcanvas(target, backdrop);
          });
        }
      });

      // Setup dismiss events
      target
        .querySelectorAll('[data-dismiss="offcanvas"]')
        .forEach((dismissTarget) => {
          dismissTarget.addEventListener("click", function () {
            _bsHideOffcanvas(target, backdrop);
          });
        });
    }
  });

// Show Offcanvas.
function _bsShowOffcanvas(target, backdrop) {
  backdrop.className = "offcanvas-backdrop show";
  target.classList.add("show");
  _bsBody.style.overflow = "hidden";
  _bsBody.appendChild(backdrop);
}

// Hide Offcanvas.
function _bsHideOffcanvas(target, backdrop) {
  target.classList.add("hiding");
  backdrop.classList.add("fade");

  setTimeout(() => {
    target.classList.remove("show");
    target.classList.remove("hiding");
    backdrop.remove();
    _bsBody.style = "";
  }, 300);
}
