import {sendObjectAsJson} from "./modules/sendObjectAsJson.js";

function getHotel()
{
    return {
        name: document.getElementById("inpHotelName").value,
        address: document.getElementById("inpHotelAddress").value,
        city: document.getElementById("inpHotelCity").value,
        zip: document.getElementById("inpHotelZip").value,
        email: document.getElementById("inpHotelEmail").value,
        phone: document.getElementById("inpHotelPhone").value,
        description: document.getElementById("inpHotelDescription").value,
        picture: document.getElementById("inpHotelPictureUrl").value

    };
}

const hotelBaseUrl = "http://localhost:8080/hotel";

function navigateFrontpage()
{
    window.location.href = "frontpage.html";
}

async function postHotel(hotel)
{
    const postEndpoint = `${hotelBaseUrl}`;
    console.log("Sending hotel Data: ", hotel);
    await sendObjectAsJson(postEndpoint, hotel, "POST");
    alert("Competition with name: " + hotel.name + ", is saved to DB");
    window.location.reload();
}

//submit så den hænger sammen med formen i html og sørger for at required fungerer.
document.getElementById("createHotelForm").addEventListener('submit', async () =>
{
    event.preventDefault();
    try
    {
        await postHotel(getHotel());
    }
    catch (error)
    {
        alert("Error posting Competition: " + error + " - " + error.message);
    }
});

document.getElementById("btnFrontpage").addEventListener('click', navigateFrontpage);
