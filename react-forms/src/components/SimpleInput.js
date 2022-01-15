import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
  //Name Input , using custom hooks
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");

  //Email Input, using custom hooks
  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.includes("@"));

  //Overall Form Validity
  let formIsValid = false;
  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  //Form Submission Handler
  const formSubmissionHandler = (event) => {
    event.preventDefault();
    if (!enteredNameIsValid) {
      return;
    }
    console.log(enteredName);

    resetNameInput();
    resetEmailInput();
  };

  //Name Input CLass for CSS
  const nameInputClasses = nameInputHasError
    ? "form-control invalid"
    : "form-control";

  //Email Input Class for CSS
  const emailInputClasses = emailInputHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      {/* Name Input */}
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangeHandler}
          value={enteredName}
          onBlur={nameBlurHandler}
        />
        {nameInputHasError && (
          <p className="error-text">Name must not be empty</p>
        )}
      </div>
      {/* Email Input  */}
      <div className={emailInputClasses}>
        <label htmlFor="email">Your Email</label>
        <input
          type="email"
          id="email"
          onChange={emailChangeHandler}
          value={enteredEmail}
          onBlur={emailBlurHandler}
        />
        {emailInputHasError && (
          <p className="error-text">PLease enter a valid email</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
