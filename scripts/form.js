// Product array
const products = [
  { id: "prod1", name: "Super Blender" },
  { id: "prod2", name: "Smart Toaster" },
  { id: "prod3", name: "Eco Kettle" },
  { id: "prod4", name: "Air Fryer" },
  { id: "prod5", name: "Multi-Cooker" }
];

document.addEventListener("DOMContentLoaded", () => {
  // Populate product select
  const select = document.getElementById("productName");
  products.forEach(product => {
    const option = document.createElement("option");
    option.value = product.id;
    option.textContent = product.name;
    select.appendChild(option);
  });

  // Footer year and last modified
  document.getElementById("currentyear").textContent = new Date().getFullYear();
  document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;
}); 