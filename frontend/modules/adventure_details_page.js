import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  // let adventureId = await getAdventureIdFromURL(window.location.search);
  let findStr = new URLSearchParams(search);
  let advId = findStr.get('adventure');
  // console.log(advId);
  return advId;

  // Place holder for functionality to work in the Stubs
  // return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    let res = await fetch(config.backendEndpoint + `/adventures/detail/?adventure=${adventureId}`);
    let data = await res.json();
    console.log(data);
    return data;
  } catch(e) {
    console.log(e);
    return null;
  }
  // Place holder for functionality to work in the Stubs
  // return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
     const advName = document.getElementById("adventure-name")
     advName.innerHTML = adventure.name;
     const advSubtitle = document.getElementById("adventure-subtitle")
     advSubtitle.innerHTML = adventure.subtitle
     const photoGallery = document.getElementById("photo-gallery")
     adventure.images.forEach((item)=> {
        photoGallery.innerHTML += `<div><img src="${item}" alt="id1" width=100% class="activity-card-image" /></div>`
    })

      const advCont = document.getElementById("adventure-content")
      advCont.innerHTML = adventure.content

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  document.getElementById("photo-gallery").innerHTML = `<div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner" id="carousel-inner">
    </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`

    images.forEach((item,index)=> {
      let carouselItemEle = document.createElement("div");
      let activeClass = index === 0 ? ' active': '';
      carouselItemEle.className = `carousel-item${activeClass}`
      carouselItemEle.innerHTML =
      `<img 
      src=${item} 
      alt="" 
      srcset=""
      class="activity-card-image pb-3 pb-md-0" />` ;
      
      document.getElementById("carousel-inner").append(carouselItemEle);
    })  

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
    if(adventure.available){
      document.getElementById("reservation-panel-available").style.display="block"
      document.getElementById("reservation-panel-sold-out").style.display="none"
      document.getElementById("reservation-person-cost").innerHTML=adventure.costPerHead
    } else {
      document.getElementById("reservation-panel-available").style.display="none"
      document.getElementById("reservation-panel-sold-out").style.display="block"
    }
  
  
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
    document.getElementById("reservation-cost").innerHTML=
    persons * adventure.costPerHead;

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
      const form = document.getElementById("myForm");
      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        let url = config.backendEndpoint + "/reservations/new";
        let formElements = form.elements;

        let bodyString = JSON.stringify({
          name: formElements["name"].value,
          date: formElements["date"].value,
          person: formElements["person"].value,
          adventure: adventure.id,
        });

        try {
          let res = await fetch(url, {
            method: "POST",
            body: bodyString,
            headers: {
              "Content-Type": "application/json",
            },
          });

          debugger;
          if (res.ok) {
            alert("Success!");
            window.location.reload();
          } else {
            let data = res.json();
            alert(`Failed - ${data.message}`);
          }
        } catch (err) {
          console.log(err);
          alert("Failed - fetch call resulted in error")
        }
      })
    };

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
      if(adventure.reserved){
        document.getElementById("reserved-banner").style.display = "block"
      } else {
        document.getElementById("reserved-banner").style.display = "none"
      }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
