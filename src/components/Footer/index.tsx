import type { NextPage } from 'next';
import Image from "next/image";

const Footer: NextPage = () => {
  return (
    <div className="w-full relative bg-black flex flex-col items-center justify-start px-5 py-16 box-border text-left text-base text-zinc-400 font-roboto">
      <div className="w-full max-w-[1120px] relative h-[237px]">
        <div className="absolute w-full top-0 right-0 left-0 flex flex-col items-start justify-start gap-6">
          <div className="overflow-hidden flex flex-col items-start justify-start max-w-[1120px]">
            <div className="flex flex-col items-start justify-start py-[6.5px] px-0">
              <div className="overflow-hidden flex flex-col items-start justify-start max-w-40">
                <div className="w-40 h-[35px] overflow-hidden flex-shrink-0 flex flex-col items-center justify-center">
                  <div className="self-stretch relative h-[34px]">
                    <div className="absolute top-0 left-0 bg-black w-40 h-[34px]" />
                    <Image 
                      className="absolute top-1 left-[5px] w-[150px] h-[25px] object-cover" 
                      width={150} 
                      height={25} 
                      alt="메를로랩 로고" 
                      src="/메를로랩 로고.png" 
                      unoptimized
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-row items-start justify-center gap-4">
            <div className="self-stretch w-[552px] flex flex-col items-start justify-start">
              <div className="relative leading-6">
                <p className="m-0">설비 환경 분석부터 현장 최적화된 에너지 운영까지</p>
                <p className="m-0 text-[#583cf2] font-bold">
                절감의 패러다임을 바꿉니다
                </p>
              </div>
            </div>
            <div className="self-stretch w-[552px] flex flex-col items-start justify-start">
              <div className="relative leading-6">
                <p className="m-0">서울특별시 금천구 디지털로9길 68 (가산동) 대륭포스트 타워 5차 2002~2005호</p>
                <p className="m-0">문의전화 : 02) 862-170
                  <a className="text-inherit" href="tel:02-862-1700" target="_blank">
                    <span className="underline">0</span>
                  </a>
                </p>
                <p className="m-0">사업장 등록번호 : 119-86-57418</p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute w-full top-[200px] right-0 left-0 bg-zinc-300 h-px" />
        <div className="absolute w-full top-[217px] right-0 left-0 flex flex-col items-start justify-start text-sm">
          <div className="relative leading-5">© Copyright merlot.lab All Rights Reserved.</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;