import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { timer } from "rxjs";
import i18n from "../../utils/i18n/i18n";
import { displayCreateChatModal, displayUserMenu, displayUserSettings } from "../../context/actions/chat";
import useWindowDimensions from "../../utils/hooks/useWindowDimensions";
import useOutsideClick from "../../utils/hooks/useOutsideClick";
import { RootState } from "../../context/rootState.interface";
import { languages } from "../../utils/i18n/Langs";
import { setLanguageCookie } from "../button/language/LanguageButton";
import ThemeSwitch from "../switch/triple/ThemeSwitch";
import { Button } from "../button/Button";
import "./ChatMenu.css";

export const UserChatMenu = () => {
  const [t] = useTranslation();

  const [hide, setHide] = useState(true);

  const menuRef = useRef<any>(null);
  const user = useSelector((state: RootState) => state.auth.user);

  const showUserMenu = useSelector((state: RootState) => state.chat.showUserMenu);
  const userMenuButtonRef = useSelector((state: RootState) => state.chat.userMenuButtonRef);
  const showCreateChat = useSelector((state: RootState) => state.chat.showCreateChat);
  const showUserSettings = useSelector((state: RootState) => state.chat.showUserSettings);
  const showCustomThemeModal = useSelector((state: RootState) => state.theme.showCustomThemeModal);

  const history = useHistory();
  const dispatch = useDispatch();

  const { width } = useWindowDimensions();

  useOutsideClick(
    menuRef,
    () => dispatch(displayUserMenu(showUserMenu ? showCreateChat || showCustomThemeModal || showUserSettings : false)),
    userMenuButtonRef
  );

  useEffect(() => {
    if (!showUserMenu) {
      timer(260).subscribe(() => {
        setHide(true);
      });
    } else {
      setHide(false);
    }
  }, [showUserMenu]);

  return (
    <div
      className={`user-menu grid ${
        width < 621 ? (showUserMenu ? "show-menu-sm" : "hide-menu-sm") : showUserMenu ? "show-menu" : "hide-menu"
      } ${hide ? "none" : ""}`}
      ref={menuRef}
    >
      <header className="grid">
        <div className="wrapper flex j-c-c a-i-c">
          <img src={user.photo ? user.photo : "https://via.placeholder.com/70"} alt={user.username} width={70} height={70} />
        </div>
        {user.firstName && user.lastName ? (
          <p className="u-name flex a-i-c j-c-f-s">
            <span className="h6-s">{user.firstName}</span>
            <span className="h6-s">{user.lastName}</span>
          </p>
        ) : (
          <p className="u-name flex a-i-c j-c-f-s h6-s">{user.username}</p>
        )}
        <p className="u-ph flex a-i-c j-c-f-s helper">{user.phoneNumber}</p>
      </header>
      <div className="langs flex j-c-s-a a-i-c f-f-r-n f-w f-h">
        {languages.map((item, index) => (
          <button
            key={index}
            aria-label={t(`navbar.ariaLabel.langButton.${item}}`)}
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => setLanguageCookie(event, history)}
            data-lang={item}
            className={`icon-nav btn-sec ${location.pathname.split("/")[1] === item ? "active" : ""}`}
          >
            {item.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="list">
        <ul className="flex f-f-c-n j-c-s-b">
          <li className="user-menu-item">
            <Button
              onClick={() => dispatch(displayCreateChatModal(true))}
              layoutType="flex"
              className="create-chat j-c-f-s f-w f-h h6-s btn-sec no-border"
              type="button"
            >
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 8.2C14 7.64772 13.5523 7.2 13 7.2C12.4477 7.2 12 7.64772 12 8.2H14ZM12 17.8C12 18.3523 12.4477 18.8 13 18.8C13.5523 18.8 14 18.3523 14 17.8H12ZM17.8 14C18.3523 14 18.8 13.5523 18.8 13C18.8 12.4477 18.3523 12 17.8 12V14ZM8.2 12C7.64772 12 7.2 12.4477 7.2 13C7.2 13.5523 7.64772 14 8.2 14V12ZM12 8.2V13H14V8.2H12ZM12 13V17.8H14V13H12ZM13 14H17.8V12H13V14ZM13 12H8.2V14H13V12ZM24 13C24 19.0751 19.0751 24 13 24V26C20.1797 26 26 20.1797 26 13H24ZM13 24C6.92487 24 2 19.0751 2 13H0C0 20.1797 5.8203 26 13 26V24ZM2 13C2 6.92487 6.92487 2 13 2V0C5.8203 0 0 5.8203 0 13H2ZM13 2C19.0751 2 24 6.92487 24 13H26C26 5.8203 20.1797 0 13 0V2Z" />
              </svg>
              <span>{t("chatMenu.cr_ch")}</span>
            </Button>
          </li>
          <li className="user-menu-item">
            <Button disabled onClick={() => {}} layoutType="flex" className="contacts j-c-f-s f-w f-h h6-s btn-sec no-border" type="button">
              <svg width="29" height="24" viewBox="0 0 29 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.2 4.8C19.2 6.07304 18.6943 7.29394 17.7941 8.19411C16.8939 9.09429 15.673 9.6 14.4 9.6C13.127 9.6 11.9061 9.09429 11.0059 8.19411C10.1057 7.29394 9.6 6.07304 9.6 4.8C9.6 3.52696 10.1057 2.30606 11.0059 1.40589C11.9061 0.505713 13.127 0 14.4 0C15.673 0 16.8939 0.505713 17.7941 1.40589C18.6943 2.30606 19.2 3.52696 19.2 4.8Z" />
                <path d="M27.2 8C27.2 8.84869 26.8629 9.66262 26.2627 10.2627C25.6626 10.8629 24.8487 11.2 24 11.2C23.1513 11.2 22.3374 10.8629 21.7373 10.2627C21.1371 9.66262 20.8 8.84869 20.8 8C20.8 7.15131 21.1371 6.33737 21.7373 5.73726C22.3374 5.13714 23.1513 4.8 24 4.8C24.8487 4.8 25.6626 5.13714 26.2627 5.73726C26.8629 6.33737 27.2 7.15131 27.2 8Z" />
                <path d="M20.8 19.2C20.8 17.5026 20.1257 15.8747 18.9255 14.6745C17.7253 13.4743 16.0974 12.8 14.4 12.8C12.7026 12.8 11.0747 13.4743 9.87452 14.6745C8.67428 15.8747 8 17.5026 8 19.2V24H20.8V19.2Z" />
                <path d="M8 8C8 8.84869 7.66286 9.66262 7.06274 10.2627C6.46263 10.8629 5.64869 11.2 4.8 11.2C3.95131 11.2 3.13737 10.8629 2.53726 10.2627C1.93714 9.66262 1.6 8.84869 1.6 8C1.6 7.15131 1.93714 6.33737 2.53726 5.73726C3.13737 5.13714 3.95131 4.8 4.8 4.8C5.64869 4.8 6.46263 5.13714 7.06274 5.73726C7.66286 6.33737 8 7.15131 8 8Z" />
                <path d="M24 24V19.2C24.0023 17.5733 23.5893 15.9728 22.8 14.5504C23.5094 14.3689 24.2508 14.3517 24.9678 14.5003C25.6848 14.649 26.3583 14.9593 26.9371 15.4079C27.5159 15.8564 27.9846 16.4311 28.3074 17.0883C28.6303 17.7455 28.7987 18.4678 28.8 19.2V24H24Z" />
                <path d="M6 14.5504C5.2108 15.9729 4.79776 17.5733 4.8 19.2V24H4.25151e-07V19.2C-0.000307949 18.4673 0.167141 17.7442 0.489515 17.0862C0.811889 16.4282 1.28063 15.8527 1.85981 15.4039C2.439 14.9551 3.11325 14.6448 3.8309 14.4968C4.54854 14.3489 5.29053 14.3672 6 14.5504Z" />
              </svg>
              <span>{t("chatMenu.con")}</span>
            </Button>
          </li>
          <li className="user-menu-item">
            <Button
              onClick={() => dispatch(displayUserSettings(true))}
              layoutType="flex"
              className="settings j-c-f-s f-w f-h h6-s btn-sec no-border"
              type="button"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.1345 12.6533V11.3381L22.7849 9.89404C23.0892 9.62589 23.2888 9.25883 23.3486 8.85773C23.4083 8.45663 23.3244 8.04731 23.1116 7.70212L21.083 4.26381C20.9322 4.00273 20.7155 3.78587 20.4545 3.635C20.1935 3.48413 19.8974 3.40455 19.5959 3.40424C19.4091 3.40281 19.2233 3.43184 19.0458 3.4902L16.957 4.19505C16.5964 3.9554 16.2202 3.74003 15.831 3.55037L15.3926 1.38423C15.314 0.988489 15.0987 0.632999 14.7844 0.379993C14.4701 0.126987 14.0768 -0.00741487 13.6734 0.000315835H9.65061C9.2472 -0.00741487 8.85394 0.126987 8.53964 0.379993C8.22535 0.632999 8.01006 0.988489 7.93145 1.38423L7.49307 3.55037C7.10105 3.73999 6.722 3.95535 6.35843 4.19505L4.31264 3.45581C4.13324 3.40907 3.94747 3.39166 3.76251 3.40424C3.46103 3.40455 3.16494 3.48413 2.90393 3.635C2.64292 3.78587 2.42618 4.00273 2.27544 4.26381L0.246842 7.70212C0.0462053 8.0468 -0.0283503 8.45051 0.0359439 8.84412C0.100238 9.23773 0.299382 9.59673 0.599268 9.85966L2.22387 11.3467V12.6619L0.599268 14.106C0.290911 14.3707 0.0863204 14.7361 0.0218033 15.1374C-0.0427137 15.5387 0.0370155 15.9498 0.246842 16.2979L2.27544 19.7362C2.42618 19.9973 2.64292 20.2141 2.90393 20.365C3.16494 20.5159 3.46103 20.5955 3.76251 20.5958C3.94934 20.5972 4.13515 20.5682 4.31264 20.5098L6.40141 19.805C6.76203 20.0446 7.13821 20.26 7.52745 20.4496L7.96584 22.6158C8.04444 23.0115 8.25973 23.367 8.57403 23.62C8.88832 23.873 9.28159 24.0074 9.68499 23.9997H13.7422C14.1456 24.0074 14.5389 23.873 14.8532 23.62C15.1674 23.367 15.3827 23.0115 15.4613 22.6158L15.8997 20.4496C16.2917 20.26 16.6708 20.0446 17.0344 19.805L19.1145 20.5098C19.292 20.5682 19.4778 20.5972 19.6647 20.5958C19.9661 20.5955 20.2622 20.5159 20.5232 20.365C20.7843 20.2141 21.001 19.9973 21.1517 19.7362L23.1116 16.2979C23.3122 15.9532 23.3868 15.5495 23.3225 15.1559C23.2582 14.7623 23.059 14.4033 22.7591 14.1403L21.1345 12.6533ZM19.5959 18.8766L16.6476 17.8795C15.9574 18.4641 15.1686 18.9211 14.3181 19.229L13.7078 22.3149H9.65061L9.04031 19.2634C8.19657 18.9467 7.41203 18.4905 6.71945 17.9139L3.76251 18.8766L1.73391 15.4383L4.07196 13.3753C3.91302 12.4855 3.91302 11.5746 4.07196 10.6848L1.73391 8.5617L3.76251 5.12339L6.71086 6.1205C7.40104 5.53589 8.18985 5.07891 9.04031 4.77096L9.65061 1.68509H13.7078L14.3181 4.73658C15.1618 5.05327 15.9464 5.50946 16.639 6.08612L19.5959 5.12339L21.6245 8.5617L19.2865 10.6247C19.4454 11.5145 19.4454 12.4254 19.2865 13.3152L21.6245 15.4383L19.5959 18.8766Z" />
                <path d="M11.6792 17.1575C10.6592 17.1575 9.66201 16.855 8.81388 16.2883C7.96574 15.7216 7.30469 14.9161 6.91434 13.9737C6.52398 13.0313 6.42185 11.9943 6.62085 10.9938C6.81985 9.99338 7.31105 9.07441 8.03233 8.35313C8.75362 7.63184 9.67259 7.14064 10.673 6.94164C11.6735 6.74264 12.7105 6.84478 13.6529 7.23513C14.5953 7.62549 15.4008 8.28653 15.9675 9.13467C16.5342 9.98281 16.8367 10.98 16.8367 12C16.8436 12.6792 16.7149 13.353 16.4581 13.9818C16.2014 14.6107 15.8217 15.1819 15.3414 15.6622C14.8612 16.1425 14.2899 16.5222 13.661 16.7789C13.0322 17.0357 12.3584 17.1644 11.6792 17.1575ZM11.6792 8.5617C11.2248 8.55111 10.7729 8.63281 10.351 8.80185C9.92906 8.9709 9.5458 9.22377 9.22439 9.54518C8.90298 9.86659 8.6501 10.2499 8.48106 10.6718C8.31201 11.0937 8.23032 11.5456 8.2409 12C8.23032 12.4544 8.31201 12.9063 8.48106 13.3282C8.6501 13.7501 8.90298 14.1334 9.22439 14.4548C9.5458 14.7762 9.92906 15.0291 10.351 15.1981C10.7729 15.3672 11.2248 15.4489 11.6792 15.4383C12.1336 15.4489 12.5855 15.3672 13.0074 15.1981C13.4293 15.0291 13.8126 14.7762 14.134 14.4548C14.4554 14.1334 14.7083 13.7501 14.8774 13.3282C15.0464 12.9063 15.1281 12.4544 15.1175 12C15.1281 11.5456 15.0464 11.0937 14.8774 10.6718C14.7083 10.2499 14.4554 9.86659 14.134 9.54518C13.8126 9.22377 13.4293 8.9709 13.0074 8.80185C12.5855 8.63281 12.1336 8.55111 11.6792 8.5617Z" />
              </svg>
              <span>{t("chatMenu.set")}</span>
            </Button>
          </li>
          <li className="user-menu-item flex">
            <Link to={`/${i18n.language}/`} className="home f-w f-h flex j-c-f-s a-i-c h6-s btn-sec no-border" type="button">
              <svg height="24px" viewBox="0 0 512 512" width="24px" xmlns="http://www.w3.org/2000/svg">
                <path d="m498.699219 222.695312c-.015625-.011718-.027344-.027343-.039063-.039062l-208.855468-208.847656c-8.902344-8.90625-20.738282-13.808594-33.328126-13.808594-12.589843 0-24.425781 4.902344-33.332031 13.808594l-208.746093 208.742187c-.070313.070313-.144532.144531-.210938.214844-18.28125 18.386719-18.25 48.21875.089844 66.558594 8.378906 8.382812 19.441406 13.234375 31.273437 13.746093.484375.046876.96875.070313 1.457031.070313h8.320313v153.695313c0 30.417968 24.75 55.164062 55.167969 55.164062h81.710937c8.285157 0 15-6.71875 15-15v-120.5c0-13.878906 11.292969-25.167969 25.171875-25.167969h48.195313c13.878906 0 25.167969 11.289063 25.167969 25.167969v120.5c0 8.28125 6.714843 15 15 15h81.710937c30.421875 0 55.167969-24.746094 55.167969-55.164062v-153.695313h7.71875c12.585937 0 24.421875-4.902344 33.332031-13.8125 18.359375-18.367187 18.367187-48.253906.027344-66.632813zm-21.242188 45.421876c-3.238281 3.238281-7.542969 5.023437-12.117187 5.023437h-22.71875c-8.285156 0-15 6.714844-15 15v168.695313c0 13.875-11.289063 25.164062-25.167969 25.164062h-66.710937v-105.5c0-30.417969-24.746094-55.167969-55.167969-55.167969h-48.195313c-30.421875 0-55.171875 24.75-55.171875 55.167969v105.5h-66.710937c-13.875 0-25.167969-11.289062-25.167969-25.164062v-168.695313c0-8.285156-6.714844-15-15-15h-22.328125c-.234375-.015625-.464844-.027344-.703125-.03125-4.46875-.078125-8.660156-1.851563-11.800781-4.996094-6.679688-6.679687-6.679688-17.550781 0-24.234375.003906 0 .003906-.003906.007812-.007812l.011719-.011719 208.847656-208.839844c3.234375-3.238281 7.535157-5.019531 12.113281-5.019531 4.574219 0 8.875 1.78125 12.113282 5.019531l208.800781 208.796875c.03125.03125.066406.0625.097656.09375 6.644531 6.691406 6.632813 17.539063-.03125 24.207032zm0 0" />
              </svg>
              <span>{t("chatMenu.m")}</span>
            </Link>
          </li>
          <li className="user-menu-item flex">
            <Button
              onClick={() => dispatch(displayUserMenu(false))}
              className="home f-w f-h flex j-c-f-s a-i-c h6-s btn-sec no-border"
              type="button"
            >
              <svg
                className="close"
                width="20px"
                height="20px"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 22.88 22.88"
                xmlSpace="preserve"
              >
                <path
                  d="M0.324,1.909c-0.429-0.429-0.429-1.143,0-1.587c0.444-0.429,1.143-0.429,1.587,0l9.523,9.539
                l9.539-9.539c0.429-0.429,1.143-0.429,1.571,0c0.444,0.444,0.444,1.159,0,1.587l-9.523,9.524l9.523,9.539
                c0.444,0.429,0.444,1.143,0,1.587c-0.429,0.429-1.143,0.429-1.571,0l-9.539-9.539l-9.523,9.539c-0.444,0.429-1.143,0.429-1.587,0
                c-0.429-0.444-0.429-1.159,0-1.587l9.523-9.539L0.324,1.909z"
                />
              </svg>
              <span>{t("chatMenu.cl")}</span>
            </Button>
          </li>
        </ul>
      </div>
      <div className="switch-cont">
        <div className="flex j-c-c a-i-c theme">
          <ThemeSwitch />
        </div>
      </div>
    </div>
  );
};
