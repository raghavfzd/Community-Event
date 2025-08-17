// Event Data
const events = [
  { 
    title: "Coding Bootcamp", 
    date: "2025-09-10", 
    type: "Coding", 
    description: "Learn web development in this hands-on bootcamp.", 
    icon:"fa-code",
    image:"images/coding.jpg",
    brief:"An intensive bootcamp covering HTML, CSS, JavaScript, and building projects." 
  },
  { 
    title: "Art & Design Workshop", 
    date: "2025-09-15", 
    type: "Design", 
    description: "Explore creative design techniques with mentors.", 
    icon:"fa-paintbrush",
    image:"images/design.jpg",
    brief:"Hands-on workshop on digital art, color theory, and creative tools." 
  },
  { 
    title: "Community Meetup", 
    date: "2025-09-20", 
    type: "Meetup", 
    description: "Network with fellow students and discuss projects.", 
    icon:"fa-users",
    image:"images/meetup.jpg",
    brief:"A casual meetup to exchange ideas, collaborate, and meet new friends." 
  }
];


// DOM Elements
const eventList = document.getElementById('event-list');
const modal = document.getElementById('modal');
const modalForm = document.getElementById('modal-form');
const modalTitle = document.getElementById('modal-event-title');
const modalConfirmation = document.getElementById('modal-confirmation');
let selectedEvent = "";

// Render Events
function renderEvents(filteredEvents) {
  eventList.innerHTML = '';
  filteredEvents.forEach(event => {
    const card = document.createElement('div');
    card.classList.add('event-card');
    card.innerHTML = `
  <img src="${event.image}" alt="${event.title}" class="event-image">
  <h3><i class="fa ${event.icon}"></i> ${event.title}</h3>
  <p class="event-brief">${event.brief}</p>
  <p><strong>Date:</strong> ${event.date}</p>
  <div class="countdown" id="countdown-${event.title.replace(/\s+/g,'')}"></div>
  <button class="btn" onclick="openModal('${event.title}')">Register</button>
`;

    eventList.appendChild(card);
    countdownTimer(event.date, `countdown-${event.title.replace(/\s+/g,'')}`);
  });
}

// Countdown Timer
function countdownTimer(date, id) {
  const countdownEl = document.getElementById(id);
  const eventDate = new Date(date).getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = eventDate - now;
    if (distance < 0) {
      countdownEl.innerHTML = "Event Started!";
      clearInterval(interval);
      return;
    }
    const days = Math.floor(distance / (1000*60*60*24));
    const hours = Math.floor((distance % (1000*60*60*24))/(1000*60*60));
    const minutes = Math.floor((distance % (1000*60*60))/(1000*60));
    const seconds = Math.floor((distance % (1000*60))/1000);
    countdownEl.innerHTML = `Starts in: ${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  updateCountdown();
  const interval = setInterval(updateCountdown, 1000);
}

// Event Filter
function filterEvents(type) {
  if(type==='all') renderEvents(events);
  else renderEvents(events.filter(e=>e.type===type));
}

// Modal Functions
function openModal(eventName){
  selectedEvent = eventName;
  modal.style.display = "block";
  modalTitle.textContent = `Register for ${eventName}`;
  modalForm.reset();
  modalConfirmation.textContent = '';
}

const spanClose = document.querySelector(".close");
spanClose.onclick = () => modal.style.display = "none";
window.onclick = (e) => { if(e.target == modal) modal.style.display = "none"; }

// Modal Form Submission
modalForm.addEventListener('submit', e => {
  e.preventDefault();
  const name = modalForm.name.value.trim();
  const email = modalForm.email.value.trim();
  if(!name || !validateEmail(email)){
    alert("Please enter valid name and email.");
    return;
  }

  let registrations = JSON.parse(localStorage.getItem("registrations")) || [];
  registrations.push({ event: selectedEvent, name, email });
  localStorage.setItem("registrations", JSON.stringify(registrations));

  modalConfirmation.textContent = `Thank you, ${name}! You are registered.`;
  modalForm.reset();
});

// Email validation
function validateEmail(email){ return /\S+@\S+\.\S+/.test(email); }

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  themeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// Initial Render
renderEvents(events);
