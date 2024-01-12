import {fetchAnyUrl} from '../../modules/fetchAnyUrl.js';
import {createOption} from '../../modules/createOption.js';

export async function populateGuestDropdown()
{
    const guestsUrl = "http://localhost:8080/guests";

    try
    {
        const guests = await fetchAnyUrl(guestsUrl);
        const selectElement = document.getElementById('inpGuest');
        selectElement.innerHTML = '';

        guests.forEach(function (guest)
        {
            let option = createOption(guest.email, guest.id);
            selectElement.appendChild(option);
        });
    }
    catch (error)
    {
        console.error('Error fetching guests:', error);
    }
}
