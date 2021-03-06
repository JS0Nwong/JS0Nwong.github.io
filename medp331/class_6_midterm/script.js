//GETS THE CONTAINER TO STORE ALL THE POKEMON CARDS DISPLAYED ON THE SCREEN
const pokemonContainer = document.getElementById("content-container");

//ARRAY FOR TO STORE ALL THE POKEMON NAMES
let entirePokemonArray = [];

/*
    Four main parts to my website:
        - The search bar
            - The search bar is a search bar that allows the user to search for a pokemon by name
            - I get the pokemon name by getting the value of the input field and storing it in a variable
            - I then call the API with the pokemon name and display the response on the page
            - The auto complete feature is implemented using an array of pokemon names that I store in entirePokemonArray when I call fetchPokemons()
        - The pokemon cards
            - The pokemon cards are the cards that display the information of the pokemon
            - Dynamically created by fetching the data from the API and calling the render function
            - Each pokemon is passsed through the render function and then appended to the pokemonContainer
        - The card popup
            - The card popup is the popup that displays the more detailed information of the pokemon when the user clicks on a card
            - It is a template literal that I made and it displays the information of the pokemon
            - Also made helper functions to get the moves and the evolution tree of the pokemon
                - Getting the evolution tree also required helper functions to get the evolutions of the pokemon
                - First I needed to get the species of the pokemon. Then I needed to get the evolution chain of the pokemon then I was able to get the evolution details of the pokemon as well
                - I created a getMoves() function to get the moves of the pokemon. It iterates through the moves and appends it one by one to #move-row
                - All of this information is then appended to the template literal
        - The filter bar
            - The filter bar allows the user to filter the pokemon cards by what region they are from
            - I implemented it by having an onclick event that fetches the pokemon by calling the api with a limit and an offset value
            - It gets the data then updates the page with the new pokemon cards

    Some bugs I found:
        - The order the pokemon cards are displayed is not in the order they are in the API sometimes
        - The order of the evolution tree is not in the order they are in the API sometimes
*/

//const color object to store the colors of the types
const colors = {
    normal:'#A6A86D',
    fire:'#FF7B25',
    water:'#6D92F9',
    grass: '#78C84B',
    electric: '#F2D037',
    ice: '#94D9DC',
    fighting:'#BD3723',
    poison: '#A2449D',
    ground: '#E3C172',
    flying: '#A88FF1',
    psychic: '#FE5786',
    bug: '#A9BD10',
    rock: '#BBA130',
    ghost: '#6A5092',
    dark: '#6D5A4B',
    dragon: '#773BF5',
    steel: '#B9BAC6',
    fairy: '#F2B9BC',
}

//FILTER KANTO
document.getElementById('filter-kanto').addEventListener("click", function()
{
    //fetches kanto pokemons by limiting it to the first 151 pokemons
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    .then(response => response.json())
    .then(function(allpokemon)
    {
       allpokemon.results.forEach(function(pokemon)
       {
           fetchData(pokemon);
           updatePage();
       })
   })
})

//FILTER JOHTO
document.getElementById('filter-johto').addEventListener("click", function()
{
    //fetches johto pokemons by offsetting the search index 151 pokemons and limiting
    //the search result to 100 pokemons
    fetch('https://pokeapi.co/api/v2/pokemon?limit=100&offset=151')
    .then(response => response.json())
    .then(function(allpokemon)
    {
       allpokemon.results.forEach(function(pokemon)
       {
           fetchData(pokemon);
           updatePage();
       })
   })
})

//FILTER HOENN
document.getElementById('filter-hoenn').addEventListener("click", function()
{
    //fetches hoenn pokemons by offsetting the search index 251 pokemons and limiting
    //the search result to 135 pokemons
    fetch('https://pokeapi.co/api/v2/pokemon?limit=135&offset=251')
    .then(response => response.json())
    .then(function(allpokemon)
    {
       allpokemon.results.forEach(function(pokemon)
       {
           fetchData(pokemon);
           updatePage();
       })
   })
})

