import React, { useState } from 'react';
import { PageHeader, Section, PracticeNote } from '../../ui';
import { usePageTitle, useToast } from '../../ui/hooks';
import { asset } from '../../../data/site';
import { apiRequest } from '../../../api';

const amounts = [25, 50, 75, 100];

const GiftCards = () => {
  usePageTitle('Gift Cards');
  const [amount, setAmount] = useState(50);
  const [to, setTo] = useState('');
  const [from, setFrom] = useState('');
  const [message, setMessage] = useState('Enjoy some delicious dinners on me!');
  const [toast, showToast] = useToast();

  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!to.trim() || !from.trim()) return setError("Please enter the recipient's name and your name.");
    setError('');
    setSending(true);
    try {
      const card = await apiRequest('/api/gift-cards', { amount, to: to.trim(), from: from.trim(), message: message.trim() });
      showToast(`Gift card ${card.code} ($${card.amount}) for ${card.to} is ready. It can be redeemed on the Our Plans page.`);
    } catch (err) {
      if (err.offline) showToast(`Demo only: the $${amount} gift card for ${to} was not really sent.`);
      else setError(err.message);
    } finally {
      setSending(false);
    }
  };

  const input = 'w-full rounded border border-gray-300 px-3 py-2 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-200';

  return (
    <>
      <PageHeader
        eyebrow="Gift Cards"
        title="Give the gift of home cooking"
        intro="Pick an amount, add a personal message and see a preview of your digital gift card."
      />

      <Section>
        <div className="grid gap-10 md:grid-cols-2">
          <form onSubmit={onSubmit} className="space-y-5">
            <fieldset>
              <legend className="mb-2 font-bold text-gray-700">Amount</legend>
              <div className="flex flex-wrap gap-3">
                {amounts.map((a) => (
                  <button
                    key={a}
                    type="button"
                    aria-pressed={amount === a}
                    onClick={() => setAmount(a)}
                    className={`rounded border px-4 py-2 font-semibold transition ${amount === a ? 'border-green-600 bg-green-600 text-white' : 'border-gray-300 text-gray-700 hover:border-green-600'}`}
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
              {sending ? 'Sending…' : 'Send gift card'}
            </button>
          </form>

          <div aria-live="polite">
            <h2 className="mb-3 font-bold text-gray-700">Preview</h2>
            <div className="overflow-hidden rounded-xl bg-green-700 text-white shadow-lg">
              <div className="flex items-center justify-between bg-white px-5 py-3">
                <img src={asset('images/logo.png')} alt="HelloFresh logo" className="w-24" />
                <span className="text-2xl font-bold text-green-700">${amount}</span>
              </div>
              <div className="space-y-3 p-6">
                <p className="text-lg">To: <strong>{to || 'Recipient'}</strong></p>
                <p className="italic">“{message || 'Your message'}”</p>
                <p>From: <strong>{from || 'You'}</strong></p>
              </div>
            </div>
            <ul className="mt-6 space-y-2 text-gray-600">
              <li>✓ Sent by email as a digital card</li>
              <li>✓ Can be used on any plan</li>
              <li>✓ A thoughtful gift for birthdays, new parents and busy friends</li>
            </ul>
          </div>
        </div>
      </Section>
      <PracticeNote />
      {toast}
    </>
  );
};

export default GiftCards;
