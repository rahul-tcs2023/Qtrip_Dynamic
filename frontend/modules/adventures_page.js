
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let anchor = new URLSearchParams(search);
  let city = anchor.get('city');
  // console.log(city);
  return city;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    let res = await fetch(config.backendEndpoint + `/adventures?city=${city}`);
    let data = await res.json();
    console.log(data);
    return data;
  } catch(e) {
    console.log(e);
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
    let row = document.getElementById("data");
  adventures.forEach((data) => {
    let column = document.createElement("div")
    column.className = "col-6 col-lg-3 mb-3";
    column.innerHTML = `<a id="${data.id}" href="detail/?adventure=${data.id}">
    <div class="card">
    <img class="activity-card" src="${data.image}" alt="">
    <div class="category-banner">${data.category}</div>
    <div class="card-body d-md-flex justify-content-between">
    <h5>${data.name}</h5>
    <p>₹${data.costPerHead}</p>
    </div>
    <div class="card-body d-md-flex justify-content-between">
    <h5>Duration</h5>
    <p>${data.duration} Hours</p>
    </div>
    </div>
    </div>
  </div>
</a>`

row.append(column);
})
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let arr1 = list.filter((e)=> {
  return e.duration>=low && e.duration<=high
  })
  console.log(arr1)
  return arr1;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let arrFilter = list.filter((e)=> {
    // console.log(categoryList.includes(e.category))
    return categoryList.includes(e.category)          
    })
return arrFilter;
}


// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {

  let filteredList = [];

  // 3. Filter by duration and category together
  if (filters["duration"].length > 0 && filters["category"].length > 0) {
    let choice = filters["duration"].split("-");
    filteredList = filterByDuration(
      list,
      parseInt(choice[0]),
      parseInt(choice[1])
    );
    filteredList = filterByCategory(filteredList, filters["category"]);
  }

  // 2. Filter by duration only
  else if (filters["duration"].length > 0) {
    let choice = filters["duration"].split("-");
    filteredList = filterByDuration(
      list,
      parseInt(choice[0]),
      parseInt(choice[1])
    );
  }

  // 1. Filter by category only
  else if (filters["category"].length > 0) {
    filteredList = filterByCategory(list, filters["category"]);
  }

  // default case when there is no filter
  else {
    filteredList = list;
  }
  return filteredList;
  // CRIO_SOLUTION_END_MODULE_ADVENTURES

  // Place holder for functionality to work in the Stubs
  return list;

}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  window.localStorage.setItem("filters",JSON.stringify(filters));

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let filters= JSON.parse(window.localStorage.getItem('filters')); 
  // Place holder for functionality to work in the Stubs
  console.log("filters", filters);
  return filters;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let catPills = filters.category;
  catPills.forEach((e)=>{
    let createDiv = document.createElement("div")
    createDiv.className = "category-filter"
    createDiv.innerHTML = `<div>${e}</div>`
    document.getElementById("category-list").append(createDiv);
  })

}

export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
