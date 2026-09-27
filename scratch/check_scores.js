const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://hiykohhpxogniosdowjo.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_9BGxNUPQ2XGuOH437-4PuA_lIaAzv0_';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function checkScores() {
    console.log("Checking player_scores table...");
    const { data, error } = await supabase.from('player_scores').select('*');
    if (error) {
        console.error("player_scores error:", error);
    } else {
        console.log("player_scores count:", data ? data.length : 0);
        console.log("sample row:", data && data.length > 0 ? data[0] : "empty");
    }
}

checkScores();
