import {sendObjectAsJson} from "./modules/sendObjectAsJson.js";

function getHotel()
{
    return {
        name: document.getElementById("inpHotelName").value,
        address: document.getElementById("inpHotelAddress").value,
        city: document.getElementById("inpHotelCity").value,
        zip: document.getElementById("inpHotelZip").value,
        email: document.getElementById("inpHotelEmail").value,
        phone: document.getElementById("inpHotelPhone").value

    };
}

const competitionBaseUrl = "http://localhost:8080/competition";

function navigateFrontpage()
{
    window.location.href = "frontpageCompetitions.html";
}

async function postCompetition(competition)
{
    const postEndpoint = `${competitionBaseUrl}`;
    console.log("Sending Competition Data: ", competition);
    await sendObjectAsJson(postEndpoint, competition, "POST");
    alert("Competition with date: " + competition.date + ", is saved to DB");
    window.location.reload();
}

//submit så den hænger sammen med formen i html og sørger for at required fungerer.
document.getElementById("createCompetitionForm").addEventListener('submit', async () =>
{
    event.preventDefault();
    try
    {
        await postCompetition(getHotel());
    }
    catch (error)
    {
        alert("Error posting Competition: " + error + " - " + error.message);
    }
});

document.getElementById("btnFrontpage").addEventListener('click', navigateFrontpage);
