import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import "./App.css";

const personalInfoSchema = yup.object().shape({
  name: yup
    .string("Name must consist of letters ")
    .required("Name cannot be empty"),
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email cannot be empty"),
  phoneNumber: yup.string().min(10).required("Phone Number cannot be empty"),
});

function App() {
  const [step, setStep] = useState(1);
  const [isYearly, setIsYearly] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState("Arcade");
  const [addons, setAddons] = useState({
    Service: { Title: "Online service", active: false, Price: 1 },
    Storage: { Title: "Larger Storage", active: false, Price: 2 },
    Custom: { Title: "Customizable profile", active: false, Price: 2 },
  });
  const plans = {
    Arcade: {
      price: 9,
    },
    Advanced: {
      price: 12,
    },
    Pro: {
      price: 15,
    },
  };
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: yupResolver(personalInfoSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      plan: "Arcade",
      Custom: false,
      Service: false,
      Storage: false,
      total: 0,
    },
  });

  const onSubmit = (data) => {
    setStep(5);
    console.log(data);
    reset();
  };
  const handleNextStep = async () => {
    const isValid = await trigger();
    isValid === true && setStep((prev) => prev + 1);
  };
  const handlePrevStep = () => {
    setStep((prev) => prev - 1);
  };
  const handleIsYearly = () => {
    setIsYearly((prev) => !prev);
  };
  const handleSelectedPlan = (plan) => {
    setSelectedPlan(plan);
  };
  const handleAddons = (addon) => {
    setAddons((prev) => ({
      ...prev,
      [addon]: { ...prev[addon], active: !prev[addon].active },
    }));
  };
  const calcTotal = () => {
    let total = 0;
    if (isYearly) {
      total += plans[selectedPlan].price;
      Object.keys(addons).forEach((addonName) => {
        const addon = addons[addonName];
        if (addon.active) {
          total += addon.Price;
        }
      });
    } else {
      total += plans[selectedPlan].price * 10;
      Object.keys(addons).forEach((addonName) => {
        const addon = addons[addonName];
        if (addon.active) {
          total += addon.Price * 10;
        }
      });
    }
    setValue("total", total);
    return total;
  };

  return (
    <>
      <div className="mobileSidebar">
        <div
          className="stepContainer"
          onClick={async () => {
            const isValid = await trigger();
            isValid === true && setStep(1);
          }}
        >
          <span className={step === 1 ? "stepNumber activeStep" : "stepNumber"}>
            1
          </span>
        </div>
        <div
          className="stepContainer"
          onClick={async () => {
            const isValid = await trigger();
            isValid === true && setStep(2);
          }}
        >
          <span className={step === 2 ? "stepNumber activeStep" : "stepNumber"}>
            2
          </span>
        </div>
        <div
          className="stepContainer"
          onClick={async () => {
            const isValid = await trigger();
            isValid === true && setStep(3);
          }}
        >
          <span className={step === 3 ? "stepNumber activeStep" : "stepNumber"}>
            3
          </span>
        </div>
        <div
          className="stepContainer"
          onClick={async () => {
            const isValid = await trigger();
            isValid === true && setStep(4);
          }}
        >
          <span className={step === 4 ? "stepNumber activeStep" : "stepNumber"}>
            4
          </span>
        </div>
      </div>
      <div className="container">
        {/* <!-- Sidebar start --> */}
        <div className="sidebarContainer">
          {/* Step 1 Your info Step 2 Select plan Step 3 Add-ons Step 4 Summary */}
          <div
            className="stepContainer"
            onClick={async () => {
              const isValid = await trigger();
              isValid === true && setStep(1);
            }}
          >
            <span
              className={step === 1 ? "stepNumber activeStep" : "stepNumber"}
            >
              1
            </span>
            <div className="stepContent">
              <span>Step 1</span>
              <span>your info</span>
            </div>
          </div>
          <div
            className="stepContainer"
            onClick={async () => {
              const isValid = await trigger();
              isValid === true && setStep(2);
            }}
          >
            <span
              className={step === 2 ? "stepNumber activeStep" : "stepNumber"}
            >
              2
            </span>
            <div className="stepContent">
              <span>Step 2</span>
              <span>select plan</span>
            </div>
          </div>
          <div
            className="stepContainer"
            onClick={async () => {
              const isValid = await trigger();
              isValid === true && setStep(3);
            }}
          >
            <span
              className={step === 3 ? "stepNumber activeStep" : "stepNumber"}
            >
              3
            </span>
            <div className="stepContent">
              <span>Step 3</span>
              <span>add-ons</span>
            </div>
          </div>
          <div
            className="stepContainer"
            onClick={async () => {
              const isValid = await trigger();
              isValid === true && setStep(4);
            }}
          >
            <span
              className={`stepNumber ${
                step === 4 || step === 5 ? "activeStep" : ""
              }`}
            >
              4
            </span>
            <div className="stepContent">
              <span>Step 4</span>
              <span>summary</span>
            </div>
          </div>
        </div>
        {/* <!-- Sidebar end --> */}

        <div className="contentContainer">
          <form onSubmit={handleSubmit(onSubmit)}>
            {
              step === 1 /* <!-- Step 1 start --> */ && (
                // Personal info Please provide your name, email address, and phone
                // number. Name e.g. Stephen King Email Address e.g.
                // stephenking@lorem.com Phone Number e.g. +1 234 567 890 Next Step
                <div className="content">
                  <h1>Personal info</h1>
                  <span>
                    Please provide your name, email address, and phone number.
                  </span>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <div className="formContainer">
                      <div>
                        {errors.name && <span>{errors.name?.message}</span>}
                        <label htmlFor="name">Name</label>
                        <input
                          type="text"
                          id="name"
                          placeholder="e.g. Stephen King"
                          {...register("name", {
                            required: true,
                            maxLength: 20,
                          })}
                        />{" "}
                      </div>
                      <div>
                        {errors.email && <span>{errors.email?.message}</span>}
                        <label htmlFor="email">Email Address</label>
                        <input
                          type="text"
                          id="email"
                          placeholder="e.g. stephenking@lorem.com"
                          {...register("email", {
                            required: true,
                          })}
                        />
                      </div>
                      <div>
                        {errors.phoneNumber && (
                          <span>{errors.phoneNumber?.message}</span>
                        )}
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input
                          type="number"
                          id="phoneNumber"
                          placeholder="e.g. +1 234 567 890"
                          {...register("phoneNumber", {
                            required: true,
                            maxLength: 20,
                          })}
                        />
                      </div>
                    </div>
                  </div>

                  <button className="nextBtn" onClick={handleNextStep}>
                    Next Step
                  </button>
                </div>
              )
              /* <!-- Step 1 end --> */
            }

            {
              step === 2 && (
                /* <!-- Step 2 start --> */ <div className="content">
                  {/*  Select your plan You have the option of monthly or yearly billing.
          Arcade $9/mo Advanced $12/mo Pro $15/mo Monthly Yearly Go Back Next
          Step */}
                  <h1>Select your plan</h1>
                  <span>You have the option of monthly or yearly billing.</span>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      marginTop: "30px",
                    }}
                  >
                    <div className="cardContainer">
                      <div
                        className={
                          selectedPlan === "Arcade" ? "card activePlan" : "card"
                        }
                        onClick={() => {
                          handleSelectedPlan("Arcade");
                          // register("plan", { value: "Arcade" });
                          setValue("plan", "Arcade");
                        }}
                      >
                        <img
                          src="src/assets/images/icon-arcade.svg"
                          alt="icon-arcade"
                          width={50}
                        />
                        {isYearly && (
                          <div>
                            <span>Arcade</span>
                            <span>${plans.Arcade.price}/mo</span>
                          </div>
                        )}
                        {!isYearly && (
                          <div>
                            <span>Arcade</span>
                            <span>${plans.Arcade.price * 10}/yr</span>
                            <span>2 months free</span>
                          </div>
                        )}
                      </div>

                      <div
                        className={
                          selectedPlan === "Advanced"
                            ? "card activePlan"
                            : "card"
                        }
                        onClick={() => {
                          handleSelectedPlan("Advanced");
                          // register("plan", { value: "Advanced" });
                          setValue("plan", "Advanced");
                        }}
                      >
                        <img
                          src="src/assets/images/icon-advanced.svg"
                          alt="icon-advanced"
                          width={50}
                        />

                        {isYearly && (
                          <div>
                            <span>Advanced</span>
                            <span>${plans.Advanced.price}/mo</span>
                          </div>
                        )}
                        {!isYearly && (
                          <div>
                            <span>Advanced</span>
                            <span>${plans.Advanced.price * 10}/yr</span>
                            <span>2 months free</span>
                          </div>
                        )}
                      </div>

                      <div
                        className={
                          selectedPlan === "Pro" ? "card activePlan" : "card"
                        }
                        onClick={() => {
                          handleSelectedPlan("Pro");
                          // register("plan", { value: "Pro" });
                          setValue("plan", "Pro");
                        }}
                      >
                        <img
                          src="src/assets/images/icon-pro.svg"
                          alt="icon-pro"
                          width={50}
                        />

                        {isYearly && (
                          <div>
                            <span>Pro</span>
                            <span>${plans.Pro.price}/mo</span>
                          </div>
                        )}
                        {!isYearly && (
                          <div>
                            <span>Pro</span>
                            <span>${plans.Pro.price * 10}/yr</span>
                            <span>2 months free</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="monthlyToggle">
                      <span className={isYearly ? "activePlanBilling" : ""}>
                        Monthly
                      </span>
                      <label className="switch">
                        <input
                          type="checkbox"
                          onClick={handleIsYearly}
                          {...register("isYearly", {
                            required: true,
                          })}
                          defaultChecked={false}
                        />
                        <span className="slider round"></span>
                      </label>
                      <span className={isYearly ? "" : "activePlanBilling"}>
                        Yearly
                      </span>
                    </div>
                  </div>

                  <button className="prevBtn" onClick={handlePrevStep}>
                    Go Back
                  </button>
                  <button className="nextBtn" onClick={handleNextStep}>
                    Next Step
                  </button>
                </div>
              ) /* <!-- Step 2 end --> */
            }

            {
              step === 3 && (
                /* <!-- Step 3 start --> */ <div className="content">
                  {/* Pick add-ons Add-ons help enhance your gaming experience. Online
          service Access to multiplayer games +$1/mo Larger storage Extra 1TB of
          cloud save +$2/mo Customizable Profile Custom theme on your profile
          +$2/mo Go Back Next Step */}
                  <h1>Pick add-ons</h1>
                  <span>Add-ons help enhance your gaming experience.</span>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      marginTop: "30px",
                      justifyContent: "space-between",
                      height: "50%",
                    }}
                  >
                    <div
                      className={
                        addons.Service.active === true
                          ? "addonCard activeAddon"
                          : "addonCard"
                      }
                    >
                      <div style={{ display: "flex" }}>
                        <input
                          type="checkbox"
                          checked={
                            addons.Service.active === true ? "checked" : ""
                          }
                          // onChange={() => {
                          //   handleAddons("Service");
                          // }}
                          {...register("Service", {
                            required: true,
                            onChange: () => handleAddons("Service"),
                          })}
                        />
                        <div className="titleContainer">
                          <span>Online service</span>
                          <span>Access to multiplayer games</span>
                        </div>
                      </div>

                      {isYearly && (
                        <span style={{ color: "purple" }}>
                          +${addons.Service.Price}/mo
                        </span>
                      )}
                      {!isYearly && (
                        <span style={{ color: "purple" }}>
                          +${addons.Service.Price * 10}/yr
                        </span>
                      )}
                    </div>

                    <div
                      className={
                        addons.Storage.active === true
                          ? "addonCard activeAddon"
                          : "addonCard"
                      }
                      style={{ margin: "10px 0" }}
                    >
                      <div style={{ display: "flex" }}>
                        <input
                          type="checkbox"
                          checked={
                            addons.Storage.active === true ? "checked" : ""
                          }
                          // onChange={() => {
                          //   handleAddons("Storage");
                          // }}
                          {...register("Storage", {
                            required: true,
                            onChange: () => handleAddons("Storage"),
                          })}
                        />
                        <div className="titleContainer">
                          <span>Larger Storage</span>
                          <span>Extra 1TB of cloud save</span>
                        </div>
                      </div>

                      {isYearly && (
                        <span style={{ color: "purple" }}>
                          +${addons.Storage.Price}/mo
                        </span>
                      )}
                      {!isYearly && (
                        <span style={{ color: "purple" }}>
                          +${addons.Storage.Price * 10}/yr
                        </span>
                      )}
                    </div>

                    <div
                      className={
                        addons.Custom.active === true
                          ? "addonCard activeAddon"
                          : "addonCard"
                      }
                    >
                      <div style={{ display: "flex" }}>
                        <input
                          type="checkbox"
                          checked={
                            addons.Custom.active === true ? "checked" : ""
                          }
                          // onChange={() => {
                          //   handleAddons("Custom");
                          // }}
                          {...register("Custom", {
                            required: true,
                            onChange: () => handleAddons("Custom"),
                          })}
                        />
                        <div className="titleContainer">
                          <span>Customizable profile</span>
                          <span>Custom theme on your profile</span>
                        </div>
                      </div>

                      {isYearly && (
                        <span style={{ color: "purple" }}>
                          +${addons.Custom.Price}/mo
                        </span>
                      )}
                      {!isYearly && (
                        <span style={{ color: "purple" }}>
                          +${addons.Custom.Price * 10}/yr
                        </span>
                      )}
                    </div>
                  </div>
                  <button className="prevBtn" onClick={handlePrevStep}>
                    Go Back
                  </button>
                  <button className="nextBtn" onClick={handleNextStep}>
                    Next Step
                  </button>
                </div>
              ) /* <!-- Step 3 end --> */
            }

            {
              step === 4 && (
                /* <!-- Step 4 start --> */ <div className="content">
                  {/* Finishing up Double-check everything looks OK before confirming. */}
                  {/* <!-- Dynamically add subscription and add-on selections here --> */}
                  {/* Total (per month/year) Go Back Confirm */}
                  <h1>Finishing up</h1>
                  <span>
                    Double-check everything looks OK before confirming.
                  </span>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      marginTop: "30px",
                      justifyContent: "space-between",
                      height: "50%",
                    }}
                  >
                    <div className="previewCard">
                      <div className="planPreview">
                        <div>
                          <span>
                            {selectedPlan} ({isYearly ? "Monthly" : "Yearly"})
                          </span>
                          <span onClick={() => setStep(2)}>Change</span>
                        </div>
                        {isYearly && (
                          <span>${plans[selectedPlan].price}/mo</span>
                        )}
                        {!isYearly && (
                          <span>${plans[selectedPlan].price * 10}/yr</span>
                        )}
                      </div>
                      <div className="addonsPreview">
                        {Object.keys(addons).map((addonName, index) => {
                          const addon = addons[addonName];
                          return addon.active ? (
                            <div key={index}>
                              <span>{addon.Title}</span>
                              {isYearly === false ? (
                                <>
                                  <span>+${addon.Price * 10}/yr</span>
                                </>
                              ) : (
                                <>
                                  <span>+${addon.Price}/mo</span>
                                </>
                              )}
                            </div>
                          ) : null;
                        })}
                      </div>
                    </div>
                    <div className="totalPreview">
                      {isYearly === false ? (
                        <>
                          <span>Total (per year)</span>
                          <span>${calcTotal()}/yr</span>
                        </>
                      ) : (
                        <>
                          <span>Total (per month)</span>
                          <span>+${calcTotal()}/mo</span>
                        </>
                      )}
                    </div>
                  </div>
                  <button className="prevBtn" onClick={handlePrevStep}>
                    Go Back
                  </button>
                  <input className="nextBtn" value="Confirm" type="submit" />
                </div>
              ) /* <!-- Step 4 end --> */
            }
          </form>
          {
            step === 5 && (
              /* <!-- Step 5 start --> */ <div className="thankyou">
                {/* Thank you! Thanks for confirming your subscription! We hope you have
          fun using our platform. If you ever need support, please feel free to
          email us at support@loremgaming.com. */}
                <img
                  src="src/assets/images/icon-thank-you.svg"
                  alt="icon thank you"
                />
                <h1>Thank you!</h1>
                <p>
                  Thanks for confirming your subscription! We hope you have fun
                  using our platform. If you ever need support, please feel free
                  to email us at support@loremgaming.com.
                </p>
              </div>
            ) /* <!-- Step 5 end --> */
          }
        </div>
      </div>
      <div className="mobileFooter">
        {step != 1 && (
          <button className="mobilePrevBtn" onClick={handlePrevStep}>
            Go Back
          </button>
        )}

        <button className="mobileNextBtn" onClick={handleNextStep}>
          Next Step
        </button>
      </div>
      <div className="attribution">
        Challenge by{" "}
        <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
          Frontend Mentor
        </a>
        . Coded by <a href="#">Your Name Here</a>.
      </div>
    </>
  );
}

export default App;
