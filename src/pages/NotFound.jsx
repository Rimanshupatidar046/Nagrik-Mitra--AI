import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 text-center border-slate-200 bg-white shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto mb-4 text-amber-600">
          <ShieldAlert className="w-7 h-7" />
        </div>
        <h1 className="text-xl font-bold text-slate-900 mb-1">404 — Page Not Found</h1>
        <p className="text-xs text-slate-500 mb-6 leading-relaxed">
          The requested citizen services node or route could not be found. Please check your URL or return to the main dashboard.
        </p>
        <div className="flex items-center justify-center space-x-3">
          <Button variant="secondary" size="sm" icon={ArrowLeft} onClick={() => navigate(-1)}>
            Go Back
          </Button>
          <Button variant="primary" size="sm" icon={Home} onClick={() => navigate('/')}>
            Return Home
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default NotFound;
