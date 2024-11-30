import { useEffect } from 'react';
import './styles.css';

interface Faq {
    question: any;
    answer: any;
    isDarkTheme: boolean;
}

const FaqItem = ({ question, answer, isDarkTheme }: Faq) => {

    useEffect(() => {
        const details = document.querySelectorAll("details");

        const callbackFunc = (event: Event) => {
            const targetDetail = event.currentTarget as HTMLDetailsElement;

            const marker = targetDetail.querySelector('.marker') as HTMLElement;

            if (targetDetail.open) {
                marker.style.transform = 'rotate(90deg)'; 
            } else {
                marker.style.transform = 'rotate(0deg)'; 
            }

            details.forEach((detail) => {
                if (detail !== targetDetail) {
                    detail.removeAttribute("open");
                    const otherMarker = detail.querySelector('.marker') as HTMLElement;
                    if (otherMarker) {
                        otherMarker.style.transform = 'rotate(0deg)';
                    }
                }
            });
        };

        details.forEach((detail) => {
            detail.addEventListener("toggle", callbackFunc);
        });

        return () => {
            details.forEach((detail) => {
                detail.removeEventListener("toggle", callbackFunc);
            });
        };
    }, []);

    return (
        <details>
            <summary>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <p className={isDarkTheme?'text-white':''}>{question}</p>
                    <span className="marker" style={{ fontSize: '2rem' }}>&rsaquo;</span>
                </div>
            </summary>
            <div>
                <p className={isDarkTheme?'text-white':''}>{answer}</p>
            </div>
        </details>
    );
};

const FaqContainer = ({ isDarkTheme }:{ isDarkTheme: boolean }) => {

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
                    isDarkTheme={isDarkTheme}
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                />
            ))}
        </div>
    );
};

export default FaqContainer;