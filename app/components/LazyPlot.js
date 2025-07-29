'use client';

import React, { useState, useEffect, useRef } from 'react';

const LazyPlot = ({ chartName }) => {
  const [Plot, setPlot] = useState(null);
  const [chart, setChart] = useState(null);
  const [isInView, setIsInView] = useState(false);
  const [isPlotReady, setIsPlotReady] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (isInView) {
      import('react-plotly.js').then((mod) => {
        setPlot(() => mod.default);
      });

      fetch(`/api/chart-data/${chartName}`)
        .then((res) => res.json())
        .then((data) => setChart(data));
    }
  }, [isInView, chartName]);

  return (
    <div className="relative w-full h-full" ref={containerRef}>
      {/* Loading Placeholder */}
      <div
        className={`w-full h-full flex items-center justify-center bg-gray-200/50 transition-opacity duration-500 ${isPlotReady ? 'opacity-0' : 'opacity-100'}`}
      >
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#337966]"></div>
      </div>

      {/* Plotly Chart, rendered when component is loaded and ready */}
      {Plot && chart && (
        <div
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${isPlotReady ? 'opacity-100' : 'opacity-0'}`}
        >
          <Plot
            data={chart.data}
            layout={chart.layout}
            className="w-full h-full"
            useResizeHandler
            onInitialized={() => setIsPlotReady(true)}
          />
        </div>
      )}
    </div>
  );
};

export default LazyPlot;
