import React from 'react';
import Reveal from './Reveal';
import { FEATURES } from '../../data/mock';
import { FeatureDemo, DEMO_KINDS } from './Features';

/*
 * The six feature cards, laid out as a still 2D grid under "Everything you
 * need to study smarter." (This used to be a spinning 3D turntable; the
 * cards now simply sit still so they can all be read at once.) Each card
 * keeps its looping demo vignette open.
 */
function FeatureCard({ f, demoIndex }) {
  return (
    <div className="h-full feature-card demo-open liquid-glass rounded-2xl px-5 py-4 text-left flex flex-col overflow-hidden">
      <div className="feature-demo">
        <FeatureDemo kind={DEMO_KINDS[demoIndex] || 'fresh'} />
      </div>
      <h3 className="text-[15px] font-semibold text-slate-900 leading-snug">{f.title}</h3>
      <p className="mt-1.5 text-[12.5px] text-slate-600 leading-relaxed">{f.desc}</p>
    </div>
  );
}

export default function StudentGallery3D() {
  return (
    <section id="features" className="section-bg scroll-mt-24">
      <div className="max-w-[1280px] mx-auto px-6 pt-4 pb-14 text-center">
        <Reveal>
          <h2 className="h-display text-[28px] sm:text-[34px] lg:text-[40px] leading-[1.05]">Everything you need to study smarter.</h2>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[1100px] mx-auto">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.06}>
              <FeatureCard f={f} demoIndex={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
