import React, { useState, useEffect } from 'react';
import styles from './createGoalModal.module.scss';
import Goal from '@/models/goal';
import GoalCreate from '@/models/goal-create';

import goalIcon1 from './goalIcons/1.png';
import goalIcon2 from './goalIcons/2.png';
import goalIcon3 from './goalIcons/3.png';
import goalIcon4 from './goalIcons/4.png';
import goalIcon5 from './goalIcons/5.png';
import goalIcon6 from './goalIcons/6.png';
import goalIcon7 from './goalIcons/7.png';
import goalIcon8 from './goalIcons/8.png';
import goalIcon9 from './goalIcons/9.png';
import goalIcon10 from './goalIcons/10.png';
import goalIcon11 from './goalIcons/11.png';
import goalIcon12 from './goalIcons/12.png';
import Image from 'next/image';

import { createGoal } from '../../../../services/goal-service';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (goal: Goal) => void;
}

const images = [goalIcon1, goalIcon2, goalIcon3, goalIcon4, goalIcon5, goalIcon6
  , goalIcon7, goalIcon8, goalIcon9, goalIcon10, goalIcon11, goalIcon12]

export default function CreateGoalModal(props: Props) {
  const [selectedImageIndex, setSelectedImageIndex] = React.useState<number | null>(null); // Added state for selected image index
  const [title, setTitle] = React.useState("");
  const [totalHours, setTotalHours] = React.useState("");
  const [expectedCompletionDate, setExpectedCompletionDate] = React.useState<string | null>(null);

  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [formError, setFormError] = React.useState<string | null>(null);

  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);

  const handleSubmit = async () => {
    if (title && totalHours && expectedCompletionDate && selectedImageIndex) {
      const newGoal: GoalCreate = {
        title,
        totalHours,
        expectedCompletionDate,
        userId: '123456',
        logo: selectedImageIndex,
      };
      try {
        const createdGoal = await createGoal(newGoal);
        props.onCreate(createdGoal);
        handleClose();
      } catch (error) {
        setSubmitError('Creating goal failed. Please try again.');
      }
    } else {
      setFormError('Please fill in all required fields: title and due date.');
    }
  }

  const handleClose = async () => {
    props.onClose();
    setTitle('');
    setTotalHours('');
    setExpectedCompletionDate(null);
    setFormError(null);
    setSubmitError(null);
  }

  return (
    props.isOpen &&
    <div className={styles['modal']}>
      <div className={styles['modal-content']}>

        <div className={styles['goal-title-div']}>
          <h2>Create a new Goal</h2>
          <span>Goal Title : </span>
          <input type="text" id="edit-title" title="edit-title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className={styles['goal-time-div']}>
          <span>Target Total Time: </span>
          <input type="number" id="edit-description" title="edit-description"
            value={totalHours}
            onChange={(e) => setTotalHours(e.target.value)}
          />
          <span> Hours</span>
        </div>
        <div className={styles['goal-ddl-div']}>
          <span>Expected completion date: </span>
          <input type="datetime-local" id="edit-time" title="edit-time"
            value={expectedCompletionDate?.toString().slice(0, 16)}
            onChange={(e) => setExpectedCompletionDate(e.target.value)}
          />
        </div>

        <div className={styles['select-logo']}>Please select a logo</div>
        <div className={styles['image-selection']}>
          {images.map((image, index) => (
            <div className={styles['image-container']} key={index} onClick={() => setSelectedImageIndex(index + 1)}>
              <Image
                src={image}
                alt={`Image ${index}`}
                width={200} // 设置适当的宽度
                height={180} // 设置适当的高度
                className={selectedImageIndex === (index + 1) ? `${styles.image} ${styles.selected}` : styles.image}
              />
            </div>
          ))}
        </div>

        <div className={styles['button-bar']}>
          <button className={styles['cancel-button']} onClick={handleClose}>Cancel</button>
          <button className={styles['submit-button']} onClick={handleSubmit}>Submit</button>
        </div>
        {formError && <p className={styles.error}>{formError}</p>}
        {submitError && <p className={styles.error}>{submitError}</p>}
      </div>
    </div>
  );
};
