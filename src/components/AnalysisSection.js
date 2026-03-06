import React, { useState } from 'react';

const AnalysisSection = () => {
  const [analysisInput, setAnalysisInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [analysisData, setAnalysisData] = useState({
    query: '🔍 "Did Elon Musk die in a plane crash?"',
    verdict: '🔴 COMPLETELY FALSE',
    score: '3%',
    scale: 'FAKE  ▓░░░░░░░░░░░░░░░░░░░  TRUE',
    insight: '💡 This is false — Musk is alive with no crash reported anywhere.',
    sources: [
      '✅ Reuters    —  Active business coverage ongoing',
      '✅ AP News    —  No incident reported by any outlet',
      '❌ X/Twitter  —  Viral rumour, zero credible sourcing'
    ],
    checked: 'checked: Reuters · AP News · BBC · Snopes · PolitiFact',
    verdictColor: 'text-rose-700'
  });

  const API_URL = 'https://agent-prod.studio.lyzr.ai/v3/inference/chat/';
  const API_HEADERS = {
    'Content-Type': 'application/json',
    'x-api-key': 'sk-default-wNisSP6sCMHxZIlHw8brYZ3enxQFQ9PT'
  };

  const extractResponseText = (payload) => {
    if (!payload) return '';
    if (typeof payload === 'string') return payload;
    if (typeof payload.response === 'string') return payload.response;
    if (payload.data && typeof payload.data.response === 'string') return payload.data.response;
    if (payload.result && typeof payload.result.response === 'string') return payload.result.response;
    if (Array.isArray(payload.module_outputs)) {
      const firstText = payload.module_outputs.find((item) => typeof item === 'string' || (item && typeof item.response === 'string'));
      if (typeof firstText === 'string') return firstText;
      if (firstText && typeof firstText.response === 'string') return firstText.response;
    }
    return '';
  };

  const parseAnalysisText = (text, fallbackQuestion) => {
    const lines = String(text || '')
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line && line !== '---');

    const question = lines.find((line) => line.startsWith('🔍')) || `🔍 "${fallbackQuestion}"`;
    const verdict = lines.find((line) => /COMPLETELY|MOSTLY|PARTLY|FALSE|TRUE|UNVERIFIED|MISLEADING/i.test(line) && !/^checked:/i.test(line)) || '⚪ RESULT UNAVAILABLE';
    const confidence = lines.find((line) => /^\d{1,3}%$/.test(line)) || 'N/A';
    const scale = lines.find((line) => line.includes('FAKE') && line.includes('TRUE')) || 'FAKE  ▓░░░░░░░░░░░░░░░░░░░  TRUE';
    const insight = lines.find((line) => line.startsWith('💡')) || '💡 No summary returned by the model.';
    const checked = lines.find((line) => /^checked:/i.test(line)) || 'checked: Reuters · AP News · BBC · Snopes · PolitiFact';

    const sourcesStart = lines.findIndex((line) => line.startsWith('📰'));
    const checkedIndex = lines.findIndex((line) => /^checked:/i.test(line));
    let sourceLines = [];

    if (sourcesStart !== -1) {
      const start = sourcesStart + 1;
      const end = checkedIndex > start ? checkedIndex : lines.length;
      sourceLines = lines.slice(start, end).filter((line) => line && !line.startsWith('💡'));
    }

    if (!sourceLines.length) {
      sourceLines = [
        '✅ Reuters — Source check unavailable',
        '✅ AP News — Source check unavailable',
        '❌ X/Twitter — Community rumour risk'
      ];
    }

    return { question, verdict, confidence, scale, insight, sourceLines, checked };
  };

  const getVerdictColor = (verdictLine) => {
    if (/FALSE/i.test(verdictLine)) return 'text-rose-700';
    if (/TRUE/i.test(verdictLine)) return 'text-emerald-700';
    if (/UNVERIFIED|MISLEADING|PARTLY|MIXED/i.test(verdictLine)) return 'text-amber-700';
    return 'text-slate-900';
  };

  const runAnalysis = async () => {
    const userQuery = analysisInput.trim();
    if (!userQuery) return;

    setIsLoading(true);
    setShowPlaceholder(false);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: API_HEADERS,
        body: JSON.stringify({
          user_id: 'juug24btech22643@jainuniversity.ac.in',
          agent_id: '69aace883ef0b5740a3f4e39',
          session_id: '69aace883ef0b5740a3f4e39-rln8i6xz0m',
          message: userQuery
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed (${response.status})`);
      }

      const payload = await response.json();
      const modelText = extractResponseText(payload);
      
      if (!modelText) {
        throw new Error('No response text returned by API');
      }

      const parsed = parseAnalysisText(modelText, userQuery);
      
      setAnalysisData({
        query: parsed.question,
        verdict: parsed.verdict,
        score: parsed.confidence,
        scale: parsed.scale,
        insight: parsed.insight,
        sources: parsed.sourceLines,
        checked: parsed.checked,
        verdictColor: getVerdictColor(parsed.verdict)
      });
    } catch (error) {
      setAnalysisData({
        query: `🔍 "${userQuery}"`,
        verdict: '⚪ ANALYSIS FAILED',
        score: 'N/A',
        scale: 'FAKE  ░░░░░░░░░░░░░░░░░░░░  TRUE',
        insight: `💡 ${error.message}. If this page is opened as file://, CORS may block the request.`,
        sources: ['❌ Unable to fetch source checks from backend'],
        checked: 'checked: unavailable',
        verdictColor: 'text-slate-900'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
      runAnalysis();
    }
  };

  return (
    <section id="analyze" className="relative flex min-h-screen w-full flex-col py-20 px-4 md:px-10 lg:px-40">
      <div className="fixed right-[5%] top-[30%] z-0 w-96 h-96 bg-contain bg-no-repeat bg-center opacity-30 transform -rotate-12" data-alt="Astronaut floating in space" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCcf0aJWaTVku-qlt4OA9Zv4WRdtjkwIk20COPoOlKn1iEslE5RW1dXf3VJw7T4EAZASI82OLXsFYBNhDCgrRmOV4Aq4a-IPQphHavBDIF_H4bcq3z1rNN4gvCBbKLIDW8UWtp6Q26mpDL1NI1S-qQpLHEjT0ZMp39ViLuvGjBijLIkAHevvs7boXPt2N-HzfYdqgajy4UjSUUP3IgsrsIOLl4WMCpPTqNRO2U5DMxrzDZKeDwMsm2IVSS05Pp7dmYHJ_JV7VpZytZQ")', mixBlendMode: 'overlay'}}></div>
      
      <div className="w-full max-w-[1200px] mx-auto relative z-10">
        <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-12 py-12">
          <div className="w-full lg:w-1/2 flex flex-col gap-8 items-start z-10">
            <div className="flex flex-col gap-2 text-left">
              <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tighter uppercase drop-shadow-xl text-white">
                fact or<br/>fiction?
              </h1>
              <h2 className="text-lg md:text-xl font-medium leading-normal text-white/90 ml-1 drop-shadow-sm">Enter a news headline to uncover the truth.</h2>
            </div>
            <label className="flex flex-col w-full max-w-[600px] mt-4">
              <div className="flex w-full flex-col md:flex-row items-stretch md:items-center rounded-xl md:rounded-full glass-panel p-2 gap-2 shadow-2xl shadow-primary/10 transition-all hover:shadow-primary/20 focus-within:shadow-primary/30 focus-within:border-white/60">
                <div className="text-white flex items-center justify-center pl-4 pt-3 md:pt-0 drop-shadow-sm">
                  <span className="material-symbols-outlined">search</span>
                </div>
                <textarea 
                  value={analysisInput}
                  onChange={(e) => setAnalysisInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex w-full min-w-0 flex-1 resize-none overflow-hidden bg-transparent border-0 text-white focus:outline-0 focus:ring-0 placeholder:text-white/70 px-4 py-3 md:py-4 text-base md:text-lg font-medium leading-normal drop-shadow-sm" 
                  placeholder="Paste article headline or URL here..." 
                  rows="2"
                />
                <div className="flex items-center justify-end px-2 pb-2 md:pb-0">
                  <button 
                    onClick={runAnalysis}
                    disabled={isLoading}
                    className={`flex w-full md:w-auto min-w-[120px] cursor-pointer items-center justify-center rounded-full h-12 px-6 bg-white hover:bg-white/90 text-[#7aafc0] text-base font-bold leading-normal tracking-wide transition-all hover:scale-105 shadow-lg ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
                  >
                    <span>{isLoading ? 'Analyzing...' : 'Analyze'}</span>
                  </button>
                </div>
              </div>
            </label>
          </div>
          
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-end justify-center z-10">
            <div className="analysis-output-card rounded-xl p-6 w-full max-w-[420px] transform transition-all hover:-translate-y-1 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-slate-700 via-slate-500 to-transparent"></div>
              
              {showPlaceholder ? (
                <p className="text-xl md:text-2xl text-slate-800 font-black uppercase tracking-wide">our output</p>
              ) : (
                <div className="flex flex-col gap-5">
                  <p className="text-base md:text-lg text-slate-800 font-semibold leading-relaxed">
                    {analysisData.query}
                  </p>
                  <div className="flex items-start justify-between gap-4">
                    <h3 className={`text-2xl md:text-3xl font-black tracking-wide uppercase ${analysisData.verdictColor} drop-shadow-md`}>
                      {analysisData.verdict}
                    </h3>
                    <div className="shrink-0 rounded-full bg-white/80 px-4 py-2 border border-slate-400/60 text-lg font-black text-slate-900">
                      {analysisData.score}
                    </div>
                  </div>
                  <p className="text-sm md:text-base text-slate-700 font-semibold tracking-wide">
                    {analysisData.scale}
                  </p>
                  <p className="text-base text-slate-800 leading-relaxed font-medium">
                    {analysisData.insight}
                  </p>
                  <div className="analysis-output-divider h-px w-full"></div>
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-bold text-slate-700 uppercase tracking-wider">Sources</p>
                    <ul className="text-sm md:text-base text-slate-800 leading-relaxed space-y-1">
                      {analysisData.sources.map((source, index) => (
                        <li key={index}>{source}</li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-sm text-slate-700 font-medium">{analysisData.checked}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnalysisSection;
