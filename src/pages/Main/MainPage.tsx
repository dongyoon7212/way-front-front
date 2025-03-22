/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from "react";
import * as s from "./style";
import { LuAlignJustify } from "react-icons/lu";
import { TbWorldSearch } from "react-icons/tb";
import { FaPlus } from "react-icons/fa6";
import GoogleMapComponent from "../../components/GoogleMap/GoogleMapComponent";
import SideBarComponent from "../../components/SideBar/SideBarComponent";
import LoginModalComponent from "../../components/Login/LoginModalComponent";
import SignUpModalComponent from "../../components/SignUpModalComponent/SignUpModalComponent";

function MainPage() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isLoginOpen, setIsLoginOpen] = useState(false); // 로그인 모달 상태
	const [isSignUpOpen, setIsSignUpOpen] = useState(false);

	const menuRef = useRef<HTMLDivElement>(null);

	// 바깥 클릭 시 메뉴 닫기
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				menuRef.current &&
				!menuRef.current.contains(event.target as Node)
			) {
				setIsMenuOpen(false);
			}
		};

		if (isMenuOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isMenuOpen]);

	return (
		<div css={s.layout}>
			<SideBarComponent
				isOpen={isSidebarOpen}
				onClose={() => setIsSidebarOpen(false)}
				onLogin={() => setIsLoginOpen(true)}
			/>
			<GoogleMapComponent />
			<button css={s.sidebarBtn} onClick={() => setIsSidebarOpen(true)}>
				<LuAlignJustify />
			</button>
			<div css={s.searchBox}>
				<input type="text" />
				{/* <TbWorldSearch /> */}
			</div>
			<div css={s.addPostContainer} ref={menuRef}>
				{/* 플러스 버튼 */}
				<button
					css={s.addPostBtn}
					onClick={() => setIsMenuOpen(!isMenuOpen)}
				>
					<FaPlus />
				</button>
				{/* 추가 메뉴 (애니메이션 포함) */}
				<div css={s.menuWrapper(isMenuOpen)}>
					<button css={s.menuItem}>📷 사진 업로드</button>
					<button css={s.menuItem}>📝 일정 업로드</button>
				</div>
			</div>
			{isLoginOpen && (
				<LoginModalComponent
					isOpen={isLoginOpen}
					onClose={() => setIsLoginOpen(false)}
					onSignUpOpen={() => {
						setIsLoginOpen(false);
						setIsSignUpOpen(true);
					}}
				/>
			)}
			<SignUpModalComponent
				isOpen={isSignUpOpen}
				onClose={() => setIsSignUpOpen(false)}
				onLoginOpen={() => setIsLoginOpen(true)}
			/>
		</div>
	);
}

export default MainPage;
