import React, { useState } from 'react';
import { Send, CheckCircle, Mail, User, Phone, MessageSquare, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

const serviceOptions = [
  { value: 'video_editing', label: 'Video Editing' },
  { value: 'social_media', label: 'Social Media' },
  { value: 'content_creation', label: 'Content Creation' },
  { value: 'other', label: 'Sonstiges' }
];

export default function ContactSection() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [errors, setErrors] = useState({name: '', email: '', message: ''});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name ist erforderlich';
    if (!form.email.trim()) errs.email = 'E-Mail ist erforderlich';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Ungültige E-Mail';
    if (!form.message.trim()) errs.message = 'Nachricht ist erforderlich';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  return (
    <section id='contact' className='relative py-24'>
      <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl sm:text-4xl font-bold text-foreground mb-4'>
            Projekt <span className='text-primary'>anfragen</span>
          </h2>
          <p className='text-muted-foreground max-w-xl mx-auto'>
            Hast du eine Idee oder ein geplantes Projekt? Schreib mir – ich melde mich schnellstmöglich zurück.
          </p>
        </div>

        {submitted ? (
          <div className='text-center p-8 rounded-xl border border-border bg-card/50'>
            <CheckCircle className='w-12 h-12 text-primary mx-auto mb-4' />
            <h3 className='text-xl font-semibold text-foreground mb-2'>Anfrage gesendet!</h3>
            <p className='text-muted-foreground mb-6'>
              Vielen Dank für deine Nachricht. Ich werde mich in Kürze bei dir melden.
            </p>
            <button
              onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', service: '', message: '' }); }}
              className='inline-flex items-center px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity'
            >
              Neue Anfrage
            </button>
          </div>
        ) : (
          <form
            className='space-y-6'
            onSubmit={async (e) => {
              e.preventDefault();
              if (!validate()) return;
              
              try {
                const response = await fetch('http://localhost:3013/contact', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(form)
                });
                
                const data = await response.json();
                
                if (data.success) {
                  setSubmitted(true);
                } else {
                  alert(data.error || 'Es gab ein Problem beim Senden.');
                }
              } catch (error) {
                console.error('Error:', error);
                alert('Es gab ein Problem beim Senden. Bitte versuche es erneut.');
              }
            }}
          >

            <div className='grid sm:grid-cols-2 gap-6'>
              <div className='space-y-2'>
                <label className='text-sm font-medium text-foreground flex items-center gap-2'>
                  <User className='w-4 h-4 text-primary' />
                  Name *
                </label>
                <input
                  type='text'
                  name='name'
                  value={form.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className={cn(
                    'w-full px-4 py-3 rounded-lg bg-card border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50',
                    errors.name ? 'border-destructive' : 'border-border'
                  )}
                  placeholder='Dein Name'
                />
                {errors.name && <p className='text-xs text-destructive'>{errors.name}</p>}
              </div>

              <div className='space-y-2'>
                <label className='text-sm font-medium text-foreground flex items-center gap-2'>
                  <Mail className='w-4 h-4 text-primary' />
                  E-Mail *
                </label>
                <input
                  type='email'
                  name='email'
                  value={form.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={cn(
                    'w-full px-4 py-3 rounded-lg bg-card border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50',
                    errors.email ? 'border-destructive' : 'border-border'
                  )}
                  placeholder='deine@email.de'
                />
                {errors.email && <p className='text-xs text-destructive'>{errors.email}</p>}
              </div>
            </div>

            <div className='grid sm:grid-cols-2 gap-6'>
              <div className='space-y-2'>
                <label className='text-sm font-medium text-foreground flex items-center gap-2'>
                  <Phone className='w-4 h-4 text-primary' />
                  Telefon (optional)
                </label>
                <input
                  type='tel'
                  name='phone'
                  value={form.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className='w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50'
                  placeholder='+49 123 456789'
                />
              </div>

              <div className='space-y-2'>
                <label className='text-sm font-medium text-foreground flex items-center gap-2'>
                  <Layers className='w-4 h-4 text-primary' />
                  Gewünschter Service
                </label>
                <select
                  name='service'
                  value={form.service}
                  onChange={(e) => handleChange('service', e.target.value)}
                  className='w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none'
                >
                  <option value=''>Bitte wählen</option>
                  {serviceOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium text-foreground flex items-center gap-2'>
                <MessageSquare className='w-4 h-4 text-primary' />
                Nachricht *
              </label>
              <textarea
                name='message'
                value={form.message}
                onChange={(e) => handleChange('message', e.target.value)}
                rows={5}
                className={cn(
                  'w-full px-4 py-3 rounded-lg bg-card border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none',
                  errors.message ? 'border-destructive' : 'border-border'
                )}
                placeholder='Beschreibe dein Projekt...'
              />
              {errors.message && <p className='text-xs text-destructive'>{errors.message}</p>}
            </div>

            <button
              type='submit'
              className='w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity shadow-lg shadow-primary/25'
            >
              <Send className='w-4 h-4' />
              Anfrage senden
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
