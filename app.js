/* ==========================================
   Yuyin Lin - Interactive Geo Journey
   SSCI 591 Web & Mobile GIS
========================================== */


/* ==========================================
   1. Important Locations
========================================== */


/*
Leaflet coordinates use:

[latitude, longitude]
*/


const locations = {

    beijing: {

        name: "Beijing, China",

        coordinates: [
            39.9042,
            116.4074
        ],

        zoom: 10,

        popup: `
            <strong>Beijing, China</strong>
            <br><br>
            Where my academic and professional journey began.
            <br><br>
            Computer Science background and early
            software engineering experience.
        `
    },


    usc: {

        name: "University of Southern California",

        coordinates: [
            34.0224,
            -118.2851
        ],

        zoom: 14,

        popup: `
            <strong>University of Southern California</strong>
            <br><br>
            M.S. in Geographic Information Science
            and Technology.
            <br><br>
            Los Angeles, California.
        `
    },


    maryland: {

        name: "Maryland",

        coordinates: [
            39.0458,
            -76.6413
        ],

        zoom: 8,

        popup: `
            <strong>Maryland</strong>
            <br><br>
            Software Engineer Intern at Peblla.
            <br><br>
            Worked on AI agents, retail systems,
            POS, KDS, and full-stack applications.
        `
    }

};



/* ==========================================
   2. Create Map
========================================== */


const map = L.map("map").setView(
    locations.usc.coordinates,
    5
);



/* ==========================================
   3. OpenStreetMap Basemap
========================================== */


L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",

    {

        attribution:

            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

    }

).addTo(map);



/* ==========================================
   4. Add Scale Control
========================================== */


L.control.scale({

    metric: true,

    imperial: true

}).addTo(map);



/* ==========================================
   5. Create Markers
========================================== */


const markers = {};


Object.keys(locations).forEach(function (key) {

    const location = locations[key];


    const marker = L.marker(
        location.coordinates
    )

        .addTo(map)

        .bindPopup(
            location.popup
        );


    markers[key] = marker;

});



/* ==========================================
   6. Journey Route
========================================== */


/*
Create one geographic journey line:

Beijing
   ↓
Los Angeles
   ↓
Maryland
*/


const journeyCoordinates = [

    locations.beijing.coordinates,

    locations.usc.coordinates,

    locations.maryland.coordinates

];



const journeyLine = L.polyline(

    journeyCoordinates,

    {

        color: "#990000",

        weight: 4,

        opacity: 0.75,

        dashArray: "8, 8"

    }

);



/* ==========================================
   7. Status
========================================== */


const statusText =
    document.getElementById("status");



/* ==========================================
   8. Fly to a Location
========================================== */


function flyToLocation(key) {

    const location = locations[key];


    map.flyTo(

        location.coordinates,

        location.zoom,

        {

            animate: true,

            duration: 1.5

        }

    );


    setTimeout(function () {

        markers[key].openPopup();

    }, 1500);


    statusText.textContent =
        `Exploring ${location.name}.`;

}



/* ==========================================
   9. Location Buttons
========================================== */


document
    .getElementById("beijing-button")
    .addEventListener(

        "click",

        function () {

            flyToLocation("beijing");

        }

    );



document
    .getElementById("usc-button")
    .addEventListener(

        "click",

        function () {

            flyToLocation("usc");

        }

    );



document
    .getElementById("maryland-button")
    .addEventListener(

        "click",

        function () {

            flyToLocation("maryland");

        }

    );



/* ==========================================
   11. Show Full Journey
========================================== */


const journeyButton =
    document.getElementById(
        "journey-button"
    );


let journeyVisible = false;


journeyButton.addEventListener(

    "click",

    function () {


        /*
        Add the line only once.
        */

        if (!journeyVisible) {

            journeyLine.addTo(map);

            journeyVisible = true;

        }


        /*
        Automatically zoom so all locations
        are visible.
        */

        map.fitBounds(

            journeyLine.getBounds(),

            {

                padding: [
                    45,
                    45
                ]

            }

        );


        statusText.textContent =
            "Showing my academic and professional journey from Beijing to Los Angeles and Maryland.";

    }

);



/* ==========================================
   14. Initial Popup
========================================== */


markers.usc.openPopup();
