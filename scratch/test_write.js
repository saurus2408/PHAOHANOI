const headers = {
    "apikey": "sb_publishable_9BGxNUPQ2XGuOH437-4PuA_lIaAzv0_",
    "Authorization": "Bearer sb_publishable_9BGxNUPQ2XGuOH437-4PuA_lIaAzv0_",
    "Content-Type": "application/json",
    "Prefer": "return=representation"
};

async function testMatchUpdate() {
    const url = "https://hiykohhpxogniosdowjo.supabase.co/rest/v1/match_results?id=eq.2";
    try {
        const res = await fetch(url, {
            method: 'PATCH',
            headers,
            body: JSON.stringify({
                status: 'internal'
            })
        });
        const data = await res.json();
        console.log("Response status:", res.status);
        console.log("Response data:", data);
    } catch (e) {
        console.error("Fetch error:", e);
    }
}

testMatchUpdate();
