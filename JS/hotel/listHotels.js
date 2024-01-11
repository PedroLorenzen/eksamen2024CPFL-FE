import {fetchAnyUrl} from "../modules/fetchAnyUrl.js";
import {deleteEntry} from "../modules/deleteEntry.js";

const hotelsBaseURL = "http://localhost:8080/dtohotels";

const pbCreateHotel = document.getElementById("pbCreateHotel");
const tblHotels = document.getElementById("tblHotels");

function navigateToUpdateHotel(hotelId)
{
    window.location.href = "updateHotel.html?id=" + hotelId;
}

function navigateToHotelFrontPage(hotelId)
{
    window.location.href = "hotelFrontPage.html?id=" + hotelId;
}

function navigateToCreateHotel()
{
    window.location.href = "createHotel.html";
}

pbCreateHotel.addEventListener('click', navigateToCreateHotel);

const searchInput = document.getElementById("inpSearchHotel");

searchInput.addEventListener("input", filterHotels);

function filterHotels()
{
    const searchValue = searchInput.value.toLowerCase();
    const filteredHotels = hotels.filter(function (hotel)
    {
        return hotel.name.toLowerCase().includes(searchValue);
    });
    updateTableWithFilteredHotels(filteredHotels);
}

function updateTableWithFilteredHotels(filteredHotels)
{
    tblHotels.innerHTML = "";
    filteredHotels.forEach(createRow);
}

function createRow(hotel)
{
    let cellCount = 0;
    let rowCount = tblHotels.rows.length;
    let row = tblHotels.insertRow(rowCount);
    row.id = hotel.id;

    let cell = row.insertCell(cellCount++);
    cell.innerHTML = hotel.id;

    cell = row.insertCell(cellCount++);
    cell.innerHTML = hotel.name;

    cell = row.insertCell(cellCount++);
    cell.innerHTML = hotel.address;

    cell = row.insertCell(cellCount++);
    cell.innerHTML = hotel.rooms;

    cell = row.insertCell(cellCount++);
    const pbBook = document.createElement("input");
    pbBook.type = "button";
    pbBook.setAttribute("value", "Book Hotel");
    pbBook.className = "btn";
    cell.appendChild(pbBook);
    pbBook.onclick = function ()
    {
        navigateToHotelFrontPage(hotel.id);
    }

    cell = row.insertCell(cellCount++);
    const pbUpdate = document.createElement("input");
    pbUpdate.type = "button";
    pbUpdate.setAttribute("value", "Update Hotel");
    pbUpdate.className = "btn";
    cell.appendChild(pbUpdate);
    pbUpdate.onclick = function ()
    {
        navigateToUpdateHotel(hotel.id);
    }

    cell = row.insertCell(cellCount++);
    const pbDelete = document.createElement("input");
    pbDelete.type = "button";
    pbDelete.setAttribute("value", "Delete Hotel");
    pbDelete.className = "btn";
    cell.appendChild(pbDelete);
    pbDelete.onclick = function ()
    {
        if (confirm("Are you sure you want to delete hotel with id: " + hotel.id + " and name: " + hotel.name + "?"))
        {
            deleteEntry("http://localhost:8080/hotel", hotel.id);
            document.getElementById(hotel.id).remove();
        }
        else
        {
            alert("Hotel not deleted");
        }
    }
}

let hotels = [];

async function fetchHotels()
{
    tblHotels.innerHTML = "";
    hotels = await fetchAnyUrl(hotelsBaseURL);
    hotels.forEach(createRow);
}

document.addEventListener("DOMContentLoaded",
    async function ()
    {
        try
        {
            await fetchHotels();
        }
        catch (error)
        {
            console.error("Error fetching hotels", error);
        }
    });