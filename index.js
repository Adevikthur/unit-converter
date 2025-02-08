const btn = document.getElementById("btn");
const input = document.getElementById("input");
const lengthP = document.getElementById("length-p");
const volumeP = document.getElementById("volume-p");
const massP = document.getElementById("mass-p");

const conversionFactors = {
  length: {
    meters: { to: "feet", factor: 3.28084 },
    feet: { to: "meters", factor: 1 / 3.28084 },
  },
  volume: {
    liters: { to: "gallons", factor: 0.264172 },
    gallons: { to: "liters", factor: 3.78541 },
  },
  mass: {
    kilos: { to: "pounds", factor: 2.20462 },
    pounds: { to: "kilos", factor: 1 / 2.20462 },
  },
};

const formatConversion = (value, fromUnit, toUnit, factor) =>
  `${value} ${fromUnit} = ${(value * factor).toFixed(3)} ${toUnit}`;

const updateConversions = (value) => {
  Object.entries(conversionFactors).forEach(([type, units]) => {
    const conversions = Object.entries(units).map(
      ([fromUnit, { to, factor }]) =>
        formatConversion(value, fromUnit, to, factor)
    );

    document.getElementById(`${type}-p`).textContent = conversions.join(" | ");
  });
};

const handleConversion = () => {
  const numericValue = parseFloat(input.value);

  if (!isNaN(numericValue) && isFinite(numericValue)) {
    updateConversions(numericValue);
    input.classList.remove("error");
  } else {
    input.classList.add("error");
    input.value = "";
  }
};

// Event Listeners
const handleKeypress = (e) => e.key === "Enter" && handleConversion();
btn.addEventListener("click", handleConversion);
input.addEventListener("keypress", handleKeypress);

// Initialize with example value
input.value = 1;
handleConversion();
