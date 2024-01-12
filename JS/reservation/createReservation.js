import {fetchAnyUrl} from "../modules/fetchAnyUrl";

const hotelBaseUrl = "http://localhost:8080/hotel";

function getIdFromURL()
{
    const queryParams = new URLSearchParams(window.location.search);
    return queryParams.get('id');
}

async function fetchHotelData(hotelId)
{
    const url = hotelBaseUrl + "/" + hotelId;
    console.log("Fetching hotel data from: " + url + hotelId)
    try
    {
        return await fetchAnyUrl(url);
    }
    catch (error)
    {
        console.error('Error fetching hotel data:', error);
    }
}

export async function populateForm()
{
    if (getIdFromURL())
    {
        const hotelData = await fetchHotelData(getIdFromURL());
        if (hotelData)
        {
            document.getElementById("showHotelName").value = hotelData.name;
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