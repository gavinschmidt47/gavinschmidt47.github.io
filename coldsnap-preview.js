(function () {
    const FADE_IN  = 1.5; // seconds
    const FADE_OUT = 2.0; // seconds

    function fmt(s) {
        s = Math.max(0, s);
        return Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0');
    }

    function initPlayer(container) {
        const audioId = container.dataset.audio;
        const start   = parseFloat(container.dataset.start);
        const end     = parseFloat(container.dataset.end);
        const dur     = end - start;
        const audio   = document.getElementById(audioId);
        if (!audio) return;

        const btn  = container.querySelector('.cs-pp-btn');
        const seek = container.querySelector('.cs-pp-seek');
        const time = container.querySelector('.cs-pp-time');

        time.textContent = '0:00 / ' + fmt(dur);

        let raf       = null;
        let fadingOut = false;

        function cancelFade() {
            if (raf) { cancelAnimationFrame(raf); raf = null; }
        }

        function fadeTo(target, duration, cb) {
            cancelFade();
            const t0 = performance.now();
            const v0 = audio.volume;
            const ms = duration * 1000;
            function step(now) {
                const p = Math.min((now - t0) / ms, 1);
                audio.volume = v0 + (target - v0) * p;
                if (p < 1) { raf = requestAnimationFrame(step); }
                else { raf = null; if (cb) cb(); }
            }
            raf = requestAnimationFrame(step);
        }

        function reset() {
            cancelFade();
            audio.pause();
            audio.volume     = 1;
            audio.currentTime = start;
            fadingOut        = false;
            btn.innerHTML    = '&#9654; Play';
            seek.value       = 0;
            time.textContent = '0:00 / ' + fmt(dur);
        }

        // Expose reset so other players can stop this one
        audio._previewReset = reset;

        function stopOthers() {
            document.querySelectorAll('.cs-preview-player').forEach(other => {
                if (other === container) return;
                const a = document.getElementById(other.dataset.audio);
                if (!a || a.paused) return;
                if (a._previewReset) a._previewReset();
            });
        }

        btn.addEventListener('click', () => {
            if (!audio.paused) {
                fadeTo(0, 0.4, reset);
            } else {
                stopOthers();
                fadingOut         = false;
                audio.volume      = 0;
                audio.currentTime = start;
                audio.play();
                btn.innerHTML = '&#9646;&#9646; Pause';
                fadeTo(1, FADE_IN);
            }
        });

        seek.addEventListener('input', () => {
            cancelFade();
            fadingOut    = false;
            audio.volume = 1;
            const pos    = parseFloat(seek.value) * dur;
            audio.currentTime = start + pos;
            time.textContent  = fmt(pos) + ' / ' + fmt(dur);
        });

        audio.addEventListener('timeupdate', () => {
            if (audio.paused) return;
            const pos       = audio.currentTime - start;
            const remaining = end - audio.currentTime;

            seek.value       = Math.min(pos / dur, 1);
            time.textContent = fmt(pos) + ' / ' + fmt(dur);

            if (remaining <= 0) { reset(); return; }

            if (!fadingOut && remaining <= FADE_OUT && !raf) {
                fadingOut = true;
                fadeTo(0, remaining, reset);
            }
        });

        audio.addEventListener('ended', reset);
    }

    function init() {
        document.querySelectorAll('.cs-preview-player').forEach(initPlayer);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
