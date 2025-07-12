import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    if (!formData.firstName.trim()) return 'Vorname ist erforderlich';
    if (!formData.lastName.trim()) return 'Nachname ist erforderlich';
    if (!formData.email.trim() || !formData.email.includes('@')) return 'Gültige E-Mail angeben';
    if (formData.password.length < 8) return 'Passwort muss mindestens 8 Zeichen haben';
    if (formData.password !== formData.confirmPassword) return 'Passwörter stimmen nicht überein';
    if (!acceptTerms) return 'Bitte akzeptiere die Nutzungsbedingungen';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8080/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email, 
          password: formData.password 
        })
      });
      
      if (!res.ok) {
        const data = await res.json();
        setError(data.message || 'Registrierung fehlgeschlagen');
        setLoading(false);
        return;
      }
      
      // Auto-Login nach erfolgreicher Registrierung
      const loginRes = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: formData.email, password: formData.password })
      });
      
      if (loginRes.ok) {
        const loginData = await loginRes.json();
        localStorage.setItem('token', loginData.token || loginData.accessToken);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', loginData.username);
        localStorage.setItem('userId', loginData.id);
        navigate('/');
      } else {
        setError('Registrierung erfolgreich, aber Auto-Login fehlgeschlagen. Bitte manuell einloggen.');
      }
    } catch (err) {
      setError('Netzwerkfehler - Bitte prüfe deine Verbindung');
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-[#6C63FF] to-[#A16AE8] rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">👋</span>
            </div>
            <h1 className="text-3xl font-bold text-black mb-2">Konto erstellen</h1>
            <p className="text-black">Werde Teil unserer Koch-Community</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-center space-x-2">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-semibold text-black mb-2">
                  👤 Vorname
                </label>
                <input
                  id="firstName"
                  placeholder="Max"
                  value={formData.firstName}
                  onChange={(e) => updateFormData('firstName', e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6C63FF] focus:border-transparent transition-all duration-200 text-black"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-semibold text-black mb-2">
                  👤 Nachname
                </label>
                <input
                  id="lastName"
                  placeholder="Mustermann"
                  value={formData.lastName}
                  onChange={(e) => updateFormData('lastName', e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6C63FF] focus:border-transparent transition-all duration-200 text-black"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-black mb-2">
                📧 E-Mail-Adresse
              </label>
              <input
                id="email"
                type="email"
                placeholder="max@beispiel.de"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6C63FF] focus:border-transparent transition-all duration-200 text-black"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-black mb-2">
                🔒 Passwort
              </label>
              <input
                id="password"
                type="password"
                placeholder="Mindestens 8 Zeichen"
                value={formData.password}
                onChange={(e) => updateFormData('password', e.target.value)}
                required
                minLength={8}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6C63FF] focus:border-transparent transition-all duration-200 text-black"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-black mb-2">
                🔒 Passwort bestätigen
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Passwort wiederholen"
                value={formData.confirmPassword}
                onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6C63FF] focus:border-transparent transition-all duration-200 text-black"
              />
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="w-5 h-5 text-[#6C63FF] border-gray-300 rounded focus:ring-[#6C63FF] mt-1"
              />
              <label htmlFor="terms" className="text-sm text-black leading-relaxed">
                Ich akzeptiere die{' '}
                <button type="button" className="text-[#6C63FF] hover:text-[#5A52E0] font-semibold">
                  Nutzungsbedingungen
                </button>{' '}
                und{' '}
                <button type="button" className="text-[#6C63FF] hover:text-[#5A52E0] font-semibold">
                  Datenschutzerklärung
                </button>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#6C63FF] to-[#A16AE8] text-white py-3 rounded-xl font-semibold hover:from-[#5A52E0] hover:to-[#8B5CF6] disabled:opacity-50 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Wird registriert...</span>
                </div>
              ) : (
                'Konto erstellen'
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-black">
              Bereits ein Konto?{' '}
              <Link to="/login" className="text-[#6C63FF] hover:text-[#5A52E0] font-semibold transition-colors duration-200">
                Jetzt anmelden
              </Link>
            </p>
          </div>

          <div className="mt-6 text-center">
            <button 
              onClick={() => navigate('/')}
              className="text-sm text-black hover:text-[#6C63FF] transition-colors duration-200"
            >
              ← Zurück zur Startseite
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 