'use client';

import React, { useCallback } from 'react';
import Image from "next/image";
import styles from './index.module.css';

// NextPage 타입 대신 React.FC 사용 (헤더는 페이지가 아닌 컴포넌트)
const Header: React.FC = () => {
  	
  	const onContainerClick = useCallback(() => {
    		// Add your code here
  	}, []);
  	
  	return (
    		<div className={styles.header}>
      			<div className={styles.container} onClick={onContainerClick}>
        				<div className={styles.container1}>
          					<div className={styles.button}>
            						<div className={styles.logo}>
              							<div className={styles.whiteBgsvgFill}>
                								<div className={styles.rectangleParent}>
                  									<div className={styles.groupChild} />
                  									<Image 
                  										className={styles.icon} 
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
          					<div className={styles.container2}>
            						{/* 솔루션 메뉴 - 드롭다운 있음 (화살표 없음) */}
            						<div className={styles.solutionMenu}>
              							<div className={styles.simpleContainer}>
                								<div className={styles.div}>솔루션</div>
              							</div>
              							{/* 드롭다운 메뉴 */}
              							<div className={styles.dropdown}>
                								<div className={styles.dropdownItem}>Grid 3.0</div>
                								<div className={styles.dropdownItem}>메를로랩 IoT LED</div>
              							</div>
            						</div>
            						
            						{/* 나머지 메뉴들 - 화살표 없음 */}
            						<div className={styles.buttonMenu1}>
              							<div className={styles.simpleContainer}>
                								<div className={styles.div}>도입&사례</div>
              							</div>
            						</div>
            						<div className={styles.buttonMenu2}>
              							<div className={styles.simpleContainer}>
                								<div className={styles.div}>고객지원</div>
              							</div>
            						</div>
            						<div className={styles.buttonMenu3}>
              							<div className={styles.simpleContainer}>
                								<div className={styles.div}>회사소개</div>
              							</div>
            						</div>
          					</div>
        				</div>
        				<div className={styles.container11}>
          					<div className={styles.button1}>
            						<b className={styles.b}>문의하기</b>
          					</div>
        				</div>
      			</div>
    		</div>
  	);
};

export default Header;