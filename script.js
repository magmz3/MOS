/**
 * خلط (Shuffle) مصفوفة الأسئلة باستخدام خوارزمية Fisher-Yates.
 * @param {Array} array - مصفوفة الأسئلة المراد خلطها.
 * @returns {Array} مصفوفة جديدة بالترتيب العشوائي.
*/
function shuffleArray(array) {
    // إنشاء نسخة من المصفوفة الأصلية لتجنب تعديلها
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        // اختيار رقم عشوائي بين 0 و i
        const j = Math.floor(Math.random() * (i + 1));
        // تبديل العنصر الحالي مع العنصر العشوائي
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}


// 💎 الثابت الخاص بكلمة السر المطلوبة للبدء
const SECRET_PIN = '120'; // ⬅️ يمكنك تغيير '120' إلى أي كلمة سر ترغب بها


// ======================================================
// 🚩 1. قاعدة البيانات: الأسئلة (يمكنك إضافة 25 سؤالاً هنا)
// ملاحظة: كل سؤال يجب أن يحتوي على الخيارات الأربعة، والاجابة الصحيحة هي النص المباشر
// ======================================================
const quizData = 
[
    {
        question: "أنا لدي مدن ولكن لا بيوت، وأنهار ولكن لا ماء، وجبال ولكن لا صخور. فمن أنا؟",
        options: ["الأساطير", "القصص الخيالية", "الخريطة", "الأحلام"],
        correctAnswer: "الخريطة"
    },
	
    {
        question: "ما الشيء الذي كلما أخذت منه، كبُر؟",
        options: ["النار", "الحفرة", "الزمن", "القوة"],
        correctAnswer: "الحفرة"
    },

    {
        question: "أنا أتحدث بجميع اللغات، ولكني لا أملك فمًا. أنا أسجل كل شيء، ولكنني لا أملك ذاكرة. فمن أنا؟",
        options: ["التلفزيون", "الورقة والقلم", "الصدى", "الشبكة العنكبوتية"],
        correctAnswer: "الورقة والقلم"
    },
	
	{
        question: "ما هو أكبر قارة على وجه الأرض من حيث المساحة وعدد السكان؟",
        options: ["أفريقيا", "أوروبا", "آسيا", "أمريكا الشمالية"],
        correctAnswer: "آسيا"
    },
    {
        question: "ما هو المحيط الأكبر على سطح الكرة الأرضية؟",
        options: ["المحيط الأطلسي", "المحيط الهندي", "المحيط المتجمد الشمالي", "المحيط الهادئ"],
        correctAnswer: "المحيط الهادئ"
    },
    {
        question: "ما هي عاصمة أستراليا؟",
        options: ["سيدني", "ملبورن", "كانبرا", "بريزبان"],
        correctAnswer: "كانبرا"
    },
    {
        question: "ما هو الغاز المسؤول عن ظاهرة الاحتباس الحراري بشكل رئيسي؟",
        options: ["الأكسجين", "النيتروجين", "الميثان", "ثاني أكسيد الكربون"],
        correctAnswer: "ثاني أكسيد الكربون"
    },
    {
        question: "ما هي العملية التي تستخدمها النباتات لتحويل ضوء الشمس إلى طاقة؟",
        options: ["التنفس", "النتح", "البناء الضوئي", "التكاثر"],
        correctAnswer: "البناء الضوئي"
    },   
    {
        question: "ما هي العملة الرسمية لليابان؟",
        options: ["اليوان", "الوون", "الين", "الدولار"],
        correctAnswer: "الين"
    },
	
    {
        question: "أي من الدول التالية هي دولة عربية غير ساحلية (لا تطل على البحر)؟",
        options: ["الاردن", "عُمان", "المملكة العربية السعودية", "اليمن"],
        correctAnswer: "الاردن"
    },
    {
        question: "ما هو العضو المسؤول عن ضخ الدم في جسم الإنسان؟",
        options: ["الرئتين", "الكبد", "الكلى", "القلب"],
        correctAnswer: "القلب"
    },
    {
        question: "ما هو العنصر الكيميائي الذي يرمز رمزه بالرمز 'Fe' في الجدول الدوري؟",
        options: ["الفضة", "الذهب", "الحديد", "الفلور"],
        correctAnswer: "الحديد"
    },
    {
        question: "أين تقع أهرامات الجيزة الشهيرة؟",
        options: ["مدينة القاهرة", "مدينة الأقصر", "مدينة الجيزة", "مدينة الإسكندرية"],
        correctAnswer: "مدينة الجيزة"
    },
    
    {
        question: "ما هي اللغة الرسمية لكندا؟",
        options: ["الفرنسية فقط", "الإنجليزية فقط", "الإنجليزية والفرنسية", "الإسبانية"],
        correctAnswer: "الإنجليزية والفرنسية"
    },
    {
        question: "في مجال الفن، من هو الرسام الشهير الذي رسم لوحة 'الموناليزا'؟",
        options: ["بيكاسو", "فان جوخ", "دافنشي", "رافائيل"],
        correctAnswer: "دافنشي"
    },
    {
        question: "ما هي أسرع الحيوانات على وجه الأرض؟",
        options: ["الفيل", "الأسد", "النمر", "الفهد (الشيتا)"],
        correctAnswer: "الفهد (الشيتا)"
    },
    {
        question: "ما هي المادة التي يعتمد عليها الوقود السائل في السيارات؟",
        options: ["الديزل", "الغاز الطبيعي", "البنزين", "المازوت"],
        correctAnswer: "البنزين"
    },
  
    {
        question: "ما هو الاسم الذي يطلق على الكوكب الأحمر في مجموعتنا الشمسية؟",
        options: ["المشتري", "زحل", "عطارد", "المريخ"],
        correctAnswer: "المريخ"
    },
	{
		question: "ما العدد الذي يجب أن يحل محل علامة الاستفهام في المتتالية التالية؟ 2 ، 6 ، 12 ، 20 ، 30 ، ؟",
		options: ["36", "40", "42", "48"],
		correctAnswer: "42"
	},

	{
    "question": "كل الورود أزهار. بعض الأزهار تذبل بسرعة. أي العبارات التالية صحيحة بالضرورة؟",
    "options": [
      "كل الورود تذبل بسرعة.",
      "بعض الورود قد تذبل بسرعة.",
      "لا توجد وردة تذبل بسرعة.",
      "كل ما يذبل بسرعة هو وردة."
    ],
    "correctAnswer": "بعض الورود قد تذبل بسرعة."
  },
  {
    "question": "أي الأعداد التالية لا ينتمي للمجموعة؟ 16 ، 25 ، 36 ، 49 ، 64 ، 72",
    "options": ["25", "49", "64", "72"],
    "correctAnswer": "72"
  },
  {
    "question": "أحمد أطول من بلال. بلال أطول من عمر. من هو الأقصر؟",
    "options": ["أحمد", "بلال", "عمر", "لا يمكن تحديده"],
    "correctAnswer": "عمر"
  },
  {
    "question": "بعض الأشهر الميلادية فيها 30 يومًا، وبعضها 31 يومًا. كم شهرًا فيه 28 يومًا؟",
    "options": ["1", "2", "6", "12"],
    "correctAnswer": "12"
  },
  {
    "question": "طبيب : مريض :: معلم : ______",
    "options": ["مدرسة", "كتاب", "طالب", "فصل"],
    "correctAnswer": "طالب"
  },
  {
    "question": "إذا كان لدينا الأشكال التالية بالترتيب: مثلث، مربع، مخمس (خماسي)، مسدس (سداسي). فما الشكل التالي؟",
    "options": ["مسبع (سباعي)", "مثمن (ثماني)", "دائرة", "نجمة خماسية"],
    "correctAnswer": "مسبع (سباعي)"
  },
  
  {
    "question": "إذا استطاعت 5 ماكينات إنتاج 5 قطع في 5 دقائق، فكم دقيقة تلزم 100 ماكينة لإنتاج 100 قطعة بنفس المعدل؟",
    "options": ["5 دقائق", "20 دقيقة", "100 دقيقة", "500 دقيقة"],
    "correctAnswer": "5 دقائق"
  },
  
  {
    "question": "الساعة تقيس الوقت، والميزان يقيس ______",
    "options": ["الوزن", "الحرارة", "الطول", "الضغط"],
    "correctAnswer": "الوزن"
  },

];

