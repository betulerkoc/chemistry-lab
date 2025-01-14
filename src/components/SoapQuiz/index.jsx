import { useState } from 'react';

const questions = [
    {
        question: "Why is it important to wear gloves and goggles during the soap-making process?",
        options: [
            "To avoid accidental burns from sodium hydroxide",
            "To prevent soap from sticking to your hands",
            "To speed up the saponification reaction",
            "To avoid the smell of oil"
        ],
        correctAnswer: 0
    },
    {
        question: "What is the chemical process used to make soap called?",
        options: [
            "Esterification",
            "Saponification",
            "Oxidation",
            "Neutralization"
        ],
        correctAnswer: 1
    },
    {
        question: "What role does sodium hydroxide (NaOH) play in soap-making?",
        options: [
            "It acts as a surfactant",
            "It reacts with fats to form soap",
            "It provides fragrance to the soap",
            "It stabilizes the pH of the soap"
        ],
        correctAnswer: 1
    },
    {
        question: "Which of the following is a common byproduct of the saponification reaction?",
        options: [
            "Glycerol",
            "Ethanol",
            "Carbon dioxide",
            "Hydrogen gas"
        ],
        correctAnswer: 0
    }
];

function SoapQuiz({ onQuizComplete }) {
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
                Soap Making Safety Quiz
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
                                        p-2 rounded text-left border border-[#0b2a5c] cursor-pointer
                                        ${answers[currentQuestion] === index 
                                            ? (index === questions[currentQuestion].correctAnswer 
                                                ? 'bg-[#0b2a5c] text-white' 
                                                : 'bg-red-500 text-white')
                                            : 'bg-white text-black'
                                        }
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
                            p-2 rounded border-none
                            ${answers[currentQuestion] === null 
                                ? 'bg-gray-300 cursor-not-allowed' 
                                : 'bg-[#0b2a5c] cursor-pointer'
                            } text-white
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
                                className="mt-4 p-2 bg-[#0b2a5c] text-white border-none rounded cursor-pointer"
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

export default SoapQuiz; 