class CountdownTimer {
    constructor() {
        this.totalSeconds = 0;
        this.remainingSeconds = 0;
        this.status = 'ready'; // ready, running, paused, finished
        this.intervalId = null;
        this.startTime = 0;
        this.pausedTime = 0;

        this.initElements();
        this.attachEventListeners();
    }

    initElements() {
        this.timerDisplay = document.getElementById('timerDisplay');
        this.statusDisplay = document.getElementById('statusDisplay');
        this.startBtn = document.getElementById('startBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.stopBtn = document.getElementById('stopBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.presetsContainer = document.getElementById('presetsContainer');
        this.customInputContainer = document.getElementById('customInputContainer');
        this.hoursInput = document.getElementById('hoursInput');
        this.minutesInput = document.getElementById('minutesInput');
        this.secondsInput = document.getElementById('secondsInput');
        this.setTimeBtn = document.getElementById('setTimeBtn');
        this.errorMessage = document.getElementById('errorMessage');
    }

    attachEventListeners() {
        this.startBtn.addEventListener('click', () => this.handleStart());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.resumeBtn = document.getElementById('resumeBtn');
        this.resumeBtn.addEventListener('click', () => this.resume());
        this.stopBtn.addEventListener('click', () => this.stop());
        this.setTimeBtn.addEventListener('click', () => this.handleCustomInput());

        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const seconds = parseInt(e.target.dataset.seconds);
                this.start(seconds);
            });
        });

        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                if (this.status === 'running') this.pause();
                else if (this.status === 'paused') this.resume();
            }
            if (e.code === 'Escape') this.stop();
        });
    }

    start(seconds) {
        if (this.status !== 'ready') return;
        
        this.totalSeconds = seconds;
        this.remainingSeconds = seconds;
        this.pausedTime = seconds;
        this.status = 'running';
        this.startTime = Date.now();

        this.updateUI();
        this.tick();
    }

    handleStart() {
        if (this.status === 'ready' && this.totalSeconds > 0) {
            this.status = 'running';
            this.startTime = Date.now();
            this.pausedTime = this.totalSeconds;
            this.updateUI();
            this.tick();
        }
    }

    pause() {
        if (this.status !== 'running') return;
        
        this.status = 'paused';
        if (this.intervalId) clearInterval(this.intervalId);
        this.updateUI();
    }

    resume() {
        if (this.status !== 'paused') return;
        
        this.status = 'running';
        this.startTime = Date.now() - ((this.pausedTime - this.remainingSeconds) * 1000);
        this.updateUI();
        if (this.intervalId) clearInterval(this.intervalId);
        this.tick();
    }

    stop() {
        if (this.status === 'ready') return;
        
        this.status = 'ready';
        this.remainingSeconds = 0;
        this.totalSeconds = 0;
        this.pausedTime = 0;
        if (this.intervalId) clearInterval(this.intervalId);
        this.updateUI();
    }

    reset() {
        this.stop();
        this.hoursInput.value = '';
        this.minutesInput.value = '';
        this.secondsInput.value = '';
        this.errorMessage.textContent = '';
    }

    tick() {
        if (this.status !== 'running') return;

        if (this.intervalId) clearInterval(this.intervalId);
        
        this.intervalId = setInterval(() => {
            const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
            this.remainingSeconds = Math.max(0, this.pausedTime - elapsed);

            this.updateDisplay();

            if (this.remainingSeconds === 0) {
                this.status = 'finished';
                clearInterval(this.intervalId);
                this.updateUI();
                this.notifyCompletion();
            }
        }, 100);
    }

    handleCustomInput() {
        this.errorMessage.textContent = '';
        
        const h = parseInt(this.hoursInput.value) || 0;
        const m = parseInt(this.minutesInput.value) || 0;
        const s = parseInt(this.secondsInput.value) || 0;

        if (h < 0 || m < 0 || s < 0 || m > 59 || s > 59) {
            this.errorMessage.textContent = '無效的時間值';
            return;
        }

        const totalSeconds = h * 3600 + m * 60 + s;
        if (totalSeconds === 0) {
            this.errorMessage.textContent = '請輸入大於 0 的時間';
            return;
        }

        this.start(totalSeconds);
        this.hoursInput.value = '';
        this.minutesInput.value = '';
        this.secondsInput.value = '';
    }

    updateDisplay() {
        const h = Math.floor(this.remainingSeconds / 3600);
        const m = Math.floor((this.remainingSeconds % 3600) / 60);
        const s = this.remainingSeconds % 60;
        
        const formatted = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
        this.timerDisplay.textContent = formatted;
    }

    updateUI() {
        this.updateDisplay();
        this.updateControls();
        this.updateStatus();
        this.updateInputVisibility();
    }

    updateControls() {
        const showStart = this.status === 'ready';
        const showPause = this.status === 'running';
        const showResume = this.status === 'paused';
        const showStop = this.status === 'running' || this.status === 'paused' || this.status === 'finished';

        this.startBtn.classList.toggle('hidden', !showStart);
        this.pauseBtn.classList.toggle('hidden', !showPause);
        this.resumeBtn.classList.toggle('hidden', !showResume);
        this.stopBtn.classList.toggle('hidden', !showStop);
    }

    updateStatus() {
        const statusMap = {
            ready: '準備就緒',
            running: '運行中',
            paused: '已暫停',
            finished: '已完成'
        };

        this.statusDisplay.textContent = statusMap[this.status];
        this.statusDisplay.className = `status ${this.status}`;
    }

    updateInputVisibility() {
        const showInputs = this.status === 'ready';
        this.presetsContainer.classList.toggle('hidden', !showInputs);
        this.customInputContainer.classList.toggle('hidden', !showInputs);
    }

    notifyCompletion() {
        // Toast notification
        this.showToast('時間到！', '倒計時已完成');
        
        // Sound notification
        this.playSound();
    }

    showToast(title, message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                <div class="toast-message">${message}</div>
            </div>
        `;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
        }, 10);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 5000);
    }

    playSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        } catch (e) {
            console.log('Audio not supported');
        }
    }
}

// Initialize timer when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new CountdownTimer();

    // Add toast styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .toast {
            position: fixed;
            top: 1rem;
            left: 50%;
            transform: translateX(-50%) translateY(-120px);
            background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
            border: 1px solid #334155;
            border-radius: 0.5rem;
            padding: 1rem 1.5rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            z-index: 9999;
            transition: transform 0.3s ease;
            max-width: 90%;
        }

        .toast.show {
            transform: translateX(-50%) translateY(0);
        }

        .toast-content {
            color: #fff;
        }

        .toast-title {
            font-weight: 600;
            margin-bottom: 0.25rem;
            color: #10b981;
        }

        .toast-message {
            font-size: 0.875rem;
            color: #cbd5e1;
        }
    `;
    document.head.appendChild(style);
});
