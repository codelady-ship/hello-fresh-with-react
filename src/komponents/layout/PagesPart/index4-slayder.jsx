import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { plans, asset } from '../../../data/site';

// Horizontal carousel: 1 card on phones, 2 on tablets, 4 on desktop.
const Slider = () => {
  const track = useRef(null);

  const move = (dir) => {
    const el = track.current;
    if (!el) return;
    const card = el.firstElementChild;
    const step = card ? card.getBoundingClientRect().width + 20 : el.clientWidth;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2;
    const atStart = el.scrollLeft <= 2;
    const behavior = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    if (dir > 0 && atEnd) el.scrollTo({ left: 0, behavior });
    else if (dir < 0 && atStart) el.scrollTo({ left: el.scrollWidth, behavior });
    else el.scrollBy({ left: dir * step, behavior });
  };

  const arrow = 'z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-600 text-white shadow hover:bg-green-700';

  return (
    <div className="mx-auto flex max-w-7xl items-center gap-2 px-2 sm:px-5">
      <button type="button" onClick={() => move(-1)} className={arrow} aria-label="Previous plans">&#8592;</button>
      <ul
        ref={track}
        className="grid flex-1 snap-x snap-mandatory auto-cols-[100%] grid-flow-col gap-5 overflow-x-auto [scrollbar-width:none] sm:auto-cols-[calc((100%-1.25rem)/2)] lg:auto-cols-[calc((100%-3.75rem)/4)]"
      >
        {plans.map((p) => (
          <li key={p.id} className="relative snap-start overflow-hidden rounded-lg">
            <Link to="/OurMenu" state={{ plan: p.id }} className="block">
              <img src={asset(p.image)} alt={p.alt} width="640" height="769" className="aspect-[5/6] w-full object-cover" loading="lazy" />
              <span className="absolute bottom-3 left-3 right-3 flex flex-col items-start gap-1">
                <span className="rounded-xl bg-green-800 px-4 text-lg font-bold uppercase text-white">{p.title}</span>
                <span className="rounded-xl bg-amber-600 px-4 text-sm uppercase text-white">{p.tagline}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <button type="button" onClick={() => move(1)} className={arrow} aria-label="Next plans">&#8594;</button>
    </div>
  );
};

export default Slider;
