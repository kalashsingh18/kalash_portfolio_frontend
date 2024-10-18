// Fetch the latest description from the API
document.addEventListener("DOMContentLoaded", () => {
    // Fetch the latest description from the API
    fetch('https://kalashsingh1835.pythonanywhere.com/add_aboutyou')
        .then(response => {
            console.log("API called for About Me section");
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Find the last entry in the data array
            const latestEntry = data[data.length - 1];

            // Ensure there is a valid description
            if (latestEntry && latestEntry.about_you_discription) {
                const description = latestEntry.about_you_discription;
                console.log("Fetched description:", description);

                // Update the content of the HTML element
                document.getElementById('about-me-description').innerText = description;
            } else {
                console.error('No valid description found in the API response.');
                document.getElementById('about-me-description').innerText =
                    'Description not available.';
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            document.getElementById('about-me-description').innerText =
                'Failed to load the description.';
        });
});

// script.js
document.addEventListener("DOMContentLoaded", () => {
    const portfolioCards = document.querySelector(".portfolio-cards");

    // Fetch data from the API
    fetch("https://kalashsingh1835.pythonanywhere.com/add_project/list")
        .then((response) => response.json())
        .then((data) => {
            // Get the last three projects
            const lastThreeProjects = data.slice(-3);

            // Clear existing static project cards
            portfolioCards.innerHTML = "";

            // Populate portfolio with dynamic project cards
            lastThreeProjects.forEach((project, index) => {
                const cardHTML = `
                    <div class="card">
                        <div class="card-inner">
                            <div class="card-front">
                                <h2>Project ${index + 1}</h2>
                                <p>${project.project_name}</p>
                            </div>
                            <div class="card-back">
                                <h3>About this Project</h3>
                                <p>${project.project_discription}</p>
                            </div>
                        </div>
                    </div>
                `;
                portfolioCards.insertAdjacentHTML("beforeend", cardHTML);
            });
        })
        .catch((error) => console.error("Error fetching project data:", error));
});
