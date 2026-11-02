
// DANH SÁCH CÂU HỎI
const questions = [
    {
        question: "Thủ đô của Việt Nam là thành phố nào?",
        answers: ["Hải Phòng", "Hà Nội", "Đà Nẵng", "TP. Hồ Chí Minh"],
        correct: 1
    },
    {
        question: "Kết quả của phép tính 12 × 5 là bao nhiêu?",
        answers: ["50", "55", "60", "65"],
        correct: 2
    },
    {
        question: "HTML là viết tắt của cụm từ nào?",
        answers: [
            "HyperText Markup Language",
            "HighText Machine Language",
            "Hyper Transfer Main Language",
            "Home Tool Markup Language"
        ],
        correct: 0
    },
    {
        question: "Thiết bị nào dùng để kết nối các mạng máy tính?",
        answers: ["Bàn phím", "Router", "Máy in", "Chuột"],
        correct: 1
    },
    {
        question: "Hành tinh nào gần Mặt Trời nhất?",
        answers: ["Trái Đất", "Sao Hỏa", "Sao Kim", "Sao Thủy"],
        correct: 3
    },
    {
        question: "Ngôn ngữ nào thường được sử dụng để tạo giao diện web?",
        answers: ["HTML", "SQL", "Python", "C++"],
        correct: 0
    },
    {
        question: "Một byte bằng bao nhiêu bit?",
        answers: ["4 bit", "8 bit", "16 bit", "32 bit"],
        correct: 1
    },
    {
        question: "CPU là bộ phận nào của máy tính?",
        answers: [
            "Bộ nhớ ngoài",
            "Bộ xử lý trung tâm",
            "Thiết bị nhập",
            "Thiết bị xuất"
        ],
        correct: 1
    },
    {
        question: "Phần mềm nào sau đây dùng để soạn thảo văn bản?",
        answers: ["Microsoft Word", "Google Chrome", "Paint", "VLC"],
        correct: 0
    },
    {
        question: "Kết quả của phép tính 2 mũ 5 là bao nhiêu?",
        answers: ["16", "24", "32", "64"],
        correct: 2
    }
];

// KHAI BÁO BIẾN
let currentQuestion = 0;
let points = 0;
let correctAnswers = 0;
let player = "";
let timeLeft = 15;
let timerInterval;
let answered = false;

// CHUYỂN ĐỔI MÀN HÌNH
function showScreen(id) {
    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    document.getElementById(id).classList.add("active");
}

// BẮT ĐẦU GAME
function startGame() {
    player = document.getElementById("playerName").value.trim();

    if (player === "") {
        alert("Bạn hãy nhập tên trước khi bắt đầu nhé!");
        return;
    }

    currentQuestion = 0;
    points = 0;
    correctAnswers = 0;

    showScreen("quizScreen");
    loadQuestion();
}

// HIỂN THỊ CÂU HỎI
function loadQuestion() {
    clearInterval(timerInterval);

    answered = false;
    timeLeft = 15;

    const q = questions[currentQuestion];

    document.getElementById("questionNumber").textContent =
        `Câu ${currentQuestion + 1}/${questions.length}`;

    document.getElementById("score").textContent =
        `⭐ ${points} điểm`;

    document.getElementById("questionText").textContent =
        q.question;

    document.getElementById("progressBar").style.width =
        `${currentQuestion / questions.length * 100}%`;

    document.getElementById("feedback").textContent = "";

    document.getElementById("nextBtn").style.display = "none";

    const answersBox = document.getElementById("answers");

    answersBox.innerHTML = "";

    q.answers.forEach((answer, index) => {
        const btn = document.createElement("button");

        btn.className = "answer";

        btn.textContent =
            String.fromCharCode(65 + index) + ". " + answer;

        btn.onclick = () => chooseAnswer(index);

        answersBox.appendChild(btn);
    });

    updateTimer();

    timerInterval = setInterval(() => {
        timeLeft--;

        updateTimer();

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            chooseAnswer(-1);
        }
    }, 1000);
}

// CẬP NHẬT THỜI GIAN
function updateTimer() {
    document.getElementById("timer").textContent =
        `⏱ ${timeLeft} giây`;
}

// KIỂM TRA ĐÁP ÁN
function chooseAnswer(index) {
    if (answered) return;

    answered = true;

    clearInterval(timerInterval);

    const q = questions[currentQuestion];

    const buttons = document.querySelectorAll(".answer");

    buttons.forEach((btn, i) => {
        btn.disabled = true;

        if (i === q.correct) {
            btn.classList.add("correct");
        }

        if (i === index && index !== q.correct) {
            btn.classList.add("wrong");
        }
    });

    const feedback = document.getElementById("feedback");

    if (index === q.correct) {
        points += 10;
        correctAnswers++;

        feedback.textContent =
            "🎉 Chính xác! Bạn nhận được 10 điểm.";

        feedback.style.color = "#209b55";

    } else if (index === -1) {
        feedback.textContent =
            "⏰ Hết giờ! Đáp án đúng đã được hiển thị.";

        feedback.style.color = "#d68a20";

    } else {
        feedback.textContent =
            "❌ Chưa chính xác! Hãy cố gắng nhé.";

        feedback.style.color = "#d64545";
    }

    document.getElementById("score").textContent =
        `⭐ ${points} điểm`;

    document.getElementById("progressBar").style.width =
        `${(currentQuestion + 1) / questions.length * 100}%`;

    const nextBtn = document.getElementById("nextBtn");

    nextBtn.style.display = "block";

    nextBtn.textContent =
        currentQuestion === questions.length - 1
        ? "XEM KẾT QUẢ 🏆"
        : "CÂU TIẾP THEO ➜";
}

// CHUYỂN SANG CÂU TIẾP THEO
function nextQuestion() {
    if (!answered) return;

    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

// HIỂN THỊ KẾT QUẢ
function showResult() {
    clearInterval(timerInterval);

    showScreen("resultScreen");

    document.getElementById("resultName").textContent =
        `Xin chúc mừng ${player}!`;

    document.getElementById("finalScore").textContent =
        `${points}/100`;

    document.getElementById("correctCount").textContent =
        `Bạn trả lời đúng ${correctAnswers}/${questions.length} câu hỏi.`;

    let emoji;
    let message;

    if (points >= 90) {
        emoji = "🏆";
        message = "Xuất sắc! Bạn là nhà vô địch!";

    } else if (points >= 70) {
        emoji = "🌟";
        message = "Rất tốt! Bạn có kiến thức tuyệt vời!";

    } else if (points >= 50) {
        emoji = "👏";
        message = "Khá tốt! Hãy tiếp tục cố gắng!";

    } else {
        emoji = "💪";
        message = "Đừng nản chí! Hãy thử lại nhé!";
    }

    document.getElementById("resultEmoji").textContent = emoji;

    document.getElementById("resultMessage").textContent = message;
}

// CHƠI LẠI GAME
function restartGame() {
    clearInterval(timerInterval);

    document.getElementById("playerName").value = player;

    showScreen("startScreen");
}
