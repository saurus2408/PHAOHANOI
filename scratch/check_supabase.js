const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://hiykohhpxogniosdowjo.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_9BGxNUPQ2XGuOH437-4PuA_lIaAzv0_';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function check() {
    console.log("Checking players...");
    const { data: pData, error: pErr } = await supabase.from('players').select('*');
    if (pErr) console.error("players error:", pErr);
    else console.log("players sample:", pData);
}

check();
