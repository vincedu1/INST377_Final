const express = require('express');
const cors = require('cors');
const supabaseClient = require('@supabase/supabase-js');
const dotenv = require('dotenv')

const app = express();
const PORT = 3000;
dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

const supabase = supabaseClient.createClient(SUPABASE_URL, SUPABASE_KEY);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Supabase is connected' });
});

app.get('/api/workouts', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('workouts')
            .select('*')
            .order('date', { ascending: false });

        if (error) throw error;

        res.json(data);
    } catch (error) {
        console.error('Error fetching workouts:', error);
        res.status(500).json({ error: 'Failed to fetch workouts' });
    }
});

app.post('/api/workouts', async (req, res) => {
    try {
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

        res.status(201).json(data[0]);
    } catch (error) {
        console.error('Error creating workout:', error);
        res.status(500).json({ error: 'Failed to create workout' });
    }
});

app.get('/api/goals', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('goals')
            .select('*')
            .order('created', { ascending: false });

        if (error) throw error;

        res.json(data);
    } catch (error) {
        console.error('Error fetching goals:', error);
        res.status(500).json({ error: 'Failed to fetch goals' });
    }
});

app.post('/api/goals', async (req, res) => {
    try {
        const { description, target, current, date, reminders } = req.body;

        if (!description || !target) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const { data, error } = await supabase
            .from('goals')
            .insert([{
                description,
                target,
                current: current || 0,
                date,
                reminders: reminders || false
            }])
            .select();

        if (error) throw error;

        res.status(201).json(data[0]);
    } catch (error) {
        console.error('Error creating goal:', error);
        res.status(500).json({ error: 'Failed to create goal' });
    }
});

app.listen(PORT, () => {
    console.log('App is available on port:', PORT);
});