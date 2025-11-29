const API_URL = "http://localhost:8085";

async function apiPostJSON(url, body) {
    const res = await fetch(API_URL + url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });
    return res.json();
}


// GET ------------------------------
async function apiGet(url) {
    const res = await fetch(API_URL + url);
    return res.json();
}

// POST -----------------------------
async function apiPost(url, body = null) {
    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" }
    };
    if (body) options.body = JSON.stringify(body);
    const res = await fetch(API_URL + url, options);
    return res.json();
}

// PUT ------------------------------
async function apiPut(url, body = null) {
    const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" }
    };
    if (body) options.body = JSON.stringify(body);
    const res = await fetch(API_URL + url, options);
    return res.json();
}

// DELETE ---------------------------
async function apiDelete(url) {
    const res = await fetch(API_URL + url, { method: "DELETE" });
    return res;
}
