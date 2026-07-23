'use client';
import { useState, useEffect } from 'react';
import { settingsApi } from '@/lib/api';
import { FiSave, FiCheck } from 'react-icons/fi';

const settingGroups = [
  {
    group: 'general',
    label: 'General Settings',
    fields: [
      { key: 'site_name', label: 'Site Name', type: 'text' },
      { key: 'site_tagline', label: 'Tagline', type: 'text' },
      { key: 'top_bar_text', label: 'Top Bar Text', type: 'text' },
    ],
  },
  {
    group: 'contact',
    label: 'Contact Information',
    fields: [
      { key: 'site_phone', label: 'Phone Number', type: 'text' },
      { key: 'site_email', label: 'Email Address', type: 'email' },
      { key: 'site_address', label: 'Address', type: 'text' },
      { key: 'working_hours', label: 'Working Hours', type: 'text' },
      { key: 'whatsapp_number', label: 'WhatsApp Number', type: 'text' },
    ],
  },
  {
    group: 'social',
    label: 'Social Media Links',
    fields: [
      { key: 'facebook_url', label: 'Facebook URL', type: 'url' },
      { key: 'instagram_url', label: 'Instagram URL', type: 'url' },
      { key: 'youtube_url', label: 'YouTube URL', type: 'url' },
    ],
  },
  {
    group: 'theme',
    label: 'Theme Colors',
    fields: [
      { key: 'primary_color', label: 'Primary Color', type: 'color' },
      { key: 'secondary_color', label: 'Secondary Color', type: 'color' },
    ],
  },
  {
    group: 'seo',
    label: 'SEO Settings',
    fields: [
      { key: 'meta_title', label: 'Meta Title', type: 'text' },
      { key: 'meta_description', label: 'Meta Description', type: 'textarea' },
    ],
  },
];

export default function AdminSettingsPage() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    settingsApi.getAll().then(({ data }) => {
      setValues(data.settings || {});
    }).finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await settingsApi.update(values);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally { setSaving(false); }
  };

  if (loading) return <div className="animate-pulse space-y-4">{[...Array(3)].map((_, i) => <div key={i} className="h-32 bg-white rounded-2xl" />)}</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-[#111]">Site Settings</h1>
          <p className="text-gray-500 text-sm">All changes reflect instantly on the frontend</p>
        </div>
        <button onClick={handleSave} disabled={saving}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${saved ? 'bg-green-500 text-white' : 'btn-primary'}`}>
          {saved ? <><FiCheck /> Saved!</> : <><FiSave /> {saving ? 'Saving...' : 'Save All Changes'}</>}
        </button>
      </div>

      {settingGroups.map((group) => (
        <div key={group.group} className="bg-white rounded-2xl border border-[#EAEAEA] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#EAEAEA] bg-gray-50">
            <h2 className="font-bold text-[#111]">{group.label}</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
            {group.fields.map((field) => (
              <div key={field.key} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                <label className="text-sm font-semibold text-[#111] mb-1.5 block">{field.label}</label>
                {field.type === 'textarea' ? (
                  <textarea value={values[field.key] || ''} onChange={(e) => setValues(prev => ({ ...prev, [field.key]: e.target.value }))}
                    rows={3} className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00] resize-none" />
                ) : field.type === 'color' ? (
                  <div className="flex items-center gap-3">
                    <input type="color" value={values[field.key] || '#5FAF00'}
                      onChange={(e) => setValues(prev => ({ ...prev, [field.key]: e.target.value }))}
                      className="w-12 h-10 rounded-lg border border-[#EAEAEA] cursor-pointer" />
                    <input type="text" value={values[field.key] || ''}
                      onChange={(e) => setValues(prev => ({ ...prev, [field.key]: e.target.value }))}
                      className="flex-1 px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00]" />
                  </div>
                ) : (
                  <input type={field.type} value={values[field.key] || ''}
                    onChange={(e) => setValues(prev => ({ ...prev, [field.key]: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00]" />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
