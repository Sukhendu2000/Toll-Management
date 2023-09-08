// Data structures for tolls, toll booths, and sales
const tolls = [
    {
        name: "Toll Plaza 1",
        booths: [
            { name: "Booth A", vehicleTypeCharges: {} },
            { name: "Booth B", vehicleTypeCharges: {} },
        ],
    },
    {
        name: "Toll Plaza 2",
        booths: [
            { name: "Booth X", vehicleTypeCharges: {} },
            { name: "Booth Y", vehicleTypeCharges: {} },
        ],
    },
];

const salesRecords = []; // Array to store sales records

// Array to store toll booth data for the leaderboard
const leaderboardData = [
    {
        tollPlaza: "Toll Plaza 1",
        boothName: "Booth A",
        vehiclesProcessed: 0,
        tollChargesCollected: 0,
    },
    // {
    //     tollPlaza: "Toll Plaza 1",
    //     boothName: "Booth B",
    //     vehiclesProcessed: 0,
    //     tollChargesCollected: 0,
    // },
    
];

// Function to validate a pass for a vehicle
function validatePass(vehicleType, vehicleRegNum, passType, tollId, boothId) {
    // Simulated data for valid passes
    const validPasses = {
        "Two Wheeler": ["AB1234", "XY5678"],
        "Four Wheeler": ["CD9012", "ZM3456"],
    };

    // Check if the provided vehicle registration number is in the list of valid passes
    if (validPasses[vehicleType] && validPasses[vehicleType].includes(vehicleRegNum)) {
        return "Valid";
    } else {
        return "Invalid";
    }
}

// Function to calculate pass charges based on vehicle type and pass type
function calculatePassCharge(vehicleType, passType) {
    // Define pass charges based on vehicle type and pass type
    const passCharges = {
        "Two Wheeler": {
            "Single Pass": 50,
            "Return Pass": 80,
            "7-Day Pass": 200,
        },
        "Four Wheeler": {
            "Single Pass": 100,
            "Return Pass": 150,
            "7-Day Pass": 400,
        },
    };

    // Retrieve the pass charge based on vehicle type and pass type
    return passCharges[vehicleType] && passCharges[vehicleType][passType] ? passCharges[vehicleType][passType] : 0;
}

// Function to process a successful pass
function processPass(vehicleType, vehicleRegNum, passType, tollId, boothId) {
    // Check if the vehicle has a valid pass
    const passValidity = validatePass(vehicleType, vehicleRegNum, passType, tollId, boothId);

    if (passValidity === "Valid") {
        // Calculate pass charge
        const passCharge = calculatePassCharge(vehicleType, passType);

        // Add a sales record
        const saleRecord = {
            vehicleRegNum,
            passType,
            passCharge,
            tollName: tolls[tollId].name,
            boothName: tolls[tollId].booths[boothId].name,
        };
        salesRecords.push(saleRecord);

        // Update the leaderboard data
        leaderboardData[tollId].vehiclesProcessed++;
        leaderboardData[tollId].tollChargesCollected += passCharge;

        return `Valid Pass: ${passType}<br>Vehicle Type: ${vehicleType}<br>Pass Charge: ${passCharge} INR`;
    } else {
        return "No active pass found. Please choose a pass.";
    }
}

// Function to display sales records
function displaySalesRecords() {
    console.log("Sales Records:");
    salesRecords.forEach((record, index) => {
        console.log(`#${index + 1} - Vehicle: ${record.vehicleRegNum}, Pass Type: ${record.passType}, Charge: ${record.passCharge} INR, Toll: ${record.tollName}, Booth: ${record.boothName}`);
    });
}

// Function to display the leaderboard
function displayLeaderboard() {
    const leaderboardDiv = document.getElementById("leaderboard");
    leaderboardDiv.innerHTML = ""; // Clear previous content

    // Create a table to display the leaderboard
    const leaderboardTable = document.createElement("table");
    leaderboardTable.innerHTML = `
        <tr>
            <th>Toll Plaza</th>
            <th>Booth Name</th>
            <th>Vehicles Processed</th>
            <th>Toll Charges Collected (INR)</th>
        </tr>
    `;

    // Populate the table with data
    leaderboardData.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.tollPlaza}</td>
            <td>${item.boothName}</td>
            <td>${item.vehiclesProcessed}</td>
            <td>${item.tollChargesCollected}</td>
        `;
        leaderboardTable.appendChild(row);
    });

    // Append the table to the leaderboard div
    leaderboardDiv.appendChild(leaderboardTable);
}

// Event listener for form submission
document.getElementById("tollForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Get the vehicle registration number, pass type, and vehicle type from the form
    const vehicleRegNum = document.getElementById("vehicleRegNum").value;
    const passType = document.getElementById("passType").value;
    const vehicleType = document.querySelector('input[name="vehicleType"]:checked').value;

    // Call the function to process the pass and display the result
    const result = processPass(vehicleType, vehicleRegNum, passType, 0, 0); // Replace with actual toll and booth IDs

    // Display the result in the result div
    document.getElementById("result").innerHTML = result;

    // Display the updated leaderboard
    displayLeaderboard();
});

// Initial display of the leaderboard
displayLeaderboard();
