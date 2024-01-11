import {sendObjectAsJson} from "../modules/sendObjectAsJson.js";

const userBaseUrl = "http://localhost:8080/user";

function getUser()
{
    return {
        name: document.getElementById("inpName").value,
        username: document.getElementById("inpUserName").value,
        password: document.getElementById("inpPassword").value,

    };
}

async function postUser(user) {
    const postEndpoint = `${userBaseUrl}`;
    console.log("Sending user Data: ", user);
    try {
        const response = await sendObjectAsJson(postEndpoint, user, "POST");

        if (response.status === 400) { // Check if status is BAD_REQUEST
            alert("User with username: " + user.username + " already exists.");
        } else {
            alert("User with name: " + user.name + " and username: " + user.username + ", is saved to DB");
            window.location.reload();
        }
    } catch (error) {
        alert("Error posting user: " + error + " - " + error.message);
    }
}

document.getElementById("createUserForm").addEventListener('submit', async () =>
{
    event.preventDefault();
    try
    {
        await postUser(getUser());
    }
    catch (error)
    {
        alert("Error posting user: " + error + " - " + error.message);
    }
});

function navigateFrontpage()
{
    window.location.href = "frontpage.html";
}

document.getElementById("btnFrontpage").addEventListener('click', navigateFrontpage);