//FILTER SINNOH
document.getElementById('filter-sinnoh').addEventListener("click", function()
{
    //fetches sinnoh pokemons by offsetting the search index 386 pokemons and limiting
    //the search result to 107 pokemons
    fetch('https://pokeapi.co/api/v2/pokemon?limit=107&offset=386')
    .then(response => response.json())
    .then(function(allpokemon)
    {
       allpokemon.results.forEach(function(pokemon)
       {
           fetchData(pokemon);
           updatePage();
       })
   })
})

//FILTER UNOVA
document.getElementById('filter-unova').addEventListener("click", function()
{
    //fetches unova pokemons by offsetting the search index 493 pokemons and limiting
    //the search result to 156 pokemons
    fetch('https://pokeapi.co/api/v2/pokemon?limit=156&offset=493')
    .then(response => response.json())
    .then(function(allpokemon)
    {
       allpokemon.results.forEach(function(pokemon)
       {
           fetchData(pokemon);
           updatePage();
       })
   })
})

//FILTER KALOS
document.getElementById('filter-kalos').addEventListener("click", function()
{
    //fetches kalos pokemons by offsetting the search index 649 pokemons and limiting
    //the search result to 72 pokemons
    fetch('https://pokeapi.co/api/v2/pokemon?limit=72&offset=649')
    .then(response => response.json())
    .then(function(allpokemon)
    {
       allpokemon.results.forEach(function(pokemon)
       {
           fetchData(pokemon);
           updatePage();
       })
   })
})

//FILTER ALOLA
document.getElementById('filter-alola').addEventListener("click", function()
{
    //fetches alola pokemons by offsetting the search index 721 pokemons and limiting
    //the search result to 86 pokemons
    fetch('https://pokeapi.co/api/v2/pokemon?limit=86&offset=721')
    .then(response => response.json())
    .then(function(allpokemon)
    {
       allpokemon.results.forEach(function(pokemon)
       {
           fetchData(pokemon);
           updatePage();
       })
   })
})

//FILTER GALAR
document.getElementById('filter-galar').addEventListener("click", function()
{
    //fetches galar pokemons by offsetting the search index 809 pokemons and limiting
    //the search result to 89 pokemons
    fetch('https://pokeapi.co/api/v2/pokemon?limit=89&offset=809')
    .then(response => response.json())
    .then(function(allpokemon)
    {
       allpokemon.results.forEach(function(pokemon)
       {
           fetchData(pokemon);
           updatePage();
       })
   })
})

//FILTER ALL
document.getElementById('filter-all').addEventListener("click", function()
{
    //calls fetchPokemons() since it already gets all pokemons
    fetchPokemons();
    updatePage();
})

//fetches all the pokemons and stores them in the entirePokemonArray and calls fetchData() to convert the data to json
const fetchPokemons = async() =>
{
    fetch('https://pokeapi.co/api/v2/pokemon?limit=898') //gets all 898 pokemons
     .then(response => response.json())
     .then(function(allpokemon)
     {
        allpokemon.results.forEach(function(pokemon)
        {
            fetchData(pokemon); 
            entirePokemonArray.push(pokemon.name);
        })
    })
}

//fetches the data of the pokemon and converts it to a json object then calls render to display the pokemon
function fetchData(pokemon)
{
    let url = pokemon.url;

    fetch(url)
    .then(response => response.json())
    .then(function(pokemondata)
    {
        render(pokemondata);
    })
}

//renders the pokemon card and displays it on the screen
function render(data)
{
    const mainTypes = Object.keys(colors);
    const getTypes = data.types.map(el => el.type.name);
    const typeColor = mainTypes.find(type => getTypes.indexOf(type) > -1);
    const color = colors[typeColor];

    const cardContainer = document.createElement("div");
    cardContainer.classList.add('card');
    
    cardContainer.setAttribute("onclick", `selectPokemon(${data.id})`);

    const name = document.createElement("h4");
    name.classList.add('pokemon-name');

    const number = document.createElement("p");
    number.classList.add('number')

    const type = document.createElement("div");
    type.classList.add('types');
    cardContainer.style.backgroundColor = color;

    const sprite = document.createElement("img");
    sprite.setAttribute("src", data.sprites.front_default);
    sprite.setAttribute("loading", "auto");
    sprite.classList.add("pokemon-img");

    name.innerText = data.name;
    number.innerHTML = `#${data.id}`;

    createTypes(data.types, type);

    cardContainer.append(name, number, sprite, type);
    pokemonContainer.append(cardContainer);

}

