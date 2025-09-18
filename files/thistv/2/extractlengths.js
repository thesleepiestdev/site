// ==UserScript==
// @name         YouTube Playlist Video Length Extractor (CSV + Clipboard)
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Extract video lengths in seconds from YouTube playlists, output as CSV with spaces, and copy to clipboard
// @match        https://www.youtube.com/playlist*
// @grant        GM_setClipboard
// ==/UserScript==

(function () {
    'use strict';

    // Helper: convert hh:mm:ss or mm:ss into total seconds
    function timeToSeconds(timeStr) {
        const parts = timeStr.split(':').map(Number);
        let seconds = 0;

        if (parts.length === 3) {
            seconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
        } else if (parts.length === 2) {
            seconds = parts[0] * 60 + parts[1];
        } else if (parts.length === 1) {
            seconds = parts[0];
        }
        return seconds;
    }

    // Main function to collect durations
    function collectDurations() {
        const elements = document.querySelectorAll('div.yt-badge-shape__text');
        const durations = Array.from(elements)
            .map(el => el.textContent.trim())
            .filter(txt => txt.match(/^\d{1,2}:\d{2}(:\d{2})?$/)) // only times
            .map(timeToSeconds);

        if (durations.length > 0) {
            const csv = durations.join(", ");
            console.log("Video lengths in seconds (CSV):");
            console.log(csv);

            // Copy to clipboard
            if (typeof GM_setClipboard !== "undefined") {
                GM_setClipboard(csv);
                alert("Durations copied to clipboard!\n\n" + csv);
            } else {
                navigator.clipboard.writeText(csv).then(() => {
                    alert("Durations copied to clipboard!\n\n" + csv);
                }).catch(err => {
                    alert("Could not copy to clipboard, check console.\n\n" + csv);
                });
            }
        } else {
            alert("No video durations found yet. Scroll down to load the playlist fully.");
        }
    }

    // Add a button for convenience
    function addButton() {
        const existing = document.getElementById("extractDurationsBtn");
        if (existing) return;

        const btn = document.createElement("button");
        btn.id = "extractDurationsBtn";
        btn.innerText = "Extract Durations (CSV)";
        btn.style.position = "fixed";
        btn.style.top = "80px";
        btn.style.right = "20px";
        btn.style.zIndex = 9999;
        btn.style.padding = "10px";
        btn.style.background = "red";
        btn.style.color = "white";
        btn.style.border = "none";
        btn.style.borderRadius = "6px";
        btn.style.cursor = "pointer";

        btn.addEventListener("click", collectDurations);
        document.body.appendChild(btn);
    }

    // Run after page load
    window.addEventListener("load", () => {
        setTimeout(addButton, 3000);
    });
})();
