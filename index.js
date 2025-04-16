// Get DOM elements
const btn = document.getElementById("btn");
const input = document.getElementById("input");
const lengthP = document.getElementById("length-p");
const volumeP = document.getElementById("volume-p");
const massP = document.getElementById("mass-p");

// Define conversion factors for different units
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

// Format the conversion string output
const formatConversion = (value, fromUnit, toUnit, factor) =>
  `${value} ${fromUnit} = ${(value * factor).toFixed(3)} ${toUnit}`;

// Update all conversion displays
const updateConversions = (value) => {
  // Iterate through each conversion type (length, volume, mass)
  Object.entries(conversionFactors).forEach(([type, units]) => {
    // Create conversion strings for each unit pair
    const conversions = Object.entries(units).map(
      ([fromUnit, { to, factor }]) =>
        formatConversion(value, fromUnit, to, factor)
    );

    // Update the DOM with conversion results
    document.getElementById(`${type}-p`).textContent = conversions.join(" | ");
  });
};

// Handle the conversion process
const handleConversion = () => {
  // Convert input value to number
  const numericValue = parseFloat(input.value);

  // Validate input is a valid number
  if (!isNaN(numericValue) && isFinite(numericValue)) {
    updateConversions(numericValue);
    input.classList.remove("error");
  } else {
    // Handle invalid input
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