// ======================================================
// 🔄 المتغيرات الأساسية للحالة (State Variables)
// ======================================================
let userName = '';
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = []; // لتخزين إجابة المستخدم لكل سؤال (لتحليلها لاحقاً)

// 🆕 متغير جديد سيحمل الأسئلة بعد خلطها
let shuffledQuizData = []; 

// ======================================================
// 🌐 الوصول إلى العناصر في DOM
// ======================================================
const startScreen = document.getElementById('start-screen');
const quizContainer = document.getElementById('quiz-container');
const resultScreen = document.getElementById('result-screen');

const startButton = document.getElementById('start-button');
const usernameInput = document.getElementById('username');
const nextButton = document.getElementById('next-button');
const questionTextElement = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const questionCounter = document.getElementById('question-counter');

const finalUserNameDisplay = document.getElementById('final-user-name');
const finalScoreDisplay = document.getElementById('final-score');
const detailedFeedbackDiv = document.getElementById('detailed-feedback');
const restartButton = document.getElementById('restart-button');

// ======================================================
// ✨ وظائف التحكم في واجهة المستخدم (UI Functions)
// ======================================================

/**
 * إخفاء وعرض الشاشات (لتقليد التنقل بين الصفحات)
 */
function showScreen(screenId) {
    // إخفاء جميع الشاشات أولاً
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.add('hidden');
        screen.classList.remove('active');
    });
    // عرض الشاشة المطلوبة
    document.getElementById(screenId).classList.remove('hidden');
    document.getElementById(screenId).classList.add('active');
}

