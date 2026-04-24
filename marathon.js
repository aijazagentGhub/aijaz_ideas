export function renderMarathon(db) {
    const container = document.getElementById('content-area');
    container.innerHTML = `
        <div class="upcoming-banner">Upcoming event! : 26/04/2026, TCS 10K</div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
            <h2 style="font-size:28px;">Marathon Tracker</h2>
            <button style="background:#2196f3; color:white; border:none; padding:10px 20px; border-radius:5px; font-weight:bold; cursor:pointer;">+ Add Race</button>
        </div>
        <div class="stats-grid">
            <div class="stat-card"><h5>COMPLETED</h5><h2 id="val-comp">0</h2></div>
            <div class="stat-card"><h5>PENDING</h5><h2 id="val-pend">0</h2></div>
            <div class="stat-card"><h5>MISSED</h5><h2 id="val-miss">0</h2></div>
            <div class="stat-card"><h5>TOTAL PAID ₹</h5><h2 id="val-paid">0</h2></div>
        </div>
        <table>
            <thead>
                <tr><th>Marathon Name</th><th>Distance</th><th>Date</th><th>Status</th><th>Location</th><th>Paid (₹)</th></tr>
            </thead>
            <tbody id="marathon-rows"></tbody>
        </table>
    `;

    db.ref('aijaz_ideas/marathons').on('value', (snapshot) => {
        const data = snapshot.val();
        const tbody = document.getElementById('marathon-rows');
        if (!tbody) return; 
        tbody.innerHTML = '';
        let comp=0, pend=0, miss=0, total=0;

        if (data) {
            Object.keys(data).forEach(key => {
                const r = data[key];
                if(r.status === 'Completed') comp++;
                else if(r.status === 'Pending') pend++;
                else if(r.status === 'Missed') miss++;
                total += parseInt(r.paid || 0);

                tbody.innerHTML += `
                    <tr>
                        <td>${r.name}</td>
                        <td>${r.distance} KM</td>
                        <td>${r.date}</td>
                        <td><span class="status-${r.status.toLowerCase()}">${r.status}</span></td>
                        <td>${r.location}</td>
                        <td>${r.paid}</td>
                    </tr>`;
            });
            document.getElementById('val-comp').innerText = comp;
            document.getElementById('val-pend').innerText = pend;
            document.getElementById('val-miss').innerText = miss;
            document.getElementById('val-paid').innerText = total.toLocaleString();
        }
    });
}
