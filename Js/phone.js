const loadPhone = async (searchText = "13", isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  //   console.log(data.data);
  displayPhones(phones, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
  //   console.log(phones);
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.textContent = "";
  // disply only first 12 phones
  const showAllContainer = document.getElementById("show-all-container");
  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }

  // disply 12 phone if not show all
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }
  phones.forEach((element) => {
    // console.log(element);
    /*
    1.create a div

    */
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card bg-base-100 p-4 shadow-xl `;
    phoneCard.innerHTML = `  <figure class="px-10 pt-10">
                        <img src="${element.image}" />
                    </figure>
                    <div class="card-body items-center text-center">
                        <h2 class="card-title">${element.phone_name}</h2>
                        <p>${element.slug}</p>
                        <h2 class="card-title">${element.brand}</h2>
                        <div class="card-actions">
                            <button onclick="handleShowDetails('${element.slug}')"  class="btn btn-primary w-[full]">Show Details</button>
                        </div>
                    </div>`;
    // appendchild
    phoneContainer.appendChild(phoneCard);
  });

  // hide spinner catching all data
  loadingSpinner(false);
};

const handleSearch = (isShowAll) => {
  loadingSpinner(true);
  const SearchField = document.getElementById("Search-field");
  // clear phone container  card before adding new  card
  const searchText = SearchField.value;
  SearchField.value = "";

  loadPhone(searchText, isShowAll);
};
// aonther search field functionality
// const handleSearch2 = () => {
//   loadingSpinner(true);
//   const SearchField2 = document.getElementById("Search-field2");
//   const searchText = SearchField2.value;
//   SearchField2.value = "";
//   loadPhone(searchText);
// };

// function for loading spinner
const loadingSpinner = (showSpinner) => {
  const loading = document.getElementById("loading-spinner");
  if (showSpinner) {
    loading.classList.remove("hidden");
  } else {
    loading.classList.add("hidden");
  }
};

// handle show alll
const handleShowAll = () => {
  // console.log("clikess");
  handleSearch(true);
};

//  show details
const handleShowDetails = async (id) => {
  // console.log("show details clicked", id);
  // load individula or single phone data
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  // console.log(data);
  const element = data.data;
  showPhoneDetails(element);
};

const showPhoneDetails = (element) => {
  console.log(element);
  const phoneName = document.getElementById("show-details-phone-name");
  phoneName.innerText = element.name;
  const showDetailsContainer = document.getElementById(
    "show-all-details-container"
  );

  showDetailsContainer.innerHTML = ` 
  <div class="flex justify-center items-center mt-2 mb-2"><img src="${element.image}" alt=""/></div>
  <p class='text-xl font-medium text-start '> Storage: <span class="font-normal text-sm">${element.mainFeatures.storage}</span></p>
  <p class='text-xl font-medium  text-start'> Disply Size: <span class="font-normal text-sm">${element.mainFeatures.displaySize}</span></p>
  <p class='text-xl font-medium text-start'> Chip Set: <span class="font-normal text-sm">${element.mainFeatures.chipSet}</span></p>
  <p class='text-xl font-medium text-start'> Memory: <span class="font-normal text-sm">${element.mainFeatures.memory}</span></p>
  <p class='text-xl font-medium text-start'> Slug: <span class="font-normal text-sm">${element.slug}</span></p>
  <p class='text-xl font-medium text-start'> Release Date: <span class="font-normal text-sm">${element.releaseDate}</span></p>
  <p class='text-xl font-medium text-start'> Brand: <span class="font-normal text-sm">${element.brand}</span></p>
  <p class='text-xl font-medium text-start'> GPS: <span class="font-normal text-sm">${element.others.GPS}</span></p>

   `;
  show_Details_modal.showModal();
};
loadPhone();
