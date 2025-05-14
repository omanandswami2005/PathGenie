//landing page
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

import GradientInput from '../components/Input/GradientInput';
import SlideButton from '../components/Buttons/SlideButton';
import TrueFocus from '../components/Animation/TrueFocus';
import { signIn } from '../lib/auth-client';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();
    const handleGoogleSignIn = async () => {
        try {
            await signIn.social({ provider: "google", callbackURL: "/" });
            console.log("Signed in with Google");
        } catch (error) {
            console.error("Google sign-in error:", error.message);
        }
    };

    const handleGitHubSignIn = async () => {
        try {
            await signIn.social(
                { provider: "github", callbackURL: "http://localhost:5173" },
                {
                    // onSuccess: () => {
                    //   navigate({ to: "http://localhost:5173" });
                    // },
                    onError: (error) => {
                        console.error(error);
                    },
                }
            );
            console.log("Signed in with GitHub");
        } catch (error) {
            console.error("GitHub sign-in error:", error.message);
        }
    };

    const handleLogin = async () => {
        navigate("/login");
    };

    const handleRegister = async () => {
        navigate("/register");
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="shadow-lg p-8 sm:p-12 w-full max-w-md">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Welcome to Path Genie</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">Your personal productivity companion</p>
                <div className="flex flex-col space-y-4">
                    <GradientInput id="email" name="email" type="email" placeholder="Email" required />
                    <GradientInput id="password" name="password" type="password" placeholder="Password" required />
                </div>
                <div className="flex justify-between mt-4">
                    <SlideButton text="Login" onClick={handleLogin} />
                    <SlideButton text="Register" onClick={handleRegister} />
                </div>
                <div className="flex justify-between mt-4">
                    <SlideButton text="Google" onClick={handleGoogleSignIn} />
                    <SlideButton text="GitHub" onClick={handleGitHubSignIn} />
                </div>
            </div>
        </div>
    );
};

export default LandingPage;