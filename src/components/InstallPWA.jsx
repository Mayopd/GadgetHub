import { useEffect, useState } from 'react';

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setVisible(false);
    }
    setDeferredPrompt(null);
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '76px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        backgroundColor: '#2563eb',
        color: '#ffffff',
        padding: '10px 18px',
        borderRadius: '999px',
        boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontSize: '14px',
        fontWeight: 500
      }}
    >
      <span>Install aplikasi GadgetHub?</span>
      <button
        onClick={handleInstall}
        style={{
          backgroundColor: '#ffffff',
          color: '#2563eb',
          border: 'none',
          padding: '6px 12px',
          borderRadius: '999px',
          fontWeight: 600,
          cursor: 'pointer'
        }}
      >
        Install
      </button>
      <button
        onClick={() => setVisible(false)}
        aria-label="Tutup"
        style={{
          background: 'transparent',
          border: 'none',
          color: '#ffffff',
          cursor: 'pointer',
          fontSize: '16px',
          lineHeight: 1
        }}
      >
        ×
      </button>
    </div>
  );
}