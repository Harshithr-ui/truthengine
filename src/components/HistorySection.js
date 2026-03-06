import React from 'react';

const HistorySection = () => {
  const historyItems = [
    {
      status: 'FALSE',
      date: 'Checked on 2023-10-15',
      title: 'Mars Rover Discovers Ancient City',
      description: 'Analysis confirms the circulating images are AI-generated composites using geological survey data from 2018.',
      confidence: '98%'
    },
    {
      status: 'VERIFIED',
      date: 'Checked on 2023-10-14',
      title: 'New Legislation Passed in Congress',
      description: 'The bill was officially signed into law at 14:00 EST. Cross-referenced with official government portals.',
      confidence: '99%'
    },
    {
      status: 'UNVERIFIED',
      date: 'Checked on 2023-10-10',
      title: 'Unidentified Flying Object Sighted Over Coast',
      description: 'Insufficient sensor data to confirm origin. Local meteorological stations report weather balloon deployments.',
      confidence: '42%'
    },
    {
      status: 'FALSE',
      date: 'Checked on 2023-10-05',
      title: 'Tech CEO Steps Down Amidst Scandal',
      description: 'Fabricated press release traced back to coordinated disinformation network. CEO is currently scheduled for keynotes.',
      confidence: '95%'
    }
  ];

  return (
    <section id="history" className="relative flex flex-col lg:flex-row min-h-screen w-full px-4 sm:px-6 md:px-10 py-12 md:py-16 max-w-7xl mx-auto gap-8 lg:gap-16">
      <div className="w-full lg:w-1/3 lg:pt-10 lg:sticky lg:top-32 h-fit">
        <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-none tracking-[-0.03em] mb-4 md:mb-6 drop-shadow-md">
          your<br/>signal<br/>log
        </h1>
        <p className="text-white/90 text-base md:text-lg max-w-sm drop-shadow-sm font-medium mb-8 lg:mb-0">
          A complete history of transmissions you've verified through the Truth Engine array.
        </p>
      </div>
      
      <div className="w-full lg:w-2/3 flex flex-col gap-6 md:gap-8 pb-16 md:pb-32">
        {historyItems.map((item, index) => (
          <div key={index} className="bg-white/10 backdrop-blur-xl border border-white/30 shadow-lg rounded-xl p-4 sm:p-6 hover:bg-white/20 transition-all cursor-pointer group flex flex-col sm:flex-row items-start gap-4 sm:gap-6 transform hover:-translate-y-2 hover:shadow-2xl">
            <div className="flex-1 flex flex-col gap-2 w-full">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1">
                <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider bg-white/20 text-white border border-white/40 shadow-sm">
                  {item.status}
                </span>
                <span className="text-white/80 font-medium text-xs sm:text-sm">{item.date}</span>
              </div>
              <h3 className="text-white text-lg sm:text-xl md:text-2xl font-bold leading-tight drop-shadow-sm">
                {item.title}
              </h3>
              <p className="text-white/90 text-xs sm:text-sm mt-2">{item.description}</p>
            </div>
            <div className="flex sm:flex-col items-center sm:items-end gap-4 w-full sm:w-auto justify-between sm:justify-start sm:min-w-[100px]">
              <div className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-md rounded-lg p-2 sm:p-3 border border-white/20 shadow-inner">
                <span className="text-white text-lg sm:text-xl font-black">{item.confidence}</span>
                <span className="text-white/80 text-[10px] uppercase tracking-wider font-bold">Confidence</span>
              </div>
              <button className="text-white/80 hover:text-white transition-all hover:scale-125">
                <span className="material-symbols-outlined drop-shadow-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HistorySection;
