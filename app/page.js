'use client';

import { Button } from "@/components/ui/button";
import { UserButton, SignInButton, SignOutButton, SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { BookOpen, BrainCircuit, Clock, ChevronRight, Star, Users, Award } from "lucide-react";
import { MotionDiv, MotionH1, MotionP, MotionButton } from "@/components/ui/animated";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const { isSignedIn } = useUser();
  const [mounted, setMounted] = useState(false);
  const blobRefs = useRef([]);

  useEffect(() => {
    setMounted(true);
    
    // More conservative animation that works across browsers
    const animateBlobs = () => {
      blobRefs.current.forEach((blob, index) => {
        if (!blob) return;
        
        const duration = 20000 + Math.random() * 10000;
        const maxMove = 30; // Reduced movement for subtlety
        const x = (Math.random() - 0.5) * maxMove;
        const y = (Math.random() - 0.5) * maxMove;
        const scale = 0.9 + Math.random() * 0.2;

        // Check if animate is supported
        if (blob.animate) {
          blob.animate(
            [
              { transform: 'translate(0, 0) scale(1)' },
              { transform: `translate(${x}px, ${y}px) scale(${scale})` },
              { transform: 'translate(0, 0) scale(1)' }
            ],
            {
              duration: duration,
              iterations: Infinity,
              delay: index * 3000,
              easing: 'ease-in-out'
            }
          );
        }
      });
    };

    const timer = setTimeout(animateBlobs, 100);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-400 via-blue-200 to-indigo-200 relative overflow-hidden">
      {/* Simplified background effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <div 
            key={i}
            ref={el => blobRefs.current[i] = el}
            className={`absolute rounded-full transition-all duration-1000 ease-in-out
              ${i === 0 ? 'bg-gradient-to-r from-blue-400 to-indigo-200 w-96 h-96 -top-48 -left-48 opacity-40' : ''}
              ${i === 1 ? 'bg-gradient-to-r from-indigo-400 to-purple-200 w-80 h-80 top-1/4 -right-40 opacity-30' : ''}
              ${i === 2 ? 'bg-gradient-to-r from-purple-400 to-pink-200 w-72 h-72 -bottom-36 left-1/3 opacity-35' : ''}
            `}
            style={{
              filter: 'blur(40px)',
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10 max-w-7xl">
        {/* Professional Navigation */}
        <nav className="flex justify-between items-center mb-16 bg-white/70 backdrop-blur-md rounded-2xl px-8 py-4 shadow-sm border border-white/20">
          <MotionH1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold bg-gradient-to-r from-indigo-700 to-blue-700 bg-clip-text text-transparent"
          >
            Lernen
          </MotionH1>
          
          <div className="flex items-center gap-6">
            {isSignedIn ? (
              <div className="flex items-center gap-4">
                <Link href="/dashboard">
                  <Button variant="ghost" className="text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 transition-all">
                    Dashboard
                  </Button>
                </Link>
                <SignOutButton>
                  <Button variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50 transition-all">
                    Sign Out
                  </Button>
                </SignOutButton>
                <UserButton 
                  afterSignOutUrl="/" 
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10"
                    }
                  }}
                />
              </div>
            ) : (
              <SignInButton mode="modal">
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all">
                  Get Started
                </Button>
              </SignInButton>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <div className="text-center py-20 px-4">
          <MotionDiv
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-tight mb-6">
              <span className="bg-gradient-to-r from-indigo-700 via-blue-700 to-purple-700 bg-clip-text text-transparent">
                Learn Smarter,
              </span>
              <br />
              <span className="text-slate-700">Not Harder</span>
            </h1>
          </MotionDiv>

          <MotionP
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Transform your study experience with AI-powered learning tools that adapt to your style, 
            boost retention, and accelerate your academic success.
          </MotionP>

          {/* CTA Buttons */}
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all group"
              >
                Start Learning Free
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg"
              className="border-slate-200 text-slate-700 hover:bg-slate-50 px-8 py-4 rounded-xl transition-all"
            >
              Watch Demo
            </Button>
          </MotionDiv>

          {/* Trust Indicators */}
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap justify-center items-center gap-8 text-slate-500 mb-20"
          >
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span className="font-medium">000+ Students</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">0.0/5 Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              <span className="font-medium"></span>
            </div>
          </MotionDiv>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          {[
            { 
              icon: <BookOpen className="w-8 h-8" />, 
              title: 'Smart Study Plans',
              description: 'AI-generated study schedules that adapt to your learning pace and goals.',
              color: 'from-blue-500 to-indigo-500'
            },
            { 
              icon: <BrainCircuit className="w-8 h-8" />, 
              title: 'Memory Enhancement',
              description: 'Spaced repetition and active recall techniques to boost long-term retention.',
              color: 'from-indigo-500 to-purple-500'
            },
            { 
              icon: <Clock className="w-8 h-8" />, 
              title: 'Efficient Learning',
              description: 'Focus on what matters most with personalized content prioritization.',
              color: 'from-purple-500 to-pink-500'
            }
          ].map((feature, i) => (
            <MotionDiv
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 group"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-4">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.description}</p>
            </MotionDiv>
          ))}
        </div>

        {/* Final CTA Section */}
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl p-12 text-white shadow-2xl"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Learning?</h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students who've already improved their grades and study efficiency with Lernen.
          </p>
          <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
            <Button 
              size="lg"
              className="bg-white text-indigo-600 hover:bg-indigo-50 px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all font-semibold"
            >
              Get Started Today - It's Free
            </Button>
          </Link>
        </MotionDiv>
      </div>
    </div>
  );
}