/**
 * عرض السؤال الحالي وتجهيز الواجهة
*/
function loadQuestion() {
 if (currentQuestionIndex >= shuffledQuizData.length) {
	 // إذا تجاوزنا الأسئلة، ننهي الاختبار
        showResults();
        return;
    }

    const questionData = shuffledQuizData[currentQuestionIndex];
    
    // 1. تحديث عداد الأسئلة
    questionCounter.textContent = `السؤال ${currentQuestionIndex + 1} من ${shuffledQuizData.length}`;
    
    // 2. تحديث نص السؤال
    questionTextElement.textContent = questionData.question;
    
    // 3. مسح الخيارات السابقة
    optionsContainer.innerHTML = '';
    
    // 4. عرض الخيارات
    questionData.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.setAttribute('data-option', option);
        button.onclick = () => handleAnswer(button, option);
        optionsContainer.appendChild(button);
    });

    // 5. إعداد زر التالي
    nextButton.textContent = currentQuestionIndex === shuffledQuizData.length - 1 ? 'عرض النتيجة النهائية' : 'السؤال التالي';
    nextButton.style.display = 'none'; // لا نفعّل زر التالي حتى يختار المستخدم إجابة
}

/**
 * معالجة اختيار المستخدم لإجابة السؤال
* @param {HTMLElement} selectedButton - الزر الذي اختاره المستخدم
* @param {string} selectedAnswer - نص الإجابة المختارة
*/
function handleAnswer(selectedButton, selectedAnswer) {
    // تعطيل جميع الخيارات لمنع تغيير الإجابة قبل الضغط على التالي
    document.querySelectorAll('.options-container button').forEach(btn => {
        btn.disabled = true;
        btn.style.cursor = 'default';
    });
    
    // تخزين الإجابة التي اختارها المستخدم لهذا السؤال
    userAnswers[currentQuestionIndex] = {
        selected: selectedAnswer,
        isCorrect: selectedAnswer === shuffledQuizData[currentQuestionIndex].correctAnswer
    };
    
    // تفعيل زر الانتقال للسؤال التالي
    nextButton.style.display = 'block';
}

