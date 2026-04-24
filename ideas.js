export function renderIdeas(db) {
    const container = document.getElementById('content-area');
    
    container.innerHTML = `
        <div class="dashboard-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <h2 style="color: #1a237e;">💡 Idea Vault</h2>
            <button id="add-idea-btn" style="background-color: #2196F3; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">+ Add Idea</button>
        </div>

        <div id="idea-form" class="card" style="display: none; background: white; padding: 20px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-bottom: 20px;">
            <input type="text" id="idea-title" placeholder="Idea Title" style="width: 100%; padding: 10px; margin-bottom: 10px; border: 1px solid #ddd; border-radius: 5px;">
            <textarea id="idea-desc" placeholder="Describe your thought..." style="width: 100%; padding: 10px; height: 80px; border: 1px solid #ddd; border-radius: 5px;"></textarea>
            <button id="save-idea-btn" style="background-color: #4CAF50; color: white; border: none; padding: 10px 20px; border-radius: 5px; margin-top: 10px;">Save to Firebase</button>
        </div>

        <div id="ideas-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px;">
            </div>
    `;

    // UI Logic: Show/Hide Form
    const addBtn = document.getElementById('add-idea-btn');
    const form = document.getElementById('idea-form');
    addBtn.onclick = () => form.style.display = form.style.display === 'none' ? 'block' : 'none';

    // Firebase Logic: Save
    document.getElementById('save-idea-btn').onclick = () => {
        const title = document.getElementById('idea-title').value;
        const desc = document.getElementById('idea-desc').value;
        if (title) {
            db.ref('aijaz_ideas/vault').push({
                title,
                desc,
                date: new Date().toLocaleDateString()
            });
            document.getElementById('idea-title').value = '';
            document.getElementById('idea-desc').value = '';
            form.style.display = 'none';
        }
    };

    // Firebase Logic: Read
    db.ref('aijaz_ideas/vault').on('value', (snapshot) => {
        const grid = document.getElementById('ideas-grid');
        grid.innerHTML = '';
        snapshot.forEach(child => {
            const data = child.val();
            grid.innerHTML += `
                <div class="card" style="background: white; padding: 15px; border-radius: 10px; border-left: 5px solid #2196F3; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                    <h3 style="margin-top: 0; color: #333;">${data.title}</h3>
                    <p style="color: #666; font-size: 0.9em;">${data.desc}</p>
                    <small style="color: #999;">${data.date}</small>
                </div>
            `;
        });
    });
}
