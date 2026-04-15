/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import ReactMarkdown from "react-markdown";
import { 
  Compass, 
  Send, 
  ChevronRight, 
  Loader2, 
  ShieldCheck, 
  TrendingUp, 
  AlertCircle, 
  Clock, 
  Target, 
  Lightbulb,
  FileText,
  ArrowRight,
  Shield,
  Activity,
  Zap
} from "lucide-react";
import { analyzeDecision } from "@/src/services/geminiService";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function App() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<string | null>(null);
  const [history, setHistory] = useState<{decision: string, result: string}[]>([]);
  const [showSplash, setShowSplash] = useState(true);
  const reportEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleAnalyze = async () => {
    if (!input.trim()) return;
    
    setIsLoading(true);
    setReport(null);
    
    try {
      const result = await analyzeDecision(input);
      if (result) {
        setReport(result);
        setHistory(prev => [{ decision: input, result }, ...prev.slice(0, 4)]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (report) {
      reportEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [report]);

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center selection:bg-primary/20 selection:text-primary">
      <AnimatePresence>
        {showSplash && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center p-8"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-6"
            >
              <div className="w-20 h-20 bg-text-main flex items-center justify-center border-4 border-primary rotate-45">
                <Compass className="text-white w-10 h-10 -rotate-45" />
              </div>
              <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter uppercase text-text-main">Strategic Debrief Protocol</h1>
                <div className="flex items-center justify-center gap-3">
                  <div className="h-[1px] w-8 bg-border" />
                  <span className="text-[10px] font-bold text-text-muted uppercase tracking-[0.5em]">Executive Intelligence</span>
                  <div className="h-[1px] w-8 bg-border" />
                </div>
              </div>
              <div className="w-48 h-1 bg-border relative overflow-hidden mt-4">
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                  className="absolute inset-0 bg-primary"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="w-full max-w-7xl px-8 py-10 flex justify-between items-center border-b-4 border-text-main bg-white sticky top-0 z-50">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center gap-4"
        >
          <div className="w-12 h-12 bg-text-main flex items-center justify-center border-2 border-text-main">
            <Compass className="text-white w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tighter text-text-main uppercase">Strategic Debrief Protocol</h1>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-secondary" />
              <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.3em]">Executive Intelligence</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="hidden sm:flex items-center gap-6"
        >
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest text-right">System Status</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="text-xs font-bold text-text-main uppercase">Operational</span>
            </div>
          </div>
          <div className="w-[2px] h-10 bg-border" />
          <div className="text-[10px] font-mono text-text-muted">
            {new Date().toISOString().split('T')[0]}
          </div>
        </motion.div>
      </header>

      <main className="w-full max-w-5xl px-8 py-16 flex flex-col gap-20">
        {/* Input Section */}
        <section className="flex flex-col gap-8">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="space-y-4"
          >
            <div className="inline-block bg-text-main text-white px-4 py-1 text-[10px] font-bold uppercase tracking-[0.2em]">
              Case Analysis Input
            </div>
            <h2 className="text-5xl font-bold text-text-main tracking-tighter leading-none">
              Submit your <span className="text-primary underline decoration-4 underline-offset-8">strategic case</span>.
            </h2>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="geometric-card rounded-none">
              <CardContent className="p-0">
                <Textarea 
                  placeholder="Describe the decision or scenario in detail..."
                  className="min-h-[200px] border-0 focus-visible:ring-0 resize-none p-10 text-xl leading-relaxed placeholder:text-text-muted/30 bg-transparent text-text-main font-medium"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <div className="p-8 bg-surface border-t-2 border-text-main flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="flex flex-wrap gap-3">
                    <button 
                      className="px-4 py-2 border-2 border-text-main text-[10px] font-bold uppercase tracking-widest hover:bg-secondary hover:text-white transition-colors"
                      onClick={() => setInput("Should I move to another company?")}
                    >
                      Career Move
                    </button>
                    <button 
                      className="px-4 py-2 border-2 border-text-main text-[10px] font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-colors"
                      onClick={() => setInput("Should I switch courses?")}
                    >
                      Education
                    </button>
                    {(input || report) && (
                      <button 
                        className="px-4 py-2 border-2 border-red-500 text-red-500 text-[10px] font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white transition-colors"
                        onClick={() => { setInput(""); setReport(null); }}
                      >
                        Reset Protocol
                      </button>
                    )}
                  </div>
                  <button 
                    onClick={handleAnalyze} 
                    disabled={isLoading || !input.trim()}
                    className="geometric-btn bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
                  >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
                    <span>Execute Protocol</span>
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* Results Section */}
        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="flex flex-col items-center justify-center py-24 gap-8"
            >
              <div className="relative">
                <div className="w-24 h-24 border-4 border-primary animate-[spin_3s_linear_infinite]" />
                <div className="w-24 h-24 border-4 border-text-main absolute top-0 left-0 animate-[spin_2s_linear_infinite_reverse]" />
                <Activity className="w-10 h-10 text-text-main absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <div className="text-center space-y-2">
                <p className="text-sm font-bold uppercase tracking-[0.4em] text-primary animate-pulse">Running Strategic Simulations</p>
                <p className="text-xs text-text-muted font-mono">ANALYZING_VARIABLES...</p>
              </div>
            </motion.div>
          )}

          {report && !isLoading && (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-12"
            >
              <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b-4 border-text-main pb-8">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-primary" />
                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-[0.3em]">Protocol Output</span>
                  </div>
                  <h2 className="text-4xl font-bold text-text-main tracking-tighter uppercase">Executive Debrief</h2>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">Case Reference</p>
                  <p className="text-sm font-mono font-bold text-primary">#{Math.random().toString(36).substring(7).toUpperCase()}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-12">
                <Card className="geometric-card rounded-none overflow-hidden">
                  <div className="bg-text-main p-4 flex justify-between items-center">
                    <span className="text-[10px] font-bold text-white uppercase tracking-widest">Strategic Report</span>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-primary" />
                      <div className="w-2 h-2 bg-secondary" />
                    </div>
                  </div>
                  <CardContent className="p-10 md:p-16">
                    <div className="markdown-body">
                      <ReactMarkdown>{report}</ReactMarkdown>
                    </div>
                    <div ref={reportEndRef} />
                  </CardContent>
                </Card>
              </div>

              {/* Action Footer */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="flex flex-col sm:flex-row gap-6 justify-center items-center py-12 border-t-2 border-border"
              >
                <button 
                  className="geometric-btn border-border text-text-muted hover:border-text-main hover:text-text-main"
                  onClick={() => window.print()}
                >
                  Export Intelligence
                </button>
                <button 
                  className="geometric-btn bg-text-main text-white hover:bg-primary"
                  onClick={() => { setReport(null); setInput(""); }}
                >
                  Initialize New Session
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Features/Guidelines */}
        {!report && !isLoading && (
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Target, title: "Objective Logic", color: "bg-primary", desc: "Eliminates emotional noise to focus on structural validity and logical outcomes." },
              { icon: Shield, title: "Risk Mitigation", color: "bg-secondary", desc: "Exposes latent risks and opportunity costs hidden within standard decision frameworks." },
              { icon: TrendingUp, title: "Impact Projection", color: "bg-text-main", desc: "Simulates 1-year and 5-year trajectories to ensure long-term strategic alignment." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="geometric-card p-8 space-y-6 group"
              >
                <div className={`w-14 h-14 ${feature.color} flex items-center justify-center border-2 border-text-main group-hover:rotate-12 transition-transform`}>
                  <feature.icon className="text-white w-7 h-7" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-text-main uppercase tracking-tight">{feature.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl px-8 py-16 mt-auto border-t-4 border-text-main bg-white flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-text-main flex items-center justify-center">
            <Compass className="text-white w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-text-main">Strategic Debrief Protocol</span>
            <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest">Developed & Authored by Jayalle Pangilinan</span>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-10">
          {["Methodology", "Privacy", "Security", "API"].map((link, i) => (
            <a key={i} href="#" className="text-[10px] font-bold uppercase tracking-widest text-text-muted hover:text-primary transition-colors">
              {link}
            </a>
          ))}
        </div>
        
        <div className="text-right">
          <p className="text-[10px] font-mono text-text-muted">© 2026 DEBRIEF_SYSTEM</p>
          <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">Status: Encrypted</p>
        </div>
      </footer>
    </div>
  );
}
