// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("nameForm");
    const input = document.getElementById("nameInput");
    const greeting = document.getElementById("greeting");
  
    form.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent form from reloading the page
  
      const name = input.value.trim();
      if (name) {
        greeting.textContent = `Hello, ${name}!`;
      } else {
        greeting.textContent = "Please enter a valid name.";
      }
  
      input.value = ""; // Clear the input field
    });
  });
  