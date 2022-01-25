import { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

// There are four steps to using React context:

// - Create context using the createContext method.
// - Take your created context and wrap the context provider around your component tree.
// - Put any value you like on your context provider using the value prop.
// - Read that value within any component by using the context consumer.

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  //Replacing the feedback data state
  const [feedback, setFeedback] = useState([
    { id: 1, text: 'This is feedback item 1', rating: 10 },
    { id: 2, text: 'This is feedback item 2', rating: 9 },
    { id: 3, text: 'This is feedback item 3', rating: 7 },
  ]);

  //For the Edit button
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  //Function for editing the feedback
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };

  //Replacing the delete feedback function and moving it to context
  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  //Replacing addFeedback from App.js to context
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedback([newFeedback, ...feedback]);
  };

  //Update feedback item
  const updateFeedback = (id, updItem) => {
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...updItem } : item))
    );
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback: feedback,
        deleteFeedback,
        addFeedback,
        editFeedback,
        feedbackEdit,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
