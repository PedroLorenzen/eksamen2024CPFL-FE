export function getIdFromURL()
{
    const queryParams = new URLSearchParams(window.location.search);
    return queryParams.get('id');
}