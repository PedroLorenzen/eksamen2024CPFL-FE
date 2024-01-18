import {fetchAnyUrl} from "../../modules/fetchAnyUrl.js";
import {createOption} from "../../modules/createOption.js";

export async function populateRoomDropdown(hotelId)
{
    const roomBaseUrl = "http://localhost:8080/hotel";
    const url = roomBaseUrl + "/" + hotelId + "/rooms";

    try
    {
        const rooms = await fetchAnyUrl(url);
        const selectElement = document.getElementById('inpRoom');
        selectElement.innerHTML = '';

        rooms.forEach(function (room)
        {
            const option = createOption(room.roomNumber, room.id);
            selectElement.appendChild(option);
        });

        selectElement.addEventListener('change', function ()
        {
            updateRoomDetails(hotelId, selectElement.value);
        });
    }
    catch (error)
    {
        console.error('Error populating room dropdown:', error);
    }
}


// Jeg var nødt til at hente hele al information om rummet fra databasen, da jeg ikke kunne hente data fra rooms.
async function updateRoomDetails(hotelId, selectedRoomNumber)
{
    const roomDetailsUrl = "http://localhost:8080/hotel/" + hotelId + "/room/" + selectedRoomNumber;

    try
    {
        const selectedRoom = await fetchAnyUrl(roomDetailsUrl);

        if (selectedRoom)
        {
            document.getElementById("showRoomNumberOfBeds").value = selectedRoom.numberOfBeds;
            document.getElementById("showRoomPrice").value = selectedRoom.price;
            document.getElementById("showRoomType").value = selectedRoom.type;
        }
    }
    catch (error)
    {
        console.error('Error fetching room details:', error);
    }
}