const selectPokemon = async id => 
{
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokemon = await res.json();
    cardPopup(pokemon);
}

/*
Made template card in HTML and put it in a template literal. Gets and displays information in the template literal
*/
function cardPopup(pokemon)
{
    //maps through the pokemon types and abilites and joins them together with a comma
    const type = pokemon.types.map(type => type.type.name).join(", ");   
    const statValues = pokemon.stats.map(stat => stat.base_stat);
    const ability = pokemon.abilities.map(ability => ability.ability.name).join(', ');

    //calls these helper functions to get the moves and species of the pokemon
    getSpecies(pokemon.id);
    getMoves(pokemon.id);

    //template literal to be displayed when the user clicks on a pokemon
    //appends API data to the template literal
    const htmlString = ` 
    <div class="popup container-fluid"> 
        <button class = "close-button" id="closeBtn" onclick="closePopup()"><i class="fas fa-times"></i></button> 
        <div class="popup-card" id = "popup">
            <div class = "card-content">
                <div class = "row">
                    <div class = "col-md-4 basic-information">
                        <img class="card-image" src="${pokemon.sprites["front_default"]}"/> 
                        <h2 class="card-title">${pokemon.name} #${pokemon.id}</h2>

                        <div class = "stats-container" id = "statistic">
                            <p class = "type">Type: <span>${type}</span></p>
                            <p class = "type">Height: <span class = "height">${pokemon.height} m</span></p>
                            <p class = "type">Weight: <span class = "weight">${pokemon.weight} kg</span></p>
                            <p class = "ability">Abilities: <span>${ability}</span></p>

                            <div class = "whitespace"></div>
                            
                            <h1>Statistics: </h1>
                            <p class = "stat">HP: <span>${statValues[0]}</span></p>
                            <p class = "stat">Attack: <span>${statValues[1]}</span></p>
                            <p class = "stat">Defense: <span>${statValues[2]}</span></p>
                            <p class = "stat">Special-Attack: <span>${statValues[3]}</span></p>
                            <p class = "stat">Special-Defense: <span>${statValues[4]}</span></p>
                            <p class = "stat">Speed: <span>${statValues[5]}</span></p>

                            <div class = "whitespace"></div>
                        </div>
                    </div> 
                    <div class = "col-md-8 pokemon-information">
                        <div class = "row">
                            <div class = "biography">
                                    <h1>Biography: </h1>
                                    <p class = "flavor-text">Flavor Text: <span id = "flavor-text"> </span></p>
                                    <p class = "flavor-text">Habitat: <span class = "habitat" id = "habitat"></span></p>
                                    <p class = "flavor-text">Capture Rate: <span class = "habitat" id = "capture"></span>%</p>
                                </div>
                            </div>
                            
                            <div class = "whitespace"></div>
    
                            <div class = "row">
                                <h1 class = "evolution-header">Evolution Chain: </h1>
                                <div class = "evolutions" id = "evolutions"></div>
                            </div>
                            
                            <div class = "whitespace"></div>

                            <h1>Move Set: </h1>
                            <div class = "row" id = "moves-row">

                            </div>

                        </div> 
                    </div>
                </div>
            </div>
        </div> 
    </div> `;
    //appends the template literal to the body
    pokemonContainer.innerHTML = htmlString + pokemonContainer.innerHTML;
}

//Gets moves and maps appends it to the template literal  
const getMoves = async id => 
{
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokemon = await res.json();

    for(let move of pokemon.moves)
    {
        let para = document.createElement('p');
        let span = document.createElement('span');
        const movesUrl = `https://pokeapi.co/api/v2/move/${move.move.name}`;
        const movesRes = await fetch(movesUrl);
        const type = await movesRes.json();

        span.innerText = type.type.name;
        span.style.backgroundColor = colors[type.type.name];

        $(span).css({
            'borderRadius': '5px',
            'width': '120px',
            'fontWeight': 'bold',
            'textAlign': 'center',
        })

        para.innerText = move.move.name;
        para.appendChild(span);
        para.classList.add('move');
        $("#moves-row").append(para)
    }
}

