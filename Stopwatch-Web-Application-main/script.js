let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;

function startPause() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTime, 10);
        document.querySelector('button').innerText = 'Pause';
        isRunning = true;
    } else {
        clearInterval(timer);
        document.querySelector('button').innerText = 'Start';
        isRunning = false;
    }
}

function reset() {
    clearInterval(timer);
    document.querySelector('#display').innerText = '00:00:00';
    document.querySelector('button').innerText = 'Start';
    elapsedTime = 0;
    isRunning = false;
    document.querySelector('#laps').innerHTML = '';
}

function lap() {
    if (isRunning) {
        const currentTime = Date.now();
        const lapTime = currentTime - startTime;
        elapsedTime += lapTime;

        const formattedTime = formatTime(lapTime);
        const lapItem = document.createElement('li');
        lapItem.innerText = formattedTime;
        document.querySelector('#laps').appendChild(lapItem);

        startTime = currentTime;
    }
}

function updateTime() {
    const currentTime = Date.now();
    const updatedTime = currentTime - startTime + elapsedTime;
    document.querySelector('#display').innerText = formatTime(updatedTime);
}

function formatTime(time) {
    const date = new Date(time);
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const milliseconds = Math.floor(date.getMilliseconds() / 10).toString().padStart(2, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
}
