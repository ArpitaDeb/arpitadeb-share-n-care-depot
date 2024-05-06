import './StartStep.scss';
const StartStep = () => {
  const startSteps = {
    step1: "Join Us! Begin by registering an account on our website. Visit the library with a valid photo ID to activate your account.",
    step2: "Explore inventory and borrow items hassle-free! Use our website to Reserve items and pick them up during operating hours.",
    step3: "Use & Return! Enjoy flexible borrowing times. Simply drop them off for the next borrower. Returns are accepted every evening",
  };

  return (
    <>
    <div className='step'>
      <div className='step__list'>
        {Object.values(startSteps).map((step, index) => (
          <div
            key={index}
            className="step__item"
          >
            <p className="text-xl text-center tracking-wide p-10 text text-white font-semibold">
              {step}
            </p>
          </div>
        ))}
      </div>
      <div className="w-full mt-20 mb-10 flex justify-center items-center">
        
      </div>
      </div>
    </>
  );
};

export default StartStep;
