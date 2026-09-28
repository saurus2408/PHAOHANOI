const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://hiykohhpxogniosdowjo.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_9BGxNUPQ2XGuOH437-4PuA_lIaAzv0_';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const teamsJsContent = fs.readFileSync(path.join(__dirname, '../js/teams.js'), 'utf8');
const rosterRegex = /const DEFAULT_ROSTER = \[([\s\S]*?)\];/;
const match = teamsJsContent.match(rosterRegex);
const rosterItems = eval('[' + match[1] + ']');

async function updateSupabase() {
    console.log('Attempting direct Supabase update for 74 players...');
    let successCount = 0;
    let errCount = 0;

    for (const p of rosterItems) {
        const { data, error } = await supabase
            .from('players')
            .upsert({
                num: p.num,
                name: p.name,
                position: p.primaryPosition
            }, { onConflict: 'num' });

        if (error) {
            // Try matching by name if num fails
            const { error: err2 } = await supabase
                .from('players')
                .update({ position: p.primaryPosition })
                .eq('name', p.name);

            if (err2) {
                console.warn(`Failed to update ${p.name}:`, err2.message);
                errCount++;
            } else {
                successCount++;
            }
        } else {
            successCount++;
        }
    }

    console.log(`Finished direct update: ${successCount} succeeded, ${errCount} failed.`);
}

updateSupabase();
