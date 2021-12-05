async function loadIntoTable(url, table){
    const tableHead = table.querySelector("thead");
    const tableBody = table.querySelector("tbody");
    const response = await (fetch);
    const data = await response.json();
    console.log(data);
    tableHead.innerHTML = "<tr></tr>";
    tableBody.innerHTML = "";

    


    
}
const url = "https://statsapi.web.nhl.com/api/v1/teams/6/stats"
loadIntoTable(url,document.querySelector("table"));





function getStandingsURL(id) {
    return `https://statsapi.web.nhl.com/api/v1/teams/${id}/stats`;
}