//gets the pokemon species in order to get the evolution chain of the pokemon
function getSpecies(id)
{
    $.getJSON(`https://pokeapi.co/api/v2/pokemon-species/${id}`, function(data) {
        let url = data.evolution_chain;
        console.log(data);
        getEvolutionTree(url);
        console.log(data.habitat.name);
        if(data.habitat.name == null)
        {
            $("#habitat").append("Could not get the habitat of this pokemon");
        }
        else
        {
            $("#habitat").append(data.habitat.name);
        }
        $("#capture").append(data.capture_rate);
        
        for(let description of data.flavor_text_entries)
        {
            if(description.language.name == "en" && description.version.name == "y")
            {
                console.log(description);
                $("#flavor-text").append(description.flavor_text);
            }
        }
        
      }).fail(function() {
        console.log("We couldn't find that pokemon's evolution chain.")
        $("#flavor-text").append("Sorry we could not get the flavor text of this pokemon");
    })
}

//gets the evolution tree of the pokemon
function getEvolutionTree(url)
{
    $.getJSON(url, function(data) {
        var evoChain = [];
        var evoData = data.chain;

        do{
            var evoDetails = evoData['evolution_details'][0];

            evoChain.push({
                "species_name": evoData.species.name,
                "min_level": !evoDetails ? 1 : evoDetails.min_level,
                "trigger_name": !evoDetails ? null : evoDetails.trigger.name,
                "item": !evoDetails ? null : evoDetails.item,
            });
            evoData = evoData['evolves_to'][0];
        } while (!!evoData && evoData.hasOwnProperty('evolves_to'));
        getEvolutionDetails(evoChain);
      }).fail(function() {
        console.log("We couldn't find that pokemon's evolution chain.")
    })
}

//helper function to get the details of the pokemon evolutions 
function getEvolutionDetails(array)
{
    //for the length of the array, get the details of the pokemon from the api and append it to the template literal and then append it to the page
    for(let i = 0; i < array.length; i++)
    {
        $.getJSON(`https://pokeapi.co/api/v2/pokemon/${array[i].species_name}`, function(data) {
            const div = `<div class = "col-md-4 evolution-container">
                <img class = "evolution-img" src = ${data.sprites.front_default}>
                <h3>${array[i].species_name}</h3>
                <p>Level: ${array[i].min_level}</p>
            </div>
            <i class="fas fa-arrow-right"></i>
            `;

            const endDiv = `<div class = "col-md-4 evolution-container">
                <img class = "evolution-img" src = ${data.sprites.front_default}>
                <h3>${array[i].species_name}</h3>
                <p>Level: ${array[i].min_level}</p>
            </div>
            `;
            //if we are not at the end of the array, append the div to the page
            if(i + 1 != array.length)
            {
                $('#evolutions').append(div);
            }
            //if we are at the end of the array, append the end div
            else if(i + 1 == array.length)
            {
                $('#evolutions').append(endDiv)
            }
          }).fail(function() {
            alert("We could not get the detailed information of this pokemon!");
        })
    }
}

//closes the card popup
const closePopup = () =>
{
    //gets the card popup and removes it from the DOM
    const popup = document.querySelector(".popup");
    popup.parentElement.removeChild(popup);
}

//helper function to display the type of the pokemon
function createTypes(types, div)
{
    //parse the types array
    types.forEach(function(type)
    {
        //creates a p element adds the class and sets the inner text to the type name and appends it to the div
        let typeList = document.createElement('p');
        typeList.classList.add("little-bit-of-margin");
        typeList.innerText = type.type.name;
        div.append(typeList);
    })
}

//emptys the page and updates it with the new pokemons
function updatePage()
{
    //empties the page
    pokemonContainer.innerHTML = '';
}
//gets the pokemon search button and adds an event listener to it and calls searchPokemon
document.getElementById('pokemon-search').addEventListener("click", searchPokemon);

