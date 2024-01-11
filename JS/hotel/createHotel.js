import {sendObjectAsJson} from "../modules/sendObjectAsJson.js";

const hotelBaseUrl = "http://localhost:8080/hotel";

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

async function postHotel(hotel)
{
    const postEndpoint = `${hotelBaseUrl}`;
    console.log("Sending hotel Data: ", hotel);
    // if hotel exists... do something else
    await sendObjectAsJson(postEndpoint, hotel, "POST");
    alert("Hotel with name: " + hotel.name + ", is saved to DB");
    window.location.reload();
}

document.getElementById("createHotelForm").addEventListener('submit', async () =>
{
    event.preventDefault();
    try
    {
        await postHotel(getHotel());
    }
    catch (error)
    {
        alert("Error posting room: " + error + " - " + error.message);
    }
});

function navigateFrontpage()
{
    window.location.href = "frontpage.html";
}

document.getElementById("btnFrontpage").addEventListener('click', navigateFrontpage);
