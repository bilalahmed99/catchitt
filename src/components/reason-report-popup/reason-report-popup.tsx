import classNames from 'classnames';
import styles from './reason-report-popup.module.scss';

import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';

export interface FormData {
    option1: boolean;
    option2: boolean;
    option3: boolean;
    option4: boolean;
    option5: boolean;
    option6: boolean;
}

export interface ReasonReportPopupProps {
    className?: string;
    onClose?: () => void;
    // onSelectedChoicesChange: (choices: FormData) => void; // Add a new prop to handle changes in selected choices
    mediaId: string;
}

export const ReasonReportPopup = ({ className, onClose, mediaId }: ReasonReportPopupProps) => {
    const token = useAuthStore((state) => state.token);

    const [formData, setFormData] = useState<FormData>({
        option1: false,
        option2: false,
        option3: false,
        option4: false,
        option5: false,
        option6: false,
    });
    const [selectedValues, setSelectedValues] = useState<string[]>([]);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: checked }));
        // Update the selectedChoices prop with the latest data
        if (checked) {
            setSelectedValues((prevValues) => [...prevValues, value]);
        } else {
            setSelectedValues((prevValues) => prevValues.filter((val) => val !== value));
        }
    };

    const handleReportSubmit = (event: React.FormEvent, mediaId: string) => {
        event.preventDefault();
        // const reportReasons = selectedValues.map((value) => ({ reason: value }));
        console.log(mediaId);

        console.log(selectedValues); // You can perform any action with the formData here, like sending it to the server
        // Perform the fetch POST request here with the reportReasons array
        fetch(`https://dev.seezitt.com/api/media-content/reports/:${mediaId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ reason: selectedValues }),
        })
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                console.log(selectedValues);
                // Handle the response from the server if needed
            })
            .catch((error) => {
                // Handle any errors
                console.log(error);
            });
    };

    return (
        <div className={classNames(styles.root, className)}>
            <div className={styles.container}>
                <div className={styles.titleDiv}>
                    <h2 className={styles.titleText}>Reason for report</h2>
                </div>
                <div className={styles.frame}>
                    <form
                        onSubmit={(event) => handleReportSubmit(event, mediaId)}
                        className={styles.formStyle}
                    >
                        <label className={styles.label}>
                            <input
                                type="checkbox"
                                name="option1"
                                value="MISLEADING_INFO"
                                checked={formData.option1}
                                // checked={formData.option1}
                                onChange={handleCheckboxChange}
                            />
                            Misleading information
                        </label>

                        <label className={styles.label}>
                            <input
                                type="checkbox"
                                name="option2"
                                value={'FRAUDS_SCAM'}
                                checked={formData.option2}
                                // checked={formData.option2}
                                onChange={handleCheckboxChange}
                            />
                            Frauds and scams
                        </label>

                        <label className={styles.label}>
                            <input
                                type="checkbox"
                                name="option3"
                                value={'HATE_SPEECH'}
                                checked={formData.option3}
                                onChange={handleCheckboxChange}
                            />
                            Hate speech
                        </label>
                        <label className={styles.label}>
                            <input
                                type="checkbox"
                                name="option4"
                                value={'HARASSMENT_BULLYING'}
                                checked={formData.option4}
                                onChange={handleCheckboxChange}
                            />
                            Harassment or Bullying
                        </label>
                        <label className={styles.label}>
                            <input
                                type="checkbox"
                                name="option5"
                                value={'VIOLENCE'}
                                checked={formData.option5}
                                onChange={handleCheckboxChange}
                                className={styles.checkmark}
                            />
                            Violence
                        </label>
                        <label className={styles.label}>
                            <input
                                type="checkbox"
                                name="option6"
                                value={'ANIMAL_CRUELTY'}
                                checked={formData.option6}
                                onChange={handleCheckboxChange}
                            />
                            Animal Cruelty
                        </label>

                        <button
                            type="submit"
                            className={styles.submitBtn}
                            onClick={(event) => handleReportSubmit(event, mediaId)}
                        >
                            Submit
                        </button>
                    </form>
                </div>
                <div className={styles.submitDiv} />
            </div>
        </div>
    );
};
