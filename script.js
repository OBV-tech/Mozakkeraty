/**
 * مذاكرتي Pro - منصة الدراسة الذكية المتكاملة
 * إصدار احترافي SaaS مع Firebase، AI متقدم، وتحليلات ذكية
 */

class StudyAppPro {
    constructor() {
        // Firebase Config (يمكنك تغييره بمفاتيحك الخاصة)
        this.firebaseConfig = {
            apiKey: "YOUR_API_KEY",
            authDomain: "mazakrti-pro.firebaseapp.com",
            projectId: "mazakrti-pro",
            storageBucket: "mazakrti-pro.appspot.com",
            messagingSenderId: "123456789",
            appId: "1:123456789:web:abcdef123456"
        };

        // البيانات الرئيسية
        this.data = {
            user: { 
                uid: null,
                name: 'زائر', 
                email: null,
                avatar: '👤',
                createdAt: Date.now(),
                isGuest: true
            },
            stats: {
                points: 0,
                xp: 0,
                level: 1,
                streak: 0,
                bestStreak: 0,
                totalMinutes: 0,
                totalSessions: 0,
                aiChats: 0,
                lastStudyDate: null,
                dailyGoal: 30,
                freezeStreaks: 0
            },
            schedule: [],
            notes: [],
            trees: [],
            pets: [],
            achievements: [],
            goals: [],
            moodHistory: [],
            studyHistory: [],
            settings: {
                darkMode: false,
                soundEnabled: true,
                notifications: true,
                musicEnabled: false,
                language: 'ar',
                theme: 'default'
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
            shopFilter: 'all',
            chartPeriod: 'week',
            audioContext: null,
            musicAudio: null,
            isOnline: navigator.onLine
        };

        // خصائص الجدول المتقدمة (الإضافات الجديدة)
        this.scheduleFilter = 'all';
        this.selectedPriority = 'medium';

        // أنظمة متقدمة
        this.ai = {
            context: [],
            lastAnalysis: null
        };

        this.levels = [
            { level: 1, title: 'بستاني مبتدئ', xp: 0, avatar: '🌱' },
            { level: 2, title: 'طالب مجتهد', xp: 100, avatar: '🌿' },
            { level: 3, title: 'قارئ نهم', xp: 300, avatar: '📚' },
            { level: 4, title: 'باحث متميز', xp: 600, avatar: '🔬' },
            { level: 5, title: 'عالم شاب', xp: 1000, avatar: '🧪' },
            { level: 6, title: 'أستاذ مساعد', xp: 1500, avatar: '👨‍🏫' },
            { level: 7, title: 'أستاذ محترف', xp: 2200, avatar: '🎓' },
            { level: 8, title: 'دكتوراه', xp: 3000, avatar: '🏆' },
            { level: 9, title: 'بروفيسور', xp: 4000, avatar: '👑' },
            { level: 10, title: 'عبقري العصر', xp: 5500, avatar: '🧠' }
        ];

        this.achievementsList = [
            { id: 'first_tree', name: 'بستاني مبتدئ', desc: 'اشتري أول شجرة', icon: '🌱', rarity: 'common', condition: (d) => d.trees.length >= 1 },
            { id: 'tree_collector', name: 'جامع الأشجار', desc: 'اشتري 5 أشجار', icon: '🌳', rarity: 'common', condition: (d) => d.trees.length >= 5 },
            { id: 'forest_master', name: 'سيد الغابة', desc: 'اشتري 15 شجرة', icon: '🌲', rarity: 'rare', condition: (d) => d.trees.length >= 15 },
            { id: 'streak_3', name: 'ملتزم', desc: '3 أيام متتالية', icon: '🔥', rarity: 'common', condition: (d) => d.stats.streak >= 3 },
            { id: 'streak_7', name: 'ملتزم أسبوعي', desc: '7 أيام متتالية', icon: '🔥', rarity: 'rare', condition: (d) => d.stats.streak >= 7 },
            { id: 'streak_30', name: 'أسطورة المذاكرة', desc: '30 يوم متتالي', icon: '👑', rarity: 'legendary', condition: (d) => d.stats.streak >= 30 },
            { id: 'rich', name: 'ثري الحديقة', desc: 'جمع 1000 نقطة', icon: '💎', rarity: 'rare', condition: (d) => d.stats.points >= 1000 },
            { id: 'millionaire', name: 'مليونير النقاط', desc: 'جمع 5000 نقطة', icon: '💰', rarity: 'legendary', condition: (d) => d.stats.points >= 5000 },
            { id: 'first_note', name: 'كاتب مذكرات', desc: 'أضف أول ملاحظة', icon: '📝', rarity: 'common', condition: (d) => d.notes.length >= 1 },
            { id: 'note_master', name: 'أستاذ الملاحظات', desc: 'أضف 20 ملاحظة', icon: '📒', rarity: 'rare', condition: (d) => d.notes.length >= 20 },
            { id: 'ai_friend', name: 'صديق OBV', desc: 'تحدث مع AI 10 مرات', icon: '🤖', rarity: 'common', condition: (d) => d.stats.aiChats >= 10 },
            { id: 'ai_master', name: 'خبير AI', desc: 'تحدث مع AI 50 مرة', icon: '🧠', rarity: 'epic', condition: (d) => d.stats.aiChats >= 50 },
            { id: 'pomodoro_pro', name: 'بومودورو محترف', desc: 'أكمل 10 جلسات بومودورو', icon: '🍅', rarity: 'rare', condition: (d) => d.stats.totalSessions >= 10 },
            { id: 'focus_god', name: 'إله التركيز', desc: 'أكمل 50 جلسة', icon: '🎯', rarity: 'legendary', condition: (d) => d.stats.totalSessions >= 50 },
            { id: 'night_owl', name: 'بوم الليل', desc: 'ذاكر بعد منتصف الليل', icon: '🦉', rarity: 'secret', condition: (d) => this.checkNightOwl(d) },
            { id: 'early_bird', name: 'طير الصباح', desc: 'ذاكر قبل 6 صباحاً', icon: '🐦', rarity: 'secret', condition: (d) => this.checkEarlyBird(d) }
        ];

        this.shopItems = [
            { id: 1, icon: '🌲', name: 'شجرة الصنوبر', cost: 30, type: 'pine', category: 'trees', rarity: 'common', desc: 'شجرة خضراء جميلة' },
            { id: 2, icon: '🌳', name: 'شجرة البلوط', cost: 50, type: 'oak', category: 'trees', rarity: 'common', desc: 'شجرة قوية وكبيرة' },
            { id: 3, icon: '🌴', name: 'نخلة', cost: 80, type: 'palm', category: 'trees', rarity: 'common', desc: 'نخلة استوائية رائعة' },
            { id: 4, icon: '🎄', name: 'شجرة عيد', cost: 100, type: 'christmas', category: 'trees', rarity: 'rare', desc: 'شجرة مميزة وجميلة' },
            { id: 5, icon: '🌵', name: 'صبار', cost: 60, type: 'cactus', category: 'trees', rarity: 'common', desc: 'نبات صبار صحراوي' },
            { id: 6, icon: '🌸', name: 'شجرة الكرز', cost: 150, type: 'sakura', category: 'trees', rarity: 'rare', desc: 'شجرة وردية رائعة' },
            { id: 7, icon: '🌺', name: 'الهيبسكوس', cost: 200, type: 'hibiscus', category: 'trees', rarity: 'epic', desc: 'أزهار حمراء جميلة' },
            { id: 8, icon: '🌻', name: 'عباد الشمس', cost: 120, type: 'sunflower', category: 'trees', rarity: 'rare', desc: 'زهرة مشمسة مبهجة' },
            { id: 9, icon: '🦊', name: 'ثعلب', cost: 300, type: 'fox', category: 'pets', rarity: 'rare', desc: 'رفيق ذكي ومحبوب', unlockLevel: 3 },
            { id: 10, icon: '🦉', name: 'بومة', cost: 400, type: 'owl', category: 'pets', rarity: 'epic', desc: 'رمز الحكمة والمعرفة', unlockLevel: 5 },
            { id: 11, icon: '🐉', name: 'تنين', cost: 1000, type: 'dragon', category: 'pets', rarity: 'legendary', desc: 'أسطوري ونادر جداً', unlockLevel: 8 },
            { id: 12, icon: '🏰', name: 'قلعة', cost: 2000, type: 'castle', category: 'rare', rarity: 'legendary', desc: 'قصرك الخاص في الحديقة', unlockLevel: 10 }
        ];

        this.aiResponses = {
            'مرحبا|أهلا|سلام': [
                'أهلاً بك في مذاكرتي Pro! 🌟 أنا OBV، مساعدك الدراسي الذكي. جاهز لمساعدتك في تحقيق أهدافك!',
                'مرحباً! 👋 سعيد بوجودك هنا. كيف يمكنني مساعدتك اليوم؟'
            ],
            'كيف حالك|شلونك': [
                'أنا بخير الحمدلله! 🌟 وأنت؟ أخبرني عن تقدمك الدراسي!',
                'ممتاز! 💪 وأهم شيء هو حالك أنت... كيف تشعر اليوم؟'
            ],
            'تحليل|أدائي|تقرير': [
                () => this.generatePerformanceAnalysis(),
                () => this.generateWeeklyReport()
            ],
            'جدول|خطة|تخطيط': [
                () => this.generateSmartSchedule(),
                'يمكنني مساعدتك في وضع جدول مذاكرة ذكي! 📅 أخبرني عن موادك وأولوياتك'
            ],
            'توقع|درجات|تنبؤ': [
                () => this.predictGrades(),
                'بناءً على ساعات مذاكرتك، يمكنني تقدير أدائك! 🔮 هل تريد التفاصيل؟'
            ],
            'تركيز|تشتت|صعوبة': [
                'جرب تقنية Pomodoro معنا! 🍅 25 دقيقة تركيز + 5 دقائق راحة. وأغلق كل المشتتات!',
                'أنصحك باستخدام وضع Focus Mode الخاص بنا! 🎯 سيخفي كل شيء ويساعدك على التركيز'
            ],
            'إحباط|فشل|يأس': [
                'قف! 🛑 لا تيأس! كل ناجح مر بمحاولات فاشلة. أنت قادر على النجاح! 💪',
                'تذكر: الفشل هو خطوة نحو النجاح. 🌟 استمر وسأكون بجانبك!'
            ]
        };

        this.init();
    }

    // ==================== INITIALIZATION ====================

    async init() {
        this.showLoading();
        
        // Initialize Firebase (if available)
        try {
            if (typeof firebase !== 'undefined') {
                firebase.initializeApp(this.firebaseConfig);
                this.db = firebase.firestore();
                this.auth = firebase.auth();
            }
        } catch (e) {
            console.log('Firebase not available, running in offline mode');
        }

        await this.loadData();
        this.initParticles();
        this.initStars();
        this.generateDailyChallenges();
        this.generateGoals();
        this.setupEventListeners();
        this.initChart();
        this.renderAll();
        this.hideLoading();
        
        // Check for offline mode
        window.addEventListener('online', () => this.handleOnline());
        window.addEventListener('offline', () => this.handleOffline());
    }

    showLoading() {
        const progress = document.getElementById('loading-progress');
        const status = document.getElementById('loading-status');
        const steps = [
            { p: 20, t: 'جاري تحميل الموارد...' },
            { p: 40, t: 'جاري تهيئة الذكاء الاصطناعي...' },
            { p: 60, t: 'جاري تحميل البيانات...' },
            { p: 80, t: 'جاري تهيئة الحديقة...' },
            { p: 100, t: 'جاهز!' }
        ];
        
        let i = 0;
        const interval = setInterval(() => {
            if (i >= steps.length) {
                clearInterval(interval);
                return;
            }
            progress.style.width = steps[i].p + '%';
            status.textContent = steps[i].t;
            i++;
        }, 400);
    }

    hideLoading() {
        document.getElementById('loading-screen').classList.add('hidden');
        document.getElementById('app').classList.remove('hidden');
    }

    // ==================== AUTHENTICATION ====================

    signInWithGoogle() {
        if (!this.auth) {
            this.showToast('Firebase غير متوفر', 'error');
            return;
        }
        const provider = new firebase.auth.GoogleAuthProvider();
        this.auth.signInWithPopup(provider).then((result) => {
            this.data.user = {
                uid: result.user.uid,
                name: result.user.displayName,
                email: result.user.email,
                avatar: result.user.photoURL || '👤',
                isGuest: false
            };
            this.syncData();
            this.showToast(`مرحباً ${this.data.user.name}!`, 'success');
        }).catch((error) => {
            this.showToast('خطأ في تسجيل الدخول', 'error');
        });
    }

    signInWithEmail() {
        const email = document.getElementById('auth-email').value;
        const password = document.getElementById('auth-password').value;
        
        if (!email || !password) {
            this.showToast('أدخل البريد وكلمة المرور', 'warning');
            return;
        }

        if (this.auth) {
            this.auth.signInWithEmailAndPassword(email, password)
                .then((result) => {
                    this.data.user = {
                        uid: result.user.uid,
                        name: result.user.displayName || 'مستخدم',
                        email: result.user.email,
                        avatar: '👤',
                        isGuest: false
                    };
                    this.syncData();
                })
                .catch(() => this.showToast('بيانات الدخول غير صحيحة', 'error'));
        } else {
            this.skipAuth();
        }
    }

    skipAuth() {
        document.getElementById('auth-screen').classList.add('hidden');
        document.getElementById('app').classList.remove('hidden');
        this.data.user.isGuest = true;
        this.showToast('أهلاً بك في وضع الضيف! 👋', 'info');
    }

    // ==================== DATA MANAGEMENT ====================

    loadData() {
        return new Promise((resolve) => {
            try {
                const saved = localStorage.getItem('mazakrti_pro_data');
                if (saved) {
                    const parsed = JSON.parse(saved);
                    this.data = this.mergeDeep(this.data, parsed);
                }
                
                // Apply theme
                if (this.data.settings.darkMode) {
                    document.documentElement.setAttribute('data-theme', 'dark');
                    document.getElementById('dark-mode-icon').textContent = '☀️';
                }
                
                if (this.data.settings.theme !== 'default') {
                    document.documentElement.setAttribute('data-theme', this.data.settings.theme);
                }
            } catch (e) {
                console.error('Error loading data:', e);
            }
            
            this.checkDailyReset();
            resolve();
        });
    }

    saveData() {
        try {
            localStorage.setItem('mazakrti_pro_data', JSON.stringify(this.data));
            
            // Sync to Firebase if online and authenticated
            if (this.state.isOnline && !this.data.user.isGuest && this.db) {
                this.db.collection('users').doc(this.data.user.uid).set(this.data);
            }
        } catch (e) {
            console.error('Error saving data:', e);
        }
    }

    syncData() {
        if (!this.db || !this.data.user.uid) return;
        
        this.db.collection('users').doc(this.data.user.uid).get()
            .then((doc) => {
                if (doc.exists) {
                    this.data = this.mergeDeep(this.data, doc.data());
                    this.renderAll();
                } else {
                    this.saveData();
                }
            });
    }

    checkDailyReset() {
        const today = new Date().toDateString();
        const lastCheck = localStorage.getItem('last_check_pro');
        
        if (lastCheck !== today) {
            this.timer.sessionsToday = 0;
            this.timer.minutesToday = 0;
            this.generateDailyChallenges();
            
            // Check streak freeze
            if (this.data.stats.freezeStreaks > 0 && this.data.stats.lastStudyDate) {
                const lastDate = new Date(this.data.stats.lastStudyDate);
                const diff = Math.floor((new Date() - lastDate) / (1000 * 60 * 60 * 24));
                
                if (diff > 1) {
                    this.data.stats.freezeStreaks--;
                    this.showToast('❄️ تم استخدام Streak Freeze!', 'info');
                } else if (diff > 1) {
                    this.data.stats.streak = 0;
                    this.showToast('😔 انقطعت سلسلتك! ارجع للمذاكرة اليوم', 'warning');
                }
            }
            
            localStorage.setItem('last_check_pro', today);
            this.saveData();
        }
    }

    mergeDeep(target, source) {
        const output = Object.assign({}, target);
        if (this.isObject(target) && this.isObject(source)) {
            Object.keys(source).forEach(key => {
                if (this.isObject(source[key])) {
                    if (!(key in target)) Object.assign(output, { [key]: source[key] });
                    else output[key] = this.mergeDeep(target[key], source[key]);
                } else {
                    Object.assign(output, { [key]: source[key] });
                }
            });
        }
        return output;
    }

    isObject(item) {
        return (item && typeof item === 'object' && !Array.isArray(item));
    }

    // ==================== NAVIGATION ====================

    navigate(page) {
        document.querySelectorAll('.nav-btn, .drawer-link').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.page === page);
        });

        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        const pageEl = document.getElementById(`page-${page}`);
        if (pageEl) pageEl.classList.add('active');
        
        this.state.currentPage = page;
        this.closeDrawer();

        if (page === 'timer') this.renderGarden();
        if (page === 'analytics') this.updateChart();
        if (page === 'achievements') this.renderAchievements();
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
        this.renderLevel();
        this.renderStats();
        this.renderStreak();
        this.renderChallenges();
        this.renderGoals();
        this.renderSchedulePro(); // <-- النسخة المتقدمة
        this.renderNotes();
        this.renderShop();
        this.renderAchievements();
        this.renderGarden();
        this.updateTimerDisplay();
    }

    renderLevel() {
        const currentLevel = this.getCurrentLevel();
        const nextLevel = this.levels.find(l => l.level === currentLevel.level + 1);
        const xpNeeded = nextLevel ? nextLevel.xp - this.data.stats.xp : 0;
        const progress = nextLevel ? ((this.data.stats.xp - currentLevel.xp) / (nextLevel.xp - currentLevel.xp)) * 100 : 100;
        
        document.getElementById('level-display').textContent = `LVL ${currentLevel.level}`;
        document.getElementById('level-title').textContent = currentLevel.title;
        document.getElementById('level-avatar').textContent = currentLevel.avatar;
        document.getElementById('nav-level').textContent = currentLevel.level;
        document.getElementById('xp-text').textContent = `${this.data.stats.xp} / ${nextLevel ? nextLevel.xp : 'MAX'} XP`;
        document.getElementById('xp-fill').style.width = `${Math.min(progress, 100)}%`;
        document.getElementById('nav-xp').textContent = this.data.stats.xp;
        document.getElementById('hero-level').textContent = currentLevel.level;
    }

    getCurrentLevel() {
        for (let i = this.levels.length - 1; i >= 0; i--) {
            if (this.data.stats.xp >= this.levels[i].xp) {
                return this.levels[i];
            }
        }
        return this.levels[0];
    }

    addXP(amount) {
        const oldLevel = this.getCurrentLevel();
        this.data.stats.xp += amount;
        const newLevel = this.getCurrentLevel();
        
        if (newLevel.level > oldLevel.level) {
            this.showLevelUpModal(newLevel);
            this.checkAchievements();
        }
        
        this.renderLevel();
        this.saveData();
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
        document.getElementById('stat-minutes').textContent = this.timer.minutesToday;
        
        document.getElementById('shop-points').textContent = this.data.stats.points;
        document.getElementById('timer-sessions').textContent = this.timer.sessionsToday;
        document.getElementById('timer-minutes-today').textContent = this.timer.minutesToday;
        document.getElementById('timer-total-sessions').textContent = this.data.stats.totalSessions;
        
        document.getElementById('best-streak').textContent = Math.max(this.data.stats.streak, this.data.stats.bestStreak);
        document.getElementById('achievements-count').textContent = this.data.achievements.length;
    }

    renderStreak() {
        document.getElementById('streak-number').textContent = this.data.stats.streak;
        
        if (this.data.stats.freezeStreaks > 0) {
            document.getElementById('freeze-indicator').classList.remove('hidden');
        }
    }

    // ==================== AI SYSTEM ====================

    initAI() {
        this.aiInitialized = true;
        this.addAIMessage('bot', `أهلاً ${this.data.user.name}! 🌟 أنا OBV Pro، مساعدك الدراسي الذكي. يمكنني:

📊 تحليل أدائك الدراسي
📅 اقتراح جداول مذاكرة ذكية
🔮 توقع درجاتك بناءً على ساعات المذاكرة
🎯 مساعدتك في التركيز والتحفيز

كيف يمكنني مساعدتك اليوم؟`);
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
        
        document.getElementById('typing-indicator').classList.remove('hidden');
        
        setTimeout(() => {
            document.getElementById('typing-indicator').classList.add('hidden');
            const response = this.generateAIResponse(message);
            this.addAIMessage('bot', response);
            this.data.stats.aiChats++;
            this.addXP(5); // XP for chatting with AI
            this.saveData();
            this.renderStats();
            this.checkAchievements();
        }, 1000 + Math.random() * 1000);
    }

    generateAIResponse(text) {
        const lower = text.toLowerCase();
        
        for (const [pattern, responses] of Object.entries(this.aiResponses)) {
            if (new RegExp(pattern).test(lower)) {
                const response = responses[Math.floor(Math.random() * responses.length)];
                return typeof response === 'function' ? response() : response;
            }
        }
        
        // Smart contextual responses
        if (lower.includes('مذاكرة') || lower.includes('دراسة')) {
            return this.generateStudyAdvice();
        }
        
        if (lower.includes('تحفيز') || lower.includes('تشجيع')) {
            return this.generateMotivation();
        }
        
        return 'فهمت عليك! 🤔 ممكن توضح أكتر عشان أساعدك بشكل أفضل؟ أو جرب تسألني عن "تحليل الأداء" أو "جدول المذاكرة"';
    }

    generatePerformanceAnalysis() {
        const avgMinutes = this.data.studyHistory.length > 0 
            ? Math.round(this.data.studyHistory.reduce((a, b) => a + b.minutes, 0) / this.data.studyHistory.length)
            : 0;
        
        const trend = this.analyzeTrend();
        
        return `📊 تحليل أدائك:

⏱️ متوسط المذاكرة اليومي: ${avgMinutes} دقيقة
📈 الاتجاه: ${trend === 'up' ? 'صاعد 📈' : trend === 'down' ? 'هابط 📉' : 'مستقر ➡️'}
🎯 نصيحتي: ${avgMinutes < 30 ? 'حاول زيادة وقت المذاكرة تدريجياً' : 'أداء ممتاز! استمر على هذا النمط'}

هل تريد خطة تحسين محددة؟`;
    }

    generateSmartSchedule() {
        const subjects = [...new Set(this.data.schedule.map(s => s.subject))];
        if (subjects.length === 0) return 'أضف موادك أولاً في الجدول! 📚';
        
        let schedule = '📅 جدول مقترح لليوم:\n\n';
        let time = 8; // Start at 8 AM
        
        subjects.forEach((subject, i) => {
            schedule += `🕐 ${time}:00 - ${subject} (45 دقيقة)\n`;
            schedule += `☕ ${time + 1}:00 - راحة (15 دقيقة)\n\n`;
            time += 1;
        });
        
        schedule += '🎯 نصيحة: خذ راحة طويلة (30 دقيقة) كل 4 جلسات';
        return schedule;
    }

    predictGrades() {
        const totalHours = Math.floor(this.data.stats.totalMinutes / 60);
        const prediction = Math.min(60 + (totalHours * 2), 100);
        
        return `🔮 توقع الدرجات بناءً على ${totalHours} ساعة مذاكرة:

📊 التوقع: ${prediction}%
📈 دقة التوقع: ${totalHours > 20 ? 'عالية' : 'متوسطة'}
💡 نصيحة: ${prediction < 70 ? 'تحتاج مزيد من الساعات للوصول للتفوق' : 'أداء ممتاز! استمر'}

هل تريد خطة للتحسين؟`;
    }

    generateStudyAdvice() {
        const tips = [
            '💡 استخدم تقنية Feynman: اشرس الموضوع لنفسك ببساطة',
            '🧠 خذ راحة 5 دقائق كل 25 دقيقة (Pomodoro)',
            '📝 راجع ملاحظاتك قبل النوم بساعة',
            '🎯 ركز على المواد الأصعب في الصباح',
            '☕ تجنب الكافيين بعد الظهر للنوم الجيد'
        ];
        return tips[Math.floor(Math.random() * tips.length)];
    }

    generateMotivation() {
        const quotes = [
            '💪 "النجاح ليس نهائياً، والفشل ليس قاتلاً: الشجاعة للاستمرار هي ما يهم"',
            '🌟 "أنت أقوى مما تعتقد، وأقرب مما تظن"',
            '🔥 "كل خبير كان مرة مبتدئاً. استمر!"',
            '💫 "ليس الأمر كم تدرس، بل كيف تدرس"'
        ];
        return quotes[Math.floor(Math.random() * quotes.length)];
    }

    analyzeTrend() {
        if (this.data.studyHistory.length < 3) return 'stable';
        const recent = this.data.studyHistory.slice(-3);
        const avg = recent.reduce((a, b) => a + b.minutes, 0) / 3;
        const prev = this.data.studyHistory.slice(-6, -3);
        const prevAvg = prev.reduce((a, b) => a + b.minutes, 0) / 3 || avg;
        
        if (avg > prevAvg * 1.1) return 'up';
        if (avg < prevAvg * 0.9) return 'down';
        return 'stable';
    }

    analyzePerformance() {
        this.sendAIMessage('تحليل أدائي');
    }

    addAIMessage(sender, text) {
        const chat = document.getElementById('ai-chat');
        const msg = document.createElement('div');
        msg.className = `message-pro ${sender}`;
        msg.innerHTML = `
            <div>${text.replace(/\n/g, '<br>')}</div>
            <div class="message-time-pro">
                ${sender === 'bot' ? '🤖 OBV Pro' : '👤 أنت'} • 
                ${new Date().toLocaleTimeString('ar-EG', {hour: '2-digit', minute: '2-digit'})}
            </div>
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
        a.download = `محادثة_OBV_${new Date().toLocaleDateString()}.txt`;
        a.click();
    }

    // ==================== ACHIEVEMENTS ====================

    checkAchievements() {
        let newUnlocks = [];
        
        this.achievementsList.forEach(ach => {
            if (!this.data.achievements.includes(ach.id) && ach.condition(this.data)) {
                this.data.achievements.push(ach.id);
                newUnlocks.push(ach);
            }
        });
        
        if (newUnlocks.length > 0) {
            this.saveData();
            newUnlocks.forEach((ach, index) => {
                setTimeout(() => this.showAchievementUnlock(ach), index * 500);
            });
            this.renderAchievements();
        }
    }

    showAchievementUnlock(ach) {
        document.getElementById('achievement-icon').textContent = ach.icon;
        document.getElementById('achievement-name').textContent = ach.name;
        document.getElementById('achievement-desc').textContent = ach.desc;
        document.getElementById('achievement-modal').classList.add('active');
        this.launchConfetti();
        this.playSound('achievement');
        this.addXP(ach.rarity === 'legendary' ? 100 : ach.rarity === 'epic' ? 50 : 25);
    }

    closeAchievementModal(e) {
        if (!e || e.target === e.currentTarget) {
            document.getElementById('achievement-modal').classList.remove('active');
        }
    }

    renderAchievements() {
        const grid = document.getElementById('achievements-grid');
        const unlockedCount = this.data.achievements.length;
        
        document.getElementById('unlocked-count').textContent = unlockedCount;
        document.getElementById('total-achievements').textContent = this.achievementsList.length;
        document.getElementById('rare-count').textContent = 
            this.data.achievements.filter(id => {
                const ach = this.achievementsList.find(a => a.id === id);
                return ach && (ach.rarity === 'rare' || ach.rarity === 'epic' || ach.rarity === 'legendary');
            }).length;

        if (!grid) return;

        grid.innerHTML = this.achievementsList.map(ach => {
            const unlocked = this.data.achievements.includes(ach.id);
            const isSecret = ach.rarity === 'secret' && !unlocked;
            
            return `
                <div class="achievement-card ${unlocked ? 'unlocked' : ''} ${isSecret ? 'secret' : ''}">
                    ${ach.rarity !== 'common' ? `<div class="achievement-badge ${ach.rarity}">${ach.rarity}</div>` : ''}
                    <div class="achievement-icon">${isSecret ? '❓' : ach.icon}</div>
                    <div class="achievement-name">${isSecret ? '???' : ach.name}</div>
                    <div class="achievement-desc">${isSecret ? 'إنجاز سري - اكتشف بنفسك!' : ach.desc}</div>
                    ${unlocked ? 
                        '<div style="color: var(--success); font-weight: 700; margin-top: 0.5rem;">✓ مكتمل</div>' :
                        `<div class="achievement-progress">
                            <div class="achievement-progress-fill" style="width: ${this.getAchievementProgress(ach)}%"></div>
                        </div>`
                    }
                </div>
            `;
        }).join('');
    }

    getAchievementProgress(ach) {
        // Simplified progress calculation
        if (ach.id.includes('streak')) {
            const target = parseInt(ach.id.split('_')[1]);
            return Math.min((this.data.stats.streak / target) * 100, 100);
        }
        if (ach.id.includes('tree')) {
            const target = ach.id === 'tree_collector' ? 5 : 15;
            return Math.min((this.data.trees.length / target) * 100, 100);
        }
        return 0;
    }

    // ==================== TIMER & GARDEN ====================

    setTimerMode(mode) {
        this.timer.mode = mode;
        const times = {
            pomodoro: 25 * 60,
            shortBreak: 5 * 60,
            longBreak: 15 * 60,
            custom: null
        };
        
        document.querySelectorAll('.mode-btn-pro').forEach(btn => {
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
        
        const circle = document.getElementById('timer-ring');
        const circumference = 2 * Math.PI * 150;
        const offset = circumference - (this.timer.seconds / this.timer.totalSeconds) * circumference;
        circle.style.strokeDasharray = circumference;
        circle.style.strokeDashoffset = offset;
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
        const points = Math.floor(minutes / 5) * 10;
        const xp = minutes * 2;
        
        this.data.stats.points += points;
        this.addXP(xp);
        this.data.stats.totalMinutes += minutes;
        this.timer.sessionsToday++;
        this.timer.minutesToday += minutes;
        this.data.stats.totalSessions++;
        
        // Save to history
        this.data.studyHistory.push({
            date: new Date().toISOString(),
            minutes: minutes,
            subject: this.data.schedule[0]?.subject || 'عام'
        });
        
        this.updateStreak();
        this.saveData();
        this.renderStats();
        this.renderGarden();
        
        document.getElementById('btn-start').classList.remove('hidden');
        document.getElementById('btn-pause').classList.add('hidden');
        document.getElementById('btn-start').innerHTML = '<span>▶️</span> بدء';
        
        this.playSound('complete');
        this.launchConfetti();
        this.showToast(`🎉 أكملت ${minutes} دقيقة! +${points} نقطة +${xp} XP`, 'success');
        
        if (minutes >= 25) {
            this.showToast('🌳 يمكنك زراعة شجرة جديدة!', 'info');
        }
        
        this.checkAchievements();
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
            } else if (diff > 1 && this.data.stats.freezeStreaks === 0) {
                this.data.stats.streak = 1;
            }
        }
        
        if (this.data.stats.streak % 7 === 0 && this.data.stats.streak > 0) {
            this.data.stats.points += 100;
            this.data.stats.freezeStreaks++;
            this.showToast('🎉 مكافأة أسبوعية! +100 نقطة + Streak Freeze', 'success');
        }
        
        this.data.stats.lastStudyDate = today;
        this.renderStreak();
    }

    // ==================== GARDEN 2.0 ====================

    setGardenTheme(theme) {
        this.state.gardenTheme = theme;
        document.getElementById('garden-scene').className = `garden-scene-pro theme-${theme}`;
        
        // Update weather effects
        const weather = document.getElementById('weather-overlay');
        weather.className = 'weather-overlay';
        
        if (theme === 'winter') {
            weather.classList.add('active', 'snow');
        } else if (theme === 'day' && Math.random() > 0.7) {
            weather.classList.add('active', 'rain');
        }
        
        document.querySelectorAll('.garden-mode-btn-pro').forEach(btn => {
            btn.classList.toggle('active', btn.onclick.toString().includes(theme));
        });
    }

    renderGarden() {
        const ground = document.getElementById('garden-ground');
        ground.innerHTML = '';
        
        document.getElementById('garden-tree-count').textContent = this.data.trees.length;
        document.getElementById('garden-minutes').textContent = this.data.stats.totalMinutes;
        document.getElementById('garden-level').textContent = 'مستوى ' + this.getCurrentLevel().level;
        
        // Render house if level >= 5
        if (this.getCurrentLevel().level >= 5) {
            const house = document.createElement('div');
            house.className = 'house';
            house.innerHTML = '🏠';
            house.style.right = '10%';
            house.style.bottom = '30%';
            ground.appendChild(house);
        }
        
        // Render pets
        this.data.pets.forEach((pet, index) => {
            const el = document.createElement('div');
            el.className = 'pet';
            el.textContent = pet.icon;
            el.style.left = (20 + (index * 15)) + '%';
            el.style.bottom = (40 + (index * 5)) + '%';
            el.title = pet.name;
            ground.appendChild(el);
        });
        
        // Render trees
        this.data.trees.forEach((tree, index) => {
            const el = document.createElement('div');
            el.className = 'tree-pro';
            el.style.left = tree.x + '%';
            el.style.bottom = tree.y + '%';
            el.style.animationDelay = (index * 0.1) + 's';
            el.innerHTML = `
                ${this.getTreeHTML(tree.type)}
                <div class="tree-tooltip">${tree.name}</div>
            `;
            ground.appendChild(el);
        });
        
        if (this.data.trees.length === 0) {
            ground.innerHTML = `
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; color: #14532d;">
                    <div style="font-size: 5rem; margin-bottom: 1rem; animation: float 3s ease-in-out infinite;">🌱</div>
                    <div style="font-size: 1.25rem; font-weight: 600;">ابدأ المذاكرة لزراعة أول شجرة!</div>
                    <div style="font-size: 0.875rem; opacity: 0.8; margin-top: 0.5rem;">كل 25 دقيقة = شجرة جديدة</div>
                </div>
            `;
        }
    }

    getTreeHTML(type) {
        const templates = {
            palm: `
                <div style="position: relative; width: 90px; height: 80px;">
                    <div style="position: absolute; bottom: 0; left: 40px; width: 12px; height: 50px; background: linear-gradient(to right, #92400e, #b45309); border-radius: 6px;"></div>
                    <div style="position: absolute; bottom: 35px; left: 15px; width: 70px; height: 35px; background: #22c55e; border-radius: 50% 50% 0 0; transform: rotate(-25deg);"></div>
                    <div style="position: absolute; bottom: 35px; left: 15px; width: 70px; height: 35px; background: #4ade80; border-radius: 50% 50% 0 0; transform: rotate(0deg);"></div>
                    <div style="position: absolute; bottom: 35px; left: 15px; width: 70px; height: 35px; background: #22c55e; border-radius: 50% 50% 0 0; transform: rotate(25deg);"></div>
                </div>
            `,
            sakura: `
                <div style="position: relative; width: 80px; height: 90px;">
                    <div style="position: absolute; bottom: 0; left: 35px; width: 12px; height: 40px; background: linear-gradient(to right, #be185d, #db2777); border-radius: 6px;"></div>
                    <div style="position: absolute; bottom: 30px; left: 10px; width: 60px; height: 60px; background: radial-gradient(circle, #fbcfe8, #f472b6); border-radius: 50%; box-shadow: 0 0 20px rgba(244, 114, 182, 0.4);"></div>
                </div>
            `,
            cactus: `
                <div style="position: relative; width: 60px; height: 70px;">
                    <div style="position: absolute; bottom: 0; left: 24px; width: 14px; height: 60px; background: linear-gradient(to right, #15803d, #22c55e); border-radius: 7px;"></div>
                    <div style="position: absolute; bottom: 30px; left: 5px; width: 18px; height: 10px; background: #16a34a; border-radius: 6px;"></div>
                    <div style="position: absolute; bottom: 40px; right: 5px; width: 14px; height: 8px; background: #16a34a; border-radius: 6px;"></div>
                </div>
            `,
            default: `
                <div style="position: relative; width: 70px; height: 80px;">
                    <div style="position: absolute; bottom: 0; left: 30px; width: 12px; height: 40px; background: linear-gradient(to right, #78350f, #92400e); border-radius: 6px;"></div>
                    <div style="position: absolute; bottom: 30px; left: 5px; width: 60px; height: 50px; background: radial-gradient(circle at 30% 30%, #4ade80, #16a34a); border-radius: 50%;"></div>
                </div>
            `
        };
        return templates[type] || templates.default;
    }

    // ==================== SHOP ====================

    renderShop() {
        const grid = document.getElementById('shop-grid');
        const currentLevel = this.getCurrentLevel().level;
        
        const filtered = this.state.shopFilter === 'all' 
            ? this.shopItems 
            : this.shopItems.filter(i => i.category === this.state.shopFilter || (this.state.shopFilter === 'rare' && ['rare', 'epic', 'legendary'].includes(i.rarity)));
        
        grid.innerHTML = filtered.map(item => {
            const owned = this.data.trees.some(t => t.itemId === item.id) || this.data.pets.some(p => p.itemId === item.id);
            const canAfford = this.data.stats.points >= item.cost;
            const canUnlock = !item.unlockLevel || currentLevel >= item.unlockLevel;
            
            return `
                <div class="shop-item-pro ${owned ? 'owned' : ''} ${!canAfford && !owned ? 'locked' : ''} ${item.rarity}">
                    ${item.rarity !== 'common' ? `<div class="item-rarity ${item.rarity}">${item.rarity}</div>` : ''}
                    <span class="item-icon-pro">${item.icon}</span>
                    <div class="item-name-pro">${item.name}</div>
                    <div class="item-desc-pro">${item.desc}</div>
                    ${!canUnlock ? 
                        `<div style="color: var(--text-muted); font-size: 0.875rem; margin-bottom: 1rem;">🔒 يفتح عند المستوى ${item.unlockLevel}</div>` :
                        owned ? 
                        '<div class="owned-badge-pro">✓ تم الشراء</div>' :
                        `<div class="item-price-pro">💎 ${item.cost}</div>
                        <button class="buy-btn-pro" onclick="app.buyItem(${item.id})" ${!canAfford ? 'disabled' : ''}>
                            ${canAfford ? '🛒 شراء' : '❌ نقاط غير كافية'}
                        </button>`
                    }
                </div>
            `;
        }).join('');
    }

    filterShop(category) {
        this.state.shopFilter = category;
        document.querySelectorAll('.shop-category').forEach(btn => {
            btn.classList.toggle('active', btn.textContent.includes(category === 'all' ? 'الكل' : category === 'trees' ? 'أشجار' : category === 'pets' ? 'حيوانات' : 'نادرة'));
        });
        this.renderShop();
    }

    buyItem(id) {
        const item = this.shopItems.find(i => i.id === id);
        if (!item || this.data.stats.points < item.cost) return;
        
        this.data.stats.points -= item.cost;
        
        if (item.category === 'pets') {
            this.data.pets.push({
                itemId: item.id,
                icon: item.icon,
                name: item.name,
                type: item.type,
                date: new Date().toLocaleDateString('ar-EG')
            });
        } else {
            const count = this.data.trees.length;
            const row = Math.floor(count / 4);
            const col = count % 4;
            const x = 15 + (col * 22) + (Math.random() - 0.5) * 5;
            const y = 50 + (row * 15) + (Math.random() - 0.5) * 3;
            
            this.data.trees.push({
                itemId: item.id,
                type: item.type,
                name: item.name,
                x: Math.max(10, Math.min(85, x)),
                y: Math.max(45, Math.min(80, y)),
                date: new Date().toLocaleDateString('ar-EG')
            });
        }
        
        this.saveData();
        this.renderStats();
        this.renderShop();
        this.playSound('success');
        this.showToast(`🎉 اشتريت ${item.name}!`, 'success');
        this.checkAchievements();
        this.addXP(item.rarity === 'legendary' ? 50 : item.rarity === 'epic' ? 30 : 10);
    }

    // ==================== NOTES ====================

    selectNoteColor(color, element) {
        this.state.selectedNoteColor = color;
        document.querySelectorAll('.color-option-pro').forEach(el => el.classList.remove('selected'));
        element.classList.add('selected');
    }

    addNote() {
        const input = document.getElementById('note-input');
        const text = input.value.trim();
        
        if (!text) {
            this.showToast('✍️ اكتب ملاحظة أولاً', 'warning');
            return;
        }
        
        const rotation = (Math.random() - 0.5) * 6; // Random rotation between -3 and 3 deg
        
        this.data.notes.unshift({
            id: Date.now(),
            text,
            color: this.state.selectedNoteColor,
            rotation: rotation,
            date: new Date().toISOString()
        });
        
        input.value = '';
        this.saveData();
        this.renderNotes();
        this.renderStats();
        this.showToast('✅ تمت إضافة الملاحظة', 'success');
        this.playSound('success');
        this.addXP(5);
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
            <div class="note-card-pro note-${note.color}-pro" style="--rotation: ${note.rotation}deg">
                <div class="note-pin-pro"></div>
                <div class="note-content-pro">${this.escapeHtml(note.text)}</div>
                <div class="note-footer-pro">
                    <span>${new Date(note.date).toLocaleDateString('ar-EG')}</span>
                    <button class="note-delete-pro" onclick="app.deleteNote(${note.id})">🗑️</button>
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

    // ==================== ANALYTICS ====================

    initChart() {
        const ctx = document.getElementById('studyChart');
        if (!ctx) return;
        
        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['السبت', 'الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'],
                datasets: [{
                    label: 'دقائق المذاكرة',
                    data: [45, 60, 30, 90, 45, 75, 20],
                    borderColor: '#6366f1',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(0,0,0,0.05)' }
                    },
                    x: {
                        grid: { display: false }
                    }
                }
            }
        });
    }

    updateChart() {
        if (!this.chart) return;
        // Update with real data
        const data = this.getChartData();
        this.chart.data.datasets[0].data = data;
        this.chart.update();
    }

    getChartData() {
        // Generate mock data based on study history
        const days = 7;
        const data = [];
        for (let i = 0; i < days; i++) {
            const dayData = this.data.studyHistory.filter(h => {
                const date = new Date(h.date);
                const today = new Date();
                const diff = Math.floor((today - date) / (1000 * 60 * 60 * 24));
                return diff === (days - 1 - i);
            });
            data.push(dayData.reduce((a, b) => a + b.minutes, 0));
        }
        return data.length > 0 ? data : [45, 60, 30, 90, 45, 75, 20];
    }

    setChartPeriod(period) {
        this.state.chartPeriod = period;
        document.querySelectorAll('.chart-filter').forEach(btn => {
            btn.classList.toggle('active', btn.textContent.includes(period === 'week' ? 'أسبوع' : period === 'month' ? 'شهر' : 'سنة'));
        });
        this.updateChart();
    }

    // ==================== GOALS SYSTEM ====================

    generateGoals() {
        if (this.data.goals.length === 0) {
            this.data.goals = [
                { id: 1, title: 'مذاكرة 30 دقيقة', type: 'daily', target: 30, current: 0, unit: 'دقيقة', reward: 20 },
                { id: 2, title: 'إكمال 3 جلسات', type: 'daily', target: 3, current: 0, unit: 'جلسة', reward: 30 },
                { id: 3, title: '150 دقيقة هذا الأسبوع', type: 'weekly', target: 150, current: 0, unit: 'دقيقة', reward: 100 }
            ];
        }
    }

    renderGoals() {
        const container = document.getElementById('goals-list');
        if (!container) return;
        
        container.innerHTML = this.data.goals.map(goal => {
            const progress = Math.min((goal.current / goal.target) * 100, 100);
            const isCompleted = progress >= 100;
            
            return `
                <div class="goal-card ${isCompleted ? 'completed' : ''}">
                    <div class="goal-header">
                        <div class="goal-title">
                            <span>${isCompleted ? '✅' : '🎯'}</span>
                            ${goal.title}
                        </div>
                        <span class="goal-type ${goal.type}">${goal.type === 'daily' ? 'يومي' : goal.type === 'weekly' ? 'أسبوعي' : 'شهري'}</span>
                    </div>
                    <div class="goal-progress-container">
                        <div class="goal-progress-bar">
                            <div class="goal-progress-fill" style="width: ${progress}%"></div>
                        </div>
                    </div>
                    <div class="goal-stats">
                        <span>${goal.current} / ${goal.target} ${goal.unit}</span>
                        <span class="goal-reward">💎 +${goal.reward}</span>
                    </div>
                </div>
            `;
        }).join('');
    }

    addGoal() {
        const title = prompt('عنوان الهدف:');
        if (!title) return;
        
        const target = parseInt(prompt('الهدف (رقم):')) || 10;
        const type = confirm('هل هو يومي؟ (موافق=يومي، إلغاء=أسبوعي)') ? 'daily' : 'weekly';
        
        this.data.goals.push({
            id: Date.now(),
            title,
            type,
            target,
            current: 0,
            unit: 'مرة',
            reward: type === 'daily' ? 20 : 50
        });
        
        this.saveData();
        this.renderGoals();
    }

    // ==================== MOOD TRACKER ====================

    setMood(mood, btn) {
        document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        
        this.data.moodHistory.push({
            mood,
            date: new Date().toISOString(),
            notes: ''
        });
        
        this.saveData();
        this.showToast(`تم تسجيل حالتك: ${this.getMoodText(mood)}`, 'success');
        
        // AI response based on mood
        if (mood === 'stressed' || mood === 'tired') {
            setTimeout(() => {
                this.showToast('🤖 OBV: خذ قسطاً من الراحة، أنت تستحقها!', 'info');
            }, 1000);
        }
    }

    getMoodText(mood) {
        const texts = {
            amazing: '😄 ممتاز',
            good: '🙂 جيد',
            okay: '😐 عادي',
            tired: '😴 متعب',
            stressed: '😰 مضغوط'
        };
        return texts[mood] || mood;
    }

    // ==================== CHALLENGES ====================

    generateDailyChallenges() {
        const today = new Date().toDateString();
        if (this.data.challengesDate === today) return;
        
        this.data.challenges = [
            { id: 1, text: 'ذاكر 30 دقيقة بدون توقف', points: 20, xp: 15, completed: false },
            { id: 2, text: 'أكمل 3 مواد في الجدول', points: 30, xp: 20, completed: false },
            { id: 3, text: 'استخدم المؤقت مرتين', points: 25, xp: 15, completed: false }
        ];
        this.data.challengesDate = today;
        this.saveData();
    }

    renderChallenges() {
        const container = document.getElementById('challenges-list');
        const completed = this.data.challenges.filter(c => c.completed).length;
        
        document.getElementById('challenge-progress').textContent = `${completed}/${this.data.challenges.length}`;
        
        container.innerHTML = this.data.challenges.map(c => `
            <div class="challenge-item-pro ${c.completed ? 'completed' : ''}" onclick="app.toggleChallenge(${c.id})">
                <div style="display: flex; align-items: center; flex: 1;">
                    <div class="challenge-checkbox-pro ${c.completed ? 'completed' : ''}"></div>
                    <div class="challenge-info">
                        <div class="challenge-text-pro">${c.text}</div>
                        <div class="challenge-meta">💎 ${c.points} نقطة • XP ${c.xp}</div>
                    </div>
                </div>
                ${c.completed ? '' : `<span class="challenge-reward-pro">+${c.points}</span>`}
            </div>
        `).join('');
    }

    toggleChallenge(id) {
        const challenge = this.data.challenges.find(c => c.id === id);
        if (!challenge || challenge.completed) return;
        
        challenge.completed = true;
        this.data.stats.points += challenge.points;
        this.addXP(challenge.xp);
        this.saveData();
        this.renderStats();
        this.renderChallenges();
        this.showToast(`✅ تحدي مكتمل! +${challenge.points} نقطة +${challenge.xp} XP`, 'success');
        this.playSound('success');
        this.checkAchievements();
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

    toggleMusic() {
        this.data.settings.musicEnabled = !this.data.settings.musicEnabled;
        document.getElementById('music-icon').textContent = this.data.settings.musicEnabled ? '🎵' : '🔇';
        
        if (this.data.settings.musicEnabled) {
            this.playFocusMusic();
        } else {
            this.stopFocusMusic();
        }
        this.saveData();
    }

    playFocusMusic() {
        // Simulate music with Web Audio API
        if (!this.state.audioContext) {
            this.state.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        // In real app, would play actual audio file
        this.showToast('🎵 تشغيل موسيقى التركيز (White Noise)', 'info');
    }

    stopFocusMusic() {
        if (this.state.musicAudio) {
            this.state.musicAudio.pause();
        }
    }

    toggleFocusMode() {
        const overlay = document.getElementById('focus-overlay');
        overlay.classList.toggle('active');
        
        if (overlay.classList.contains('active')) {
            document.getElementById('focus-sessions').textContent = this.timer.sessionsToday;
            document.getElementById('focus-minutes').textContent = this.timer.minutesToday;
            document.getElementById('focus-streak').textContent = this.data.stats.streak;
        }
    }

    pauseFocus() {
        this.pauseTimer();
        this.showToast('⏸️ تم الإيقاف المؤقت', 'info');
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
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
                osc.start();
                osc.stop(ctx.currentTime + 0.5);
            } else if (type === 'achievement') {
                // Fanfare sound
                [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
                    const o = ctx.createOscillator();
                    const g = ctx.createGain();
                    o.connect(g);
                    g.connect(ctx.destination);
                    o.frequency.value = freq;
                    g.gain.setValueAtTime(0.1, ctx.currentTime + i * 0.1);
                    g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.1 + 0.3);
                    o.start(ctx.currentTime + i * 0.1);
                    o.stop(ctx.currentTime + i * 0.1 + 0.3);
                });
            }
        } catch (e) {
            console.log('Audio not supported');
        }
    }

    showToast(message, type = 'info', duration = 4000) {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast-pro ${type}`;
        
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        
        toast.innerHTML = `
            <span class="toast-icon">${icons[type]}</span>
            <div class="toast-content">
                <div class="toast-title">${type === 'success' ? 'نجاح' : type === 'error' ? 'خطأ' : type === 'warning' ? 'تنبيه' : 'معلومة'}</div>
                <div class="toast-message">${message}</div>
            </div>
            <div class="toast-progress"></div>
        `;
        
        container.appendChild(toast);
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

    showLevelUpModal(level) {
        this.showModal('🎉 ترقية جديدة!', `
            <div class="text-center" style="padding: 2rem;">
                <div style="font-size: 5rem; margin-bottom: 1rem;">${level.avatar}</div>
                <h2 style="font-size: 2rem; margin-bottom: 0.5rem;">المستوى ${level.level}</h2>
                <h3 style="color: var(--primary-500); margin-bottom: 1rem;">${level.title}</h3>
                <p style="color: var(--text-muted);">مبروك! لقد ارتقيت إلى مستوى جديد!</p>
                <button class="btn-primary-pro mt-2" onclick="app.closeModal()">رائع!</button>
            </div>
        `);
        this.launchConfetti();
    }

    launchConfetti() {
        const colors = ['#6366f1', '#06b6d4', '#f59e0b', '#ec4899', '#10b981'];
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                const el = document.createElement('div');
                el.style.position = 'fixed';
                el.style.width = '10px';
                el.style.height = '10px';
                el.style.background = colors[Math.floor(Math.random() * colors.length)];
                el.style.left = Math.random() * 100 + 'vw';
                el.style.top = '-10px';
                el.style.borderRadius = '50%';
                el.style.zIndex = '999999';
                el.style.pointerEvents = 'none';
                document.body.appendChild(el);
                
                const duration = 2000 + Math.random() * 3000;
                el.animate([
                    { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
                    { transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
                ], {
                    duration,
                    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                }).onfinish = () => el.remove();
            }, i * 30);
        }
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
        for (let i = 0; i < 30; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 4 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
        
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
                
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(99, 102, 241, ${p.opacity})`;
                ctx.fill();
            });
            
            requestAnimationFrame(animate);
        };
        animate();
    }

    initStars() {
        const container = document.getElementById('stars');
        if (!container) return;
        
        for (let i = 0; i < 50; i++) {
            const star = document.createElement('div');
            star.className = 'star-pro';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.animationDelay = Math.random() * 2 + 's';
            container.appendChild(star);
        }
    }

    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
                if (document.getElementById('focus-overlay').classList.contains('active')) {
                    this.toggleFocusMode();
                }
            }
        });

        document.addEventListener('visibilitychange', () => {
            if (document.hidden && this.timer.isRunning) {
                this.pauseTimer();
                this.showToast('⏸️ تم إيقاف المؤقت (خروج من التطبيق)', 'info');
            }
        });

        window.addEventListener('beforeunload', () => this.saveData());
    }

    handleOnline() {
        this.state.isOnline = true;
        this.showToast('🌐 متصل بالإنترنت', 'success');
        if (!this.data.user.isGuest) {
            this.syncData();
        }
    }

    handleOffline() {
        this.state.isOnline = false;
        this.showToast('📴 وضع عدم الاتصال - البيانات محفوظة محلياً', 'warning');
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
        a.download = `مذاكرتي_pro_backup_${new Date().toLocaleDateString()}.json`;
        a.click();
        this.showToast('💾 تم حفظ البيانات بنجاح', 'success');
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
                    this.data = this.mergeDeep(this.data, data);
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
        const currentLevel = this.getCurrentLevel();
        const text = `أنا الآن ${currentLevel.title} في مذاكرتي Pro! 🌟
المستوى: ${currentLevel.level}
سلسلة: ${this.data.stats.streak} أيام 🔥
أشجاري: ${this.data.trees.length} 🌳

حمل التطبيق الآن وابدأ رحلتك!`;
        
        if (navigator.share) {
            navigator.share({ title: 'مذاكرتي Pro', text: text });
        } else {
            navigator.clipboard.writeText(text);
            this.showToast('📤 تم نسخ المشاركة', 'success');
        }
    }

    // ==================== SECRET ACHIEVEMENTS CHECKS ====================

    checkNightOwl() {
        const hour = new Date().getHours();
        return hour >= 0 && hour < 4 && this.timer.minutesToday > 0;
    }

    checkEarlyBird() {
        const hour = new Date().getHours();
        return hour >= 4 && hour < 6 && this.timer.minutesToday > 0;
    }

    // ==================== SCHEDULE PRO ====================

    // عرض الجدول المتقدم
    renderSchedulePro() {
        const container = document.getElementById('schedule-list-pro');
        const empty = document.getElementById('schedule-empty-pro');
        const summary = document.getElementById('schedule-summary');
        
        // تحديث التاريخ
        const today = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        document.getElementById('schedule-date').textContent = today.toLocaleDateString('ar-EG', options);
        
        // فلترة المهام
        let filtered = this.data.schedule;
        if (this.scheduleFilter === 'pending') {
            filtered = this.data.schedule.filter(s => !s.completed);
        } else if (this.scheduleFilter === 'completed') {
            filtered = this.data.schedule.filter(s => s.completed);
        } else if (this.scheduleFilter === 'priority') {
            filtered = this.data.schedule.filter(s => s.priority === 'high' && !s.completed);
        }
        
        // ترتيب: أولوية عالية أولاً، ثم الوقت
        filtered.sort((a, b) => {
            const priorityOrder = { high: 0, medium: 1, low: 2 };
            if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            }
            return a.time.localeCompare(b.time);
        });
        
        if (this.data.schedule.length === 0) {
            container.innerHTML = '';
            container.appendChild(empty);
            empty.classList.remove('hidden');
            summary.style.display = 'none';
            this.updateProgress(0, 0);
            return;
        }
        
        empty.classList.add('hidden');
        summary.style.display = 'grid';
        
        // تحديث الإحصائيات
        const completed = this.data.schedule.filter(s => s.completed).length;
        const total = this.data.schedule.length;
        const totalMinutes = this.data.schedule.reduce((sum, s) => sum + (s.duration || 0), 0);
        
        this.updateProgress(completed, total);
        
        document.getElementById('total-study-time').textContent = totalMinutes;
        document.getElementById('completed-tasks').textContent = completed;
        document.getElementById('current-streak').textContent = this.data.stats.streak;
        
        // عرض المهام
        container.innerHTML = filtered.map(item => this.createScheduleItemHTML(item)).join('');
    }

    createScheduleItemHTML(item) {
        const priorityClass = item.priority ? `${item.priority}-priority` : '';
        const priorityBadge = item.priority ? 
            `<span class="priority-badge priority-${item.priority}">${this.getPriorityText(item.priority)}</span>` : '';
        
        const duration = item.duration ? `${item.duration} دقيقة` : '';
        
        return `
            <div class="schedule-item-pro ${item.completed ? 'completed' : ''} ${priorityClass}" data-id="${item.id}">
                <div class="schedule-time-pro">
                    <span class="time-start">${item.time}</span>
                    ${duration ? `<span class="time-duration">⏱️ ${duration}</span>` : ''}
                </div>
                
                <div class="schedule-content-pro">
                    <div class="schedule-subject-pro">${item.subject}</div>
                    <div class="schedule-meta-pro">
                        ${priorityBadge}
                        ${item.notes ? `<span>📝 ${item.notes}</span>` : ''}
                        ${item.completed ? `<span style="color: var(--success);">✅ مكتمل</span>` : ''}
                    </div>
                </div>
                
                <button class="schedule-complete-circle ${item.completed ? 'completed' : ''}" 
                        onclick="app.toggleScheduleComplete(${item.id}, this)"
                        title="${item.completed ? 'إلغاء الإكمال' : 'إكمال المهمة'}">
                    ${item.completed ? '✓' : '○'}
                </button>
                
                <div class="schedule-item-actions">
                    <button class="schedule-action-btn timer" onclick="app.startTaskTimer(${item.id})" title="بدء مؤقت">
                        ⏱️
                    </button>
                    <button class="schedule-action-btn edit" onclick="app.editScheduleItem(${item.id})" title="تعديل">
                        ✏️
                    </button>
                    <button class="schedule-action-btn delete" onclick="app.deleteScheduleItemPro(${item.id})" title="حذف">
                        🗑️
                    </button>
                </div>
            </div>
        `;
    }

    getPriorityText(priority) {
        const texts = { high: 'عالي', medium: 'متوسط', low: 'منخفض' };
        return texts[priority] || priority;
    }

    updateProgress(completed, total) {
        const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
        document.getElementById('schedule-progress-text').textContent = `${completed}/${total} مواد`;
        document.getElementById('schedule-progress-percent').textContent = `${percent}%`;
        document.getElementById('schedule-progress-fill').style.width = `${percent}%`;
    }

    // إضافة مهمة جديدة متقدمة
    addScheduleItemPro() {
        this.showModal('➕ إضافة مادة جديدة', `
            <div class="modal-form-pro">
                <div class="form-group-pro">
                    <label>📚 اسم المادة *</label>
                    <input type="text" id="task-subject" class="form-input-pro" placeholder="مثال: الرياضيات" autofocus>
                </div>
                
                <div class="form-group-pro">
                    <label>⏰ وقت البدء *</label>
                    <input type="time" id="task-time" class="form-input-pro" value="${new Date().toTimeString().slice(0,5)}">
                </div>
                
                <div class="form-group-pro">
                    <label>⏱️ مدة المذاكرة (دقيقة)</label>
                    <input type="number" id="task-duration" class="form-input-pro" placeholder="30" min="5" max="180" value="30">
                </div>
                
                <div class="form-group-pro">
                    <label>🔥 مستوى الأولوية</label>
                    <div class="priority-selector">
                        <div class="priority-option" data-priority="high" onclick="app.selectPriority(this)">
                            🔥 عالي
                        </div>
                        <div class="priority-option selected" data-priority="medium" onclick="app.selectPriority(this)">
                            ⚡ متوسط
                        </div>
                        <div class="priority-option" data-priority="low" onclick="app.selectPriority(this)">
                            🌱 منخفض
                        </div>
                    </div>
                </div>
                
                <div class="form-group-pro">
                    <label>📝 ملاحظات (اختياري)</label>
                    <input type="text" id="task-notes" class="form-input-pro" placeholder="فصل، درس، إلخ...">
                </div>
                
                <button class="btn-primary-pro btn-full-pro" onclick="app.saveScheduleItem()">
                    <span>💾</span> حفظ المهمة
                </button>
            </div>
        `);
        
        // تخزين الأولوية المختارة
        this.selectedPriority = 'medium';
    }

    selectPriority(element) {
        document.querySelectorAll('.priority-option').forEach(el => el.classList.remove('selected'));
        element.classList.add('selected');
        this.selectedPriority = element.dataset.priority;
    }

    saveScheduleItem() {
        const subject = document.getElementById('task-subject').value.trim();
        const time = document.getElementById('task-time').value;
        const duration = parseInt(document.getElementById('task-duration').value) || 30;
        const notes = document.getElementById('task-notes').value.trim();
        
        if (!subject || !time) {
            this.showToast('❌ يرجى ملء جميع الحقول المطلوبة', 'error');
            return;
        }
        
        const newTask = {
            id: Date.now(),
            subject,
            time,
            duration,
            priority: this.selectedPriority || 'medium',
            notes,
            completed: false,
            createdAt: new Date().toISOString(),
            completedAt: null
        };
        
        this.data.schedule.push(newTask);
        this.saveData();
        this.renderSchedulePro();
        this.closeModal();
        this.showToast(`✅ تمت إضافة ${subject} بنجاح!`, 'success');
        
        // تشغيل صوت النجاح
        this.playSound('success');
    }

    // الدايرة الصغيرة للإكمال
    toggleScheduleComplete(id, buttonElement) {
        const item = this.data.schedule.find(s => s.id === id);
        if (!item) return;
        
        item.completed = !item.completed;
        item.completedAt = item.completed ? new Date().toISOString() : null;
        
        if (item.completed) {
            // مكافآت الإكمال
            const xp = item.duration ? Math.floor(item.duration / 5) : 10;
            const points = item.duration ? Math.floor(item.duration / 10) : 5;
            
            this.data.stats.points += points;
            this.addXP(xp);
            
            // تأثير الاحتفال
            this.playSound('complete');
            
            // إظهار XP المكتسب
            const xpBadge = document.createElement('div');
            xpBadge.className = 'xp-badge-float';
            xpBadge.textContent = `+${xp} XP`;
            buttonElement.parentElement.appendChild(xpBadge);
            
            setTimeout(() => xpBadge.remove(), 1000);
            
            this.showToast(`🎉 أكملت ${item.subject}! +${xp} XP +${points} نقطة`, 'success');
            
            // إشعار إذا اكتملت كل المهام
            const pending = this.data.schedule.filter(s => !s.completed).length;
            if (pending === 0) {
                setTimeout(() => {
                    this.showToast('🏆 مبروك! أكملت جميع مهام اليوم', 'success');
                    this.launchConfetti();
                }, 500);
            }
        }
        
        this.saveData();
        this.renderSchedulePro();
        this.renderStats();
    }

    // فلترة المهام
    filterSchedule(filter) {
        this.scheduleFilter = filter;
        
        // تحديث الأزرار
        document.querySelectorAll('.schedule-filter').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
        
        this.renderSchedulePro();
    }

    // مسح المهام المكتملة
    clearCompletedTasks() {
        const completed = this.data.schedule.filter(s => s.completed).length;
        if (completed === 0) {
            this.showToast('ℹ️ لا توجد مهام مكتملة للمسح', 'info');
            return;
        }
        
        if (confirm(`هل تريد مسح ${completed} مهمة مكتملة؟`)) {
            this.data.schedule = this.data.schedule.filter(s => !s.completed);
            this.saveData();
            this.renderSchedulePro();
            this.showToast(`🧹 تم مسح ${completed} مهمة`, 'success');
        }
    }

    // حذف مهمة
    deleteScheduleItemPro(id) {
        const item = this.data.schedule.find(s => s.id === id);
        if (!item) return;
        
        if (confirm(`هل تريد حذف "${item.subject}"؟`)) {
            this.data.schedule = this.data.schedule.filter(s => s.id !== id);
            this.saveData();
            this.renderSchedulePro();
            this.renderStats();
            this.showToast('🗑️ تم الحذف', 'info');
        }
    }

    // تعديل مهمة
    editScheduleItem(id) {
        const item = this.data.schedule.find(s => s.id === id);
        if (!item) return;
        
        this.showModal('✏️ تعديل المهمة', `
            <div class="modal-form-pro">
                <div class="form-group-pro">
                    <label>📚 اسم المادة</label>
                    <input type="text" id="edit-subject" class="form-input-pro" value="${item.subject}">
                </div>
                
                <div class="form-group-pro">
                    <label>⏰ وقت البدء</label>
                    <input type="time" id="edit-time" class="form-input-pro" value="${item.time}">
                </div>
                
                <div class="form-group-pro">
                    <label>⏱️ المدة (دقيقة)</label>
                    <input type="number" id="edit-duration" class="form-input-pro" value="${item.duration || 30}">
                </div>
                
                <div class="form-group-pro">
                    <label>📝 ملاحظات</label>
                    <input type="text" id="edit-notes" class="form-input-pro" value="${item.notes || ''}">
                </div>
                
                <button class="btn-primary-pro btn-full-pro" onclick="app.updateScheduleItem(${id})">
                    <span>💾</span> حفظ التغييرات
                </button>
            </div>
        `);
    }

    updateScheduleItem(id) {
        const item = this.data.schedule.find(s => s.id === id);
        if (!item) return;
        
        item.subject = document.getElementById('edit-subject').value.trim();
        item.time = document.getElementById('edit-time').value;
        item.duration = parseInt(document.getElementById('edit-duration').value) || 30;
        item.notes = document.getElementById('edit-notes').value.trim();
        
        this.saveData();
        this.renderSchedulePro();
        this.closeModal();
        this.showToast('✅ تم التحديث بنجاح', 'success');
    }

    // مؤقت للمهمة
    startTaskTimer(id) {
        const item = this.data.schedule.find(s => s.id === id);
        if (!item) return;
        
        if (item.completed) {
            this.showToast('⚠️ المهمة مكتملة بالفعل', 'warning');
            return;
        }
        
        // الانتقال لصفحة المؤقت مع تحميل وقت المهمة
        this.navigate('timer');
        
        // تعيين المؤقت
        const minutes = item.duration || 30;
        document.getElementById('timer-hours').value = 0;
        document.getElementById('timer-minutes').value = minutes;
        document.getElementById('timer-seconds').value = 0;
        
        this.setTimerMode('custom');
        this.showToast(`⏱️ تم تحميل مؤقت ${item.subject} (${minutes} دقيقة)`, 'info');
    }

    // قوالب جاهزة
    showScheduleTemplates() {
        this.showModal('📋 قوالب جاهزة', `
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <button class="btn-secondary-pro" onclick="app.applyTemplate('school')">
                    <span>🏫</span> يوم مدرسي (6 مواد)
                </button>
                <button class="btn-secondary-pro" onclick="app.applyTemplate('exam')">
                    <span>📝</span> يوم امتحان (4 مواد مركزة)
                </button>
                <button class="btn-secondary-pro" onclick="app.applyTemplate('light')">
                    <span>🌱</span> يوم خفيف (3 مواد)
                </button>
                <button class="btn-secondary-pro" onclick="app.applyTemplate('weekend')">
                    <span>🎯</span> weekend مراجعة (5 مواد)
                </button>
            </div>
        `);
    }

    applyTemplate(template) {
        const templates = {
            school: [
                { subject: 'الرياضيات', time: '08:00', duration: 45, priority: 'high' },
                { subject: 'اللغة العربية', time: '09:00', duration: 45, priority: 'medium' },
                { subject: 'العلوم', time: '10:00', duration: 45, priority: 'high' },
                { subject: 'اللغة الإنجليزية', time: '11:00', duration: 45, priority: 'medium' },
                { subject: 'الدراسات', time: '12:00', duration: 30, priority: 'low' },
                { subject: 'مراجعة عامة', time: '14:00', duration: 60, priority: 'medium' }
            ],
            exam: [
                { subject: 'مراجعة نهائية - مادة 1', time: '09:00', duration: 90, priority: 'high', notes: 'تركيز على الدروس الصعبة' },
                { subject: 'استراحة', time: '10:45', duration: 15, priority: 'low' },
                { subject: 'مراجعة نهائية - مادة 2', time: '11:00', duration: 90, priority: 'high' },
                { subject: 'استراحة غداء', time: '12:45', duration: 60, priority: 'low' },
                { subject: 'حل نماذج امتحانات', time: '14:00', duration: 120, priority: 'high' }
            ],
            light: [
                { subject: 'قراءة', time: '16:00', duration: 30, priority: 'medium' },
                { subject: 'مذاكرة خفيفة', time: '17:00', duration: 45, priority: 'low' },
                { subject: 'مراجعة سريعة', time: '18:00', duration: 30, priority: 'low' }
            ],
            weekend: [
                { subject: 'مراجعة الأسبوع', time: '10:00', duration: 60, priority: 'high' },
                { subject: 'تقوية نقاط الضعف', time: '11:30', duration: 60, priority: 'high' },
                { subject: 'استراحة', time: '13:00', duration: 30, priority: 'low' },
                { subject: 'حل تمارين إضافية', time: '14:00', duration: 90, priority: 'medium' },
                { subject: 'تخطيط الأسبوع القادم', time: '16:00', duration: 30, priority: 'low' }
            ]
        };
        
        const selected = templates[template];
        if (!selected) return;
        
        // إضافة المهام
        selected.forEach(task => {
            this.data.schedule.push({
                id: Date.now() + Math.random(),
                subject: task.subject,
                time: task.time,
                duration: task.duration,
                priority: task.priority,
                notes: task.notes || '',
                completed: false,
                createdAt: new Date().toISOString(),
                completedAt: null
            });
        });
        
        this.saveData();
        this.renderSchedulePro();
        this.closeModal();
        this.showToast(`📋 تم تطبيق قالب "${template}" بنجاح!`, 'success');
    }

    // ==================== NOTIFICATIONS ====================

    toggleNotifications() {
        this.data.settings.notifications = !this.data.settings.notifications;
        document.getElementById('notifications-icon').textContent = this.data.settings.notifications ? '🔔' : '🔕';
        
        if (this.data.settings.notifications) {
            this.requestNotificationPermission();
        }
        this.saveData();
    }

    requestNotificationPermission() {
        if ('Notification' in window) {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    this.showToast('✅ تم تفعيل الإشعارات', 'success');
                }
            });
        }
    }

    showNotification(title, body) {
        if (this.data.settings.notifications && 'Notification' in window && Notification.permission === 'granted') {
            new Notification(title, { body, icon: '🌱' });
        }
    }

    // ==================== USER MENU ====================

    toggleUserMenu() {
        // Simple dropdown or modal for user settings
        const options = ['👤 الملف الشخصي', '⚙️ الإعدادات', '🚪 تسجيل الخروج'];
        const choice = prompt('اختر:\n1. الملف الشخصي\n2. الإعدادات\n3. تسجيل الخروج');
        
        if (choice === '3') {
            this.logout();
        }
    }

    logout() {
        if (confirm('هل تريد تسجيل الخروج؟')) {
            this.data.user = {
                uid: null,
                name: 'زائر',
                email: null,
                avatar: '👤',
                isGuest: true
            };
            this.saveData();
            location.reload();
        }
    }

    showSettings() {
        this.showModal('⚙️ الإعدادات', `
            <div style="padding: 1rem;">
                <div style="margin-bottom: 1.5rem;">
                    <h4>المظهر</h4>
                    <div style="display: flex; gap: 0.5rem; margin-top: 0.5rem;">
                        <button class="btn-secondary-pro" onclick="app.setTheme('default')">افتراضي</button>
                        <button class="btn-secondary-pro" onclick="app.setTheme('forest')">غابة</button>
                        <button class="btn-secondary-pro" onclick="app.setTheme('ocean')">محيط</button>
                        <button class="btn-secondary-pro" onclick="app.setTheme('sunset')">غروب</button>
                    </div>
                </div>
                <div style="margin-bottom: 1.5rem;">
                    <h4>اللغة</h4>
                    <select class="auth-input" onchange="app.setLanguage(this.value)">
                        <option value="ar" selected>العربية</option>
                        <option value="en">English</option>
                    </select>
                </div>
                <button class="btn-primary-pro" onclick="app.closeModal()">حفظ</button>
            </div>
        `);
    }

    setTheme(theme) {
        this.data.settings.theme = theme;
        document.documentElement.setAttribute('data-theme', theme === 'default' ? (this.data.settings.darkMode ? 'dark' : 'light') : theme);
        this.saveData();
        this.showToast(`🎨 تم تغيير المظهر`, 'success');
    }

    setLanguage(lang) {
        this.data.settings.language = lang;
        this.saveData();
        this.showToast(`🌐 تم تغيير اللغة`, 'success');
    }

    // ==================== ADDITIONAL METHODS ====================

    showSignUp() {
        const email = document.getElementById('auth-email').value;
        const password = document.getElementById('auth-password').value;
        
        if (!email || !password) {
            this.showToast('أدخل البريد وكلمة المرور أولاً', 'warning');
            return;
        }

        if (this.auth) {
            this.auth.createUserWithEmailAndPassword(email, password)
                .then((result) => {
                    this.showToast('✅ تم إنشاء الحساب بنجاح!', 'success');
                    this.signInWithEmail();
                })
                .catch((error) => {
                    this.showToast('❌ خطأ: ' + error.message, 'error');
                });
        } else {
            this.showToast('Firebase غير متوفر', 'error');
        }
    }

    filterNotes(filter) {
        // Implementation for filtering notes
        document.querySelectorAll('.filter-btn-pro').forEach(btn => {
            btn.classList.toggle('active', btn.textContent.includes(filter === 'all' ? 'الكل' : filter === 'today' ? 'اليوم' : 'الأسبوع'));
        });
        
        // Filter logic here
        this.renderNotes();
    }
}

// Initialize Pro App when DOM is ready
window.addEventListener("load", function() {
    // Auto-hide loading after 5 seconds as fallback
    setTimeout(function() {
        const loader = document.querySelector(".loading-screen");
        if (loader && !loader.classList.contains('hidden')) {
            loader.style.opacity = "0";
            loader.style.transform = "scale(1.1)";
            loader.style.pointerEvents = "none";
            setTimeout(() => {
                loader.style.display = "none";
            }, 600);
        }
    }, 5000);
});

// Create global app instance
const app = new StudyAppPro();
