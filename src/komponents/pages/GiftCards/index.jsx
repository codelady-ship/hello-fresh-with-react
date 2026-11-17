import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader, Section, PracticeNote, DemoConfirmation } from '../../ui';
import { usePageTitle, saveDemoCard } from '../../ui/hooks';
import { asset } from '../../../data/site';
import { apiRequest } from '../../../api';

const amounts = [25, 50, 75, 100];

const GiftCards = () => {
  usePageTitle('Gift Cards', 'Design a demo meal-kit gift card in this HelloFresh practice clone: pick an amount, add a message, preview it and redeem the code on Our Plans.');
  const [amount, setAmount] = useState(50);
  const [to, setTo] = useState('');
  const [from, setFrom] = useState('');
  const [message, setMessage] = useState('Enjoy some delicious dinners on me!');
  const [card, setCard] = useState(null);

  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!to.trim() || !from.trim()) return setError("Please enter the recipient's name and your name.");
    setError('');
    setSending(true);
    try {
      const made = await apiRequest('/api/gift-cards', { amount, to: to.trim(), from: from.trim(), message: message.trim() });
      setCard({ code: made.code, amount: made.amount, to: made.to });
    } catch (err) {
      if (!err.offline) {
        setError(err.message);
        return;
      }
      // Offline demo: make a local code that the Our Plans page can redeem in this tab.
      const code = `GIFT-${Math.random().toString(36).slice(2, 10).toUpperCase().padEnd(8, '0')}`;
      saveDemoCard(code, amount);
      setCard({ code, amount, to: to.trim() });
    } finally {
      setSending(false);
    }
  };

  const input = 'min-h-11 w-full rounded border border-gray-300 px-3 py-2 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-200';

  return (
    <>
      <PageHeader
        eyebrow="Gift Cards"
        title="Give the gift of home cooking"
        intro="Pick an amount, add a personal message and see a preview of your digital gift card."
      />

      <Section>
        <div className="grid gap-10 md:grid-cols-2">
          {card ? (
            <DemoConfirmation title="Your demo gift card is ready" onReset={() => setCard(null)} resetLabel="Make another card">
              <p>
                Code <strong className="font-mono">{card.code}</strong> for <strong>${card.amount}</strong>, made out to {card.to}.
              </p>
              <p>
                Try it on <Link to="/OurPlans" className="font-semibold text-green-700 underline">Our Plans</Link>: paste the code into the gift card field.
              </p>
            </DemoConfirmation>
          ) : (
          <form onSubmit={onSubmit} className="space-y-5" noValidate>
            <fieldset>
              <legend className="mb-2 font-bold text-gray-700">Amount</legend>
              <div className="flex flex-wrap gap-3">
                {amounts.map((a) => (
                  <button
                    key={a}
                    type="button"
                    aria-pressed={amount === a}
                    onClick={() => setAmount(a)}
                    className={`min-h-11 rounded border px-4 py-2 font-semibold transition ${amount === a ? 'border-green-600 bg-green-600 text-white' : 'border-gray-300 text-gray-700 hover:border-green-600'}`}
                  >
                    ${a}
                  </button>
                ))}
              </div>
            </fieldset>
            <div>
              <label htmlFor="gc-to" className="mb-1 block font-bold text-gray-700">Recipient's name</label>
              <input id="gc-to" className={input} value={to} onChange={(e) => setTo(e.target.value)} required maxLength={40} />
            </div>
            <div>
              <label htmlFor="gc-from" className="mb-1 block font-bold text-gray-700">Your name</label>
              <input id="gc-from" className={input} value={from} onChange={(e) => setFrom(e.target.value)} required maxLength={40} />
            </div>
            <div>
              <label htmlFor="gc-msg" className="mb-1 block font-bold text-gray-700">Message</label>
              <textarea id="gc-msg" rows={3} className={input} value={message} onChange={(e) => setMessage(e.target.value)} maxLength={140} />
            </div>
            {error && <p className="text-sm text-red-700" role="alert">{error}</p>}
            <button type="submit" disabled={sending} className="w-full rounded bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700 disabled:opacity-60">
              {sending ? 'Creating…' : 'Create demo gift card'}
            </button>
            <p className="text-center text-sm text-gray-500">Demo only: no email is sent and no payment is taken.</p>
          </form>
          )}

          <div aria-live="polite">
            <h2 className="mb-3 font-bold text-gray-700">Preview</h2>
            <div className="overflow-hidden rounded-xl bg-green-700 text-white shadow-lg">
              <div className="flex items-center justify-between bg-white px-5 py-3">
                <img src={asset('images/logo.png')} alt="HelloFresh clone logo" width="93" height="30" className="w-24" />
                <span className="text-2xl font-bold text-green-700">${amount}</span>
              </div>
              <div className="space-y-3 p-6">
                <p className="text-lg">To: <strong>{to || 'Recipient'}</strong></p>
                <p className="italic">“{message || 'Your message'}”</p>
                <p>From: <strong>{from || 'You'}</strong></p>
              </div>
            </div>
            <ul className="mt-6 space-y-2 text-gray-600">
              <li>✓ A digital card with a code (in this demo, shown on screen)</li>
              <li>✓ Can be used on any plan</li>
              <li>✓ A thoughtful gift for birthdays, new parents and busy friends</li>
            </ul>
          </div>
        </div>
      </Section>
      <PracticeNote />
    </>
  );
};

export default GiftCards;
