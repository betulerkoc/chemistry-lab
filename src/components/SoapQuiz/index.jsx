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

    const handleAnswer = (optionIndex) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = optionIndex;
        setAnswers(newAnswers);
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
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
    };

    return (
        <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '10px',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            maxWidth: '600px',
            width: '90%'
        }}>
            <h2 style={{ color: '#0b2a5c', marginBottom: '1.5rem' }}>
                Soap Making Safety Quiz
            </h2>

            {!showResults ? (
                <>
                    <div style={{ marginBottom: '1.5rem', color: 'black'}}>
                        <h3 style={{ marginBottom: '1rem' }}>
                            Question {currentQuestion + 1} of {questions.length}
                        </h3>
                        <p style={{ marginBottom: '1rem' }}>
                            {questions[currentQuestion].question}
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {questions[currentQuestion].options.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleAnswer(index)}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        backgroundColor: answers[currentQuestion] === index ? '#0b2a5c' : 'white',
                                        color: answers[currentQuestion] === index ? 'white' : 'black',
                                        border: '1px solid #0b2a5c',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                        textAlign: 'left'
                                    }}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={handleNext}
                        disabled={answers[currentQuestion] === null}
                        style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: answers[currentQuestion] === null ? '#ccc' : '#0b2a5c',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: answers[currentQuestion] === null ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {currentQuestion === questions.length - 1 ? 'Submit' : 'Next'}
                    </button>
                </>
            ) : (
                <div>
                    <h3 style={{ color: 'black' }}>Quiz Results</h3>
                    <p>
                        You got {answers.filter((answer, index) => answer === questions[index].correctAnswer).length} out of {questions.length} correct!
                    </p>
                    {answers.every((answer, index) => answer === questions[index].correctAnswer) ? (
                        <p style={{ color: 'green' }}>Congratulations! You can now proceed to the experiment.</p>
                    ) : (
                        <>
                            <p style={{ color: 'red' }}>Please review the questions and try again.</p>
                            <button
                                onClick={restartQuiz}
                                style={{
                                    padding: '0.5rem 1rem',
                                    backgroundColor: '#0b2a5c',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    marginTop: '1rem'
                                }}
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