/**
 * الانتقال إلى السؤال التالي (أو النتيجة النهائية)
*/
function handleNext() {
    // التحقق مما إذا كان المستخدم قد اختار إجابة أولاً
    if (userAnswers[currentQuestionIndex] === undefined) {
        alert("الرجاء اختيار إجابة قبل الانتقال.");
        return;
    }

    // زيادة العداد والانتقال
    currentQuestionIndex++;
    
    if (currentQuestionIndex < shuffledQuizData.length) {
        // عرض السؤال التالي
        loadQuestion();
    } else {
        // انتهت الأسئلة
        showResults();
    }
}


/**
 * عرض صفحة النتائج وتحليل الأخطاء
*/
function showResults() {
    showScreen('result-screen');
    
    // حساب النتيجة
    let finalScore = 0;
    let feedbackHTML = '';

    // 1. حساب الدرجة وعرض تحليل كل سؤال
    userAnswers.forEach((answer, index) => {
        if (answer.isCorrect) {
            finalScore++;
        }

        const question = shuffledQuizData[index];
        const isCorrect = answer.isCorrect;
        
        let feedbackClass = isCorrect ? 'success' : 'failed';
        let userText = isCorrect ? answer.selected : answer.selected;
        let correctText = question.correctAnswer;

        let feedbackHTMLItem = `
            <div class="feedback-item ${feedbackClass}">
                <p><strong>السؤال ${index + 1}: ${question.question}</strong></p>
                ${isCorrect 
                    ? `<p>✅ إجابتك صحيحة! الإجابة: ${userText}</p>`
                    : `<p>❌ إجابتك خاطئة. إجابتك: ${userText}</p>
                <p>⬅️ الإجابة الصحيحة هي: <strong>${correctText}</strong></p>`
                }
            </div>
        `;
        feedbackHTML += feedbackHTMLItem;
    });

    // 2. تحديث البيانات النهائية في الـ DOM
    finalUserNameDisplay.textContent = userName;
    finalScoreDisplay.textContent = finalScore;
    detailedFeedbackDiv.innerHTML = feedbackHTML;
}


// ======================================================
// 🚀 معالجات الأحداث (Event Listeners)
// ======================================================

// 1. عند الضغط على زر البدء (التهيئة)
startButton.addEventListener('click', () => {
    const name = usernameInput.value.trim();
    // 🚨 جلب قيمة كلمة السر
    const pin = document.getElementById('pin-code').value.trim(); 

    // التحقق من جميع الشروط:
    if (name === "") {
        alert("الرجاء إدخال اسمك أولاً.");
        return;
    }

    if (pin === "") {
        alert("الرجاء إدخال كلمة السر للبدء.");
        return;
    }
    
    // 🔑 التحقق من كلمة السر
    if (pin !== SECRET_PIN) {
        alert("⚠️ كلمة السر غير صحيحة. لا يمكنك البدء في المسابقة.");
        return; // إيقاف التنفيذ إذا كانت كلمة السر خاطئة
    }
    
    // 🎉 إذا نجحت جميع الشروط (الاسم وكلمة السر)
    
    // 1. تعيين المتغيرات
    userName = name;
    
    // 2. خلط الأسئلة
    shuffledQuizData = shuffleArray(quizData); 
    
    // 3. إعادة تعيين حالة اللعبة
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    
    // 4. عرض محتوى المسابقة
    loadQuestion();
    showScreen('quiz-container');
});

// 2. عند الضغط على زر التالي
nextButton.addEventListener('click', handleNext);

// 3. عند الضغط على زر إعادة التشغيل
restartButton.addEventListener('click', () => {
    // إعادة تعيين جميع المتغيرات
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    
    // مسح واجهة المستخدم
    usernameInput.value = '';
    
    // العودة إلى شاشة البداية
    showScreen('start-screen');
});

// تشغيل الدالة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    showScreen('start-screen');
});
