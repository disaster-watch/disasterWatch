import { emergency } from "./emergency.js";
const emer = document.getElementById("emergency");
const section = document.querySelectorAll("section");

// Animation

// const observer = new IntersectionObserver((entries) => {
//   entries.forEach((entry) => {
//     if (entry.isIntersecting) {
//       entry.target.classList.add("show");
//     } else {
//       entry.target.classList.remove("show");
//     }
//   });
// });

// section.forEach((el) => observer.observe(el));

// Get User Location

const getUserLocation = () => {
  navigator.geolocation.watchPosition((position) => {
    const { longitude, latitude } = position.coords;
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const { country_code } = data.address;
        fetchEmergencyLine(country_code);
      });
  });
};

// Fetch emergency line

const fetchEmergencyLine = (name) => {
  const filterdEmergency = emergency.filter(
    (tell) => tell.Country.ISOCode === name.toUpperCase()
  );
  const emergencyLine = filterdEmergency.map((tell) => {
    emer.innerHTML = `

    <h4>${tell.Country.Name}</h4>
    
    ${
      tell.Police.All[0] !== null
        ? `<li class=""><span class="">Police:</span> ${tell.Police.All}</li>`
        : ""
    }
    ${
      tell.Fire.All[0] !== null
        ? `<li class=""><span class="">Fire:</span> ${tell.Fire.All}</li>`
        : ""
    }
    ${
      tell.Ambulance.All[0] !== null
        ? `<li class=""><span class="e">Ambulance:</span> ${tell.Ambulance.All}</li>`
        : ""
    }
    ${
      tell.Dispatch.All[0] !== null
        ? `<li class=""><span class="">Dispatch</span>  ${tell.Dispatch.All}</li>`
        : ""
    }
    `;
  });
};

getUserLocation();
fetchEmergencyLine("ng");
// console.log(emergencyLine);
