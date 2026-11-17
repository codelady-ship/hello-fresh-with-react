import React, { useState } from 'react';
import { PageHeader, Section, PracticeNote, DemoConfirmation } from '../../ui';
import { usePageTitle, readDemoCards } from '../../ui/hooks';
import { asset, PRICE_PER_SERVING } from '../../../data/site';
import { apiRequest, useCatalog } from '../../../api';

const peopleOptions = [2, 4];
const mealOptions = [2, 3, 4, 5];

const OurPlans = () => {
  usePageTitle('Our Plans', 'Build an example meal-kit plan in this HelloFresh practice clone: choose a recipe style, people and meals per week and see a demo weekly price.');
  const { plans } = useCatalog();
  const [planId, setPlanId] = useState(plans[0].id);
  const [people, setPeople] = useState(2);
  const [meals, setMeals] = useState(3);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [giftCode, setGiftCode] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(null);

  const plan = plans.find((p) => p.id === planId) || plans[0];
  const pricePerServing = plan.pricePerServing ?? PRICE_PER_SERVING;
  const servings = people * meals;
  const total = (servings * pricePerServing).toFixed(2);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (name.trim().length < 2) return setError('Please enter your name.');
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) return setError('Please enter a valid email address.');
    setError('');
    setSending(true);
    try {
      const sub = await apiRequest('/api/subscriptions', { plan: plan.id, people, meals, name: name.trim(), email: email.trim(), giftCode: giftCode.trim() });
      setDone({
        reference: sub.reference,
        planTitle: sub.planTitle,
        servings: sub.servings,
        weekly: sub.weeklyTotal,
        gift: sub.giftApplied || 0,
        firstBox: sub.firstBoxTotal ?? sub.weeklyTotal,
      });
      setGiftCode('');
    } catch (err) {
      if (!err.offline) {
        setError(err.message);
        return;
      }
      // Offline demo: redeem a demo gift card made on the Gift Cards page in this tab.
      const code = giftCode.trim().toUpperCase();
      let gift = 0;
      if (code) {
        const amount = readDemoCards()[code];
        if (!amount) {
          setError('Gift card code not found. In demo mode, use a code created on the Gift Cards page in this browser tab.');
          return;
        }
        gift = Math.min(amount, Number(total));
      }
      setDone({
        reference: `DEMO-${Date.now().toString(36).toUpperCase().slice(-6)}`,
        planTitle: plan.title,
        servings,
        weekly: Number(total),
        gift,
        firstBox: Number(total) - gift,
      });
      setGiftCode('');
    } finally {
      setSending(false);
    }
  };

  const input = 'min-h-11 w-full rounded border border-gray-300 px-3 py-2 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-200';

  const optionClass = (active) =>
    `min-h-11 rounded border px-4 py-2 font-semibold transition ${active ? 'border-green-600 bg-green-600 text-white' : 'border-gray-300 bg-white text-gray-700 hover:border-green-600'}`;

  return (
    <>
      <PageHeader
        eyebrow="Our Plans"
        title="Pick a plan that fits your week"
        intro="Choose a recipe style, the number of people and how many meals you want. You can change everything later."
      />

      <Section title="1. Choose your preferences">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setPlanId(p.id)}
              aria-pressed={planId === p.id}
              className={`overflow-hidden rounded-lg border-2 bg-white text-left shadow-sm transition ${planId === p.id ? 'border-green-600' : 'border-transparent hover:border-green-300'}`}
            >
              <img src={asset(p.image)} alt={p.alt} width="640" height="769" className="h-44 w-full object-cover" loading="lazy" />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-700">{p.title}</h3>
                <p className="text-sm uppercase text-green-700">{p.tagline}</p>
                <p className="mt-2 text-gray-600">{p.text}</p>
              </div>
            </button>
          ))}
        </div>
      </Section>

      <Section title="2. Choose your plan size" className="bg-gray-100 sm:rounded-lg">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <fieldset>
              <legend className="mb-2 font-bold text-gray-700">Number of people</legend>
              <div className="flex flex-wrap gap-3">
                {peopleOptions.map((n) => (
                  <button key={n} type="button" className={optionClass(people === n)} aria-pressed={people === n} onClick={() => setPeople(n)}>{n} people</button>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="mb-2 font-bold text-gray-700">Meals per week</legend>
              <div className="flex flex-wrap gap-3">
                {mealOptions.map((n) => (
                  <button key={n} type="button" className={optionClass(meals === n)} aria-pressed={meals === n} onClick={() => setMeals(n)}>{n} meals</button>
                ))}
              </div>
            </fieldset>
          </div>

          {done ? (
            <DemoConfirmation title="Your plan is selected" onReset={() => setDone(null)} resetLabel="Choose another plan">
              <p>
                Reference <strong>{done.reference}</strong>: {done.planTitle}, {done.servings} servings a week for {name.trim()} ({email.trim()}).
              </p>
              <p>Example weekly total: <strong>${done.weekly.toFixed(2)}</strong></p>
              {done.gift > 0 && (
                <p>Gift card applied: -${done.gift.toFixed(2)}. First box: <strong>${done.firstBox.toFixed(2)}</strong></p>
              )}
            </DemoConfirmation>
          ) : (
          <form className="rounded-lg bg-white p-6 shadow-sm" onSubmit={onSubmit} noValidate>
            <h3 className="text-xl font-bold text-gray-700">Your plan summary</h3>
            <dl className="mt-4 space-y-2 text-gray-600">
              <div className="flex justify-between"><dt>Plan</dt><dd className="font-semibold">{plan.title}</dd></div>
              <div className="flex justify-between"><dt>Servings per week</dt><dd className="font-semibold">{servings}</dd></div>
              <div className="flex justify-between"><dt>Price per serving</dt><dd className="font-semibold">${pricePerServing}</dd></div>
              <div className="flex justify-between border-t pt-2 text-lg"><dt>Example weekly total</dt><dd className="font-bold text-green-700">${total}</dd></div>
            </dl>
            <div className="mt-5 space-y-3">
              <div>
                <label htmlFor="sub-name" className="mb-1 block font-bold text-gray-700">Your name</label>
                <input id="sub-name" className={input} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" maxLength={60} />
              </div>
              <div>
                <label htmlFor="sub-email" className="mb-1 block font-bold text-gray-700">Email</label>
                <input id="sub-email" type="email" className={input} value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" maxLength={120} />
              </div>
              <div>
                <label htmlFor="sub-gift" className="mb-1 block font-bold text-gray-700">Gift card code (optional)</label>
                <input id="sub-gift" className={input} value={giftCode} onChange={(e) => setGiftCode(e.target.value)} maxLength={20} placeholder="GIFT-XXXXXXXX" />
              </div>
            </div>
            <p className="mt-3 min-h-6 text-sm text-red-700" role="alert">{error}</p>
            <button
              type="submit"
              disabled={sending}
              className="mt-3 w-full rounded bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700 disabled:opacity-60"
            >
              {sending ? 'Saving…' : 'Select this plan'}
            </button>
            <p className="mt-3 text-center text-sm text-gray-500">Demo only: no order is placed and no payment is taken.</p>
          </form>
          )}
        </div>
      </Section>

      <PracticeNote />
    </>
  );
};

export default OurPlans;
