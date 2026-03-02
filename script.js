// DOM variables
let countryInput = document.querySelector('#country-input');
let searchBtn = document.querySelector('#search-btn');
let spinner = document.querySelector('#loading-spinner');
let countyDetails = document.querySelector('#country-info');
let borderDetails = document.querySelector('#bordering-countries');
let errorMessage = document.querySelector('#error-message');


async function searchCountry(countryName){
    try{
        const response = await fetch("https://restcountries.com/v3.1/name/" + countryName);
        let data = await response.json();

        const country = data[0];
        //console.log(country);

        document.getElementById('country-info').innerHTML = `
            <h2>${country.name.common}</h2>
            <p><strong>Capital:</strong> ${country.capital[0]}</p>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <img src="${country.flags.svg}" alt="${country.name.common} flag">
        `;
        

        // const neighbours = country.borders;
        // console.log(neighbour);
        // neighbour.forEach(element => {
        //     const nCountry = fetch ("https://restcountries.com/v3.1/alpha/" + element);
        //     let data2 = nCountry.json();
        //     const city = data2[0];

        //     document.getElementById('country-info').innerHTML += `
        //         <h2>$${city.name.common}</h2>
        //         <img src="${city.flags.svg}" alt="${city.name.common} flag">
        //     `;

        //     console.log(element);
            
        // });

        const neighbours = country.borders;

    if (neighbours) {
    for (const code of neighbours) {
        try {
            const response = await fetch("https://restcountries.com/v3.1/alpha/" + code);
            const data2 = await response.json();
        
            const neighborData = data2[0];

            document.getElementById('bordering-countries').innerHTML += `
                <div class="neighbor-card">
                    <h3>${neighborData.name.common}</h3>
                    <img src="${neighborData.flags.svg}" alt="${neighborData.name.common} flag" width="100">
                </div>
            `;
        } catch (err) {
            console.error(`Could not load neighbor: ${code}`, err);

        }
    }
} else {
    document.getElementById('country-info').innerHTML += `<p>This country has no land borders.</p>`;
}

        
    } catch (error){
       document.querySelector('#error-message').innerHTML = "Could not load country data";
    } finally{
        spinner.style.display = 'none';
    }
}

document.getElementById('search-btn').addEventListener('click', () => {
    document.querySelector('#bordering-countries').innerHTML = '';
    document.querySelector('#error-message').innerHTML = '';
    const country = document.getElementById('country-input').value;
    searchCountry(country);
    document.querySelector('#bordering-countries').innerHTML = `
        <h2>These Are My Neighbours</h2>
    `;
    document.getElementById('country-input').value = '';
});