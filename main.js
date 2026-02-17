        // المتغيرات
        let timerInterval = null;
        let seconds = 25 * 60;
        let isRunning = false;
        let isPaused = false;
        let totalSeconds = 25 * 60;
        let selectedNoteColor = 'red';
        let userPoints = parseInt(localStorage.getItem('userPoints') || '0');
        let aiQuestionCount = parseInt(localStorage.getItem('aiQuestions') || '0');
        let conversationHistory = [];
        let userName = localStorage.getItem('userName') || '';
        let plantedTrees = JSON.parse(localStorage.getItem('plantedTrees') || '[]');
        
        // ألوان الملاحظات
        const noteColors = {
          red: { class: 'note-red', name: 'أحمر' },
          purple: { class: 'note-purple', name: 'بنفسجي' },
          teal: { class: 'note-teal', name: 'تركواز' },
          pink: { class: 'note-pink', name: 'وردي' },
          yellow: { class: 'note-yellow', name: 'أصفر' },
          blue: { class: 'note-blue', name: 'أزرق' },
          green: { class: 'note-green', name: 'أخضر' },
          orange: { class: 'note-orange', name: 'برتقالي' }
        };
        
        // بيانات المتجر
        const treeShop = [
          { id: 1, icon: '🌲', name: 'شجرة الصنوبر', cost: 30, description: 'شجرة خضراء جميلة', type: 'pine' },
          { id: 2, icon: '🌳', name: 'شجرة البلوط', cost: 50, description: 'شجرة قوية وكبيرة', type: 'normal' },
          { id: 3, icon: '🌴', name: 'نخلة', cost: 80, description: 'نخلة استوائية رائعة', type: 'palm' },
          { id: 4, icon: '🎄', name: 'شجرة عيد الميلاد', cost: 100, description: 'شجرة مميزة وجميلة', type: 'pine' },
          { id: 5, icon: '🌵', name: 'صبار', cost: 60, description: 'نبات صبار صحراوي', type: 'cactus' },
          { id: 6, icon: '🌸', name: 'شجرة الكرز', cost: 150, description: 'شجرة وردية رائعة', type: 'normal' },
          { id: 7, icon: '🌺', name: 'شجرة الهيبسكوس', cost: 200, description: 'أزهار حمراء جميلة', type: 'normal' },
          { id: 8, icon: '🌻', name: 'عباد الشمس', cost: 120, description: 'زهرة مشمسة مبهجة', type: 'normal' }
        ];
        
        // الأسئلة الشائعة
        const faqData = [
          { q: "هل ممكن أغير شعبة بعد ما بدأت الدراسة؟", a: "نعم، يمكن تغيير الشعبة في أول أسبوعين من بداية العام الدراسي، لكن يحتاج موافقة إدارة المدرسة وتوفر مكان في الشعبة المراد الانتقال إليها." },
          { q: "الرياضيات صعبة، هل أقدر أنجح فيها؟", a: "بالتأكيد! الرياضيات تحتاج ممارسة يومية وليس ذكاء خارق. حل مسائل يومياً حتى لو قليلة، ولا تخف من الخطأ - كل خطأ هو خطوة للتعلم." },
          { q: "هل المجموعات ضرورية للنجاح؟", a: "المجموعات مفيدة لكنها ليست ضرورية. بعض الطلاب يفضلون الدراسة الفردية. اختر ما يناسبك، المهم الاستمرارية والفهم." },
          { q: "كيف أذاكر وأنا مشغول بمواقع التواصل؟", a: "استخدم تقنية البومودورو (25 دقيقة تركيز + 5 دقائق راحة). ضع هاتفك في وضع الطيران أو بعيداً عنك أثناء المذاكرة." },
          { q: "هل النوم مهم قبل الامتحان؟", a: "النوم ضروري جداً! الدماغ يحتاج 7-8 ساعات لترتيب المعلومات. السهر يؤدي للنسيان والتوتر." },
          { q: "ماذا أفعل لو أحسست بضغط نفسي؟", a: "تكلم مع شخص تثق به، مارس رياضة خفيفة، خذ نفس عميق، ولا تتردد في طلب المساعدة من مرشد أو طبيب نفسي." },
          { q: "هل المذاكرة في الصباح أفضل أم في الليل؟", a: "هذا يختلف من شخص لآخر. جرب كلا الوقتين واكتشف متى تركيزك يكون أفضل. معظم الناس يكون تركيزهم أعلى في الصباح." },
          { q: "كيف أحفظ المعلومات بسرعة؟", a: "استخدم خرائط الذهنية، اشرح المعلومة لشخص آخر، ربطها بأشياء تعرفها، وراجعها بعد يوم وأسبوع وشهر." },
          { q: "هل الامتحانات التجريبية مهمة؟", a: "نعم جداً! تعطيك فكرة عن مستواك وتعوّدك على ضغط الامتحان. حلل أخطاءك فيها ولا تركز فقط على الدرجة." },
          { q: "ماذا لو رسبت في امتحان؟", a: "الرسوب ليس نهاية العالم! حلل أسبابه، تعلم منه، واستمر. كثير من الناجحين مرّوا بسقطات سابقة." },
          { q: "كيف أختار تخصصي الجامعي؟", a: "فكر في: ماذا تحب؟ ما هو ميولك؟ استشر أهل الاختصاص، واقرأ عن التخصصات. لا تختار فقط بناءً على الظروف المادية." },
          { q: "هل الثانوية العامة تحدد مستقبلي؟", a: "لا! الثانوية خطوة مهمة لكنها ليست الحاسمة. فيه طرق كثيرة للنجاح: المعاهد، الكليات الخاصة، الدراسة في الخارج، أو حتى العمل الحر." },
          { q: "كيف أتعامل مع توقعات أهلي العالية؟", a: "تكلم معهم بوضوح عن قدراتك وأهدافك. اشرح أنك تبذل قصارى جهدك. النجاح ليس فقط في الدرجات بل في التطور الشخصي." },
          { q: "هل الأكل الصحي يؤثر على المذاكرة؟", a: "نعم! تناول سمك، مكسرات، فواكه، وخضروات. تجنب الوجبات السريعة والسكريات الكثيرة التي تسبب الخمول." },
          { q: "هل الرياضة تضيع وقت المذاكرة؟", a: "عكس ذلك! الرياضة 30 دقيقة يومياً تحسن التركيز وتقلل التوتر وتنشط الدماغ. هي استثمار وليست ضياع وقت." },
          { q: "ماذا أفعل في يوم الامتحان؟", a: "نام جيداً، تناول إفطار خفيف، وصل مبكراً، خذ نفس عميق، اقرأ الأسئلة كلها أولاً، وابدأ بالسهل." },
          { q: "كيف أذاكر عندما لا أجد دافعاً؟", a: "اقسم المهام لقطع صغيرة، كافئ نفسك بعد كل إنجاز، تذكر هدفك، غيّر مكان المذاكرة، أو درس مع صديق." },
          { q: "هل الدروس الخصوصية ضرورية؟", a: "للجميع. بعض الطلاب يحتاجونها، البعض لا. إذا فهمت في المدرسة وتحلل تمارين، قد لا تحتاجها. قرار شخصي." },
          { q: "ما سر النجاح في الثانوية العامة؟", a: "الاستمرارية + التنظيم + الثقة بالنفس. ذاكر يومياً ولو قليلاً، نظم وقتك، وثق أنك قادر. النجاح رحلة وليس وجهة." }
        ];
        
        // جمل تحفيزية
        const motivationalQuotes = [
          "🌟 أحسنت! أنت تقترب من هدفك خطوة بخطوة!",
          "💪 رائع! استمر هكذا وستصل إلى القمة!",
          "🎯 ممتاز! كل مادة تنهيها هي انتصار جديد!",
          "🔥 أنت نجم! لا تتوقف الآن، النجاح قريب!",
          "✨ رائع! ثقتك بنفسك تزداد مع كل إنجاز!",
          "🚀 استمر! أنت تبني مستقبلك بيديك!",
          "💫 مذهل! أنت أقوى مما تتخيل!",
          "🏆 بطل! كل جهد اليوم مكافأة غداً!",
          "🌈 رائع! الطريق للنجاح يبدأ بخطوة واحدة!",
          "⭐ أنت الأفضل! استمر في التألق!"
        ];
        
        // AI
        const basemAI = {
          greetings: [
            "أهلاً وسهلاً! 🌟 أنا باسم، مساعدك الدراسي الشخصي. كيف حالك اليوم؟",
            "مرحباً! 👋 سعيد بوجودك هنا. شنو اللي يجي في بالك؟",
            "أهلاً بيك! 🎓 جاهز أساعدك في أي شيء يخص دراستك أو حتى لو بس تحب تتكلم!"
          ]
        };
        
        const knowledgeBase = {
          'مرحبا|أهلا|سلام|هاي|هلا': {
            responses: ["أهلاً وسهلاً! 🌟 أنا باسم، مساعدك الدراسي. كيف حالك اليوم؟", "مرحباً! 👋 سعيد بوجودك هنا. شنو اللي يجي في بالك؟"]
          },
          'اسمي|انا اسمي|ناديني': {
            action: (msg) => {
              const name = msg.replace(/(اسمي|انا اسمي|ناديني|اكلمني باسم)/, '').trim();
              if (name && name.length > 1) {
                userName = name;
                localStorage.setItem('userName', userName);
                return `🎉 أهلاً يا ${userName}! سعيد بمعرفتك.`;
              }
              return "قل لي اسمك الحلو! 😊";
            }
          },
          'كيف حالك|شلونك': {
            responses: ["أنا بخير الحمدلله! 🌟 وأنت كيف حالك؟ جاهز للمذاكرة؟", "تمام والحمدلله! 💪 بس المهم حالك أنت..."]
          },
          'خايف|خوف|قلق|توتر|امتحان': {
            responses: ["خوفك طبيعي! 🫂 حتى الأوائل يخافون. حول الخوف لطاقة إيجابية. خذ نفس عميق 10 مرات وثق بنفسك! 💪"]
          },
          'طاقة|كسل|تعب|ملل': {
            responses: ["فقدان الطاقة طبيعي! 🔋 نام 20 دقيقة، اشرب ماء، تحرك 10 دقائق. أول خطوة هي الأصعب! 🚀"]
          },
          'فاشل|فشل|يأس|احباط': {
            responses: ["أوقف! 🛑 لا تسمي نفسك فاشل! كل ناجح مر بفشل. أنت قادر، بس محتاج وقت! 💫"]
          },
          'نصيحة|نجاح|تحفيز': {
            responses: ["نصيحتي الذهبية: 🏆 الاستمرارية تغلب الذكاء! ذاكر يومياً ولو نصف ساعة. النجاح رحلة! 🚀"]
          },
          'نكتة|ضحك': {
            responses: ["هههه 😂 دكتور: ليش ما جبت الواجب؟ طالب: كلبي أكله! دكتور: وأنت عندك كلب؟ طالب: لا، لهذا ما جبت الواجب! 😅"]
          },
          'مذاكرة|ذاكر|فهم|حفظ': {
            responses: ["📚 ذاكر 25 دقيقة + 5 دقائق راحة. اكتب ملاحظات بيدك واسأل نفسك 'هل فهمت؟' 🎯"]
          },
          'نوم|صحة|اكل': {
            responses: ["💤 النوم 7-8 ساعات ضروري! الدماغ يرتب الذكريات أثناء النوم. لا تضحي بنومك! 🌙"]
          },
          'الله|صلاة|قرآن|دعاء': {
            responses: ["🤲 'وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ'. اجتهد وتوكل على الله! 🌟"]
          },
          default: ["🤔 سؤال ممتاز! كل تجربة دراسية فريدة. جرب تطبيق النصائح وأنا هنا للمساعدة! 💬"]
        };
        
        // التنقل
        function showPage(pageId) {
          document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
          document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
          
          document.getElementById(pageId).classList.add('active');
          
          const buttons = document.querySelectorAll('.nav-btn');
          const pageIndex = ['home', 'timer', 'shop', 'faq', 'notes', 'ai'].indexOf(pageId);
          if (pageIndex !== -1) buttons[pageIndex].classList.add('active')
          ;
          
          if (pageId === 'ai' && conversationHistory.length === 0) initializeChat();
          if (pageId === 'shop') renderShop();
          if (pageId === 'faq') renderFAQ();
          if (pageId === 'notes') loadStickyNotes();
        }
        
        // الوضع الليلي
        function toggleDarkMode() {
          document.body.classList.toggle('dark-mode');
          const isDark = document.body.classList.contains('dark-mode');
          localStorage.setItem('darkMode', isDark);
          document.getElementById('darkModeToggle').textContent = isDark ? '☀️' : '🌙';
        }
        
        // AI
        function initializeChat() {
          const chat = document.getElementById('aiChat');
          chat.innerHTML = '';
          const greeting = basemAI.greetings[Math.floor(Math.random() * basemAI.greetings.length)];
          addMessage(greeting, 'bot');
          
          if (!userName) {
            setTimeout(() => addMessage("ما اسمك؟ حاب أعرف عشان أخاطبك بشكل أقرب! 😊", 'bot'), 800);
          } else {
            setTimeout(() => addMessage(`أهلاً مجدداً يا ${userName}! 🎉 جاهز نكمل رحلتك الدراسية؟`, 'bot'), 800);
          }
        }
        
        function handleKeyPress(event) {
          if (event.key === 'Enter') {
            event.preventDefault();
            sendMessage();
          }
        }
        
        function sendSuggestion(text) {
          document.getElementById('aiInput').value = text;
          sendMessage();
        }
        
        function sendMessage() {
          const input = document.getElementById('aiInput');
          const message = input.value.trim();
          if (!message) return;
          
          addMessage(message, 'user');
          conversationHistory.push(message);
          input.value = '';
          
          document.getElementById('aiTyping').classList.add('active');
          document.getElementById('aiSendBtn').disabled = true;
          
          setTimeout(() => {
            const response = generateSmartResponse(message);
            document.getElementById('aiTyping').classList.remove('active');
            addMessage(response, 'bot');
            conversationHistory.push(response);
            document.getElementById('aiSendBtn').disabled = false;
            
            aiQuestionCount++;
            localStorage.setItem('aiQuestions', aiQuestionCount);
            document.getElementById('aiQuestions').textContent = aiQuestionCount;
          }, 1000 + Math.random() * 1500);
        }
        
        function generateSmartResponse(message) {
          const lowerMsg = message.toLowerCase();
          
          for (let pattern in knowledgeBase) {
            if (pattern === 'default') continue;
            const keywords = pattern.split('|');
            for (let keyword of keywords) {
              if (lowerMsg.includes(keyword.toLowerCase())) {
                const item = knowledgeBase[pattern];
                if (item.action) return item.action(message);
                let response = item.responses[Math.floor(Math.random() * item.responses.length)];
                if (userName && Math.random() > 0.3) response = `يا ${userName}، ` + response;
                return response;
              }
            }
          }
          
          let response = knowledgeBase.default[0];
          if (userName) response = `يا ${userName}، ` + response;
          return response;
        }
        
        function addMessage(text, sender) {
          const chat = document.getElementById('aiChat');
          const msgDiv = document.createElement('div');
          msgDiv.className = `ai-message ${sender}`;
          let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong style="color: var(--ai);">$1</strong>').replace(/\n/g, '<br>');
          const time = new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
          msgDiv.innerHTML = formattedText + `<div class="message-time">${time}</div>`;
          chat.appendChild(msgDiv);
          chat.scrollTop = chat.scrollHeight;
        }
        
        function clearChat() {
          if (confirm('هل تريد مسح المحادثة؟')) {
            conversationHistory = [];
            initializeChat();
            showNotification('🗑️ تم مسح المحادثة');
          }
        }
        
        function saveChat() {
          let chatText = "محادثة مع باسم AI\n==================\n\n";
          for (let i = 0; i < conversationHistory.length; i++) {
            chatText += (i % 2 === 0 ? "أنت: " : "باسم: ") + conversationHistory[i] + "\n\n";
          }
          const blob = new Blob([chatText], { type: 'text/plain' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `محادثة_باسم_${new Date().toLocaleDateString('ar-EG')}.txt`;
          a.click();
          showNotification('💾 تم حفظ المحادثة');
        }
        
        function showHelp() {
          addMessage("🤖 اكتب أي سؤال أو مشاعرك بحرية. أسأل عن: مذاكرة، تحفيز، صحة، دين، ترفيه. أنا هنا لدعمك! 💪", 'bot');
        }
        
        // ==================== المفكرة بأوراق مربعة ====================
        function selectNoteColor(btn, color) {
          document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');
          selectedNoteColor = color;
        }
        
        function addStickyNote() {
          const input = document.getElementById('noteInput');
          const text = input.value.trim();
          
          if (!text) {
            showNotification('⚠️ اكتب ملاحظة أولاً!');
            return;
          }
          
          const notes = JSON.parse(localStorage.getItem('stickyNotes') || '[]');
          const newNote = {
            id: Date.now(),
            text: text,
            color: selectedNoteColor,
            date: new Date().toLocaleString('ar-EG', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })
          };
          
          notes.unshift(newNote);
          localStorage.setItem('stickyNotes', JSON.stringify(notes));
          
          input.value = '';
          loadStickyNotes();
          updateStats();
          showNotification('✅ تمت إضافة الملاحظة بنجاح!');
        }
        
        function loadStickyNotes() {
          const notes = JSON.parse(localStorage.getItem('stickyNotes') || '[]');
          const grid = document.getElementById('notesGrid');
          const emptyMsg = document.getElementById('emptyNotes');
          
          if (notes.length === 0) {
            grid.innerHTML = '';
            emptyMsg.style.display = 'block';
            return;
          }
          
          emptyMsg.style.display = 'none';
          grid.innerHTML = notes.map(note => {
            const colorClass = noteColors[note.color].class;
            return `
                    <div class="sticky-note ${colorClass}">
                        <div class="pin"></div>
                        <div class="note-content">${escapeHtml(note.text)}</div>
                        <div class="note-footer">
                            <span class="note-date">📅 ${note.date}</span>
                            <button class="note-delete-btn" onclick="deleteStickyNote(${note.id})" title="حذف">🗑️</button>
                        </div>
                    </div>
                `;
          }).join('');
        }
        
        function deleteStickyNote(id) {
          if (!confirm('هل تريد حذف هذه الملاحظة؟')) return;
          
          let notes = JSON.parse(localStorage.getItem('stickyNotes') || '[]');
          notes = notes.filter(n => n.id !== id);
          localStorage.setItem('stickyNotes', JSON.stringify(notes));
          
          loadStickyNotes();
          updateStats();
          showNotification('🗑️ تم حذف الملاحظة');
        }
        
        function escapeHtml(text) {
          return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;")
            .replace(/\n/g, '<br>');
        }
        
        // المؤقت
        function updateTimerDisplay() {
          const hours = Math.floor(seconds / 3600);
          const mins = Math.floor((seconds % 3600) / 60);
          const secs = seconds % 60;
          document.getElementById('timerDisplay').textContent =
            `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
          document.getElementById('timerProgress').style.width = `${(seconds / totalSeconds) * 100}%`;
        }
        
        document.getElementById('startTimer').addEventListener('click', () => {
          if (isRunning) return;
          
          if (!isPaused) {
            const hours = parseInt(document.getElementById('hoursInput').value) || 0;
            const minutes = parseInt(document.getElementById('minutesInput').value) || 0;
            const secs = parseInt(document.getElementById('secondsInput').value) || 0;
            seconds = (hours * 3600) + (minutes * 60) + secs;
            totalSeconds = seconds;
          }
          
          isRunning = true;
          isPaused = false;
          document.getElementById('startTimer').style.display = 'none';
          document.getElementById('pauseTimer').style.display = 'inline-block';
          
          timerInterval = setInterval(() => {
            seconds--;
            updateTimerDisplay();
            if (seconds <= 0) {
              clearInterval(timerInterval);
              isRunning = false;
              completeSession();
            }
          }, 1000);
        });
        
        document.getElementById('pauseTimer').addEventListener('click', () => {
          clearInterval(timerInterval);
          isRunning = false;
          isPaused = true;
          document.getElementById('startTimer').style.display = 'inline-block';
          document.getElementById('pauseTimer').style.display = 'none';
          document.getElementById('startTimer').textContent = '▶️ استئناف';
        });
        
        document.getElementById('resetTimer').addEventListener('click', () => {
          clearInterval(timerInterval);
          isRunning = false;
          isPaused = false;
          const hours = parseInt(document.getElementById('hoursInput').value) || 0;
          const minutes = parseInt(document.getElementById('minutesInput').value) || 0;
          const secs = parseInt(document.getElementById('secondsInput').value) || 0;
          seconds = (hours * 3600) + (minutes * 60) + secs;
          totalSeconds = seconds;
          updateTimerDisplay();
          document.getElementById('startTimer').style.display = 'inline-block';
          document.getElementById('pauseTimer').style.display = 'none';
          document.getElementById('startTimer').textContent = '▶️ بدء';
        });
        
        function completeSession() {
          const hours = Math.floor(totalSeconds / 3600);
          const minutes = Math.floor((totalSeconds % 3600) / 60);
          const totalMinutes = hours * 60 + minutes;
          
          const earnedPoints = totalMinutes;
          userPoints += earnedPoints;
          localStorage.setItem('userPoints', userPoints);
          
          let totalStudyMinutes = parseInt(localStorage.getItem('totalStudyMinutes') || '0') + totalMinutes;
          localStorage.setItem('totalStudyMinutes', totalStudyMinutes);
          
          let sessionCount = parseInt(localStorage.getItem('sessionCount') || '0') + 1;
          localStorage.setItem('sessionCount', sessionCount);
          
          document.getElementById('timerPoints').textContent = userPoints;
          document.getElementById('userPointsDisplay').textContent = userPoints;
          document.getElementById('shopPoints').textContent = userPoints;
          document.getElementById('sessionCount').textContent = sessionCount;
          document.getElementById('totalStudyMinutes').textContent = totalStudyMinutes;
          document.getElementById('gardenMinutes').textContent = totalStudyMinutes;
          
          document.getElementById('startTimer').style.display = 'inline-block';
          document.getElementById('pauseTimer').style.display = 'none';
          document.getElementById('startTimer').textContent = '▶️ بدء';
          
          showNotification(`🎉 أحسنت! أكملت ${totalMinutes} دقيقة وربحت ${earnedPoints} نقطة!`);
          updateStats();
        }
        
        // المتجر
        function renderShop() {
          const grid = document.getElementById('shopGrid');
          grid.innerHTML = '';
          
          treeShop.forEach(tree => {
            const isOwned = plantedTrees.some(t => t.id === tree.id);
            const canAfford = userPoints >= tree.cost;
            
            const item = document.createElement('div');
            item.className = `tree-item ${!canAfford && !isOwned ? 'locked' : ''}`;
            item.innerHTML = `
                    <div class="tree-icon">${tree.icon}</div>
                    <div class="tree-name">${tree.name}</div>
                    <div style="font-size: 0.9rem; color: #666; margin-bottom: 10px;">${tree.description}</div>
                    ${isOwned ? 
                        '<div class="tree-owned">✅ تم الشراء</div>' : 
                        `<div class="tree-cost">⭐ ${tree.cost}</div>
                        <button class="btn ${canAfford ? 'btn-success' : 'btn-secondary'}" 
                            onclick="buyTree(${tree.id})" ${!canAfford ? 'disabled' : ''}>
                            ${canAfford ? '🛒 شراء' : '❌ النقاط غير كافية'}
                        </button>`
                    }
                `;
            grid.appendChild(item);
          });
        }
        
        function buyTree(treeId) {
          const tree = treeShop.find(t => t.id === treeId);
          if (!tree || userPoints < tree.cost) {
            showNotification('❌ النقاط غير كافية!');
            return;
          }
          
          if (plantedTrees.some(t => t.id === treeId)) {
            showNotification('❌ لقد اشتريت هذه الشجرة مسبقاً!');
            return;
          }
          
          userPoints -= tree.cost;
          localStorage.setItem('userPoints', userPoints);
          
          const newTree = {
            ...tree,
            position: calculateTreePosition(),
            date: new Date().toLocaleDateString('ar-EG')
          };
          plantedTrees.push(newTree);
          localStorage.setItem('plantedTrees', JSON.stringify(plantedTrees));
          
          document.getElementById('timerPoints').textContent = userPoints;
          document.getElementById('userPointsDisplay').textContent = userPoints;
          document.getElementById('shopPoints').textContent = userPoints;
          
          renderShop();
          renderGarden();
          showNotification(`🌳 مبروك! اشتريت ${tree.name} بنجاح!`);
          updateStats();
        }
        
        // حساب موضع الشجرة المنظم
        function calculateTreePosition() {
          const treeCount = plantedTrees.length;
          const maxPerRow = 5;
          const row = Math.floor(treeCount / maxPerRow);
          const col = treeCount % maxPerRow;
          
          // توزيع منظم على صفوف
          const baseX = 15 + (col * 17); // 15% بداية، 17% مسافة بين كل شجرة
          const baseY = 60 + (row * 15); // 60% بداية من الأسفل
          
          // إضافة بعض العشوائية الخفيفة للطبيعية
          const randomX = (Math.random() - 0.5) * 5;
          const randomY = (Math.random() - 0.5) * 3;
          
          return {
            x: Math.max(10, Math.min(90, baseX + randomX)),
            y: Math.max(50, Math.min(85, baseY + randomY))
          };
        }
        
        // الحديقة الواقعية المنظمة
        function renderGarden() {
          const ground = document.getElementById('gardenGround');
          const emptyMsg = document.getElementById('emptyGarden');
          
          // إزالة الأشجار القديمة فقط (keeping hills and layers)
          ground.querySelectorAll('.tree').forEach(t => t.remove());
          
          if (plantedTrees.length === 0) {
            emptyMsg.classList.remove('hidden');
            emptyMsg.style.display = 'block';
          } else {
            emptyMsg.style.display = 'none';
            
            plantedTrees.forEach((tree, index) => {
              const treeEl = document.createElement('div');
              treeEl.className = `tree tree-${tree.type} tree-sway`;
              treeEl.style.left = `${tree.position.x}%`;
              treeEl.style.bottom = `${100 - tree.position.y}%`;
              treeEl.style.animationDelay = `${index * 0.2}s`;
              treeEl.style.zIndex = Math.floor(tree.position.y);
              
              // بناء الشجرة حسب النوع
              if (tree.type === 'palm') {
                treeEl.innerHTML = `
                            <div class="tree-foliage">
                                <div class="foliage-layer" style="transform: rotate(-30deg); top: 10px; left: -10px;"></div>
                                <div class="foliage-layer" style="transform: rotate(-10deg); top: 0px; left: 0px;"></div>
                                <div class="foliage-layer" style="transform: rotate(10deg); top: 0px; left: 20px;"></div>
                                <div class="foliage-layer" style="transform: rotate(30deg); top: 10px; left: 30px;"></div>
                                <div class="foliage-layer" style="transform: rotate(0deg); top: -5px; left: 10px; width: 30px;"></div>
                            </div>
                            <div class="tree-trunk"></div>
                        `;
              } else if (tree.type === 'pine') {
                treeEl.innerHTML = `
                            <div class="tree-foliage">
                                <div class="foliage-layer"></div>
                                <div class="foliage-layer"></div>
                                <div class="foliage-layer"></div>
                            </div>
                            <div class="tree-trunk" style="height: 30px;"></div>
                        `;
              } else if (tree.type === 'cactus') {
                treeEl.innerHTML = `
                            <div style="position: relative; width: 40px; height: 60px;">
                                <div style="position: absolute; bottom: 0; left: 15px; width: 10px; height: 40px; background: linear-gradient(to right, #2e7d32, #4caf50, #2e7d32); border-radius: 5px;"></div>
                                <div style="position: absolute; bottom: 20px; left: 5px; width: 15px; height: 8px; background: linear-gradient(to right, #2e7d32, #4caf50); border-radius: 5px;"></div>
                                <div style="position: absolute; bottom: 25px; right: 5px; width: 12px; height: 6px; background: linear-gradient(to right, #2e7d32, #4caf50); border-radius: 5px;"></div>
                            </div>
                        `;
              } else {
                // شجرة عادية
                treeEl.innerHTML = `
                            <div class="tree-foliage">
                                <div class="foliage-layer"></div>
                                <div class="foliage-layer"></div>
                                <div class="foliage-layer"></div>
                            </div>
                            <div class="tree-trunk"></div>
                        `;
              }
              
              ground.appendChild(treeEl);
            });
          }
          
          document.getElementById('gardenTreeCount').textContent = plantedTrees.length;
          document.getElementById('totalTrees').textContent = plantedTrees.length;
        }
        
        // الأسئلة الشائعة
        function renderFAQ() {
          const container = document.getElementById('faqContainer');
          container.innerHTML = '';
          
          faqData.forEach((item, index) => {
            const faqItem = document.createElement('div');
            faqItem.className = 'faq-item';
            faqItem.innerHTML = `
                    <div class="faq-question" onclick="toggleFAQ(${index})">
                        <span>${index + 1}. ${item.q}</span>
                        <span class="faq-toggle" id="faq-toggle-${index}">▼</span>
                    </div>
                    <div class="faq-answer" id="faq-answer-${index}">
                        ${item.a}
                    </div>
                `;
            container.appendChild(faqItem);
          });
        }
        
        function toggleFAQ(index) {
          const answer = document.getElementById(`faq-answer-${index}`);
          const toggle = document.getElementById(`faq-toggle-${index}`);
          
          answer.classList.toggle('show');
          toggle.classList.toggle('rotate');
        }
        
        // الجدول الدراسي
        function addRow() {
          const tbody = document.getElementById('tableBody');
          const row = document.createElement('tr');
          row.innerHTML = `
                <td><div class="complete-circle" onclick="toggleComplete(this)"></div></td>
                <td><input type="text" placeholder="مثال: الرياضيات" onchange="saveData()"></td>
                <td><input type="time" onchange="saveData()"></td>
                <td><textarea placeholder="أهداف اليوم..." onchange="saveData()"></textarea></td>
                <td><button class="btn btn-danger" onclick="deleteRow(this)">حذف</button></td>
            `;
          tbody.appendChild(row);
          updateEmptyState();
          saveData();
          updateStats();
        }
        
        function deleteRow(btn) {
          btn.closest('tr').remove();
          updateEmptyState();
          saveData();
          updateStats();
        }
        
        function toggleComplete(circle) {
          circle.classList.toggle('checked');
          const row = circle.closest('tr');
          row.classList.toggle('subject-completed');
          
          if (circle.classList.contains('checked')) {
            const quote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
            showMotivation(quote);
          }
          
          saveData();
        }
        
        function showMotivation(text) {
          document.getElementById('motivationText').textContent = text;
          document.getElementById('overlay').classList.add('show');
          document.getElementById('motivationPopup').classList.add('show');
        }
        
        function closeMotivation() {
          document.getElementById('overlay').classList.remove('show');
          document.getElementById('motivationPopup').classList.remove('show');
        }
        
        function updateEmptyState() {
          const tbody = document.getElementById('tableBody');
          document.getElementById('emptyState').classList.toggle('hidden', tbody.children.length > 0);
        }
        
        function saveData() {
          const rows = [];
          document.querySelectorAll('#tableBody tr').forEach(row => {
            rows.push({
              completed: row.querySelector('.complete-circle').classList.contains('checked'),
              subject: row.cells[1].querySelector('input').value,
              time: row.cells[2].querySelector('input').value,
              notes: row.cells[3].querySelector('textarea').value
            });
          });
          localStorage.setItem('scheduleData', JSON.stringify(rows));
        }
        
        function loadData() {
          const data = JSON.parse(localStorage.getItem('scheduleData') || '[]');
          const tbody = document.getElementById('tableBody');
          tbody.innerHTML = '';
          data.forEach(item => {
            const row = document.createElement('tr');
            if (item.completed) row.classList.add('subject-completed');
            row.innerHTML = `
                    <td><div class="complete-circle ${item.completed ? 'checked' : ''}" onclick="toggleComplete(this)"></div></td>
                    <td><input type="text" value="${item.subject || ''}" placeholder="مثال: الرياضيات" onchange="saveData()"></td>
                    <td><input type="time" value="${item.time || ''}" onchange="saveData()"></td>
                    <td><textarea placeholder="أهداف اليوم..." onchange="saveData()">${item.notes || ''}</textarea></td>
                    <td><button class="btn btn-danger" onclick="deleteRow(this)">حذف</button></td>
                `;
            tbody.appendChild(row);
          });
          updateEmptyState();
        }
        
        // الإحصائيات والإشعارات
        function updateStats() {
          document.getElementById('totalSubjects').textContent = document.querySelectorAll('#tableBody tr').length;
          document.getElementById('totalNotes').textContent = JSON.parse(localStorage.getItem('stickyNotes') || '[]').length;
          document.getElementById('totalTrees').textContent = plantedTrees.length;
          document.getElementById('aiQuestions').textContent = aiQuestionCount;
          document.getElementById('userPointsDisplay').textContent = userPoints;
          document.getElementById('timerPoints').textContent = userPoints;
          document.getElementById('shopPoints').textContent = userPoints;
        }
        
        function showNotification(message) {
          const notif = document.getElementById('notification');
          notif.textContent = message;
          notif.classList.remove('hidden');
          setTimeout(() => notif.classList.add('hidden'), 4000);
        }
        
        // التهيئة
        document.getElementById('addRowBtn').addEventListener('click', addRow);
        
        if (localStorage.getItem('darkMode') === 'true') {
          document.body.classList.add('dark-mode');
          document.getElementById('darkModeToggle').textContent = '☀️';
        }
        
        // اقتباس عشوائي
        const quotes = [
          "النجاح لا يأتي من الراحة، بل من المثابرة.",
          "ثانويتك فرصتك لبناء مستقبلك، لا تضيّعها.",
          "كل دقيقة مذاكرة الآن = ساعة راحة لاحقاً.",
          "الذكاء هو ما تصنعه من مجهودك، لا ما تولد به.",
          "اصبر تُجبر، واجتهادك لن يضيع سدى."
        ];
        document.getElementById('motivQuote').textContent = quotes[Math.floor(Math.random() * quotes.length)];
        
        // تحميل البيانات
        loadData();
        loadStickyNotes();
        renderGarden();
        updateStats();
        
        document.getElementById('sessionCount').textContent = localStorage.getItem('sessionCount') || '0';
        document.getElementById('totalStudyMinutes').textContent = localStorage.getItem('totalStudyMinutes') || '0';
        document.getElementById('gardenMinutes').textContent = localStorage.getItem('totalStudyMinutes') || '0';
        updateTimerDisplay();