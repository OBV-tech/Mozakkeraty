/**
         * مذاكرتي Pro - تطبيق إدارة الدراسة المتكامل
         */

        class StudyApp {
            constructor() {
                // البيانات الرئيسية
                this.data = {
                    user: { name: '', createdAt: Date.now() },
                    stats: {
                        points: 0,
                        streak: 0,
                        bestStreak: 0,
                        totalMinutes: 0,
                        totalSessions: 0,
                        aiChats: 0,
                        lastStudyDate: null
                    },
                    schedule: [],
                    notes: [],
                    trees: [],
                    achievements: [],
                    challenges: [],
                    settings: {
                        darkMode: false,
                        soundEnabled: true,
                        notifications: true
                    }
                };

                // حالة المؤقت
                this.timer = {
                    interval: null,
                    seconds: 1500,
                    totalSeconds: 1500,
                    isRunning: false,
                    isPaused: false,
                    mode: 'pomodoro',
                    sessionsToday: 0,
                    minutesToday: 0
                };

                // حالة التطبيق
                this.state = {
                    currentPage: 'home',
                    selectedNoteColor: 'red',
                    gardenTheme: 'day',
                    audioContext: null
                };

                // الاقتباسات
                this.quotes = [
                    { text: 'النجاح لا يأتي من الراحة، بل من المثابرة.', author: '— مقولة تحفيزية' },
                    { text: 'ثانويتك فرصتك لبناء مستقبلك، لا تضيّعها.', author: '— نصيحة ذهبية' },
                    { text: 'كل دقيقة مذاكرة الآن = ساعة راحة لاحقاً.', author: '— قانون النجاح' },
                    { text: 'الذكاء هو ما تصنعه من مجهودك، لا ما تولد به.', author: '— كارول دويك' },
                    { text: 'اصبر تُجبر، واجتهادك لن يضيع سدى.', author: '— حكمة عربية' }
                ];

                // عناصر المتجر
                this.shopItems = [
                    { id: 1, icon: '🌲', name: 'شجرة الصنوبر', cost: 30, type: 'pine', desc: 'شجرة خضراء جميلة' },
                    { id: 2, icon: '🌳', name: 'شجرة البلوط', cost: 50, type: 'oak', desc: 'شجرة قوية وكبيرة' },
                    { id: 3, icon: '🌴', name: 'نخلة', cost: 80, type: 'palm', desc: 'نخلة استوائية رائعة' },
                    { id: 4, icon: '🎄', name: 'شجرة عيد', cost: 100, type: 'christmas', desc: 'شجرة مميزة وجميلة' },
                    { id: 5, icon: '🌵', name: 'صبار', cost: 60, type: 'cactus', desc: 'نبات صبار صحراوي' },
                    { id: 6, icon: '🌸', name: 'شجرة الكرز', cost: 150, type: 'sakura', desc: 'شجرة وردية رائعة' },
                    { id: 7, icon: '🌺', name: 'الهيبسكوس', cost: 200, type: 'hibiscus', desc: 'أزهار حمراء جميلة' },
                    { id: 8, icon: '🌻', name: 'عباد الشمس', cost: 120, type: 'sunflower', desc: 'زهرة مشمسة مبهجة' }
                ];

                // الإنجازات
                this.achievementsList = [
                    { id: 'first_tree', name: 'بستاني مبتدئ', desc: 'اشتري أول شجرة', icon: '🌱' },
                    { id: 'tree_collector', name: 'جامع الأشجار', desc: 'اشتري 5 أشجار', icon: '🌳' },
                    { id: 'streak_3', name: 'ملتزم', desc: '3 أيام متتالية', icon: '🔥' },
                    { id: 'streak_7', name: 'ملتزم أسبوعي', desc: '7 أيام متتالية', icon: '🔥' },
                    { id: 'streak_30', name: 'أسطورة المذاكرة', desc: '30 يوم متتالي', icon: '👑' },
                    { id: 'rich', name: 'ثري الحديقة', desc: 'جمع 1000 نقطة', icon: '💎' },
                    { id: 'first_note', name: 'كاتب مذكرات', desc: 'أضف أول ملاحظة', icon: '📝' },
                    { id: 'ai_friend', name: 'صديق OBV', desc: 'تحدث مع AI 10 مرات', icon: '🤖' }
                ];

                // الأسئلة الشائعة
                this.faqData = [
                    { q: 'هل ممكن أغير شعبة بعد ما بدأت الدراسة؟', a: 'نعم، يمكن تغيير الشعبة في أول أسبوعين من بداية العام الدراسي.' },
                    { q: 'الرياضيات صعبة، هل أقدر أنجح فيها؟', a: 'بالتأكيد! الرياضيات تحتاج ممارسة يومية. حل مسائل يومياً حتى لو قليلة.' },
                    { q: 'كيف أذاكر وأنا مشغول بمواقع التواصل؟', a: 'استخدم تقنية البومودورو (25 دقيقة تركيز + 5 دقائق راحة). ضع هاتفك في وضع الطيران.' },
                    { q: 'هل النوم مهم قبل الامتحان؟', a: 'النوم ضروري جداً! الدماغ يحتاج 7-8 ساعات لترتيب المعلومات.' },
                    { q: 'ماذا أفعل لو أحسست بضغط نفسي؟', a: 'تكلم مع شخص تثق به، مارس رياضة خفيفة، خذ نفس عميق.' }
                ];

             
                this.init();
            }

            // ==================== INITIALIZATION ====================

            async init() {
                this.showLoading();
                await this.loadData();
                this.initParticles();
                this.initStars();
                this.generateDailyChallenges();
                this.setupEventListeners();
                this.renderAll();
                this.hideLoading();
            }

            showLoading() {
                const progress = document.getElementById('loading-progress');
                let width = 0;
                const interval = setInterval(() => {
                    width += Math.random() * 20;
                    if (width >= 100) {
                        width = 100;
                        clearInterval(interval);
                    }
                    progress.style.width = width + '%';
                }, 200);
            }

            hideLoading() {
                document.getElementById('loading-screen').classList.add('hidden');
                document.getElementById('app').classList.remove('hidden');
            }

            // ==================== DATA MANAGEMENT ====================

            loadData() {
                try {
                    const saved = localStorage.getItem('mazakrti_data');
                    if (saved) {
                        const parsed = JSON.parse(saved);
                        this.data = { ...this.data, ...parsed };
                    }
                    
                    // Apply theme
                    if (this.data.settings.darkMode) {
                        document.documentElement.setAttribute('data-theme', 'dark');
                        document.getElementById('dark-mode-icon').textContent = '☀️';
                    }

                    // Check daily reset
                    this.checkDailyReset();
                } catch (e) {
                    console.error('Error loading data:', e);
                }
            }

            saveData() {
                try {
                    localStorage.setItem('mazakrti_data', JSON.stringify(this.data));
                } catch (e) {
                    console.error('Error saving data:', e);
                }
            }

            checkDailyReset() {
                const today = new Date().toDateString();
                const lastCheck = localStorage.getItem('last_check');
                
                if (lastCheck !== today) {
                    this.timer.sessionsToday = 0;
                    this.timer.minutesToday = 0;
                    this.generateDailyChallenges();
                    localStorage.setItem('last_check', today);
                }
            }

            // ==================== NAVIGATION ====================

            navigate(page) {
                // Update nav
                document.querySelectorAll('.nav-btn, .drawer-link').forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.page === page);
                });

                // Show page
                document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
                document.getElementById(`page-${page}`).classList.add('active');
                
                this.state.currentPage = page;
                this.closeDrawer();

                // Page specific init
                if (page === 'timer') this.renderGarden();
                if (page === 'ai' && !this.aiInitialized) this.initAI();
                
                window.scrollTo(0, 0);
            }

            toggleDrawer() {
                document.getElementById('nav-drawer').classList.toggle('open');
                document.getElementById('drawer-overlay').classList.toggle('open');
            }

            closeDrawer() {
                document.getElementById('nav-drawer').classList.remove('open');
                document.getElementById('drawer-overlay').classList.remove('open');
            }

            // ==================== RENDERING ====================

            renderAll() {
                this.renderStats();
                this.renderStreak();
                this.renderChallenges();
                this.renderSchedule();
                this.renderNotes();
                this.renderShop();
                this.renderFAQ();
                this.renderWeeklyChart();
                this.renderProgress();
                this.renderQuote();
                this.renderGarden();
                this.updateTimerDisplay();
            }

            renderStats() {
                document.getElementById('hero-streak').textContent = this.data.stats.streak;
                document.getElementById('hero-points').textContent = this.data.stats.points;
                document.getElementById('hero-trees').textContent = this.data.trees.length;
                
                document.getElementById('stat-subjects').textContent = this.data.schedule.length;
                document.getElementById('stat-notes').textContent = this.data.notes.length;
                document.getElementById('stat-trees').textContent = this.data.trees.length;
                document.getElementById('stat-points').textContent = this.data.stats.points;
                document.getElementById('stat-ai').textContent = this.data.stats.aiChats;
                document.getElementById('stat-best-streak').textContent = Math.max(this.data.stats.streak, this.data.stats.bestStreak);
                
                document.getElementById('shop-points').textContent = this.data.stats.points;
                document.getElementById('timer-sessions').textContent = this.timer.sessionsToday;
                document.getElementById('timer-minutes-today').textContent = this.timer.minutesToday;
            }

            renderStreak() {
                document.getElementById('streak-number').textContent = this.data.stats.streak;
                const progress = Math.min((this.data.stats.streak / 7) * 100, 100);
                document.getElementById('streak-fill').style.width = progress + '%';
            }

            renderProgress() {
                const completed = this.data.schedule.filter(i => i.completed).length;
                const total = this.data.schedule.length || 1;
                const percent = Math.round((completed / total) * 100);
                
                document.getElementById('progress-percent').textContent = percent + '%';
                
                const circle = document.getElementById('daily-progress');
                const circumference = 2 * Math.PI * 40;
                const offset = circumference - (percent / 100) * circumference;
                circle.style.strokeDasharray = circumference;
                circle.style.strokeDashoffset = offset;
            }

            renderQuote() {
                const quote = this.quotes[Math.floor(Math.random() * this.quotes.length)];
                document.getElementById('quote-text').textContent = quote.text;
                document.getElementById('quote-author').textContent = quote.author;
            }

            // ==================== CHALLENGES ====================

            generateDailyChallenges() {
                const today = new Date().toDateString();
                if (this.data.challengesDate === today) return;
                
                this.data.challenges = [
                    { id: 1, text: 'ذاكر 30 دقيقة بدون توقف', points: 10, completed: false },
                    { id: 2, text: 'أكمل 3 مواد في الجدول', points: 15, completed: false },
                    { id: 3, text: 'استخدم المؤقت مرتين', points: 20, completed: false }
                ];
                this.data.challengesDate = today;
                this.saveData();
            }

            renderChallenges() {
                document.getElementById('challenges-date').textContent = new Date().toLocaleDateString('ar-EG');
                const container = document.getElementById('challenges-list');
                
                container.innerHTML = this.data.challenges.map(c => `
                    <div class="challenge-item ${c.completed ? 'completed' : ''}" onclick="app.toggleChallenge(${c.id})">
                        <div style="display: flex; align-items: center;">
                            <div class="challenge-checkbox ${c.completed ? 'completed' : ''}"></div>
                            <span class="challenge-text">${c.text}</span>
                        </div>
                        <span class="challenge-reward">+${c.points} ⭐</span>
                    </div>
                `).join('');
            }

            toggleChallenge(id) {
                const challenge = this.data.challenges.find(c => c.id === id);
                if (!challenge || challenge.completed) return;
                
                challenge.completed = true;
                this.data.stats.points += challenge.points;
                this.saveData();
                this.renderStats();
                this.renderChallenges();
                this.showToast(`✅ تحدي مكتمل! +${challenge.points} نقطة`, 'success');
                this.playSound('success');
            }

            // ==================== SCHEDULE ====================

            renderSchedule() {
                const empty = document.getElementById('schedule-empty');
                const list = document.getElementById('schedule-list');
                
                if (this.data.schedule.length === 0) {
                    empty.classList.remove('hidden');
                    list.classList.add('hidden');
                    return;
                }
                
                empty.classList.add('hidden');
                list.classList.remove('hidden');
                
                list.innerHTML = this.data.schedule.map((item, index) => `
                    <div class="schedule-item ${item.completed ? 'completed' : ''}">
                        <button class="schedule-complete ${item.completed ? 'completed' : ''}" onclick="app.toggleScheduleComplete(${index})">
                            ${item.completed ? '✓' : ''}
                        </button>
                        <div class="schedule-info">
                            <div class="schedule-subject">${item.subject || 'مادة بدون اسم'}</div>
                            <div class="schedule-time">🕐 ${item.time || '--:--'}</div>
                            ${item.notes ? `<div class="schedule-notes">${item.notes}</div>` : ''}
                        </div>
                        <button class="schedule-delete" onclick="app.deleteScheduleItem(${index})">🗑️</button>
                    </div>
                `).join('');
                
                this.renderStats();
                this.renderProgress();
            }

            addScheduleItem() {
                const subject = prompt('اسم المادة:');
                if (!subject) return;
                
                const time = prompt('الوقت (مثال: 14:30):', '14:00');
                
                this.data.schedule.push({
                    id: Date.now(),
                    subject,
                    time: time || '',
                    notes: '',
                    completed: false
                });
                
                this.saveData();
                this.renderSchedule();
                this.showToast('✅ تمت إضافة المادة', 'success');
            }

            toggleScheduleComplete(index) {
                this.data.schedule[index].completed = !this.data.schedule[index].completed;
                if (this.data.schedule[index].completed) {
                    this.data.stats.points += 5;
                    this.playSound('success');
                    this.showToast('✅ مادة مكتملة! +5 نقاط', 'success');
                }
                this.saveData();
                this.renderSchedule();
            }

            deleteScheduleItem(index) {
                if (!confirm('هل تريد حذف هذه المادة؟')) return;
                this.data.schedule.splice(index, 1);
                this.saveData();
                this.renderSchedule();
            }

            // ==================== NOTES ====================

            selectNoteColor(color, element) {
                this.state.selectedNoteColor = color;
                document.querySelectorAll('.color-option').forEach(el => el.classList.remove('selected'));
                element.classList.add('selected');
            }

            addNote() {
                const input = document.getElementById('note-input');
                const text = input.value.trim();
                
                if (!text) {
                    this.showToast('✍️ اكتب ملاحظة أولاً', 'warning');
                    return;
                }
                
                this.data.notes.unshift({
                    id: Date.now(),
                    text,
                    color: this.state.selectedNoteColor,
                    date: new Date().toISOString()
                });
                
                input.value = '';
                this.saveData();
                this.renderNotes();
                this.renderStats();
                this.showToast('✅ تمت إضافة الملاحظة', 'success');
                this.playSound('success');
                this.checkAchievements();
            }

            renderNotes() {
                const grid = document.getElementById('notes-grid');
                const empty = document.getElementById('notes-empty');
                
                if (this.data.notes.length === 0) {
                    grid.innerHTML = '';
                    empty.classList.remove('hidden');
                    return;
                }
                
                empty.classList.add('hidden');
                grid.innerHTML = this.data.notes.map(note => `
                    <div class="note-card note-${note.color}">
                        <div class="note-pin"></div>
                        <div class="note-content">${this.escapeHtml(note.text)}</div>
                        <div class="note-footer">
                            <span>${new Date(note.date).toLocaleDateString('ar-EG')}</span>
                            <button class="note-delete" onclick="app.deleteNote(${note.id})">🗑️</button>
                        </div>
                    </div>
                `).join('');
            }

            deleteNote(id) {
                this.data.notes = this.data.notes.filter(n => n.id !== id);
                this.saveData();
                this.renderNotes();
                this.renderStats();
            }

            filterNotes(filter) {
                // Implementation for filtering
                document.querySelectorAll('.filter-btn').forEach(btn => {
                    btn.classList.toggle('active', btn.textContent.includes(filter === 'all' ? 'الكل' : filter === 'today' ? 'اليوم' : 'الأسبوع'));
                });
            }

            // ==================== TIMER ====================

            setTimerMode(mode) {
                this.timer.mode = mode;
                const times = {
                    pomodoro: 25 * 60,
                    shortBreak: 5 * 60,
                    longBreak: 15 * 60,
                    custom: null
                };
                
                document.querySelectorAll('.mode-btn').forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.mode === mode);
                });
                
                if (mode === 'custom') {
                    document.getElementById('timer-inputs').classList.remove('hidden');
                } else {
                    document.getElementById('timer-inputs').classList.add('hidden');
                    this.timer.totalSeconds = times[mode];
                    this.timer.seconds = times[mode];
                    this.updateTimerDisplay();
                }
            }

            updateTimerDisplay() {
                const hours = Math.floor(this.timer.seconds / 3600);
                const minutes = Math.floor((this.timer.seconds % 3600) / 60);
                const seconds = this.timer.seconds % 60;
                
                let display;
                if (hours > 0) {
                    display = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
                } else {
                    display = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
                }
                
                document.getElementById('timer-display').textContent = display;
                document.getElementById('focus-timer').textContent = display;
                
                // Update ring
                const circle = document.getElementById('timer-ring');
                const circumference = 2 * Math.PI * 90;
                const offset = circumference - (this.timer.seconds / this.timer.totalSeconds) * circumference;
                circle.style.strokeDasharray = circumference;
                circle.style.strokeDashoffset = offset;
                
                // Update focus ring
                const focusRing = document.getElementById('focus-ring');
                if (focusRing) {
                    const focusCircumference = 2 * Math.PI * 45;
                    const focusOffset = focusCircumference - (this.timer.seconds / this.timer.totalSeconds) * focusCircumference;
                    focusRing.style.strokeDasharray = focusCircumference;
                    focusRing.style.strokeDashoffset = focusOffset;
                }
            }

            startTimer() {
                if (this.timer.isRunning) return;
                
                if (!this.timer.isPaused) {
                    const h = parseInt(document.getElementById('timer-hours').value) || 0;
                    const m = parseInt(document.getElementById('timer-minutes').value) || 0;
                    const s = parseInt(document.getElementById('timer-seconds').value) || 0;
                    this.timer.totalSeconds = (h * 3600) + (m * 60) + s;
                    this.timer.seconds = this.timer.totalSeconds;
                }
                
                this.timer.isRunning = true;
                this.timer.isPaused = false;
                
                document.getElementById('btn-start').classList.add('hidden');
                document.getElementById('btn-pause').classList.remove('hidden');
                
                this.timer.interval = setInterval(() => {
                    this.timer.seconds--;
                    this.updateTimerDisplay();
                    
                    if (this.timer.seconds <= 0) {
                        this.completeTimer();
                    }
                }, 1000);
            }

            pauseTimer() {
                clearInterval(this.timer.interval);
                this.timer.isRunning = false;
                this.timer.isPaused = true;
                document.getElementById('btn-start').classList.remove('hidden');
                document.getElementById('btn-pause').classList.add('hidden');
                document.getElementById('btn-start').innerHTML = '<span>▶️</span> استئناف';
            }

            resetTimer() {
                clearInterval(this.timer.interval);
                this.timer.isRunning = false;
                this.timer.isPaused = false;
                this.timer.seconds = this.timer.totalSeconds;
                this.updateTimerDisplay();
                document.getElementById('btn-start').classList.remove('hidden');
                document.getElementById('btn-pause').classList.add('hidden');
                document.getElementById('btn-start').innerHTML = '<span>▶️</span> بدء';
            }

            completeTimer() {
                clearInterval(this.timer.interval);
                this.timer.isRunning = false;
                
                const minutes = Math.floor(this.timer.totalSeconds / 60);
                const points = Math.floor(minutes / 5);
                
                this.data.stats.points += points;
                this.data.stats.totalMinutes += minutes;
                this.timer.sessionsToday++;
                this.timer.minutesToday += minutes;
                
                this.updateStreak();
                this.saveData();
                this.renderStats();
                this.renderGarden();
                
                document.getElementById('btn-start').classList.remove('hidden');
                document.getElementById('btn-pause').classList.add('hidden');
                document.getElementById('btn-start').innerHTML = '<span>▶️</span> بدء';
                
                this.playSound('complete');
                this.launchConfetti();
                this.showToast(`🎉 أكملت ${minutes} دقيقة! +${points} نقطة`, 'success');
                
                // Plant tree if enough time
                if (minutes >= 25) {
                    this.showToast('🌳 يمكنك زراعة شجرة جديدة!', 'success');
                }
            }

            updateStreak() {
                const today = new Date().toDateString();
                const lastDate = this.data.stats.lastStudyDate;
                
                if (!lastDate) {
                    this.data.stats.streak = 1;
                } else {
                    const diff = Math.floor((new Date(today) - new Date(lastDate)) / (1000 * 60 * 60 * 24));
                    if (diff === 1) {
                        this.data.stats.streak++;
                        if (this.data.stats.streak > this.data.stats.bestStreak) {
                            this.data.stats.bestStreak = this.data.stats.streak;
                        }
                        this.showToast(`🔥 سلسلة ${this.data.stats.streak} أيام!`, 'success');
                    } else if (diff > 1) {
                        this.data.stats.streak = 1;
                    }
                }
                
                if (this.data.stats.streak % 7 === 0 && this.data.stats.streak > 0) {
                    this.data.stats.points += 50;
                    this.showToast('🎉 مكافأة أسبوعية! +50 نقطة', 'success');
                }
                
                this.data.stats.lastStudyDate = today;
                this.renderStreak();
            }

            // ==================== GARDEN ====================

            setGardenTheme(theme) {
                this.state.gardenTheme = theme;
                document.getElementById('garden-scene').className = `garden-scene ${theme}`;
                
                document.querySelectorAll('.garden-mode-btn').forEach(btn => {
                    btn.classList.toggle('active', btn.onclick.toString().includes(theme));
                });
            }

            renderGarden() {
                const ground = document.getElementById('garden-ground');
                ground.innerHTML = '';
                
                document.getElementById('garden-tree-count').textContent = this.data.trees.length;
                document.getElementById('garden-minutes').textContent = this.data.stats.totalMinutes;
                
                if (this.data.trees.length === 0) {
                    ground.innerHTML = `
                        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; color: #14532d;">
                            <div style="font-size: 4rem; margin-bottom: 1rem;">🌱</div>
                            <div>ابدأ المذاكرة لزراعة أول شجرة!</div>
                        </div>
                    `;
                    return;
                }
                
                this.data.trees.forEach((tree, index) => {
                    const el = document.createElement('div');
                    el.className = 'tree';
                    el.style.left = tree.x + '%';
                    el.style.bottom = tree.y + '%';
                    el.style.animationDelay = (index * 0.1) + 's';
                    el.innerHTML = this.getTreeHTML(tree.type);
                    ground.appendChild(el);
                });
            }

            getTreeHTML(type) {
                const templates = {
                    palm: `
                        <div style="position: relative; width: 80px; height: 70px;">
                            <div style="position: absolute; bottom: 0; left: 35px; width: 10px; height: 40px; background: linear-gradient(to right, #92400e, #b45309); border-radius: 5px;"></div>
                            <div style="position: absolute; bottom: 30px; left: 10px; width: 60px; height: 30px; background: #22c55e; border-radius: 50% 50% 0 0; transform: rotate(-20deg);"></div>
                            <div style="position: absolute; bottom: 30px; left: 10px; width: 60px; height: 30px; background: #4ade80; border-radius: 50% 50% 0 0; transform: rotate(0deg);"></div>
                            <div style="position: absolute; bottom: 30px; left: 10px; width: 60px; height: 30px; background: #22c55e; border-radius: 50% 50% 0 0; transform: rotate(20deg);"></div>
                        </div>
                    `,
                    cactus: `
                        <div style="position: relative; width: 50px; height: 60px;">
                            <div style="position: absolute; bottom: 0; left: 20px; width: 12px; height: 50px; background: linear-gradient(to right, #15803d, #22c55e); border-radius: 6px;"></div>
                            <div style="position: absolute; bottom: 25px; left: 5px; width: 15px; height: 8px; background: #16a34a; border-radius: 4px;"></div>
                            <div style="position: absolute; bottom: 30px; right: 5px; width: 12px; height: 6px; background: #16a34a; border-radius: 4px;"></div>
                        </div>
                    `,
                    default: `
                        <div style="position: relative; width: 60px; height: 70px;">
                            <div style="position: absolute; bottom: 0; left: 25px; width: 12px; height: 35px; background: linear-gradient(to right, #78350f, #92400e); border-radius: 6px;"></div>
                            <div style="position: absolute; bottom: 25px; left: 5px; width: 50px; height: 45px; background: radial-gradient(circle at 30% 30%, #4ade80, #16a34a); border-radius: 50%;"></div>
                        </div>
                    `
                };
                return templates[type] || templates.default;
            }

            // ==================== SHOP ====================

            renderShop() {
                const grid = document.getElementById('shop-grid');
                
                grid.innerHTML = this.shopItems.map(item => {
                    const owned = this.data.trees.some(t => t.itemId === item.id);
                    const canAfford = this.data.stats.points >= item.cost;
                    
                    return `
                        <div class="shop-item ${owned ? 'owned' : ''} ${!canAfford && !owned ? 'locked' : ''}">
                            <span class="item-icon">${item.icon}</span>
                            <div class="item-name">${item.name}</div>
                            <div class="item-desc">${item.desc}</div>
                            ${owned ? 
                                '<div class="owned-badge">✅ تم الشراء</div>' :
                                `<div class="item-price">⭐ ${item.cost}</div>
                                <button class="buy-btn" onclick="app.buyItem(${item.id})" ${!canAfford ? 'disabled' : ''}>
                                    ${canAfford ? '🛒 شراء' : '❌ نقاط غير كافية'}
                                </button>`
                            }
                        </div>
                    `;
                }).join('');
            }

            buyItem(id) {
                const item = this.shopItems.find(i => i.id === id);
                if (!item || this.data.stats.points < item.cost) return;
                if (this.data.trees.some(t => t.itemId === id)) return;
                
                this.data.stats.points -= item.cost;
                
                // Calculate position
                const count = this.data.trees.length;
                const row = Math.floor(count / 4);
                const col = count % 4;
                const x = 20 + (col * 20) + (Math.random() - 0.5) * 5;
                const y = 60 + (row * 15) + (Math.random() - 0.5) * 3;
                
                this.data.trees.push({
                    itemId: item.id,
                    type: item.type,
                    name: item.name,
                    x: Math.max(10, Math.min(90, x)),
                    y: Math.max(50, Math.min(85, y)),
                    date: new Date().toLocaleDateString('ar-EG')
                });
                
                this.saveData();
                this.renderStats();
                this.renderShop();
                this.playSound('success');
                this.showToast(`🌳 اشتريت ${item.name}!`, 'success');
                this.checkAchievements();
            }

            // ==================== FAQ ====================

            renderFAQ() {
                document.getElementById('faq-list').innerHTML = this.faqData.map((item, i) => `
                    <div class="faq-item" onclick="this.classList.toggle('open')">
                        <div class="faq-question">
                            <div style="display: flex; align-items: center;">
                                <span class="faq-number">${i + 1}</span>
                                <span>${item.q}</span>
                            </div>
                            <span class="faq-toggle">▼</span>
                        </div>
                        <div class="faq-answer">${item.a}</div>
                    </div>
                `).join('');
            }

            // ==================== AI ====================

            initAI() {
                this.aiInitialized = true;
                this.addAIMessage('bot', 'أهلاً وسهلاً! 🌟 أنا OBV، مساعدك الدراسي الشخصي. كيف حالك اليوم؟');
            }

            handleAIKeyPress(e) {
                if (e.key === 'Enter') this.sendAIMessage();
            }

            sendAIMessage(text) {
                const input = document.getElementById('ai-input');
                const message = text || input.value.trim();
                
                if (!message) return;
                
                this.addAIMessage('user', message);
                if (!text) input.value = '';
                
                // Show typing
                document.getElementById('typing-indicator').classList.remove('hidden');
                
                // Generate response
                setTimeout(() => {
                    document.getElementById('typing-indicator').classList.add('hidden');
                    const response = this.generateAIResponse(message);
                    this.addAIMessage('bot', response);
                    this.data.stats.aiChats++;
                    this.saveData();
                    this.renderStats();
                    this.checkAchievements();
                }, 1000 + Math.random() * 1000);
            }

            generateAIResponse(text) {
                const lower = text.toLowerCase();
                
                for (const [pattern, responses] of Object.entries(this.aiResponses)) {
                    if (new RegExp(pattern).test(lower)) {
                        return responses[Math.floor(Math.random() * responses.length)];
                    }
                }
                
                const defaults = [
                    'فهمت عليك! 💬 ممكن توضح أكتر عشان أساعدك بشكل أفضل؟',
                    'هذا موضوع مهم! 🤔 خليني أفكر معاك...',
                    'أنا هنا عشان أساعدك! 🌟 شنو تحتاج بالضبط؟'
                ];
                
                return defaults[Math.floor(Math.random() * defaults.length)];
            }

            addAIMessage(sender, text) {
                const chat = document.getElementById('ai-chat');
                const msg = document.createElement('div');
                msg.className = `message ${sender}`;
                msg.innerHTML = `
                    <div>${text}</div>
                    <div class="message-time">${new Date().toLocaleTimeString('ar-EG', {hour: '2-digit', minute: '2-digit'})}</div>
                `;
                chat.appendChild(msg);
                chat.scrollTop = chat.scrollHeight;
            }

            clearAIChat() {
                if (!confirm('هل تريد مسح المحادثة؟')) return;
                document.getElementById('ai-chat').innerHTML = '';
                this.initAI();
            }

            saveAIChat() {
                const chat = document.getElementById('ai-chat').innerText;
                const blob = new Blob([chat], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'محادثة_OBV.txt';
                a.click();
            }

            // ==================== ACHIEVEMENTS ====================

            checkAchievements() {
                const conditions = {
                    first_tree: this.data.trees.length >= 1,
                    tree_collector: this.data.trees.length >= 5,
                    streak_3: this.data.stats.streak >= 3,
                    streak_7: this.data.stats.streak >= 7,
                    streak_30: this.data.stats.streak >= 30,
                    rich: this.data.stats.points >= 1000,
                    first_note: this.data.notes.length >= 1,
                    ai_friend: this.data.stats.aiChats >= 10
                };
                
                for (const [id, condition] of Object.entries(conditions)) {
                    if (condition && !this.data.achievements.includes(id)) {
                        this.unlockAchievement(id);
                    }
                }
            }

            unlockAchievement(id) {
                this.data.achievements.push(id);
                this.saveData();
                
                const ach = this.achievementsList.find(a => a.id === id);
                if (ach) {
                    this.launchConfetti();
                    this.showToast(`🏆 إنجاز جديد: ${ach.name}!`, 'success');
                    this.playSound('success');
                }
            }

            showAchievements() {
                const content = `
                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 1rem;">
                        ${this.achievementsList.map(ach => {
                            const unlocked = this.data.achievements.includes(ach.id);
                            return `
                                <div style="padding: 1.5rem; text-align: center; border-radius: var(--radius); border: 2px solid ${unlocked ? 'var(--success)' : 'var(--border)'}; background: ${unlocked ? 'rgba(34, 197, 94, 0.1)' : 'var(--surface)'};">
                                    <div style="font-size: 2.5rem; margin-bottom: 0.5rem; filter: ${unlocked ? 'none' : 'grayscale(1)'}; opacity: ${unlocked ? '1' : '0.5'};">${ach.icon}</div>
                                    <div style="font-weight: 700; font-size: 0.875rem;">${ach.name}</div>
                                    <div style="font-size: 0.75rem; color: var(--text-muted);">${ach.desc}</div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                `;
                
                this.showModal('🏆 إنجازاتي', content);
            }

            // ==================== CHART ====================

            renderWeeklyChart() {
                const container = document.getElementById('weekly-chart');
                const days = ['السبت', 'الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'];
                const data = [2, 3.5, 1.5, 4, 2.5, 3, 0];
                const max = Math.max(...data, 1);
                
                container.innerHTML = days.map((day, i) => `
                    <div class="chart-bar-wrapper">
                        <div class="chart-bar" style="height: ${(data[i] / max) * 200}px" data-value="${data[i]}س"></div>
                        <span class="chart-label">${day}</span>
                    </div>
                `).join('');
            }

            // ==================== UTILITIES ====================

            toggleDarkMode() {
                this.data.settings.darkMode = !this.data.settings.darkMode;
                document.documentElement.setAttribute('data-theme', this.data.settings.darkMode ? 'dark' : 'light');
                document.getElementById('dark-mode-icon').textContent = this.data.settings.darkMode ? '☀️' : '🌙';
                this.saveData();
            }

            toggleSound() {
                this.data.settings.soundEnabled = !this.data.settings.soundEnabled;
                document.getElementById('sound-icon').textContent = this.data.settings.soundEnabled ? '🔊' : '🔇';
                this.saveData();
            }

            toggleFocusMode() {
                const overlay = document.getElementById('focus-overlay');
                overlay.classList.toggle('active');
                
                if (overlay.classList.contains('active')) {
                    const quotes = [
                        'التركيز هو مفتاح النجاح',
                        'كل دقيقة تركيز = خطوة نحو هدفك',
                        'اصبر تُجبر، واجتهادك لن يضيع'
                    ];
                    document.getElementById('focus-quote').textContent = quotes[Math.floor(Math.random() * quotes.length)];
                }
            }

            playSound(type) {
                if (!this.data.settings.soundEnabled) return;
                
                try {
                    const ctx = new (window.AudioContext || window.webkitAudioContext)();
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    
                    if (type === 'success') {
                        osc.frequency.setValueAtTime(523.25, ctx.currentTime);
                        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1);
                        osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2);
                        gain.gain.setValueAtTime(0.2, ctx.currentTime);
                        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
                        osc.start();
                        osc.stop(ctx.currentTime + 0.4);
                    } else if (type === 'complete') {
                        osc.frequency.setValueAtTime(440, ctx.currentTime);
                        gain.gain.setValueAtTime(0.2, ctx.currentTime);
                        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
                        osc.start();
                        osc.stop(ctx.currentTime + 0.3);
                    }
                } catch (e) {
                    console.log('Audio not supported');
                }
            }

            showToast(message, type = 'info', duration = 3000) {
                const container = document.getElementById('toast-container');
                const toast = document.createElement('div');
                toast.className = `toast ${type}`;
                toast.textContent = message;
                
                container.appendChild(toast);
                
                // Trigger animation
                requestAnimationFrame(() => toast.classList.add('show'));
                
                setTimeout(() => {
                    toast.classList.remove('show');
                    setTimeout(() => toast.remove(), 300);
                }, duration);
            }

            showModal(title, content) {
                document.getElementById('modal-title').textContent = title;
                document.getElementById('modal-body').innerHTML = content;
                document.getElementById('modal-overlay').classList.add('active');
            }

            closeModal(e) {
                if (!e || e.target === e.currentTarget) {
                    document.getElementById('modal-overlay').classList.remove('active');
                }
            }

            launchConfetti() {
                const canvas = document.getElementById('confetti-canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                
                const pieces = [];
                const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
                
                for (let i = 0; i < 80; i++) {
                    pieces.push({
                        x: Math.random() * canvas.width,
                        y: -20,
                        vx: (Math.random() - 0.5) * 10,
                        vy: Math.random() * 5 + 2,
                        color: colors[Math.floor(Math.random() * colors.length)],
                        size: Math.random() * 8 + 4,
                        rotation: Math.random() * 360,
                        rotationSpeed: (Math.random() - 0.5) * 10
                    });
                }
                
                let animationId;
                const animate = () => {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    
                    let active = false;
                    pieces.forEach(p => {
                        p.x += p.vx;
                        p.y += p.vy;
                        p.rotation += p.rotationSpeed;
                        p.vy += 0.1;
                        
                        if (p.y < canvas.height) active = true;
                        
                        ctx.save();
                        ctx.translate(p.x, p.y);
                        ctx.rotate((p.rotation * Math.PI) / 180);
                        ctx.fillStyle = p.color;
                        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
                        ctx.restore();
                    });
                    
                    if (active) animationId = requestAnimationFrame(animate);
                    else ctx.clearRect(0, 0, canvas.width, canvas.height);
                };
                
                animate();
                setTimeout(() => cancelAnimationFrame(animationId), 5000);
            }

            initParticles() {
                const canvas = document.getElementById('particles-canvas');
                const ctx = canvas.getContext('2d');
                
                const resize = () => {
                    canvas.width = window.innerWidth;
                    canvas.height = window.innerHeight;
                };
                resize();
                window.addEventListener('resize', resize);
                
                const particles = [];
                for (let i = 0; i < 25; i++) {
                    particles.push({
                        x: Math.random() * canvas.width,
                        y: Math.random() * canvas.height,
                        vx: (Math.random() - 0.5) * 0.3,
                        vy: (Math.random() - 0.5) * 0.3,
                        size: Math.random() * 3 + 1
                    });
                }
                
                const animate = () => {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.fillStyle = 'rgba(44, 156, 105, 0.15)';
                    
                    particles.forEach(p => {
                        p.x += p.vx;
                        p.y += p.vy;
                        
                        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
                        
                        ctx.beginPath();
                        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                        ctx.fill();
                    });
                    
                    requestAnimationFrame(animate);
                };
                animate();
            }

            initStars() {
                const container = document.getElementById('stars');
                for (let i = 0; i < 40; i++) {
                    const star = document.createElement('div');
                    star.className = 'star';
                    star.style.left = Math.random() * 100 + '%';
                    star.style.top = Math.random() * 100 + '%';
                    star.style.animationDelay = Math.random() * 2 + 's';
                    container.appendChild(star);
                }
            }

            setupEventListeners() {
                // Keyboard shortcuts
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape') {
                        this.closeModal();
                        if (document.getElementById('focus-overlay').classList.contains('active')) {
                            this.toggleFocusMode();
                        }
                    }
                });

                // Visibility change
                document.addEventListener('visibilitychange', () => {
                    if (document.hidden && this.timer.isRunning) {
                        this.pauseTimer();
                        this.showToast('تم إيقاف المؤقت مؤقتاً', 'info');
                    }
                });

                // Before unload
                window.addEventListener('beforeunload', () => this.saveData());
            }

            escapeHtml(text) {
                const div = document.createElement('div');
                div.textContent = text;
                return div.innerHTML.replace(/\n/g, '<br>');
            }

            // ==================== DATA EXPORT/IMPORT ====================

            exportData() {
                const data = JSON.stringify(this.data, null, 2);
                const blob = new Blob([data], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'مذاكرتي_backup.json';
                a.click();
                this.showToast('💾 تم حفظ البيانات', 'success');
            }

            importData() {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = '.json';
                input.onchange = (e) => {
                    const file = e.target.files[0];
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        try {
                            const data = JSON.parse(event.target.result);
                            this.data = { ...this.data, ...data };
                            this.saveData();
                            location.reload();
                        } catch (err) {
                            this.showToast('❌ ملف غير صالح', 'error');
                        }
                    };
                    reader.readAsText(file);
                };
                input.click();
            }

            shareProgress() {
                const text = `أنا الآن عندي ${this.data.stats.streak} أيام متتالية من المذاكرة! 🔥\n${this.data.trees.length} شجرة في حديقتي! 🌳\nجرب تطبيق مذاكرتي!`;
                
                if (navigator.share) {
                    navigator.share({ title: 'مذاكرتي', text: text });
                } else {
                    navigator.clipboard.writeText(text);
                    this.showToast('📤 تم نسخ المشاركة', 'success');
                }
            }
        }

        // Initialize app
        const app = new StudyApp();