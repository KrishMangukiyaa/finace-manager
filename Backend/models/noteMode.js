const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true, maxLength: 100 },
    content: { type: String, required: true, trim: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Note', NoteSchema);



{/* <Router>
<div style={{ display: 'flex' }}>
    <Navigation active={active} setActive={setActive} />
    <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/incomes" element={<Income/>} />
        <Route path="/expenses" element={<Expenses/>} />
        <Route path="/Chat" element={<ChatBot/>} />
        <Route path="/Notes" element={<Notes/>} />
    </Routes>
</div>
</Router> */}