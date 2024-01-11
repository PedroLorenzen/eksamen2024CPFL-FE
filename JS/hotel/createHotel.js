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

    try
    {
        const response = await sendObjectAsJson(postEndpoint, hotel, "POST");
        if (response.status === 400)
        {
            alert("Hotel with name: " + hotel.name + " already exists.");
        }
        else
        {
            alert("Hotel with name: " + hotel.name + ", is saved to DB");
            window.location.reload();
        }
    }
    catch (error)
    {
        alert("Error posting hotel: " + error + " - " + error.message);
    }
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
        alert("Error posting hotel: " + error + " - " + error.message);
    }
});

function navigateFrontpage()
{
    window.location.href = "frontpage.html";
}

document.getElementById("btnFrontpage").addEventListener('click', navigateFrontpage);
