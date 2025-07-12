import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const res = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      
      if (!res.ok) {
        const data = await res.json();
        setError(data.message || 'Login fehlgeschlagen');
        setLoading(false);
        return;
      }
      
      const data = await res.json();
      localStorage.setItem('token', data.token || data.accessToken);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', data.username);
      localStorage.setItem('userId', data.id);
      navigate('/');
    } catch (err) {
      setError('Netzwerkfehler - Bitte prüfe deine Verbindung');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-[#6C63FF] to-[#A16AE8] rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">🍳</span>
            </div>
            <h1 className="text-3xl font-bold text-black mb-2">Willkommen zurück!</h1>
            <p className="text-black">Melde dich in deinem Konto an</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-center space-x-2">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-black mb-2">
                👤 Benutzername oder E-Mail
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6C63FF] focus:border-transparent transition-all duration-200 text-black"
                placeholder="Dein Benutzername oder E-Mail"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-black mb-2">
                🔒 Passwort
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6C63FF] focus:border-transparent transition-all duration-200 text-black"
                placeholder="Dein Passwort"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#6C63FF] to-[#A16AE8] text-white py-3 rounded-xl font-semibold hover:from-[#5A52E0] hover:to-[#8B5CF6] disabled:opacity-50 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Wird angemeldet...</span>
                </div>
              ) : (
                'Anmelden'
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-black">
              Noch kein Konto?{' '}
              <Link to="/signup" className="text-[#6C63FF] hover:text-[#5A52E0] font-semibold transition-colors duration-200">
                Jetzt registrieren
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
