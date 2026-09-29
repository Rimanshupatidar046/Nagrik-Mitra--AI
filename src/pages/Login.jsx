import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  Eye,
  EyeOff,
  UserCheck,
} from 'lucide-react';
import Button from '../components/Button';
import { useToast } from '../context/ToastContext';
import { mockUser } from '../data/mockData';

export const Login = () => {
  const [identifier, setIdentifier] = useState('rajesh.sharma@example.com');
  const [password, setPassword] = useState('Password@123');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!identifier.trim() || !password.trim()) {
      toast.warning('Input Required', 'Please enter your email or mobile number and password.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Login Successful', `Welcome back, ${mockUser.name}!`);
      navigate('/dashboard');
    }, 600);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Signed in with Google', `Welcome back, ${mockUser.name}!`);
      navigate('/dashboard');
    }, 600);
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    toast.info(
      'Password Reset Link Sent',
      `A secure reset link has been dispatched to ${identifier || 'your registered contact'}.`
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center px-4">
        <Link to="/" className="inline-flex items-center space-x-2.5 group mb-4">
          <div className="w-10 h-10 rounded-xl bg-teal-700 flex items-center justify-center text-white shadow-sm">
            <ShieldCheck className="w-5 h-5 text-teal-100" />
          </div>
          <div className="text-left">
            <div className="flex items-center space-x-1.5">
              <span className="text-lg font-bold tracking-tight text-slate-900">
                NAGRIK MITRA
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                AI
              </span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium block -mt-0.5">
              Citizen Welfare Portal
            </span>
          </div>
        </Link>

        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Sign in to your account
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-500">
          Access your citizen welfare dashboard, verified records, and active applications
        </p>
      </div>

      {/* Main Login Card */}
      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="card-hover bg-white py-8 px-6 sm:px-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Identifier Field: Email / Mobile */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Email / Mobile Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="e.g. rajesh@example.com or 9876543210"
                  className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-700 focus:bg-white focus:ring-1 focus:ring-teal-700 transition-colors"
                  required
                />
                <Mail className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Password
                </label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-xs font-medium text-teal-700 hover:text-teal-800 transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-700 focus:bg-white focus:ring-1 focus:ring-teal-700 transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1 text-slate-400 hover:text-slate-600 absolute right-2.5 top-1/2 -translate-y-1/2"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Login Action Button */}
            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isLoading}
              className="w-full py-2.5 mt-2"
              icon={ArrowRight}
              iconPosition="right"
            >
              Login
            </Button>
          </form>

          {/* Social / SSO Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-3 text-slate-400">or</span>
            </div>
          </div>

          {/* Continue with Google */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold flex items-center justify-center space-x-2.5 transition-colors shadow-xs"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Quick Demo Access Bar */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-400">Need immediate demo access?</span>
            <button
              type="button"
              onClick={() => {
                toast.success('Instant Citizen Demo', 'Logged in as Rajesh Kumar Sharma');
                navigate('/dashboard');
              }}
              className="font-semibold text-teal-700 hover:text-teal-800 flex items-center space-x-1"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>1-Click Demo Login</span>
            </button>
          </div>

          {/* Sign Up Redirect Link */}
          <div className="pt-1 text-center text-xs sm:text-sm text-slate-500">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="font-semibold text-teal-700 hover:text-teal-800 transition-colors"
            >
              Create Account
            </Link>
          </div>
        </div>

        {/* Back to Home Link */}
        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-xs text-slate-500 hover:text-slate-800 transition-colors font-medium"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
