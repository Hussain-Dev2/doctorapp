import React from 'react'
import Image from 'next/image'

function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(1200px_400px_at_20%_-10%,_color-mix(in_oklch,_var(--primary)_14%,_transparent),_transparent_60%),radial-gradient(900px_300px_at_90%_10%,_color-mix(in_oklch,_var(--accent)_14%,_transparent),_transparent_60%)] opacity-50" />
      <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
          <div>
            <div className="max-w-prose md:max-w-none">
              <h2 id="hero-heading" className="text-3xl font-bold sm:text-5xl tracking-tight text-foreground">
                Welcome to MediInfo
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Your trusted source for up-to-date medicine information, drug interactions, and health tips. 
                Search for medications, learn about their uses, side effects, and get reliable advice for your well-being.
              </p>
              <ul className="mt-4 list-disc list-inside text-muted-foreground">
                <li>Comprehensive medicine database</li>
                <li>Drug interaction checker</li>
                <li>Latest health news and tips</li>
                <li>Easy-to-understand guides</li>
              </ul>
            </div>
          </div>
          <div>
            <Image
              src="/asset/health.png"
              className="rounded-xl soft-shadow-md w-full h-auto animate-float"
              alt="Floating illustration of medicine and healthcare items"
              width={400}
              height={400}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero
