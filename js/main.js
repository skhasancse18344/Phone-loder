const loadPhones = async(searchText,dataLimit) =>{
    const url=`https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url)
    const data = await res.json()
    displayPhones(data.data, dataLimit)
}
const displayPhones = (phones ,dataLimit) =>{
    // console.log(phones);
    const PhonesContainer = document.getElementById('phones-container');
    PhonesContainer.innerHTML = ``;

    const showAll = document.getElementById('show-all');
    if(dataLimit && phones.length > 12){

        phones = phones.slice(0, 12);
        showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none');
    }

    // No Phones Found 
    const noFound = document.getElementById('no-found-message');
    if(phones.length == 0){
        noFound.classList.remove('d-none');
    }
    else{
        noFound.classList.add('d-none');
    }
    // phones = phones.slice(0, 12);
    phones.forEach(phone => {
        // console.log(phone);
        const phonesDiv = document.createElement('div');
        phonesDiv.classList.add('col');
        phonesDiv.innerHTML = `
        
            <div class="card h-100">
            <img  src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h3 class="card-title">${phone.phone_name}</h3>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <button onclick=showDetails('${phone.slug}') type="button" class="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#showDetailsModal">More Details</button>
            </div>
            </div>
        `;
        PhonesContainer.appendChild(phonesDiv);  
    });
    toggleSpinner(false); 
}
const processSearch =(dataLimit) =>{
    toggleSpinner(true);
   const searchField =  document.getElementById('src-field');
   const searchText = searchField.value;
   loadPhones(searchText, dataLimit);
}
document.getElementById('btn-src').addEventListener('click', function(){
    processSearch(12);
})
const el = document.getElementById("src-field");
el.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        processSearch(12);
    }
});
const loadAllPhones = document.getElementById('btn-show-all').addEventListener('click', function(){
    processSearch();
})

const toggleSpinner = isLoading =>{
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none');
    }
}
const showDetails = async(id) =>{
   const url =`https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url)
    const data = await res.json()
    displayPhonesDetail(data.data)
}
    const displayPhonesDetail = phone =>{
        console.log(phone);
        const detailsModal = document.getElementById('showDetailsModalLabel');
        detailsModal.innerText = phone.name;
    const phoneDetails = document.getElementById('phones-detail');
    phoneDetails.innerHTML =`
    
        <p>Display Size : ${phone.mainFeatures ? phone.mainFeatures.displaySize : 'No Display Size Found'}</p>
        <p>Realise Date : ${phone.releaseDate ? phone.releaseDate : 'No Realise Date  Found'}</p>
        <p>Storage : ${phone.mainFeatures ? phone.mainFeatures.storage : 'No Storage Info  Found'}</p>
    `;

}



