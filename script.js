function blowOut(el) {
  if (el.classList.contains("flame")) {
    el.remove();
  } else {
    const flame = el.querySelector(".flame");
    if (flame) flame.remove();
  }

  checkCandles();
}

function checkCandles() {
  const flamesLeft = document.querySelectorAll(".flame").length;
  if (flamesLeft === 0) {
    const msg = document.getElementById("finalMessage");
    const letter = document.getElementById("loveLetter");
    msg.classList.remove("hidden");
    document.body.classList.add("reveal-layout");

    setTimeout(() => {
      letter.classList.remove("hidden");
      letter.classList.add("visible");
      typeHerNameLoop(["MAHI ", "MAHLET ", "MAH "], "typedName", 100, 1000);
    }, 1500);
  }
}

function typeHerNameLoop(names, elementId, delay = 100, pause = 1000) {
  const el = document.getElementById(elementId);
  let current = 0;
  let isDeleting = false;
  let charIndex = 0;

  function typeLoop() {
    const fullText = names[current];

    if (isDeleting) {
      el.textContent = fullText.substring(0, charIndex--);
    } else {
      el.textContent = fullText.substring(0, charIndex++);
    }

    if (!isDeleting && charIndex === fullText.length) {
      setTimeout(() => {
        isDeleting = true;
        typeLoop();
      }, pause);
    } else if (isDeleting && charIndex === 0) {
      current = (current + 1) % names.length;
      isDeleting = false;

      // Only show gift once, after first loop finishes
      if (current === 0) {
        document.getElementById("giftBox").classList.remove("hidden");
      }

      setTimeout(typeLoop, delay);
    } else {
      setTimeout(typeLoop, isDeleting ? delay / 2 : delay);
    }
  }

  typeLoop();
}

function showGift() {
  document.getElementById("finalSurprise").classList.remove("hidden");
}
