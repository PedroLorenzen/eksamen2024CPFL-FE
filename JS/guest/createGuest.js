import {sendObjectAsJson} from "../modules/sendObjectAsJson.js";

const guestBaseUrl = "http://localhost:8080/guest";

function getGuest()
{
    return {
        firstName: document.getElementById("inpFirstName").value,
        lastName: document.getElementById("inpLastName").value,
        email: document.getElementById("inpEmail").value,
        phone: document.getElementById("inpPhone").value,
    };
}

async function postGuest(guest)
{
    const postEndpoint = `${guestBaseUrl}`;
    console.log("Sending user Data: ", guest);
    try
    {
        const response = await sendObjectAsJson(postEndpoint, guest, "POST");

        if (response.status === 400)
        {
            alert("Guest with phone-number: " + guest.phone + " already exists.");
        }
        else
        {
            alert("Guest with first-name: " + guest.firstName + " and last-name: " + guest.lastName + ", is saved to DB");
            window.location.reload();
        }
    }
    catch (error)
    {
        alert("Error posting guest: " + error + " - " + error.message);
    }
}

document.getElementById("createGuestForm").addEventListener('submit', async () =>
{
    event.preventDefault();
    try
    {
        await postGuest(getGuest());
    }
    catch (error)
    {
        alert("Error posting guest: " + error + " - " + error.message);
    }
});

function navigateFrontpage()
{
    window.location.href = "../../html/frontpage.html";
}

document.getElementById("btnFrontpage").addEventListener('click', navigateFrontpage);
