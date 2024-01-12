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

        rooms.forEach(room =>
        {
            const option = createOption(room.roomNumber, room.id);
            selectElement.appendChild(option);
        });

        selectElement.addEventListener('change', () =>
        {
            updateRoomDetails(selectElement.value, rooms);
        });
    }
    catch (error)
    {
        console.error('Error populating room dropdown:', error);
    }
}

function updateRoomDetails(selectedRoomId, rooms)
{
    const selectedRoom = rooms.find(room => room.id == selectedRoomId);
    if (selectedRoom)
    {
        document.getElementById("showRoomNumberOfBeds").value = selectedRoom.numberOfBeds;
        document.getElementById("showRoomPrice").value = selectedRoom.price;
        document.getElementById("showRoomType").value = selectedRoom.type;
    }
}
