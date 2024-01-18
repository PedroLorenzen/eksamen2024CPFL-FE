import {sendObjectAsJson} from "../../modules/sendObjectAsJson.js";

// Helt nyt module. Jeg nåede ikke til dette under eksamen.

const reservationBaseURL = "http://localhost:8080/room";

export function getReservation()
{
    return {
        reservationDate: document.getElementById("inpDate").value,
        price: document.getElementById("inpReservationPrice").value,
        roomId: document.getElementById("inpRoom").value,
        guestId: document.getElementById("inpGuest").value,
        hotelName: document.getElementById("showHotelName").value
    };
}

export async function postReservation(reservation)
{
    const postEndpoint = reservationBaseURL + "/" + reservation.roomId + "/reservation";
    console.log("Sending room data: ", reservation);
    try
    {
        const response = await sendObjectAsJson(postEndpoint, reservation, "POST");
        if (response.status === 400)
        {
            alert("Reservation with room-number: " + reservation.roomId + " on date: " + reservation.reservationDate + " already exists.");
        }
        else
        {
            alert("Reservation in room-number: " + reservation.roomId + " in hotel: " + reservation.hotelName + ", on date: " + reservation.reservationDate + " is saved to DB");
            window.location.reload();
        }
    }
    catch (error)
    {
        alert("Error posting room: " + error + " - " + error.message);
    }

}