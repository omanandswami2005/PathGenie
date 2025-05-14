import React, { useState } from "react";
import GradientInput from "../components/Input/GradientInput";
import SlideButton from "../components/Buttons/SlideButton";
import TrueFocus from "../components/Animation/TrueFocus";
import { signIn, signUp } from "../lib/auth-client";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    username: "",
    password: "",
    passwordMatch: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear relevant errors on change
    setErrors((prev) => ({
      ...prev,
      [name]: "",
      ...(name === "password" || name === "confirmPassword" ? { passwordMatch: "" } : {}),
    }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword) newErrors.passwordMatch = "Passwords do not match";

    setErrors((prev) => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const handleSocialSignIn = async (provider) => {
    try {
      await signIn.social({
        provider,
        callbackURL: "http://localhost:5173/dashboard",
        newUserCallbackURL: "http://localhost:5173/profile",
      });
      console.log(`Successfully signed in with ${provider}`);
    } catch (error) {
      console.error(`Error during ${provider} sign-in:`, error.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.username,
      });
      console.log("User registered successfully:", { email: formData.email, username: formData.username });
      navigate("/dashboard");
    } catch (error) {
      console.error("Registration failed:", error.message);
      setErrors((prev) => ({ ...prev, general: "Registration failed. Please try again." }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="shadow-lg p-2 sm:p-6 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10 text-center">
          <TrueFocus
            sentence="Register Here!"
            blurAmount={6}
            borderColor="white"
            glowColor="red"
            manualMode
            animationDuration={0.5}
          />
        </h2>

        <div className="flex justify-center space-x-4 mb-6 border-b-2 border-gray-300 pb-3">
          <SlideButton text="Google" icon={<GoogleIcon />} onClick={() => handleSocialSignIn("google")} />
          <SlideButton text="GitHub" icon={<GitHubIcon />} onClick={() => handleSocialSignIn("github")} />
        </div>

        <form className="space-y-6" onSubmit={handleRegister}>
          <div className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-4">
            <InputField
              label="Email"
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
              error={errors.email}
            />
            <InputField
              label="Username"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Choose a username"
              required
              error={errors.username}
            />
          </div>

          <div className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-4">
            <InputField
              label="Password"
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
              error={errors.password}
            />
            <InputField
              label="Confirm Password"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              required
              error={errors.passwordMatch}
            />
          </div>

          {errors.general && <div className="text-red-500 text-sm text-center">{errors.general}</div>}

          <div className="text-center border-b-2 border-gray-300 pb-3 border-x-2">
            <SlideButton
              type="submit"
              text="Register"
              icon={<ArrowIcon />}
              style={{ width: "70%" }}
              disabled={isSubmitting}
            />
          </div>
        </form>

        <p className="mt-2 text-center text-sm text-white dark:text-white">
          Already have an account? <br />
          <SlideButton
            text="Login"
            icon={<LoginIcon />}
            style={{ width: "70%", marginTop: "0.5em" }}
            onClick={() => navigate("/login")}
          />
        </p>
      </div>
    </div>
  );
};

const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-google" viewBox="0 0 16 16">
    <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
  </svg>
);

const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
  </svg>
);

const ArrowIcon = () => (
  <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 16">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m2.707 14.293 5.586-5.586a1 1 0 0 0 0-1.414L2.707 1.707A1 1 0 0 0 1 2.414v11.172a1 1 0 0 0 1.707.707Z" />
  </svg>
);

const LoginIcon = () => (
  <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3" />
  </svg>
);

const InputField = ({ label, id, name, type = "text", value, onChange, placeholder, required, error }) => (
  <div className="w-full sm:w-1/2">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-white">
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>
    <GradientInput
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full sm:w-[220px]"
      required={required}
    />
    {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
  </div>
);

export default Register;