export function createOption(text, value)
{
    console.log("Building dropdown element with the text: " + text + " and value: " + value);
    let option = document.createElement('option');
    option.text = text;
    option.value = value;
    return option;
}