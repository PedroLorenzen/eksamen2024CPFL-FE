import {fetchAnyUrl} from "../../modules/fetchAnyUrl.js";
import {getIdFromURL} from "./getIdFromURL.js";

const hotelBaseUrl = "http://localhost:8080/dtohotel";


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

export async function populateHotelForm()
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