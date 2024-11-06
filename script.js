// // Alex Code
// // INFO FOR SEARCH BAR FROM - https://youtu.be/TlP5WIxVirU 
// const limit = 100;
// const offset = 10;

//   const params = {
//       text: "world war",
//       // year: '1945',
//       offset: offset
//   }

// const infoCardTemplate = document.querySelector("[data-info-template]");
// const infoCardContainer = document.querySelector("[data-info-cards-container]");
// const searchInput = document.querySelector("[data-search]");

// let info = [];

// searchInput.addEventListener("input", (e) => {
//   const value = e.target.value.toLowerCase();
//   info.forEach((info) => {
//     const isVisible =
//       info.year.toLowerCase().includes(value) ||
//       info.event.toLowerCase().includes(value);
//     info.element.classList.toggle("hide", !isVisible);
//   });
//   // console.log(info);
// });

// const searchParams = new URLSearchParams(params).toString();
// fetch("https://api.api-ninjas.com/v1/historicalevents?" + searchParams, {
//   headers: {
//     "X-Api-Key": "bBszOPFriwwghnn231fvVQ==6lxdM7C77K9HleyR",
//   },
// })
//   .then((res) => res.json())
//   .then((data) => {
//     info = data.map((info) => {
//       //console.log(data);
//       const card = infoCardTemplate.content.cloneNode(true).children[0];
//       const header = card.querySelector("[data-header]");
//       const body = card.querySelector("[data-body]");

//       header.textContent = info.year;
//       body.textContent = info.event;
//       infoCardContainer.append(card);
//       return { year: info.year, event: info.event, element: card };
//       // console.log(info);
//     });
//   });

//Arlenis Code 

var topic = 'World War'
const limit = 100;
const offset = 1;

async function getHistoricalEvents(offset) {
  const params = {
      text: topic,
      //year: '1945',
      offset: offset
  }

  const searchParams = new URLSearchParams(params).toString();
  const response = await fetch('https://api.api-ninjas.com/v1/historicalevents?' + searchParams, {
      method: 'GET',
      headers: {
          'X-Api-Key': 'bBszOPFriwwghnn231fvVQ==6lxdM7C77K9HleyR',
      },
  });

  if (response.ok) {
    const data = await response.json();
    console.log(data);
    return data;
  }
return [];

}

//Add Initial API Data to Timeline
async function initializeTimeline(){
  const data = await getHistoricalEvents(offset);

  // DOM element where the Timeline will be attached
  var container = document.getElementById('visualization');

  // Create a DataSet (allows two way data-binding)
  const items = new vis.DataSet([]);
  var timeline_start;

  for (let i = 0; i < data.length; i++){
    const apiEvent = data[i];
    const eventYear = apiEvent.year;
    const eventMonth = apiEvent.month;
    const eventDay = apiEvent.day;

    const startDate = eventYear + "-" + eventMonth + "-" + eventDay;
    console.log(startDate)

    items.add({
      id: i + 1,
      content: eventMonth + "/" + eventDay + "/" + eventYear + ": " + apiEvent.event,
      start: startDate
    });
    timeline_start = startDate;
  }

  // Configuration for the Timeline
  const options = {
    width: '100%',               // Sets the width of the timeline
    height: '600px',              // Sets the height of the timeline
    start: timeline_start,          // The start date for the timeline view
    end: '2024-12-31',            // The end date for the timeline view
    zoomMin: 365 * 24 * 60 * 60 * 1000 * 5, // // Minimum zoom level: 5 years in milliseconds
    zoomMax: 365 * 24 * 60 * 60 * 1000 * 100,   // Maximum zoom level: 100 years in milliseconds
    selectable: true,             // Allow selection of items
    editable: false,              // Prevent editing of items directly on the timeline
    locale: 'en',                 // Sets the language/locale
    showCurrentTime: true,        // Displays a line for the current date and time
  };

  // Create a Timeline
  var timeline = new vis.Timeline(container, items, options);
}

initializeTimeline();

const world_war_button = document.querySelector(".world-war");
world_war_button.addEventListener("click", initializeTimeline("world war"));



//Change Topics with Topic Buttons

//Next Page (change offset and call API)

//Previous Page (change offset and call API)

