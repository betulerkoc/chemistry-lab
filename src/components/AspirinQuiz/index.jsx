import { useState } from 'react';

const questions = [
    {
        question: "What precautions should be taken when handling sulfuric acid?",
        options: [
            "Avoid skin contact and wear gloves",
            "Add acid to water, not water to acid",
            "Use in a well-ventilated area to avoid inhaling fumes",
            "All of the above"
        ],
        correctAnswer: 3
    },
    {
        question: "What is the main chemical reaction involved in aspirin synthesis?",
        options: [
            "Saponification",
            "Esterification",
            "Combustion",
            "Neutralization"
        ],
        correctAnswer: 1
    },
    {
        question: "Which compound acts as the catalyst in the aspirin synthesis experiment?",
        options: [
            "Sulfuric acid (H₂SO₄)",
            "Salicylic acid",
            "Acetic acid",
            "Sodium hydroxide"
        ],
        correctAnswer: 0
    },
    {
        question: "Why is the reaction mixture heated during aspirin synthesis?",
        options: [
            "To dissolve the starting materials",
            "To speed up the reaction",
            "To remove impurities",
            "To prevent crystallization"
        ],
        correctAnswer: 1
    }
];

function AspirinQuiz({ onQuizComplete }) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState(new Array(questions.length).fill(null));
    const [showResults, setShowResults] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [feedback, setFeedback] = useState('');

    const handleAnswer = (optionIndex) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = optionIndex;
        setAnswers(newAnswers);

        if (optionIndex !== questions[currentQuestion].correctAnswer) {
            setFeedback('Incorrect answer, please try again.');
        } else {
            setFeedback('');
        }
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setFeedback('');
        } else {
            checkAnswers();
        }
    };

    const checkAnswers = () => {
        const allCorrect = answers.every(
            (answer, index) => answer === questions[index].correctAnswer
        );
        setShowResults(true);
        setAttempts(attempts + 1);

        if (allCorrect) {
            onQuizComplete(true);
        }
    };

    const restartQuiz = () => {
        setCurrentQuestion(0);
        setAnswers(new Array(questions.length).fill(null));
        setShowResults(false);
        setFeedback('');
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md max-w-[600px] w-[90%]">
            <h2 className="text-[#0b2a5c] mb-6">
                Aspirin Synthesis Safety Quiz
            </h2>

            {!showResults ? (
                <>
                    <div className="mb-6 text-black">
                        <h3 className="mb-4">
                            Question {currentQuestion + 1} of {questions.length}
                        </h3>
                        <p className="mb-4">
                            {questions[currentQuestion].question}
                        </p>
                        <div className="flex flex-col gap-2">
                            {questions[currentQuestion].options.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleAnswer(index)}
                                    className={`
                                        p-2 px-4 rounded border border-[#0b2a5c] text-left
                                        ${answers[currentQuestion] === index 
                                            ? (index === questions[currentQuestion].correctAnswer 
                                                ? 'bg-[#0b2a5c] text-white' 
                                                : 'bg-[#ff4d4d] text-white')
                                            : 'bg-white text-black'}
                                    `}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                        {feedback && <p className="text-red-500 mt-4">{feedback}</p>}
                    </div>
                    <button
                        onClick={handleNext}
                        disabled={answers[currentQuestion] === null}
                        className={`
                            p-2 px-4 rounded text-white
                            ${answers[currentQuestion] === null 
                                ? 'bg-gray-300 cursor-not-allowed' 
                                : 'bg-[#0b2a5c] cursor-pointer'}
                        `}
                    >
                        {currentQuestion === questions.length - 1 ? 'Submit' : 'Next'}
                    </button>
                </>
            ) : (
                <div>
                    <h3>Quiz Results</h3>
                    <p>
                        You got {answers.filter((answer, index) => answer === questions[index].correctAnswer).length} out of {questions.length} correct!
                    </p>
                    {answers.every((answer, index) => answer === questions[index].correctAnswer) ? (
                        <p className="text-green-500">Congratulations! You can now proceed to the experiment.</p>
                    ) : (
                        <>
                            <p className="text-red-500">Please review the questions and try again.</p>
                            <button
                                onClick={restartQuiz}
                                className="mt-4 p-2 px-4 bg-[#0b2a5c] text-white rounded cursor-pointer"
                            >
                                Retry Quiz
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default AspirinQuiz;