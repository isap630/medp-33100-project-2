// function getHistoricalEvents(offset) {
//   const params = {
//       // text: 'world war'
//       year: '1945',
//       offset: offset
//   }

//   const searchParams = new URLSearchParams(params).toString();
//   fetch('https://api.api-ninjas.com/v1/historicalevents?' + searchParams, {
//       method: 'GET',
//       headers: {
//           'X-Api-Key': 'bBszOPFriwwghnn231fvVQ==6lxdM7C77K9HleyR',
//       },

//   })
//       .then(response => response.json())
//       .then(data => console.log(data))
//       .catch(error => console.log('error', error))
// }

// getHistoricalEvents(1)
// getHistoricalEvents(2)



// INFO FOR SEARCH BAR FROM - https://youtu.be/TlP5WIxVirU 
const limit = 100;
const offset = 10;

  const params = {
      text: 'world war',
      // year: '1945',
      offset: offset
  }

const infoCardTemplate = document.querySelector("[data-info-template]");
const infoCardContainer = document.querySelector("[data-info-cards-container]");
const searchInput = document.querySelector("[data-search]");

let info = [];

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  info.forEach((info) => {
    const isVisible =
      info.year.toLowerCase().includes(value) ||
      info.event.toLowerCase().includes(value);
    info.element.classList.toggle("hide", !isVisible);
  });
  // console.log(info);
});

const searchParams = new URLSearchParams(params).toString();
fetch("https://api.api-ninjas.com/v1/historicalevents?" + searchParams, {
  headers: {
    "X-Api-Key": "bBszOPFriwwghnn231fvVQ==6lxdM7C77K9HleyR",
  },
})
  .then((res) => res.json())
  .then((data) => {
    info = data.map((info) => {
      //console.log(data);
      const card = infoCardTemplate.content.cloneNode(true).children[0];
      const header = card.querySelector("[data-header]");
      const body = card.querySelector("[data-body]");

      header.textContent = info.year;
      body.textContent = info.event;
      infoCardContainer.append(card);
      return { year: info.year, event: info.event, element: card };
      // console.log(info);
    });
  });
