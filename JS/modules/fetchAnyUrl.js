export async function fetchAnyUrl(url)
{
    try
    {
        const response = await fetch(url);
        console.log("inside fetchAnyUrl.js with url: " + url);
        return await response.json();
    }
    catch (error)
    {
        console.error('Fetch error:', error.message);
        throw error;
    }
}