import {sendObjectAsJson} from "../modules/sendObjectAsJson.js";
import {fetchAnyUrl} from "../modules/fetchAnyUrl.js";

const hotelBaseUrl = "http://localhost:8080/hotel";

// Start of fetching hotel data from the database and populating the form.

function getIdFromURL()
{
    const queryParams = new URLSearchParams(window.location.search);
    return queryParams.get('id');
}

async function fetchHotelData(hotelId)
{
    const url = hotelBaseUrl + "/" + hotelId;
    try
    {
        return await fetchAnyUrl(url);
    }
    catch (error)
    {
        console.error('Error fetching sailboat data:', error);
    }
}

async function populateForm()
{
    //const hotelId = getIdFromURL();
    if (getIdFromURL())
    {
        const hotelData = await fetchHotelData(getIdFromURL());
        if (hotelData)
        {
            document.getElementById("inpHotelId").value = hotelData.id;
            document.getElementById("inpHotelName").value = hotelData.name;
            document.getElementById("inpHotelAddress").value = hotelData.address;
            document.getElementById("inpHotelCity").value = hotelData.city;
            document.getElementById("inpHotelZip").value = hotelData.zip;
            document.getElementById("inpHotelEmail").value = hotelData.email;
            document.getElementById("inpHotelPhone").value = hotelData.phone;
            document.getElementById("inpHotelDescription").value = hotelData.description;
            document.getElementById("inpHotelPictureUrl").value = hotelData.picture;
        }
    }
    else
    {
        console.error("No hotel ID provided in URL");
    }
}

document.addEventListener("DOMContentLoaded", async function ()
{
    try
    {
        await populateForm();
    }
    catch (error)
    {
        console.error("Error populating form", error);
    }
});

// Start of sending the inputted data and update the hotel in the database

function getHotel()
{
    return {
        id: document.getElementById("inpHotelId").value,
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

async function putHotel(hotel)
{
    const putUrl = hotelBaseUrl + "/" + hotel.id;
    const res = await sendObjectAsJson(putUrl, hotel, "PUT");
    if (res.ok)
    {
        alert("Sailboat has been updated in DB");
        navigateFrontpage();
    }
    else
    {
        alert("Failed to update sailboat");
    }
}

document.getElementById("updateHotelForm").addEventListener('submit', async () =>
{
    event.preventDefault();
    const hotel = getHotel();
    try
    {
        await putHotel(hotel);
    }
    catch (error)
    {
        alert("Error updating hotel: " + error);
    }
});

// button to navigate to the frontpage

function navigateFrontpage()
{
    window.location.href = "frontpage.html";
}

document.getElementById("btnFrontpage").addEventListener('click', navigateFrontpage);

