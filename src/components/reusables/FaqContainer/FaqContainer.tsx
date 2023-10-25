import './styles.css';

interface Faq {
    question: any;
    answer: any;

}

const FaqItem = ({ question, answer }: Faq) => {
    const details = document.querySelectorAll("details");

    // Add the onclick listeners.
    details.forEach((targetDetail) => {
        targetDetail.addEventListener("click", () => {
            // Close all the details that are not targetDetail.
            details.forEach((detail) => {
                if (detail !== targetDetail) {
                    detail.removeAttribute("open");
                }
            });
        });
    });

    return (
        <details>
            <summary>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <p>{question}</p>
                </div>
            </summary>
            <div>
                <p>{answer}</p>
            </div>
        </details>
    );
};

const FaqContainer = () => {

    const faqData = [
        { question: 'Question 1', answer: 'Answer 1' },
        { question: 'Question 2', answer: 'Answer 2' },
        { question: 'Question 3', answer: 'Answer 3' },
        { question: 'Question 4', answer: 'Answer 4' },
    ];

    return (
        <div className="faqsContainer">
            {faqData.map((faq, index) => (
                <FaqItem
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                />
            ))}
        </div>
    );
};

export default FaqContainer;