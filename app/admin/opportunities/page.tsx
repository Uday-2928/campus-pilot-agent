'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminOpportunities() {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    event_type: 'hackathon',
    organizer: '',
    description: '',
    registration_deadline: '',
    location: 'Online',
    mode: 'Online',
    url: ''
  });

  const fetchOpportunities = async () => {
    try {
      const res = await fetch('/api/opportunities');
      const data = await res.json();
      setOpportunities(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/opportunities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      setFormData({
        title: '', event_type: 'hackathon', organizer: '', description: '',
        registration_deadline: '', location: 'Online', mode: 'Online', url: ''
      });
      fetchOpportunities();
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-8">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        
        <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div>
            <h1 className="text-2xl font-bold">Manage Opportunities</h1>
            <p className="text-sm text-slate-500 mt-1">Add, edit, or remove platform opportunities.</p>
          </div>
          <Link href="/admin" className="text-blue-600 font-semibold hover:underline">
            &larr; Back to Dashboard
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold mb-4">Add New Opportunity</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase">Title</label>
                <input required type="text" className="w-full mt-1 p-2 border rounded-lg" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase">Type</label>
                <select className="w-full mt-1 p-2 border rounded-lg" value={formData.event_type} onChange={e => setFormData({...formData, event_type: e.target.value})}>
                  <option value="hackathon">Hackathon</option>
                  <option value="internship">Internship</option>
                  <option value="drive">Campus Drive</option>
                  <option value="scholarship">Scholarship</option>
                  <option value="workshop">Workshop</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase">Organizer / Company</label>
                <input required type="text" className="w-full mt-1 p-2 border rounded-lg" value={formData.organizer} onChange={e => setFormData({...formData, organizer: e.target.value})} />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase">Description</label>
                <textarea required className="w-full mt-1 p-2 border rounded-lg h-24" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase">Deadline</label>
                <input required type="date" className="w-full mt-1 p-2 border rounded-lg" value={formData.registration_deadline} onChange={e => setFormData({...formData, registration_deadline: e.target.value})} />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase">Location</label>
                <input type="text" className="w-full mt-1 p-2 border rounded-lg" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase">Application URL</label>
                <input type="url" className="w-full mt-1 p-2 border rounded-lg" value={formData.url} onChange={e => setFormData({...formData, url: e.target.value})} />
              </div>
              
              <button disabled={loading} type="submit" className="mt-4 bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50">
                {loading ? 'Saving...' : 'Add Opportunity'}
              </button>
            </form>
          </div>

          {/* List */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold mb-4">Existing Opportunities</h2>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <div className="flex flex-col gap-3 max-h-[600px] overflow-y-auto pr-2">
                {opportunities.map((opp, idx) => (
                  <div key={idx} className="p-4 border rounded-xl flex flex-col gap-2 bg-slate-50">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-slate-900">{opp.title}</h3>
                      <span className="text-xs font-semibold uppercase bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {opp.event_type}
                      </span>
                    </div>
                    <div className="text-sm text-slate-600 font-medium">{opp.organizer}</div>
                    <div className="text-sm text-slate-500 line-clamp-2">{opp.description}</div>
                    <div className="text-xs text-slate-400 mt-2 flex gap-4">
                      <span>Deadline: {new Date(opp.registration_deadline).toLocaleDateString()}</span>
                      <span>Location: {opp.location}</span>
                    </div>
                  </div>
                ))}
                {opportunities.length === 0 && (
                  <div className="text-slate-500 p-4 border rounded-xl text-center">No opportunities found.</div>
                )}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
