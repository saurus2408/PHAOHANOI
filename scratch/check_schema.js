const headers = {
    "apikey": "sb_publishable_9BGxNUPQ2XGuOH437-4PuA_lIaAzv0_",
    "Authorization": "Bearer sb_publishable_9BGxNUPQ2XGuOH437-4PuA_lIaAzv0_"
};

async function fetchOne(tableName) {
    const url = `https://hiykohhpxogniosdowjo.supabase.co/rest/v1/${tableName}?select=*&limit=1`;
    try {
        const res = await fetch(url, { headers });
        const data = await res.json();
        console.log(`Table: ${tableName}`);
        console.log("  Row:", data[0] || "No records");
    } catch (e) {
        console.error(`Error on ${tableName}:`, e);
    }
}

async function run() {
    for (const tableName of ["players", "match_results", "player_scores", "gk_scores", "awards", "videos"]) {
        await fetchOne(tableName);
    }
}

run();
