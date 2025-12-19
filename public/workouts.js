const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        if (req.method === 'GET') {
            const { data, error } = await supabase
                .from('workouts')
                .select('*')
                .order('date', { ascending: false });

            if (error) throw error;
            return res.status(200).json(data);

        } else if (req.method === 'POST') {
            const { exercise, sets, reps, weight, notes, date } = req.body;

            if (!exercise || !sets || !reps || weight === undefined) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            const { data, error } = await supabase
                .from('workouts')
                .insert([{
                    exercise,
                    sets,
                    reps,
                    weight,
                    notes,
                    date: date || new Date().toISOString()
                }])
                .select();

            if (error) throw error;
            return res.status(201).json(data[0]);

        } else {
            return res.status(405).json({ error: 'Method not allowed' });
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};