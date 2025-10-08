"use client";

import Link from "next/link";
import { Button } from "./button";
import Image from "next/image";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Run once on mount
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="w-full pt-36 md:pt-48 pb-10">
      <div className="space-y-6 text-center">
        <div className="space-y-6 mx-auto">
          <h1
            className="text-4xl md:text-6xl font-extrabold leading-tight
                       bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600
                       bg-clip-text text-transparent"
          >
            Navigate, Elevate, Succeed
            <br />
            for Professional Success
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto">
            Advance your career with personalized guidance, powerful interview
            preparation, and cutting-edge AI tools engineered for job market
            success.
          </p>
        </div>

        <div className="flex gap-4 justify-center">
          <Link href="/dashboard">
            <Button
              size="lg"
              className="px-8 bg-white text-black border hover:bg-gray-100"
            >
              Get Started
            </Button>
          </Link>
        </div>

        <div className="hero-image-wrapper mt-5 md:mt-0 perspective-1000">
          <div
            className={`hero-image transition-transform duration-700 ease-out will-change-transform ${
              scrolled ? "scrolled" : ""
            }`}
          >
            <Image
              src={"/banner.jpg"}
              width={1280}
              height={720}
              alt="Banner MakeYourCareer"
              className="rounded-lg shadow-2xl border mx-auto"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
