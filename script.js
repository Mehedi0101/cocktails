const displayDrinks = (name) => {
    if (name == "") name = "z";
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
        .then(res => res.json())
        .then(data => {
            const cardContainer = document.getElementById("card-container");

            cardContainer.innerHTML = "";
            const drinks = data.drinks;

            if (!drinks) {
                const p = document.createElement("p");
                p.classList = "text-center fs-2";
                p.style.marginTop = "180px";
                p.innerText = "No Match Found";
                cardContainer.appendChild(p);
                return;
            }

            drinks.forEach(drink => {
                const div = document.createElement("div");
                div.classList = "col-12 col-sm-6 col-lg-4 p-2";
                div.innerHTML = `
                    <div class="card">
                        <img src="${drink.strDrinkThumb}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title mb-1">${drink.strDrink}</h5>
                            <p class="card-text mb-1"><span class="fw-bold">Category:</span> ${drink.strCategory}</p>
                            <p class="card-text mb-2"><span class="fw-bold">Instruction:</span> ${drink.strInstructions.slice(0, 15)}...</p>
                            <div class="d-flex justify-content-center gap-2">
                                <button href="#" onclick="addToGroup('${drink.idDrink}')" class="orange-text orange-border py-1 px-2 rounded text-decoration-none">Add to Group</button>
                                <button href="#" onclick="showDetails('${drink.idDrink}')" data-bs-toggle="modal" data-bs-target="#exampleModal" class="orange-bg text-white border-0 py-1 px-2 rounded text-decoration-none">Details</button>
                            </div>
                        </div>
                    </div>
                `;
                cardContainer.appendChild(div);
            });
        });
}

const addToGroup = (id) => {
    let count = document.getElementById("drinks-count");

    if (parseInt(count.innerText) == 7) {
        alert("You have already selected maximum amount of drinks");
        return;
    }

    count.innerText = parseInt(count.innerText) + 1;

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
        .then(data => {
            const drink = data.drinks[0];
            const selectedContainer = document.getElementById("selected-container");
            const tr = document.createElement("tr");
            const num = selectedContainer.children.length + 1;
            tr.innerHTML = `
            <tr>
                <td>${num}</td>
                <td><img class="rounded-circle" style="width: 40px;" src="${drink.strDrinkThumb}" alt=""></td>
                <td>${drink.strDrink}</td>
            </tr>
        `;
            selectedContainer.appendChild(tr);
        });
}

const showDetails = (id) => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
        .then(data => {
            const drink = data.drinks[0];
            document.getElementById("modal-label").innerText = drink.strDrink;
            document.getElementById("modal-image").src = drink.strDrinkThumb;
            document.getElementById("category").innerText = drink.strCategory;
            document.getElementById("alcoholic").innerText = drink.strAlcoholic;
            document.getElementById("instruction").innerText = drink.strInstructions;
        });
}

const handleSearch = document.getElementById("search-btn").addEventListener("click", () => {
    const searchedText = document.getElementById("search-field").value;
    displayDrinks(searchedText);
})

displayDrinks("z");