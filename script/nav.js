let toggle = document.getElementById("toggle");
let list = document.getElementById("list");
let close = document.getElementById("close");

toggle.addEventListener("click", () => {
  list.classList.toggle("hidden");
});

close.addEventListener("click", () => {
  list.classList.add("hidden");
});
