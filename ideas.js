export function renderIdeas(db) {
    const mainContainer = document.getElementById('content-area');
    mainContainer.innerHTML = `
        <div class="card">
            <h2>💡 Idea Vault</h2>
            <div class="input-group" style="margin-bottom: 20px;">
                <input type="text" id="new-idea" placeholder="Enter a new idea..." style="width: 70%; padding: 10px;">
                <button id="add-idea-btn" class="btn-primary">Add Idea</button>
            </div>
            <div id="ideas-list"></div>
        </div>
    `;

    const btn = document.getElementById('add-idea-btn');
    const input = document.getElementById('new-idea');

    // Save Logic
    btn.onclick = () => {
        if (input.value.trim() !== "") {
            db.ref('aijaz_ideas/vault').push({
                content: input.value,
                timestamp: new Date().toLocaleString()
            });
            input.value = "";
        }
    };

    // Real-time Display Logic
    db.ref('aijaz_ideas/vault').on('value', (snapshot) => {
        const list = document.getElementById('ideas-list');
        list.innerHTML = "";
        snapshot.forEach(child => {
            const data = child.val();
            list.innerHTML += `
                <div style="padding: 10px; border-bottom: 1px solid #eee;">
                    <p><strong>${data.content}</strong></p>
                    <small>${data.timestamp}</small>
                </div>
            `;
        });
    });
}
