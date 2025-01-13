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
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '10px',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            maxWidth: '600px',
            width: '90%'
        }}>
            <h2 style={{ color: '#0b2a5c', marginBottom: '1.5rem' }}>
                Aspirin Synthesis Safety Quiz
            </h2>

            {!showResults ? (
                <>
                    <div style={{ marginBottom: '1.5rem', color: 'black' }}>
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
                    <h3>Quiz Results</h3>
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

export default AspirinQuiz;