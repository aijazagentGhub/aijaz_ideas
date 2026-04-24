
export function renderMarathon(db) {
    const container = document.getElementById('content-area');
    
    // 1. Restore the EXACT HTML structure from your original backup
    container.innerHTML = `
        <div class="dashboard-container">
            <div class="header-banner">
                <span id="upcoming-event-banner">Upcoming event! : 26/04/2026, TCS 10K</span>
            </div>
            <div class="header-row">
                <h2>Marathon Tracker</h2>
                <div class="btns">
                    <button class="btn-add">+ Add Race</button>
                    <button class="btn-export">Export CSV</button>
                </div>
            </div>
            <div class="summary-grid">
                <div class="summary-card"><h4>COMPLETED</h4><h2 id="count-comp">0</h2></div>
                <div class="summary-card"><h4>PENDING</h4><h2 id="count-pend">0</h2></div>
                <div class="summary-card"><h4>MISSED</h4><h2 id="count-miss">0</h2></div>
                <div class="summary-card"><h4>TOTAL PAID ₹</h4><h2 id="total-paid">0</h2></div>
            </div>
            <table class="main-table">
                <thead>
                    <tr><th>Marathon Name</th><th>Distance</th><th>Date</th><th>Status</th><th>Location</th><th>Paid</th><th>Action</th></tr>
                </thead>
                <tbody id="marathon-rows"></tbody>
            </table>
        </div>
    `;

    // 2. RE-ATTACH YOUR ORIGINAL DATA FETCHING LOGIC
    db.ref('aijaz_ideas/marathons').on('value', (snapshot) => {
        const data = snapshot.val();
        const tbody = document.getElementById('marathon-rows');
        tbody.innerHTML = ''; // Clear and reload
        
        if (data) {
            Object.keys(data).forEach(key => {
                const race = data[key];
                tbody.innerHTML += `
                    <tr>
                        <td>${race.name}</td>
                        <td>${race.distance}</td>
                        <td>${race.date}</td>
                        <td><span class="status-${race.status.toLowerCase()}">${race.status}</span></td>
                        <td>${race.location}</td>
                        <td>${race.paid}</td>
                        <td><button onclick="deleteRace('${key}')">x</button></td>
                    </tr>
                `;
            });
        }
    });
}
