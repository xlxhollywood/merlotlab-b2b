import type { NextPage } from 'next';
import Image from "next/image";

const Footer: NextPage = () => {
  return (
    <div className="w-full relative bg-[#1B2027] flex flex-col items-center justify-start px-4 sm:px-5 py-12 sm:py-16 box-border text-left text-sm sm:text-base text-zinc-400 font-roboto">
      <div className="w-full max-w-[1120px] relative">
        <div className="flex flex-col items-start justify-start gap-6 sm:gap-8">
          {/* 로고 */}
          <div className="flex flex-col items-start justify-start py-2">
            <div className="flex flex-col items-start justify-start">
              <div className="w-32 sm:w-40 h-8 sm:h-[35px] flex items-center justify-center">
                <Image 
                  className="w-[120px] sm:w-[150px] h-[20px] sm:h-[25px] object-cover" 
                  width={150} 
                  height={25} 
                  alt="메를로랩 로고" 
                  src="/메를로랩 로고2.png" 
                  unoptimized
                />
              </div>
            </div>
          </div>
          
          {/* 콘텐츠 영역 */}
          <div className="w-full flex flex-col lg:flex-row items-start justify-start gap-6 lg:gap-8">
            {/* 왼쪽 텍스트 */}
            <div className="w-full lg:w-1/2 flex flex-col items-start justify-start">
              <div className="relative leading-6 sm:leading-7">
                <p className="m-0 text-sm sm:text-base">설비 환경 분석부터 현장 최적화된 에너지 운영까지</p>
                <p className="m-0 text-[#583cf2] font-semibold text-sm sm:text-base">
                  절감의 패러다임을 바꿉니다
                </p>
              </div>
            </div>
            
            {/* 오른쪽 주소 정보 */}
            <div className="w-full lg:w-1/2 flex flex-col items-start justify-start">
              <div className="relative leading-6 sm:leading-7">
                <p className="m-0 text-sm sm:text-base">서울특별시 금천구 디지털로9길 68 (가산동) 대륭포스트 타워 5차 2002~2005호</p>
                <p className="m-0 text-sm sm:text-base">문의전화 : 02) 862-1700</p>
                <p className="m-0 text-sm sm:text-base">사업장 등록번호 : 119-86-57418</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* 구분선 */}
        <div className="w-full bg-zinc-300 h-px mt-8 sm:mt-12" />
        
        {/* 저작권 */}
        <div className="flex flex-col items-start justify-start text-xs sm:text-sm mt-4 sm:mt-6">
          <div className="relative leading-5">© Copyright merlot.lab All Rights Reserved.</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;