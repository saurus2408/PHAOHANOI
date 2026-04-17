
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://hiykohhpxogniosdowjo.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_9BGxNUPQ2XGuOH437-4PuA_lIaAzv0_';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function checkData() {
    console.log("--- Checking player_scores table ---");
    const { data: scores, error: scoresError } = await supabase.from('player_scores').select('*');
    if (scoresError) console.error("Error fetching scores:", scoresError);
    else console.log("Scores Content:", JSON.stringify(scores, null, 2));

    console.log("\n--- Checking players table ---");
    const { data: players, error: playersError } = await supabase.from('players').select('*');
    if (playersError) console.error("Error fetching players:", playersError);
    else console.log("Players count:", players.length);
}

checkData();
