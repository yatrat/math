const amount = document.getElementById("amount");
const type = document.getElementById("calculation-type");
const customBox = document.getElementById("custom-rate-container");
const customInput = document.getElementById("custom-rate");
const slabs = document.querySelectorAll(".gst-slab");
const calcBtn = document.getElementById("calculate-btn");
const resetBtn = document.getElementById("reset-btn");

const original = document.getElementById("original");
const gst = document.getElementById("gst");
const total = document.getElementById("total");
const rate = document.getElementById("rate");
const typed = document.getElementById("type");
const gstp = document.getElementById("gstp");
const eff = document.getElementById("eff");

let currentRate = 5;
let isCustom = false;

// Slab selection
slabs.forEach(btn => {
  btn.addEventListener("click", () => {
    slabs.forEach(s => s.classList.remove("active"));
    btn.classList.add("active");

    if (btn.dataset.rate === "custom") {
      customBox.style.display = "block";
      isCustom = true;
      currentRate = parseFloat(customInput.value) || 0;
    } else {
      customBox.style.display = "none";
      isCustom = false;
      currentRate = parseFloat(btn.dataset.rate);
    }

    rate.textContent = currentRate + "%";
  });
});

// Custom rate input
customInput.addEventListener("input", () => {
  if (isCustom) {
    currentRate = parseFloat(customInput.value) || 0;
    rate.textContent = currentRate + "%";
  }
});

// Calculate
calcBtn.addEventListener("click", () => {
  const amt = parseFloat(amount.value);
  if (!amt || amt <= 0) {
    alert("Enter a valid amount greater than 0");
    return;
  }

  if (isCustom) {
    const r = parseFloat(customInput.value);
    if (isNaN(r) || r < 0 || r > 100) {
      alert("Custom GST must be between 0 and 100");
      return;
    }
    currentRate = r;
  }

  let o, g, t;

  if (type.value === "exclusive") {
    o = amt;
    g = o * currentRate / 100;
    t = o + g;
  } else {
    t = amt;
    o = t / (1 + currentRate / 100);
    g = t - o;
  }

  original.textContent = "₹" + o.toFixed(2);
  gst.textContent = "₹" + g.toFixed(2);
  total.textContent = "₹" + t.toFixed(2);

  typed.textContent = type.value === "exclusive" ? "Excluding GST" : "Including GST";
  gstp.textContent = ((g / o) * 100).toFixed(2) + "%";
  eff.textContent = (((t - o) / o) * 100).toFixed(2) + "%";
  rate.textContent = currentRate + "%";
});

// Reset
resetBtn.addEventListener("click", () => {
  amount.value = "";
  type.value = "exclusive";
  customInput.value = "";
  customBox.style.display = "none";

  slabs.forEach(s => s.classList.remove("active"));
  slabs[0].classList.add("active");

  currentRate = 5;
  isCustom = false;

  original.textContent = "₹0.00";
  gst.textContent = "₹0.00";
  total.textContent = "₹0.00";
  rate.textContent = "5%";
  typed.textContent = "Excluding GST";
  gstp.textContent = "0.00%";
  eff.textContent = "0.00%";
});
