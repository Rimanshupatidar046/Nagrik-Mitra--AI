import React, { useState } from 'react';
import {
  ShieldCheck,
  CreditCard,
  MapPin,
  Users,
  Edit3,
  Phone,
} from 'lucide-react';
import Button from '../components/Button';
import { useToast } from '../context/ToastContext';
import { mockUser } from '../data/mockData';

export const Profile = () => {
  const [user, setUser] = useState(mockUser);
  const [isEditing, setIsEditing] = useState(false);
  const [phone, setPhone] = useState(mockUser.phone);
  const { toast } = useToast();

  const handleSave = () => {
    setUser({ ...user, phone });
    setIsEditing(false);
    toast.success('Profile Updated', 'Contact information updated successfully.');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              Citizen Profile
            </h1>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              Aadhaar Verified
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Your verified personal records, family details, and linked direct benefit bank accounts
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          icon={Edit3}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancel Edit' : 'Edit Contact Info'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Identity Snapshot */}
        <div className="card-hover p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center text-2xl font-bold mb-4 shadow-xs">
            RK
          </div>
          <h2 className="text-lg font-bold text-slate-900">{user.name}</h2>
          <span className="text-xs text-slate-500 mt-0.5">Citizen ID: {user.id}</span>

          <div className="mt-4 inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>UIDAI Biometric Verified</span>
          </div>

          <div className="mt-6 w-full pt-4 border-t border-slate-100 text-left space-y-3 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Aadhaar:</span>
              <span className="font-mono text-slate-800 font-medium">{user.aadhaar}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">PAN Number:</span>
              <span className="font-mono text-slate-800 font-medium">{user.pan}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Ration Card:</span>
              <span className="font-mono text-slate-800 font-medium">{user.rationCard}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Category:</span>
              <span className="font-medium text-teal-700">{user.category}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Income Ceiling:</span>
              <span className="font-medium text-slate-800">{user.income}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Contact & Bank Mandates (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Address & Contact */}
          <div className="card-hover p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Residential Address & Contact</h3>
              <span className="text-xs text-teal-700 font-medium">Varanasi Sadar Block</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-slate-400 flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-teal-700" />
                  <span>State & District:</span>
                </span>
                <p className="font-semibold text-slate-900">{user.district}, {user.state} (PIN: {user.pincode})</p>
                <p className="text-slate-500">Tehsil: Sadar • Gram Panchayat: Shivpur Rural</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-slate-400 flex items-center space-x-1">
                  <Phone className="w-3.5 h-3.5 text-teal-700" />
                  <span>Linked Phone:</span>
                </span>
                {isEditing ? (
                  <div className="space-y-2 mt-2">
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs text-slate-900"
                    />
                    <Button variant="primary" size="xs" onClick={handleSave}>
                      Save Updates
                    </Button>
                  </div>
                ) : (
                  <>
                    <p className="font-semibold text-slate-900">{user.phone}</p>
                    <p className="text-slate-500">{user.email}</p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* NPCI Bank Accounts */}
          <div className="card-hover p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <CreditCard className="w-4 h-4 text-emerald-600" />
                <h3 className="text-base font-bold text-slate-900">Direct Benefit Transfer (DBT) Bank Account</h3>
              </div>
              <span className="text-xs font-semibold text-emerald-800 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">
                Aadhaar Linked
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <div className="font-semibold text-slate-900">State Bank of India (Varanasi Main Branch)</div>
                <div className="font-mono text-slate-500 mt-0.5">A/C: XXXX-XXXX-4819 • IFSC: SBIN0000201</div>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-emerald-700 font-medium">Active Beneficiary Account</span>
                <div className="text-slate-400">Mapped to Aadhaar Virtual ID</div>
              </div>
            </div>
          </div>

          {/* Household Family Members */}
          <div className="card-hover p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-teal-700" />
                <h3 className="text-base font-bold text-slate-900">Household Family Members</h3>
              </div>
              <span className="text-xs text-slate-400">3 Members Linked</span>
            </div>

            <div className="space-y-2 text-xs">
              {[
                { name: 'Sunita Sharma', relation: 'Spouse', age: '35', uid: 'XXXX-XXXX-9120', status: 'Covered under Ayushman' },
                { name: 'Amit Sharma', relation: 'Son', age: '14', uid: 'XXXX-XXXX-1104', status: 'Eligible for Scholarship' },
                { name: 'Pooja Sharma', relation: 'Daughter', age: '11', uid: 'XXXX-XXXX-8821', status: 'Girl Child Welfare' },
              ].map((member, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-slate-900">{member.name}</span>
                    <span className="text-slate-400 ml-2">({member.relation}, {member.age} yrs)</span>
                    <div className="font-mono text-[11px] text-slate-400">{member.uid}</div>
                  </div>
                  <span className="text-xs font-medium text-teal-700">{member.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
