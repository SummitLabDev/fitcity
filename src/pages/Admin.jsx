import { useState, useEffect } from 'react';
import { RefreshCw, Check, X } from 'lucide-react';
import clsx from 'clsx';
import AnimatedPage from '../components/AnimatedPage';
import Container from '../components/Container';
import Button from '../components/ui/Button';

const Admin = () => {
  const [signups, setSignups] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingNotes, setEditingNotes] = useState({});
  const [saving, setSaving] = useState({});
  const [activeTab, setActiveTab] = useState('pending_pickup');

  const loadSignups = async (status = 'pending_pickup') => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/signups?status=${status}`);
      const data = await response.json();
      if (data.signups) {
        setSignups(data.signups);
        // Initialize editing notes
        const notes = {};
        data.signups.forEach((s) => {
          notes[s.id] = { paidInPerson: s.paidInPerson, adminNotes: s.adminNotes || '' };
        });
        setEditingNotes(notes);
      }
    } catch (error) {
      console.error('Failed to load signups', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (signupId) => {
    setSaving((prev) => ({ ...prev, [signupId]: true }));
    try {
      await fetch('/api/admin/update-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          signupId,
          paidInPerson: editingNotes[signupId].paidInPerson,
          adminNotes: editingNotes[signupId].adminNotes,
        }),
      });
      // Reload signups to reflect changes
      await loadSignups(activeTab);
    } catch (error) {
      console.error('Failed to save', error);
    } finally {
      setSaving((prev) => ({ ...prev, [signupId]: false }));
    }
  };

  const togglePaid = (signupId) => {
    setEditingNotes((prev) => ({
      ...prev,
      [signupId]: {
        ...prev[signupId],
        paidInPerson: !prev[signupId].paidInPerson,
      },
    }));
  };

  const updateNotes = (signupId, notes) => {
    setEditingNotes((prev) => ({
      ...prev,
      [signupId]: {
        ...prev[signupId],
        adminNotes: notes,
      },
    }));
  };

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    loadSignups(newTab);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  useEffect(() => {
    // Load signups on mount and when tab changes
    // Authentication is handled by Cloudflare Access
    loadSignups(activeTab);
  }, [activeTab]);

  // Authentication is handled by Cloudflare Access
  // If user reaches this page, they are already authenticated

  return (
    <AnimatedPage>
      <section className="min-h-screen py-12 lg:py-16">
        <Container size="full">
          {/* Tab Navigation */}
          <div className="mb-6 flex gap-3">
            <button
              type="button"
              onClick={() => handleTabChange('pending_pickup')}
              className={clsx(
                'rounded-full border px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.3em] transition',
                activeTab === 'pending_pickup'
                  ? 'border-fitcity text-fitcity bg-fitcity/10'
                  : 'border-white/10 text-white/60 hover:border-white/30 hover:text-white'
              )}
            >
              Pending
            </button>
            <button
              type="button"
              onClick={() => handleTabChange('paid')}
              className={clsx(
                'rounded-full border px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.3em] transition',
                activeTab === 'paid'
                  ? 'border-fitcity text-fitcity bg-fitcity/10'
                  : 'border-white/10 text-white/60 hover:border-white/30 hover:text-white'
              )}
            >
              Paid
            </button>
          </div>

          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="font-display text-3xl">
                {activeTab === 'pending_pickup' ? 'Pending Signups' : 'Paid Signups'}
              </h1>
              <p className="mt-1 text-white/60">
                {signups.length} {activeTab === 'pending_pickup' ? 'pending' : 'paid'}
              </p>
            </div>
            <Button
              variant="ghost"
              icon={RefreshCw}
              onClick={() => loadSignups(activeTab)}
              disabled={isLoading}
            >
              Refresh
            </Button>
          </div>

          {isLoading ? (
            <div className="text-center text-white/60">Loading...</div>
          ) : signups.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-12 text-center">
              <p className="text-white/60">
                No {activeTab === 'pending_pickup' ? 'pending' : 'paid'} signups
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.02]">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-white/10 bg-white/5">
                  <tr>
                    <th className="px-4 py-3 font-medium">Name</th>
                    <th className="px-4 py-3 font-medium">Contact</th>
                    <th className="px-4 py-3 font-medium">Membership</th>
                    <th className="px-4 py-3 font-medium">Start Date</th>
                    <th className="px-4 py-3 font-medium">IBAN</th>
                    <th className="px-4 py-3 font-medium">Paid</th>
                    <th className="px-4 py-3 font-medium">Notes</th>
                    <th className="px-4 py-3 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {signups.map((signup) => (
                    <tr key={signup.id} className="hover:bg-white/[0.02]">
                      <td className="px-4 py-3">
                        <div className="font-medium">{signup.firstName} {signup.lastName}</div>
                        <div className="text-xs text-white/50">{new Date(signup.createdAt).toLocaleDateString()}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-white/80">{signup.email}</div>
                        <div className="text-xs text-white/50">{signup.phone}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-medium text-fitcity">{signup.membershipName}</div>
                        <div className="text-xs text-white/50">€{signup.membershipPrice}/{signup.membershipTerm}</div>
                      </td>
                      <td className="px-4 py-3 text-white/80">
                        {new Date(signup.startDate).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        {signup.iban ? (
                          <button
                            onClick={() => copyToClipboard(signup.iban)}
                            className="font-mono text-xs text-white/80 hover:text-fitcity"
                            title="Click to copy"
                          >
                            {signup.iban}
                          </button>
                        ) : (
                          <span className="text-white/40">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => togglePaid(signup.id)}
                          className={`flex h-8 w-8 items-center justify-center rounded-lg border transition ${
                            editingNotes[signup.id]?.paidInPerson
                              ? 'border-green-500 bg-green-500/20 text-green-400'
                              : 'border-white/10 bg-white/5 text-white/40 hover:border-white/30'
                          }`}
                        >
                          {editingNotes[signup.id]?.paidInPerson ? <Check className="h-5 w-5" /> : <X className="h-5 w-5" />}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={editingNotes[signup.id]?.adminNotes || ''}
                          onChange={(e) => updateNotes(signup.id, e.target.value)}
                          placeholder="Add notes..."
                          className="w-full rounded border border-white/10 bg-white/5 px-2 py-1 text-xs text-white outline-none focus:border-fitcity"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSave(signup.id)}
                          disabled={saving[signup.id]}
                        >
                          {saving[signup.id] ? 'Saving...' : 'Save'}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Container>
      </section>
    </AnimatedPage>
  );
};

export default Admin;
