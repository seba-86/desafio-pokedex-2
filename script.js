// https://pokeapi.co/api/v2/pokemon/ url de primeros 20
// "https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20" URL para los siguientes 20
// <img src=''id='current-${n}' class='card-img-top' alt='error' width='100' height='100'>

document.addEventListener("DOMContentLoaded", function () {

    const pokemones = async () => {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon/')
            const data = await response.json()
            // console.log(data.results)

            data.results.forEach(element => {
                details =
                    `<div class='container col-md-4'>
                        <div class="card mb-5 mt-5 pt-5 pb-5" style="width: 18rem;">
                    
                            <div class="card-body">
                                <h1 class="card-title">${element.name}</h1>
                                <button id="pokeid" href="" url="${element.url}" class="btn btn-primary pokemodal">¡Quiero ver más de este pokémon!</button>
                            </div>
                       </div> 
                    </div>`

                document.querySelector('#info').innerHTML += details
                
            });
            const next_url = data.next
            // const previus_url = data.previous
            const activeButtom = () => {
                document.querySelector('#btn').addEventListener('click', function () {
                    pokemones(next_url);

                })
            }
            activeButtom()

        } catch (error) {
            console.log('error')
        }

       

        document.querySelector('.pokemodal').addEventListener('click', (event) => {
            event.preventDefault()
            let new_url = document.querySelector('#pokeid').getAttribute('url');

            const info = async () => {
                try {
                    const response = await fetch(new_url)
                    const data = await response.json()
                    // console.log(data.abilities)
                    let name = data.species.name
                    document.querySelector('#namePokemon').innerHTML = name
                    
                    let habilidades = []
                    data.abilities.forEach(element => {
                       habilidades.push(element.ability.name)
                    });
                    document.querySelector('#abilityPokemon').innerHTML = `${habilidades.join('<br>')}`
                    
                    let tipos = []
                    data.types.forEach(element => {
                        tipos.push(element.type.name)
                    });
                    document.querySelector('#typePokemon').innerHTML = `${tipos.join('<br>')}`

                    let movimientos = []
                    data.moves.forEach(element =>{
                        movimientos.push(element.move.name)
                    })
                    document.querySelector('#movePokemon').innerHTML = `${movimientos.join('<br>')}`

                    let generaciones = []
                    data.game_indices.forEach(element => {
                        generaciones.push(element.version.name)
                    });
                    document.querySelector('#generationPokemon').innerHTML = `${generaciones.join('<br>')}`
                } catch (error) {
                    console.log('error de data')
                }


            }
            info(new_url)
            $("#myModal").modal();
            
        });


    }

    pokemones()
    

})