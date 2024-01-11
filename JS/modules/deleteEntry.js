import {sendObjectAsJson} from "./sendObjectAsJson.js";

export async function deleteEntry(url, id)
{
    const deleteUrl = url + "/" + id
    console.log(deleteUrl)
    const res = await sendObjectAsJson(deleteUrl, null, "DELETE")
    if (res.ok)
    {
        alert("Entry deleted")
    }
    else
    {
        alert("Entry not deleted")
    }
}