export function renderMarathon(db) {
    const container = document.getElementById('content-area');
    
    container.innerHTML = `
        <div class="dashboard">
            <div class="banner-wrapper">
                <span class="upcoming-banner">Upcoming event! : 26/04/2026, TCS 10K</span>
            </div>
            <div class="header-section">
                <h2>Marathon Tracker</h2>
                <div class="button-group">
                    <button class="btn-add">+ Add Race</button>
                    <button class="btn-export">Export CSV</button>
                </div>
            </div>
            <div class="stats-row">
                <div class="stat-card"><h5>COMPLETED</h5><h2 id="val-comp">0</h2></div>
                <div class="stat-card"><h5>PENDING</h5><h2 id="val-pend">0</h2></div>
                <div class="stat-card"><h5>MISSED</h5><h2 id="val-miss">0</h2></div>
                <div class="stat-card"><h5>TOTAL PAID ₹</h5><h2 id="val-paid">0</h2></div>
            </div>
            <table class="marathon-table">
                <thead>
                    <tr>
                        <th>Marathon Name</th>
                        <th>Distance (KM)</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Location</th>
                        <th>Paid (₹)</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody id="marathon-data-rows"></tbody>
            </table>
        </div>
    `;

    // FETCH REAL DATA
    db.ref('aijaz_ideas/marathons').on('value', (snapshot) => {
        const data = snapshot.val();
        const tbody = document.getElementById('marathon-data-rows');
        tbody.innerHTML = '';
        
        let comp=0, pend=0, miss=0, totalPaid=0;

        if (data) {
            Object.keys(data).forEach(key => {
                const r = data[key];
                if(r.status === 'Completed') comp++;
                if(r.status === 'Pending') pend++;
                if(r.status === 'Missed') miss++;
                totalPaid += parseInt(r.paid || 0);

                tbody.innerHTML += `
                    <tr>
                        <td>${r.name}</td>
                        <td>${r.distance}</td>
                        <td>${r.date}</td>
                        <td><span class="status-${r.status.toLowerCase()}">${r.status}</span></td>
                        <td>${r.location}</td>
                        <td>${r.paid}</td>
                        <td class="text-center"><button class="btn-delete">×</button></td>
                    </tr>`;
            });
            
            document.getElementById('val-comp').innerText = comp;
            document.getElementById('val-pend').innerText = pend;
            document.getElementById('val-miss').innerText = miss;
            document.getElementById('val-paid').innerText = totalPaid.toLocaleString();
        }
    });
}
