'use client'

import { useState } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import FadeInUp from '@/components/animation/fade-in-up'
import { Search, ChevronLeft, ChevronRight } from 'lucide-react'

// Titillium Web 폰트 import
import { Titillium_Web } from 'next/font/google'

const titilliumWeb = Titillium_Web({
  subsets: ['latin'],
  weight: ['200', '300', '400', '600', '700', '900'],
  variable: '--font-titillium-web',
})

interface DisclosureItem {
  id: string
  title: string
  date: string
  category: string
  pdfUrl: string
}

const disclosureData: DisclosureItem[] = [
  {
    id: '14760',
    title: '주주명부 기준일 설정 공고',
    date: '2025.06.27',
    category: '50',
    pdfUrl: 'https://example.com/disclosure1.pdf'
  },
  {
    id: '14758',
    title: '[주요 경영상황 공시] 주주총회소집 결의',
    date: '2025.06.27',
    category: '40',
    pdfUrl: 'https://example.com/disclosure2.pdf'
  },
  {
    id: '14756',
    title: '임원 선임 공시',
    date: '2025.06.27',
    category: '41',
    pdfUrl: 'https://example.com/disclosure3.pdf'
  },
  {
    id: '13650',
    title: '주식보상 부여 및 취소',
    date: '2025.04.30',
    category: '50',
    pdfUrl: 'https://example.com/disclosure4.pdf'
  },
  {
    id: '13648',
    title: '[주요 경영상황 공시] 주식매수선택권 부여 취소',
    date: '2025.04.30',
    category: '40',
    pdfUrl: 'https://example.com/disclosure5.pdf'
  },
  {
    id: '13646',
    title: '[주요 경영상황 공시] 자기주식 처분 결정',
    date: '2025.04.30',
    category: '40',
    pdfUrl: 'https://example.com/disclosure6.pdf'
  },
  {
    id: '13016',
    title: '임원 선임 및 사임 공시',
    date: '2025.03.28',
    category: '41',
    pdfUrl: 'https://example.com/disclosure7.pdf'
  },
  {
    id: '13014',
    title: '주주총회 결과 공시',
    date: '2025.03.28',
    category: '41',
    pdfUrl: 'https://example.com/disclosure8.pdf'
  },
  {
    id: '13012',
    title: '[주요 경영상황 공시] 주식매수선택권 부여',
    date: '2025.03.28',
    category: '40',
    pdfUrl: 'https://example.com/disclosure9.pdf'
  },
  {
    id: '12740',
    title: '임원 선임 공시',
    date: '2025.03.12',
    category: '41',
    pdfUrl: 'https://example.com/disclosure10.pdf'
  }
]

export default function IRPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [activeTab, setActiveTab] = useState('disclosure')
  
  const itemsPerPage = 10
  const totalPages = Math.ceil(disclosureData.length / itemsPerPage)
  
  const filteredData = disclosureData.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleDownload = (url: string, title: string) => {
    // 실제 다운로드 로직 구현
    window.open(url, '_blank')
  }

  return (
    <div>
      <Header />
      
      {/* Hero Section */}
      <section className="mt-16 lg:mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-start pl-8">
              <h1 className={`text-4xl md:text-5xl font-bold text-gray-700 mb-4 ${titilliumWeb.className}`}>IR Center</h1>
            </div>
        </div>
      </section>

      {/* Main Content */}
      <FadeInUp delay={300}>
      <section className="py-16 lg:py-16 pl-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-20">
            {/* Sidebar */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="space-y-4">
                <a 
                  href="#disclosure" 
                  className={`block px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'disclosure' 
                      ? 'bg-[#583CF2] text-white' 
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTab('disclosure')}
                >
                  공시 정보
                </a>
                <a 
                  href="#announcement" 
                  className={`block px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'announcement' 
                      ? 'bg-[#583CF2] text-white' 
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTab('announcement')}
                >
                  공고 사항
                </a>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1">
              <div className="space-y-12">
                {/* Search Bar */}
                <div className="max-w-md">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="search"
                      placeholder="찾으시는 내용을 검색해보세요"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-[#583CF2] focus:border-[#583CF2]"
                    />
                  </div>
                </div>

                {/* Disclosure List */}
                <div className="space-y-4">
                  {currentData.map((item) => (
                    <a 
                      key={item.id}
                      href={`/ir/disclosure/${item.id}`}
                      className="block p-6 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {item.title}
                            </h3>
                            <span className="text-sm text-gray-500">
                              {item.date}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <button
                            onClick={(e) => {
                              e.preventDefault()
                              handleDownload(item.pdfUrl, item.title)
                            }}
                            className="px-3 py-2 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                          >
                            다운로드
                          </button>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <nav className="flex justify-center">
                    <ul className="flex space-x-1">
                      <li>
                        <button
                          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                          disabled={currentPage === 1}
                          className="px-3 py-2 text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                      </li>
                      
                      {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
                        let pageNum
                        if (totalPages <= 7) {
                          pageNum = i + 1
                        } else if (currentPage <= 4) {
                          pageNum = i + 1
                        } else if (currentPage >= totalPages - 3) {
                          pageNum = totalPages - 6 + i
                        } else {
                          pageNum = currentPage - 3 + i
                        }
                        
                        return (
                          <li key={pageNum}>
                            <button
                              onClick={() => setCurrentPage(pageNum)}
                              className={`px-3 py-2 rounded-lg border ${
                                currentPage === pageNum
                                  ? 'bg-[#583CF2] text-white border-[#583CF2]'
                                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                              }`}
                            >
                              {pageNum}
                            </button>
                          </li>
                        )
                      })}
                      
                      {totalPages > 7 && currentPage < totalPages - 3 && (
                        <li>
                          <span className="px-3 py-2 text-gray-500">...</span>
                        </li>
                      )}
                      
                      {totalPages > 7 && currentPage < totalPages - 3 && (
                        <li>
                          <button
                            onClick={() => setCurrentPage(totalPages)}
                            className="px-3 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                          >
                            {totalPages}
                          </button>
                        </li>
                      )}
                      
                      <li>
                        <button
                          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                          disabled={currentPage === totalPages}
                          className="px-3 py-2 text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </li>
                    </ul>
                  </nav>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      </FadeInUp>

      <Footer />
    </div>
  )
}
