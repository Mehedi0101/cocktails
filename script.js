const displayDrinks = (name) => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
        .then(res => res.json())
        .then(data => {
            const cardContainer = document.getElementById("card-container");

            cardContainer.innerHTML = "";
            const drinks = data.drinks;

            if(!drinks){
                const p = document.createElement("p");
                p.classList = "text-center fs-2";
                p.style.marginTop = "180px";
                p.innerText = "No Match Found";
                cardContainer.appendChild(p);
                return;
            }

            drinks.forEach(drink => {
                const div = document.createElement("div");
                div.classList = "col-4 p-2";
                div.innerHTML = `
                    <div class="card">
                        <img src="${drink.strDrinkThumb}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title mb-1">${drink.strDrink}</h5>
                            <p class="card-text mb-1"><span class="fw-bold">Category:</span> ${drink.strCategory}</p>
                            <p class="card-text mb-2"><span class="fw-bold">Instruction:</span> ${drink.strInstructions.slice(0, 50)}...</p>
                            <div class="d-flex justify-content-center gap-2">
                                <a href="#" class="orange-text orange-border py-1 px-2 rounded text-decoration-none">Select</a>
                                <a href="#" class="orange-bg text-white border-0 py-1 px-2 rounded text-decoration-none">Details</a>
                            </div>
                        </div>
                    </div>
                `;
                cardContainer.appendChild(div);
            });
        });
}

displayDrinks("z");

const handleSearch = document.getElementById("search-btn").addEventListener("click", () => {
    const searchedText = document.getElementById("search-field").value;
    displayDrinks(searchedText);
})