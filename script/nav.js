let toggle = document.getElementById("toggle");
let list = document.getElementById("list");
let close = document.getElementById("close");

toggle.addEventListener("click", () => {
  list.classList.toggle("hidden");
});

close.addEventListener("click", () => {
  list.classList.add("hidden");
});


function toggleFAQ(element) {
  const answer = element.nextElementSibling;
  const arrow = element.querySelector('.arrow');
  
  if (answer.style.display === 'block') {
    answer.style.display = 'none';
    arrow.style.transform = 'rotate(0deg)';
  } else {
    answer.style.display = 'block';
    arrow.style.transform = 'rotate(180deg)';
  }
  
  element.classList.toggle('active');
}


document.querySelector('.contact-form').addEventListener('submit', function(e) {
  e.preventDefault();

  alert('Thank you for your message! We will get back to you soon.');
  this.reset(); 
});



