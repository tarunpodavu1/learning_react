import useInput from "../hooks/use-input";

const BasicForm = (props) => {
  //First Name Input, using Custom hook (useInput)
  const {
    value: firstValue,
    isValid: firstIsValid,
    hasError: firstHasError,
    valueChangeHandler: firstValueChange,
    inputBlurHandler: firstInputBlur,
    reset: resetFirstInput,
  } = useInput((value) => value.trim() !== "");

  //Last Name Input, using Custom hook (useInput)
  const {
    value: lastValue,
    isValid: lastIsValid,
    hasError: lastHasError,
    valueChangeHandler: lastValueChange,
    inputBlurHandler: lastInputBlur,
    reset: resetLastInput,
  } = useInput((value) => value.trim() !== "");

  //Email Input, using custom hook
  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.includes("@"));

  //Total Form validator
  let formIsValid = false;
  if (firstIsValid && enteredEmailIsValid && lastIsValid) {
    formIsValid = true;
  }

  //On Submission of form
  const formSubmissionHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    console.log(firstValue, lastValue, enteredEmail);

    resetFirstInput();
    resetLastInput();
    resetEmailInput();
  };

  //First Name Input CLass for CSS
  const firstInputClasses = firstHasError
    ? "form-control invalid"
    : "form-control";

  //Last Name Input CLass for CSS
  const lastInputClasses = lastHasError
    ? "form-control invalid"
    : "form-control";

  //Email Input Class for CSS
  const emailInputClasses = emailInputHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className="control-group">
        <div className={firstInputClasses}>
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="name"
            onChange={firstValueChange}
            onBlur={firstInputBlur}
            value={firstValue}
          />
          {firstHasError && <p>First name shouldnt be empty</p>}
        </div>
        <div className={lastInputClasses}>
          <label htmlFor="name">Last Name</label>
          <input
            type="text"
            id="name"
            value={lastValue}
            onChange={lastValueChange}
            onBlur={lastInputBlur}
          />
          {lastHasError && <p>Last name shouldnt be empty</p>}
        </div>
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="name">E-Mail Address</label>
        <input
          type="text"
          id="name"
          value={enteredEmail}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
        {emailInputHasError && <p>Email is invalid</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
