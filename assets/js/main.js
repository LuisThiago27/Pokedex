const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const pokemonDetailDiv = document.getElementById('pokemonDetail');

const maxRecords = 151;
let offset = 0;
const limit = 8;

function loadPokemonItems(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => 
            `<li onclick="showDetails(this.id)" id="${pokemon.number}" class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.photo}" 
                        alt="${pokemon.name}" />
                </div>
            </li>`).join('');
        pokemonList.innerHTML += newHtml;

    })
}

loadPokemonItems(offset, limit);


function getHtmlPokemonDetail(pokemonDetail){

    return `<div class="details ${pokemonDetail.type}" onclick="showDetails(this.id)" id="${pokemonDetail.number}">
                <div class="detailsHeader" >
                    <div class="detailHeaderContent">
                        <div class="pokemon"> 
                            <span class="detName">${pokemonDetail.name}</span>
                            <div class="basic-info">
                                <ol class="types">
                                    ${pokemonDetail.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                                </ol>
                                
                            </div>
                        </div>
                        <span class="number">#${pokemonDetail.number}</span>
                    </div>
                    
                    <img src="${pokemonDetail.photo}" 
                    alt="${pokemonDetail.name}">
                    
                </div>
                <div class="content-details">
                    <div class="views">
                        <span class="view-info ${pokemonDetail.type}">Info</span>
                        <span>Evolution</span>
                        <span>Moves</span>
                    </div>
                    <div class="info">
                        <div class="container">
                            <span>Species</span>
                            <span class="value">${pokemonDetail.species}</span>
                        </div><br>
                        <div class="container">
                            <span>Height</span>
                            <span class="value">${pokemonDetail.height}</span>
                            <span style="width: calc((${pokemonDetail.height} / 100) * 100%); "class="skills ATK ${pokemonDetail.type}"></span>
                        </div>
                        <div class="container">
                            <span>Weight</span>
                            <span class="value">${pokemonDetail.weight}</span>
                            <span style="width: calc((${pokemonDetail.weight} / 100) * 100%); "class="skills ATK ${pokemonDetail.type}"></span>
                        </div><br/>
                        <div class="weakness">
							Abilities
							<ol class="types">
                                ${pokemonDetail.abilities.map((ability) => `<li class="${ability}">${ability}</li>`).join('')}
							</ol
						</div>
                    </div>
                </div>
            </div>`
    
    
}


function showDetails(id) {
    
    if (pokemonDetailDiv.style.visibility == "visible") {
        pokemonDetailDiv.style.visibility = "hidden"
    } else {
        const pokemonDetailContent = document.getElementById('pokemonDetail');

        pokeApi.getPokemonDetailById(id).then((pokemonDetail) => {
            
            pokemonDetailContent.innerHTML = getHtmlPokemonDetail(pokemonDetail);
            pokemonDetailDiv.style.visibility = "visible"

        })

        
    }
}

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordNexPage = offset + limit;

    if(qtdRecordNexPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItems(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }else {
        loadPokemonItems(offset, limit);
    }
    
})


  