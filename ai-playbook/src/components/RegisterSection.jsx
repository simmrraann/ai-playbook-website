console.log("FORM SUBMIT CLICKED");
import { useState, useRef, useEffect } from 'react';

/**
 * RegisterSection – Full-screen coral envelope that opens into a registration form modal.
 * Features pulsing envelope, smooth open animation, form with validation, and success state.
 */

/* ===== Envelope SVG ===== */
const EnvelopeSVG = ({ isOpen }) => (
  <svg
    viewBox="0 0 340 240"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
  >
    {/* Envelope body */}
    <rect x="10" y="60" width="320" height="170" rx="16" fill="#E8614D" />
    {/* Envelope back flap (behind) */}
    <path d="M10 60 L170 20 L330 60 Z" fill="#C44535" opacity="0.6" />
    {/* Bottom triangle fold lines */}
    <path d="M10 230 L165 140 M330 230 L175 140" stroke="#C44535" strokeWidth="2" opacity="0.4" />
    {/* Front flap */}
    <path
      d="M10 60 L170 155 L330 60"
      fill="#F08070"
      style={{
        transformOrigin: '170px 60px',
        transform: isOpen ? 'rotateX(-180deg)' : 'rotateX(0)',
        transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    />
    {/* Heart on envelope */}
    <path
      d="M155 105 C155 97 163 92 170 100 C177 92 185 97 185 105 C185 115 170 124 170 124 C170 124 155 115 155 105 Z"
      fill="white"
      opacity="0.9"
    />
    {/* Envelope lines (paper inside peek) */}
    {isOpen && (
      <>
        <rect x="120" y="130" width="100" height="8" rx="4" fill="white" opacity="0.3" />
        <rect x="130" y="144" width="80" height="6" rx="3" fill="white" opacity="0.2" />
      </>
    )}
    {/* Shadow at bottom of envelope */}
    <rect x="10" y="210" width="320" height="20" rx="0 0 16 16" fill="#C44535" opacity="0.3" />
  </svg>
);

/* ===== Form field ===== */
const Field = ({ label, type = 'text', name, value, onChange, required, placeholder }) => (
  <div className="flex flex-col gap-1.5">
    <label className="font-sans text-sm font-semibold text-[#2C2415]">
      {label} {required && <span className="text-[#E8614D]">*</span>}
    </label>
    {type === 'textarea' ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={3}
        className="w-full rounded-2xl border-2 border-[#E5D8C5] bg-[#FAF6F1] px-4 py-3 font-sans text-sm text-[#2C2415] placeholder-[#C0B0A0] resize-none focus:outline-none focus:border-[#9B7FD4] transition-colors"
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-2xl border-2 border-[#E5D8C5] bg-[#FAF6F1] px-4 py-3 font-sans text-sm text-[#2C2415] placeholder-[#C0B0A0] focus:outline-none focus:border-[#9B7FD4] transition-colors"
      />
    )}
  </div>
);

/* ===== Registration Modal ===== */
const RegistrationModal = ({ onClose }) => {
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(''); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    console.log('FORM SUBMIT TRIGGERED');
    e.preventDefault();

    console.log('FORM DATA:', form);

    // Basic validation
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setError('');

    const requestBody = {
      fullName: form.name,
      email: form.email,
      contactNumber: form.phone,
      expectations: form.expectation || '',
      registrationId: Date.now().toString(),
    };

    console.log('Sending request...');
    console.log('Request body:', requestBody);

    const scriptUrl = process.env.REACT_APP_SCRIPT_URL;
    console.log('Environment variable REACT_APP_SCRIPT_URL:', scriptUrl);

    if (!scriptUrl) {
      console.error('REACT_APP_SCRIPT_URL is not defined. Check your .env file.');
      setError('Configuration error. Please contact support.');
      setLoading(false);
      return;
    }

    try {
      await fetch(scriptUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      setSubmitted(true);
      setForm({ name: '', email: '', phone: '' });
    } catch (err) {
      console.error('Registration error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-enter bg-[#FAF6F1] rounded-3xl shadow-2xl w-full max-w-md relative overflow-hidden">
        {/* Top coral strip */}
        <div className="h-2 bg-gradient-to-r from-[#E8614D] via-[#F08070] to-[#9B7FD4]" />

        <div className="p-8">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-[#9A8A78] hover:text-[#2C2415] transition-colors"
          >
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="5" x2="17" y2="17" />
              <line x1="17" y1="5" x2="5" y2="17" />
            </svg>
          </button>

          {submitted ? (
            /* ===== SUCCESS STATE ===== */
            <div className="flex flex-col items-center text-center py-6">
              <div className="text-7xl mb-4">🎉</div>
              <h3 className="font-serif text-3xl font-bold text-[#2C2415] mb-2">You're in!</h3>
              <p className="font-sans text-[#7A6B5A] mb-6">
                Check your email for details.
              </p>
              <button
                onClick={onClose}
                className="btn-hover bg-[#9B7FD4] text-white font-sans font-semibold px-8 py-3 rounded-full"
              >
                Close
              </button>
            </div>
          ) : (
            /* ===== FORM ===== */
            <>
              <div className="mb-6">
                <h3 className="font-serif text-3xl font-bold text-[#2C2415] mb-1">
                  Save your spot 💌
                </h3>
                <p className="font-sans text-[#7A6B5A] text-sm">
                  Limited seats. Fill this out and we'll see you there.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Field
                  label="Your Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="What do we call you?"
                />
                <Field
                  label="Email Address"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="you@email.com"
                />
                <Field
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  placeholder="+91 98765 43210"
                />

                {error && (
                  <div className="text-red-600 text-sm font-medium text-center bg-red-50 border border-red-200 rounded-lg p-3">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-hover mt-2 bg-[#E8614D] text-white font-sans font-bold text-base px-8 py-4 rounded-2xl shadow-lg shadow-[#E8614D]/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="inline-flex items-center gap-2">
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                      </svg>
                      Registering...
                    </span>
                  ) : (
                    'Register Now 🚀'
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

/* ===== Main Section ===== */
const RegisterSection = () => {
  const sectionRef = useRef(null);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) sectionRef.current?.classList.add('visible');
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleEnvelopeClick = () => {
    setEnvelopeOpen(true);
    setTimeout(() => setShowModal(true), 600);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEnvelopeOpen(false);
  };

  return (
    <>
      <section
        id="register"
        className="relative min-h-screen flex flex-col paper-texture overflow-hidden"
      >
        {/* Background blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full bg-[#E8614D]/8 blur-3xl" />
          <div className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full bg-[#9B7FD4]/10 blur-3xl" />
        </div>

        {/* Main content */}
        <div
          ref={sectionRef}
          className="section-fade flex-1 flex flex-col items-center justify-center px-6 py-24 relative z-10"
        >
          {/* Header */}
          <div className="text-center mb-14">
            <div className="inline-block bg-[#E8614D]/10 border border-[#E8614D]/20 text-[#C44535] font-sans text-xs font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wide">
              Register
            </div>
            <h2 className="font-serif text-5xl md:text-6xl font-bold text-[#2C2415] mb-4">
              Ready to play? 🎮
            </h2>
            <p className="font-sans text-[#7A6B5A] text-lg max-w-md mx-auto">
              Click the envelope below and lock in your seat. It's free, it's fun, and it just might change how you think about AI.
            </p>
          </div>

          {/* Envelope */}
          <button
            onClick={handleEnvelopeClick}
            className={`relative w-72 h-52 cursor-pointer focus:outline-none rounded-2xl ${!envelopeOpen ? 'envelope-pulse' : ''}`}
            aria-label="Open envelope to register"
          >
            <EnvelopeSVG isOpen={envelopeOpen} />
            {!envelopeOpen && (
              <div className="absolute inset-x-0 -bottom-10 flex justify-center">
                <span className="font-sans text-sm text-[#9A8A78] animate-bounce">
                  tap to open ↓
                </span>
              </div>
            )}
          </button>

          {/* Workshop details */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-5 max-w-2xl w-full">
            {[
              { icon: '📅', label: 'Date', value: 'Coming Soon' },
              { icon: '📍', label: 'Location', value: 'Nashik, Maharashtra' },
              { icon: '🎟️', label: 'Entry', value: 'Free (Limited Seats)' },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white/60 border border-[#E5D8C5] rounded-2xl p-5 text-center shadow-sm"
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <p className="font-sans text-xs text-[#9A8A78] uppercase tracking-widest mb-1">{item.label}</p>
                <p className="font-serif text-base font-semibold text-[#2C2415]">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="relative z-10 bg-[#2C2415] text-[#EFE6D8] py-10 px-6">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Brand */}
            <div className="text-center md:text-left">
              <p className="font-serif text-2xl font-bold mb-1">AI Playbook ✦</p>
              <p className="font-sans text-sm text-[#B0A090]">AI Playbook Community</p>
            </div>

            {/* Social links */}
            <div className="flex gap-4 items-center">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/simranbuildss/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-hover flex items-center gap-2 bg-white/10 hover:bg-[#9B7FD4]/30 border border-white/20 text-white font-sans text-sm font-medium px-4 py-2.5 rounded-full transition-colors"
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
                Instagram
              </a>

              {/* WhatsApp */}
              <a
                href="https://chat.whatsapp.com/GOLC5H0nQym48xNHv07r4w"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-hover flex items-center gap-2 bg-white/10 hover:bg-[#25D366]/30 border border-white/20 text-white font-sans text-sm font-medium px-4 py-2.5 rounded-full transition-colors"
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mt-6 pt-6 border-t border-white/10 text-center">
            <p className="font-sans text-xs text-[#7A6B5A]">
              © 2025 AI Playbook · Built with ♥ in Nashik
            </p>
          </div>
        </footer>
      </section>

      {/* Registration Modal */}
      {showModal && <RegistrationModal onClose={handleModalClose} />}
    </>
  );
};

export default RegisterSection;
