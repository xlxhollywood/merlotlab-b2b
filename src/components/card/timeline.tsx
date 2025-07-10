import React, { useEffect, useRef, useState } from 'react';

interface TimelineCard {
  title: string;
  description: string;
  image: string;
}

interface TimelineCardsProps {
  cards: TimelineCard[];
  className?: string;
}

const TimelineCards: React.FC<TimelineCardsProps> = ({ cards, className = "" }) => {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(cards.length).fill(false));
  const [scrollProgress, setScrollProgress] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    cardRefs.current.forEach((cardRef, index) => {
      if (cardRef) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setVisibleCards(prev => {
                  const newVisible = [...prev];
                  newVisible[index] = true;
                  return newVisible;
                });
              }
            });
          },
          {
            threshold: 0.2,
            rootMargin: '-50px 0px -50px 0px'
          }
        );

        observer.observe(cardRef);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [cards.length]);

  // 스크롤 진행도 추적
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const sectionHeight = sectionRef.current.offsetHeight;
        const windowHeight = window.innerHeight;
        
        // 섹션이 뷰포트에 들어오기 시작할 때부터 완전히 지나갈 때까지의 진행도 계산
        const scrollStart = -rect.top;
        const scrollEnd = sectionHeight + windowHeight;
        const progress = Math.max(0, Math.min(1, scrollStart / scrollEnd));
        
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 초기 계산

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className={`bg-gray-50 py-24 px-5 ${className}`}>
      <div className="max-w-[1800px] mx-auto">
        {/* Timeline Layout */}
        <div className="relative">
          {/* 중앙 수직선 - 스크롤 진행도에 따라 투명도 변화 */}
          <div 
            className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 transition-opacity duration-300"
            style={{ 
              backgroundColor: `rgba(88, 60, 242, ${0.2 + (scrollProgress * 0.6)})` // 0.2에서 0.8까지 변화
            }}
          ></div>
          
          {/* Timeline Cards */}
          <div className="space-y-32">
            {cards.map((card, index) => (
              <div 
                key={index} 
                className="relative"
                ref={el => { cardRefs.current[index] = el; }}
              >
                {/* Timeline Node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/2 z-20">
                  <div 
                    className={`w-4 h-4 rounded-full shadow-lg transition-all duration-700 ${
                      visibleCards[index] 
                        ? 'scale-100 opacity-100' 
                        : 'scale-50 opacity-50'
                    }`}
                    style={{ backgroundColor: "#583CF2" }}
                  ></div>
                </div>
                
                {/* Card Container */}
                <div className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <div className={`w-full max-w-4xl ${index % 2 === 0 ? 'pr-32' : 'pl-32'}`}>
                    {/* Card */}
                    <div 
                      className={`group bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-3 ${
                        visibleCards[index]
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-0 translate-y-16'
                      }`}
                      style={{
                        transitionDelay: visibleCards[index] ? `${index * 200}ms` : '0ms'
                      }}
                    >
                      {/* Card Content - Horizontal Layout */}
                      <div className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} h-96`}>
                        {/* Image Section */}
                        <div className="w-2/5 relative overflow-hidden">
                          <img 
                            src={card.image} 
                            alt={card.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                        </div>
                        
                        {/* Text Content */}
                        <div className="w-3/5 p-12 flex flex-col justify-center">
                          <h3 className="text-3xl font-bold text-gray-800 mb-6 leading-tight">
                            {card.title}
                          </h3>
                          
                          <p className="text-lg text-gray-600 leading-relaxed">
                            {card.description}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Connection Line to Timeline */}
                    <div className={`absolute top-1/2 transform -translate-y-1/2 w-32 h-0.5 bg-gray-300 transition-all duration-700 ${
                      index % 2 === 0 ? 'right-0' : 'left-0'
                    } ${
                      visibleCards[index] ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                    }`}
                    style={{
                      transformOrigin: index % 2 === 0 ? 'right center' : 'left center',
                      transitionDelay: visibleCards[index] ? `${index * 200 + 300}ms` : '0ms'
                    }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineCards;