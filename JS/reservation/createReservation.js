import {populateHotelForm} from "./modules/getHotel.js";
import {populateRoomDropdown} from "./modules/dropdownRooms.js";
import {getIdFromURL} from "./modules/getIdFromURL.js";
import {populateGuestDropdown} from "./modules/dropdownGuests.js";
import {getReservation, postReservation} from "./modules/postReservation.js";

document.addEventListener("DOMContentLoaded", async function ()
{
    try
    {
        await populateHotelForm();
        await populateRoomDropdown(getIdFromURL());
        await populateGuestDropdown();
    }
    catch (error)
    {
        console.error("Error populating form", error);
    }
});

document.getElementById("createReservationForm").addEventListener('submit', async () =>
{
    event.preventDefault();
    try
    {
        await postReservation(getReservation());
    }
    catch (error)
    {
        alert("Error posting reservation: " + error + " - " + error.message);
    }
});

function navigateHotelsList()
{
    window.location.href = "../hotel/listHotels.html";
}

document.getElementById("btnFrontpage").addEventListener('click', navigateHotelsList);