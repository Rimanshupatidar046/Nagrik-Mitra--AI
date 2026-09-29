import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  User,
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import Button from '../components/Button';
import { useToast } from '../context/ToastContext';

export const Signup = () => {
  const [fullName, setFullName] = useState('Rajesh Kumar Sharma');
  const [identifier, setIdentifier] = useState('rajesh.sharma@example.com');
  const [password, setPassword] = useState('Password@123');
  const [confirmPassword, setConfirmPassword] = useState('Password@123');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignup = (e) => {
    e.preventDefault();

    if (!fullName.trim() || !identifier.trim() || !password.trim()) {
      toast.warning('Fields Required', 'Please complete all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Password Mismatch', 'The passwords entered do not match. Please re-check.');
      return;
    }

    if (!agreeTerms) {
      toast.warning('Consent Required', 'Please acknowledge the citizen data consent terms.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success(
        'Account Created Successfully',
        `Welcome to Nagrik Mitra, ${fullName}! Your citizen desk is ready.`
      );
      navigate('/dashboard');
    }, 700);
  };

  const handleQuickDemoSignup = () => {
    toast.success('Demo Account Activated', 'Welcome to Nagrik Mitra, Rajesh Kumar Sharma!');
    navigate('/dashboard');
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
          Create your citizen account
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-500">
          Sign up to discover schemes, verify documents with DigiLocker, and track applications
        </p>
      </div>

      {/* Main Signup Card */}
      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="card-hover bg-white py-8 px-6 sm:px-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
          <form onSubmit={handleSignup} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Full Name (as per Aadhaar / Official ID)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Rajesh Kumar Sharma"
                  className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-700 focus:bg-white focus:ring-1 focus:ring-teal-700 transition-colors"
                  required
                />
                <User className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Mobile / Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Mobile / Email
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="e.g. 9876543210 or name@example.com"
                  className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-700 focus:bg-white focus:ring-1 focus:ring-teal-700 transition-colors"
                  required
                />
                <Mail className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
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

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-700 focus:bg-white focus:ring-1 focus:ring-teal-700 transition-colors"
                  required
                />
                <Lock className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Terms consent */}
            <div className="pt-1">
              <label className="flex items-start space-x-2.5 text-xs text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 rounded border-slate-300 text-teal-700 focus:ring-teal-500"
                />
                <span>
                  I agree to securely verify my identity through DigiLocker & Aadhaar public welfare guidelines.
                </span>
              </label>
            </div>

            {/* Create Account Button */}
            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isLoading}
              className="w-full py-2.5 mt-2"
              icon={ArrowRight}
              iconPosition="right"
            >
              Create Account
            </Button>
          </form>

          {/* Quick Demo Access Bar */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-400">For instant reviewer testing:</span>
            <button
              type="button"
              onClick={handleQuickDemoSignup}
              className="font-semibold text-teal-700 hover:text-teal-800 flex items-center space-x-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>1-Click Demo Signup</span>
            </button>
          </div>

          {/* Already have an account link */}
          <div className="pt-1 text-center text-xs sm:text-sm text-slate-500">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-semibold text-teal-700 hover:text-teal-800 transition-colors"
            >
              Login
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

export default Signup;
