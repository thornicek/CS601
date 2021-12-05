const gamesUrl = "https://statsapi.web.nhl.com/api/v1/schedule?expand=schedule.linescore";

window.addEventListener('DOMContentLoaded', event => {
    let table = document.getElementById(boxscoresTable);
    populateTable(table);
    $(`#${boxscoresTable}`).on("change", displayBoxscores);
});

function displayBoxscores{
    try{
        MyFetch(gamesUrl).then(json_data) => {
            
        }

    }
}