//SEARCH FUNCTIONALITY
function searchPokemon()
{
    //gets the input from the search bar
    let name = document.getElementById("pokemon-search-name").value
    //checks if name is empty
    if(name != '')
    {
        //gets the pokemon from the api
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
        //converts the response to json
        .then(response => response.json())
        //parse the json
        .then(function(pokemondata)
        {
            console.log(pokemondata);
            //clears the page and updates it with the new pokemon
            updatePage();
            render(pokemondata);
        })
    }
    else
    {
        //alerts the user that the search bar is empty
        window.alert("Please enter a name of a pokemon!");
        alert("Please enter a name of a pokemon")
    }
}   

//AUTO COMPLETE FUNCTIONALITY
function autocomplete(input, array)
{
    var currentFocus;
    input.addEventListener("input", function(e)
    {
        var a, b, i, val = this.value;
        closeAllLists();

        if(!val)
        {
            return false;
        }
        currentFocus = -1;

        //creates a a div element and sets its id to autocomplete-list and a class of autocomplete-elements
        a = document.createElement("div");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-elements");

        this.parentNode.append(a);

        //for each element in the array, create a div element and set its inner text to the element and append it to the div
        for(i = 0; i < array.length; i++)
        {
            if(array[i].substr(0, val.length).toLowerCase() == val.toLowerCase())
            {
                b = document.createElement('div');
                b.innerHTML = "<strong>" + array[i].substr(0, val.length) + "</strong>";
                b.innerHTML += array[i].substr(val.length);
                b.innerHTML += "<input type = 'hidden' value = '" + array[i] + "'>";
                b.addEventListener("click", function(){
                    input.value = this.getElementsByTagName("input")[0].value;
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });

    //checks for key presses and if the key pressed is the down arrow, it will increase the currentFocus variable 
    //and if the key pressed is the up arrowit will decrease the currentFocus variable
    //and if the key pressed is the enter key, it will select the currentFocus variable and close the list
    input.addEventListener("keydown", function(e)
    {
        var x = document.getElementById(this.id + "autocomplete-list");
        if(x)
        {
            x = x.getElementsByTagName("div");
        }
        if(e.keyCode == 40)
        {
            currentFocus++;
            addActive(x);
        }
        else if(e.keyCode == 38)
        {
            currentFocus--;
            addActive(x)
        }
        else if(e.keyCode == 13)
        {
            e.preventDefault();
            if(currentFocus > -1)
            {
                if(x) x[currentFocus].click();
                searchPokemon();
            }
        }
    });

    //function to add active class to the current element
    function addActive(x)
    {
        if(!x) return false;
        removeActive(x);
        if(currentFocus >= x.length) currentFocus = 0;
        if(currentFocus < 0) currentFocus = (x.length -1);
        x[currentFocus].classList.add("autocomplete-active");
    }

    //function to remove the active class from all elements
    function removeActive(x)
    {
        for(let i = 0; i < x.length; i++)
        {
            x[i].classList.remove("search-containers-active");
        }
    }

    //function to close all lists in the document
    function closeAllLists(element)
    {
        var x = document.getElementsByClassName("autocomplete-elements");
        for(let i = 0; i < x.length; i++)
        {
            if(element != x[i] && element != input)
            {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }

    //event listener to close the list if the user clicks outside of the input
    document.addEventListener("click", function(e)
    {
        closeAllLists(e.target);
    });
}


//creates an onscroll event listener and calls the function scrollFunction when the user scrolls the page
window.onscroll = function(){
    scrollFunction();
}

//check if the user has scroolled beyongs 1000px and if so, adds the the scroll to top button on the page
function scrollFunction(){
    if(document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000)
    {
        document.getElementById("scroll-top").style.display = "flex";
    }
    else
    {
        document.getElementById("scroll-top").style.display = "none";
    }
}

document.getElementById("scroll-top").addEventListener("click", function(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
})

//calls fecthPokemon to get all the pokemons in the list
fetchPokemons();
autocomplete(document.getElementById('pokemon-search-name'), entirePokemonArray);

