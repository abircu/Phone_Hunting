const loadPhone = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/phones?search=iphone"
  );
  const data = await res.json();
  const phones = data.data;
  //   console.log(data.data);
  displayPhones(phones);
};

const displayPhones = (phones) => {
  //   console.log(phones);
  const phoneContainer = document.getElementById("phone-container");
  phones.forEach((element) => {
    console.log(element);
    /*
    1.create a div

    */
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card w-96 bg-gray-200 shadow-xl m-6`;
    phoneCard.innerHTML = `  <figure class="px-10 pt-10">
                        <img src="${element.image}" />
                    </figure>
                    <div class="card-body items-center text-center">
                        <h2 class="card-title">${element.brand}</h2>
                        <p>${element.slug}</p>
                        <h2 class="card-title">${element.phone_name}</h2>
                        <div class="card-actions">
                            <button class="btn btn-primary w-[full]">Buy Now</button>
                        </div>
                    </div>`;
    // appendchild
    phoneContainer.appendChild(phoneCard);
  });
};

loadPhone();
