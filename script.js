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
var offset_index = 1;

async function getHistoricalEvents(api_offset, api_topic) {
  const params = {
      text: api_topic,
      //year: '1945',
      offset: api_offset
  }

  const searchParams = new URLSearchParams(params).toString();
  const response = await fetch('https://api.api-ninjas.com/v1/historicalevents?' + searchParams, {
      method: 'GET',
      headers: {
          'X-Api-Key': 'LKQRH4zE4XxZrJpcXdEpjQ9Ozuz3FzrCfNY9MOOF',
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
async function initializeTimeline(offset_index_i, topic_i){
  const data = await getHistoricalEvents(offset_index_i, topic_i);
  console.log("Initializing Timeline with topic:", topic_i);

  var container = document.getElementById('visualization');
  container.innerHTML = ''; // Clear the container

  const items = new vis.DataSet([]);
  items.clear();
  var timeline_start;

  for (let i = 0; i < data.length; i++){
    const apiEvent = data[i];
    const eventYear = apiEvent.year;
    const eventMonth = apiEvent.month;
    const eventDay = apiEvent.day;

    const startDate = eventYear + "-" + eventMonth + "-" + eventDay;

    items.add({
      id: i + 1,
      content: eventMonth + "/" + eventDay + "/" + eventYear + ": " + apiEvent.event,
      start: startDate
    });
  }

  // learned how to set library options and make timeline with chatgpt
  // Configuration for the Timeline
  const options = {
    width: '100%',               // Sets the width of the timeline
    height: '600px',              // Sets the height of the timeline
    start: '1850-01-01',          // The start date for the timeline view
    end: '2024-12-31',            // The end date for the timeline view
    zoomMin: 365 * 24 * 60 * 60 * 1000 * 5, // // Minimum zoom level: 5 years in milliseconds
    zoomMax: 365 * 24 * 60 * 60 * 1000 * 300,   // Maximum zoom level: 100 years in milliseconds
    selectable: true,             // Allow selection of items
    editable: false,              // Prevent editing of items directly on the timeline
    locale: 'en',                 // Sets the language/locale
    showCurrentTime: true,        // Displays a line for the current date and time
  };

  // Create a Timeline
  var timeline = new vis.Timeline(container, items, options);

  console.log(offset_index_i);
  console.log(topic_i)
}

initializeTimeline(offset_index, topic);

//Next page

const next_button = document.querySelector(".next");
next_button.addEventListener("click", nextPage);

function nextPage(){
  offset_index = offset_index + 1;
  initializeTimeline(offset_index, topic)
}

//Previous page
const previous_button = document.querySelector(".previous");
previous_button.addEventListener("click", previousPage);

function previousPage(){
  if (offset_index >= 2){
    offset_index = offset_index - 1;
    initializeTimeline(offset_index, topic)
  }
}

//Change topic
const world_button = document.querySelector(".world-war");
const cold_button = document.querySelector(".cold-war");
const american_button = document.querySelector(".american-civil-war")
const covid_button = document.querySelector(".covid")

world_button.addEventListener("click", function() {changeTopic('World War', world_button)});
cold_button.addEventListener("click", function() {changeTopic('Cold War', cold_button)});
american_button.addEventListener("click", function() {changeTopic('American Civil War', american_button)});
covid_button.addEventListener("click", function() {changeTopic('Covid', covid_button)});
var last_button = world_button;

function changeTopic(newTopic, current_button){
  console.log("Changing topic to:", newTopic);
  offset_index = 1;
  topic = newTopic
  initializeTimeline(offset_index, topic)

  last_button.style.backgroundColor = "skyblue"
  last_button.style.color = "black"
  last_button = current_button;

  current_button.style.backgroundColor = '#2a5360'
  current_button.style.color = 'white'
  
}



