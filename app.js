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





const map = L.map("map").setView(
    locations.usc.coordinates,
    5
);

L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",

    {

        attribution:

            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

    }

).addTo(map);


L.control.scale({
    metric: true,
    imperial: true
}).addTo(map);

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





const statusText =
    document.getElementById("status");





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





const journeyButton =
    document.getElementById(
        "journey-button"
    );


let journeyVisible = false;


journeyButton.addEventListener(

    "click",

    function () {
        if (!journeyVisible) {

            journeyLine.addTo(map);

            journeyVisible = true;

        }

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





markers.usc.openPopup();

const focusButton = document.getElementById("focus-button");
const focusOutput = document.getElementById("focus-output");

function toggleCurrentFocus() {
    const isExpanded = focusOutput.hidden;
    focusOutput.hidden = !isExpanded;
    focusOutput.textContent =
        "Current focus: AI agents, software engineering, and GIS.";
    focusButton.textContent = isExpanded
        ? "Hide Current Focus"
        : "Show Current Focus";
    focusButton.setAttribute("aria-expanded", String(isExpanded));
}

focusButton.addEventListener("click", toggleCurrentFocus);
