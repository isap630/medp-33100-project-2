// Fetch by Year
var userInputValue;

var offset_index = 1;
var topic = 'World War'
var year;

const page_buttons_y = document.querySelector(".page-buttons-y");
const page_buttons = document.querySelector(".page-buttons");

const submitButton = document.getElementById("searchButton");
const searchBarElement = document.getElementById("searchBar") 
searchButton.addEventListener("click", function(){
  userInputValue = searchBarElement.value;
  offset_index = 1;
  initializeSearchTimeline(offset_index, userInputValue);
  year = userInputValue
  page_buttons_y.style.display = "flex";
  page_buttons.style.display = "none";
})

async function getHistoricalEventsSearch(api_offset, api_year) {
  const params = {
      year: api_year,
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

async function initializeSearchTimeline(offset_index_i, year_i){
  const data = await getHistoricalEventsSearch(offset_index_i, year_i);
  console.log("Initializing Timeline with the Year:", year_i);

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
    height: '500px',              // Sets the height of the timeline
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
  console.log(year_i)
}

//Next page

const next_buttonY = document.querySelector(".next-y");
next_buttonY.addEventListener("click", nextPageY);

function nextPageY(){
  offset_index = offset_index + 10;
  initializeSearchTimeline(offset_index, year)
}

//Previous page
const previous_buttonY = document.querySelector(".previous-y");
previous_buttonY.addEventListener("click", previousPageY);

function previousPageY(){
  if (offset_index >= 2){
    offset_index = offset_index - 10;
    initializeSearchTimeline(offset_index, year)
  }
}

//Fetch By Topic

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
    height: '500px',              // Sets the height of the timeline
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
  offset_index = offset_index + 10;
  initializeTimeline(offset_index, topic)
}

//Previous page
const previous_button = document.querySelector(".previous");
previous_button.addEventListener("click", previousPage);

function previousPage(){
  if (offset_index >= 2){
    offset_index = offset_index - 10;
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
  page_buttons.style.display = "flex";
  page_buttons_y.style.display = "none";
  
}



