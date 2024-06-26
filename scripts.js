document.addEventListener('DOMContentLoaded', () => {
    const createSpeechBtn = document.getElementById('create-speech-btn');
    const addNotecardBtn = document.getElementById('add-notecard-btn');
    const startSpeechBtn = document.getElementById('start-speech-btn');
    const prevNotecardBtn = document.getElementById('prev-notecard-btn');
    const nextNotecardBtn = document.getElementById('next-notecard-btn');
    
    const startScreen = document.getElementById('start-screen');
    const notecardsScreen = document.getElementById('notecards-screen');
    const speechScreen = document.getElementById('speech-screen');
    const notecardsContainer = document.getElementById('notecards-container');
    const notecardDisplay = document.getElementById('notecard-display');
    const timerDisplay = document.getElementById('timer');

    let notecards = [];
    let currentNotecardIndex = 0;
    let timer;
    let secondsElapsed = 0;

    createSpeechBtn.addEventListener('click', () => {
        startScreen.style.display = 'none';
        notecardsScreen.style.display = 'block';
    });

    addNotecardBtn.addEventListener('click', () => {
        const notecard = document.createElement('div');
        notecard.classList.add('notecard');
        notecard.contentEditable = true;

        const fontColorInput = document.createElement('input');
        fontColorInput.type = 'color';
        fontColorInput.addEventListener('input', (e) => {
            notecard.style.color = e.target.value;
        });

        const bgColorInput = document.createElement('input');
        bgColorInput.type = 'color';
        bgColorInput.addEventListener('input', (e) => {
            notecard.style.backgroundColor = e.target.value;
        });

        notecard.appendChild(fontColorInput);
        notecard.appendChild(bgColorInput);
        notecardsContainer.appendChild(notecard);
    });

    startSpeechBtn.addEventListener('click', () => {
        notecards = Array.from(notecardsContainer.querySelectorAll('.notecard'));
        if (notecards.length > 0) {
            notecardsScreen.style.display = 'none';
            speechScreen.style.display = 'block';
            displayNotecard();
            startTimer();
        }
    });

    prevNotecardBtn.addEventListener('click', () => {
        if (currentNotecardIndex > 0) {
            currentNotecardIndex--;
            displayNotecard();
        }
    });

    nextNotecardBtn.addEventListener('click', () => {
        if (currentNotecardIndex < notecards.length - 1) {
            currentNotecardIndex++;
            displayNotecard();
        }
    });

    function displayNotecard() {
        notecardDisplay.innerHTML = notecards[currentNotecardIndex].innerHTML;
    }

    function startTimer() {
        timer = setInterval(() => {
            secondsElapsed++;
            timerDisplay.textContent = formatTime(secondsElapsed);
        }, 1000);
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
});
