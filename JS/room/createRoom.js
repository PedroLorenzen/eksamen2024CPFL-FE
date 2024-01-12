import {sendObjectAsJson} from "../modules/sendObjectAsJson.js";
import {populateHotelDropdown} from "./modules/populateDropDownHotels.js";

document.addEventListener("DOMContentLoaded", async function ()
{
    try
    {
        await populateHotelDropdown();
    }
    catch (error)
    {
        console.error("Error populating dropdown", error);
    }
});


const roomBaseURL = "http://localhost:8080/hotel";

function getRoom()
{
    return {
        roomNumber: document.getElementById("inpNumber").value,
        numberOfBeds: document.getElementById("inpBeds").value,
        price: document.getElementById("inpPrice").value,
        picture: document.getElementById("inpPicture").value,
        description: document.getElementById("inpDescription").value,
        type: document.getElementById("inpType").value,
        hotelId: document.getElementById("inpHotel").value
    };
}

async function postRoom(room)
{
    const postEndpoint = roomBaseURL + "/" + room.hotelId + "/room";
    console.log("Sending room data: ", room);
    try
    {
        const response = await sendObjectAsJson(postEndpoint, room, "POST");
        if (response.status === 400)
        {
            alert("Room with room-number: " + room.roomNumber + " already exists.");
        }
        else
        {
            alert("Room-number: " + room.roomNumber + " in hotel: " + room.hotelId + ", is saved to DB");
            window.location.reload();
        }
    }
    catch (error)
    {
        alert("Error posting room: " + error + " - " + error.message);
    }

}

document.getElementById("createRoomForm").addEventListener('submit', async () =>
{
    event.preventDefault();
    try
    {
        await postRoom(getRoom());
    }
    catch (error)
    {
        alert("Error posting room: " + error + " - " + error.message);
    }
});

function navigateFrontpage()
{
    window.location.href = "../../html/frontpage.html";
}

document.getElementById("btnFrontpage").addEventListener('click', navigateFrontpage);