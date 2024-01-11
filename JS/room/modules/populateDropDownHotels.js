import {fetchAnyUrl} from "../../modules/fetchAnyUrl.js";
import {createOption} from "../../modules/createOption.js";

const hotelsEndpoint = "http://localhost:8080/dtohotels";

export async function populateHotelDropdown()
{
    try
    {
        const hotels = await fetchAnyUrl(hotelsEndpoint);
        const selectElement = document.getElementById('inpHotel');

        hotels.forEach(hotel =>
        {
            const option = createOption(hotel.name, hotel.id);
            selectElement.appendChild(option);
        });
    }
    catch (error)
    {
        console.error('Error populating hotel dropdown:', error);
    }
}