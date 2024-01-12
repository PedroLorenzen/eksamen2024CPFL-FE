import {populateHotelForm} from "./modules/getHotel.js";
import {populateRoomDropdown} from "./modules/dropdownRooms.js";
import {getIdFromURL} from "./modules/getIdFromURL.js";
import {populateGuestDropdown} from "./modules/dropdownGuests.js";

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

function navigateHotelsList()
{
    window.location.href = "../hotel/listHotels.html";
}

document.getElementById("btnFrontpage").addEventListener('click', navigateHotelsList);