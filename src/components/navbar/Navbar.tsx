import { Fragment, MutableRefObject, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import useWindowDimensions from "../../utils/hooks/useWindowDimensions";
import { setMenuButtonRef, showMenu } from "../../context/actions/menu";
import { useTouchDevice } from "../../utils/hooks/useTouchDevice";
import { RootState } from "../../context/rootState.interface";
import { logout } from "../../context/actions/auth";
import i18n from "../../utils/i18n/i18n";
import LanguageButton from "../button/language/LanguageButton";
import MenuButton from "../button/menu/MenuButton";
import { Button } from "../button/Button";
import NavLink from "../link/NavLink";
import "./Navbar.css";

export const Navbar = () => {
  const [t] = useTranslation();
  const [cookies, setCookies, removeCookies] = useCookies([]);

  const [translateNav, setTranslateNav] = useState(false);

  const logged = useSelector((state: RootState) => state.auth.logged);
  const themePrimary = useSelector((state: RootState) => state.theme.primary);
  const colorSecondary = useSelector((state: RootState) => state.theme.colorSecondary);
  const dispatch = useDispatch();

  const skipLinkMainRef = useRef(null);

  const skipLinkFooterRef = useRef(null);
  const { isTouchDevice } = useTouchDevice();
  const { width } = useWindowDimensions();

  useFocusInFocusOut(
    skipLinkMainRef,
    () => setTranslateNav(true),
    () => setTranslateNav(false)
  );
  useFocusInFocusOut(
    skipLinkFooterRef,
    () => setTranslateNav(true),
    () => setTranslateNav(false)
  );

  return (
    <header className={`${translateNav ? "showNavTop" : "hideNavTop"} nav grid`}>
      <nav role="navigation" className="nav-t grid">
        {!isTouchDevice ? (
          <Fragment>
            <a className="link helper skip-link flex j-c-c a-i-c" href="#main" tabIndex={1000} ref={skipLinkMainRef}>
              {t("navbar.skipMain")}
            </a>
            <a className="link helper skip-link flex j-c-c a-i-c" href="#footer" tabIndex={1000} ref={skipLinkFooterRef}>
              {t("navbar.skipMain")}
            </a>
          </Fragment>
        ) : null}
      </nav>
      <nav role="navigation" className="nav-b grid">
        <div className="nav-l-r">
          <ul className={`f-w f-h flex a-i-c ${width < 600 ? "j-c-f-s" : "j-c-s-a"}`}>
            {width < 600 ? (
              <Link to={`/${i18n.language}/`} className="flex a-i-c j-c-c" aria-label={t("navbar.ariaLabel.main")}>
                <svg width="100%" height="100%" viewBox="0 0 563 135" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M58.5205 64.8994C60.4248 60.0166 62.0361 54.5479 63.3545 48.4932C64.7217 42.3896 65.4053 37.3604 65.4053 33.4053C65.4053 30.8174 64.7949 29.5234 63.5742 29.5234C62.4512 29.5234 60.4004 31.0127 57.4219 33.9912C52.9785 38.7764 49.0234 44.2939 45.5566 50.5439C42.0898 56.7451 39.4287 63.0928 37.5732 69.5869C35.7178 76.0811 34.79 82.4287 34.79 88.6299C34.79 93.5127 35.3027 96.8574 36.3281 98.6641C37.4023 100.471 39.4043 101.374 42.334 101.374C44.873 101.374 48.0225 100.666 51.7822 99.25C60.2783 95.8809 69.2627 91.0713 78.7354 84.8213C82.9346 82.1357 85.5957 80.793 86.7188 80.793C88.3301 80.793 89.1357 81.5986 89.1357 83.21V83.3564C88.8916 85.5537 88.1348 88.0439 86.8652 90.8271C84.3262 96.1982 82.1289 99.7139 80.2734 101.374C77.1484 104.157 72.8516 106.892 67.3828 109.577C61.9629 112.263 56.3965 114.46 50.6836 116.169C44.9707 117.878 40.1855 118.732 36.3281 118.732C31.8848 118.732 27.6855 117.902 23.7305 116.242C19.7754 114.533 16.333 112.214 13.4033 109.284C10.4736 106.354 8.17871 102.937 6.51855 99.0303C4.8584 95.124 4.02832 90.9492 4.02832 86.5059C4.02832 83.1367 4.56543 79.499 5.63965 75.5928C6.71387 71.6377 8.27637 67.5117 10.3271 63.2148C12.3779 58.918 14.6973 54.8896 17.2852 51.1299C18.7988 48.8838 20.3613 46.7354 21.9727 44.6846C23.6328 42.6338 25.4395 40.6318 27.3926 38.6787C29.3945 36.7256 31.5674 34.8457 33.9111 33.0391C36.2549 31.2324 38.4033 29.6943 40.3564 28.4248C43.7744 26.1299 47.3145 24.1279 50.9766 22.4189C54.6387 20.71 58.0322 19.4404 61.1572 18.6104C64.2822 17.7803 67.1387 17.3652 69.7266 17.3652C76.123 17.3652 81.1279 19.0254 84.7412 22.3457C88.3545 25.666 90.1611 30.2559 90.1611 36.1152C90.1611 42.2676 88.6475 48.7129 85.6201 55.4512C82.5928 62.1406 78.5645 68 73.5352 73.0293C70.0684 76.5938 66.626 79.4014 63.208 81.4521C59.79 83.5029 56.7139 84.5283 53.9795 84.5283C51.5869 84.5283 50.3906 83.3809 50.3906 81.0859C50.3906 80.0117 51.0498 78.5225 52.3682 76.6182C54.2236 73.9814 56.2744 70.0752 58.5205 64.8994ZM145.386 28.7178V27.5459C145.386 25.7393 145.142 24.8359 144.653 24.8359C144.019 24.8359 143.018 25.8125 141.65 27.7656C140.332 29.7188 139.136 31.8916 138.062 34.2842C135.376 40.3877 133.008 46.8574 130.957 53.6934C128.906 60.4805 127.319 67.2676 126.196 74.0547C125.806 76.6914 125.391 79.5479 124.951 82.624L125.317 82.917C130.2 77.8877 133.838 74.3232 136.23 72.2236C138.623 70.124 141.724 67.7314 145.532 65.0459C150.317 61.7256 154.272 60.0654 157.397 60.0654C159.399 60.0654 160.938 60.7979 162.012 62.2627C163.135 63.6787 163.696 65.6562 163.696 68.1953C163.696 69.6602 163.403 71.7598 162.817 74.4941C161.792 80.2559 161.279 85.1143 161.279 89.0693C161.279 90.876 161.426 92.7803 161.719 94.7822C161.963 96.3447 162.769 99.4941 164.136 104.23C165.259 107.844 165.82 109.846 165.82 110.236C165.82 110.92 165.015 111.75 163.403 112.727C158.228 116.145 153.467 117.854 149.121 117.854C145.557 117.854 142.651 116.12 140.405 112.653C138.208 109.187 137.109 104.67 137.109 99.1035C137.109 96.9062 137.329 94.2451 137.769 91.1201L137.402 90.8271C130.469 97.9561 125.83 102.766 123.486 105.256C114.795 113.654 108.105 117.854 103.418 117.854C101.27 117.854 99.4873 116.438 98.0713 113.605C96.7041 110.725 96.0205 106.989 96.0205 102.399C96.0205 92.5361 99.0723 79.9385 105.176 64.6064C107.617 58.6494 110.205 52.9609 112.939 47.541C115.674 42.0723 118.286 37.3604 120.776 33.4053C122.583 30.6221 124.463 28.2051 126.416 26.1543C128.418 24.0547 130.42 22.3213 132.422 20.9541C134.473 19.5381 136.548 18.4883 138.647 17.8047C140.747 17.1211 142.847 16.7793 144.946 16.7793C150.171 16.7793 154.419 18.3906 157.69 21.6133C161.011 24.8359 162.671 28.9619 162.671 33.9912C162.671 37.5068 161.67 41.2422 159.668 45.1973C157.666 49.1523 154.858 52.9121 151.245 56.4766C148.95 58.7227 146.338 60.7246 143.408 62.4824C140.527 64.1914 138.281 65.0459 136.67 65.0459C136.182 65.0459 135.742 64.875 135.352 64.5332C134.961 64.1914 134.766 63.752 134.766 63.2148C134.766 62.4824 135.4 60.8955 136.67 58.4541C138.135 55.7686 139.575 52.4971 140.991 48.6396C142.407 44.7334 143.481 41.0469 144.214 37.5801C144.995 34.0645 145.386 31.1104 145.386 28.7178ZM225.659 79.9141L224.268 80.3535C220.752 81.3301 218.213 81.8184 216.65 81.8184C214.746 81.8184 213.794 81.3301 213.794 80.3535C213.794 80.0117 214.185 79.1084 214.966 77.6436C217.7 73.4932 219.067 69.5869 219.067 65.9248C219.067 63.8252 218.701 61.9209 217.969 60.2119C217.236 58.4541 216.431 57.5752 215.552 57.5752C214.771 57.5752 213.574 58.4053 211.963 60.0654C207.422 64.9971 203.809 70.0508 201.123 75.2266C198.486 80.4023 197.168 85.0166 197.168 89.0693C197.168 91.7549 197.705 93.9766 198.779 95.7344C199.902 97.4922 201.294 98.3711 202.954 98.3711C204.37 98.3711 207.007 96.8574 210.864 93.8301C214.771 90.8027 219.141 86.7988 223.975 81.8184L225.952 80.207L225.659 79.9141ZM221.265 96.6865V96.9795L220.972 96.6865C216.431 102.009 212.256 106.379 208.447 109.797C204.688 113.166 201.196 115.705 197.974 117.414C194.8 119.123 191.87 119.978 189.185 119.978C183.716 119.978 179.199 118.146 175.635 114.484C172.07 110.822 170.288 106.184 170.288 100.568C170.288 97.1016 171.167 93 172.925 88.2637C174.683 83.5273 177.1 78.8887 180.176 74.3477C185.303 66.9258 191.748 60.627 199.512 55.4512C207.52 50.1289 215.234 47.4678 222.656 47.4678C228.906 47.4678 234.033 48.7617 238.037 51.3496C242.09 53.8887 244.116 57.1113 244.116 61.0176C244.116 63.8984 243.115 66.9502 241.113 70.1729C243.75 70.1729 245.41 70.4658 246.094 71.0518C246.777 71.5889 247.119 72.8828 247.119 74.9336C247.119 74.7383 246.997 75.7393 246.753 77.9365C246.46 82.7705 246.313 87.2871 246.313 91.4863C246.313 93.6836 246.338 95.3438 246.387 96.4668C246.436 97.5898 246.533 98.8838 246.68 100.349C246.826 101.813 246.973 102.985 247.119 103.864C247.51 106.159 248.145 108.43 249.023 110.676C246.094 113.557 243.286 115.681 240.601 117.048C237.915 118.366 235.181 119.025 232.397 119.025C224.878 119.025 221.118 112.727 221.118 100.129C221.118 98.6641 221.167 97.5166 221.265 96.6865ZM267.773 47.1748L268.066 46.2959C271.289 37.2139 274.072 30.8174 276.416 27.1064C277.539 25.3486 279.102 23.7861 281.104 22.4189C284.863 20.0264 288.403 18.8301 291.724 18.8301C293.677 18.8301 295.166 19.2695 296.191 20.1484C297.217 21.0273 297.729 22.2969 297.729 23.957C297.729 25.0801 296.997 27.375 295.532 30.8418C293.042 36.6035 291.187 41.999 289.966 47.0283C290.796 47.126 291.602 47.2725 292.383 47.4678C295.312 47.9072 297.241 48.4199 298.169 49.0059C299.097 49.543 299.561 50.5439 299.561 52.0088C299.561 54.5967 298.901 56.9893 297.583 59.1865C296.265 61.3838 294.531 62.9951 292.383 64.0205C290.771 64.7529 288.159 65.2412 284.546 65.4854C283.911 67.3896 283.203 70.002 282.422 73.3223C281.982 76.252 281.494 80.3047 280.957 85.4805C280.664 87.3848 280.518 89.167 280.518 90.8271C280.518 98.542 284.253 102.399 291.724 102.399H292.163H292.383C293.262 102.399 293.701 102.546 293.701 102.839C293.701 103.62 292.871 104.938 291.211 106.794C289.551 108.649 287.72 110.285 285.718 111.701C283.569 113.166 281.226 114.338 278.687 115.217C276.147 116.096 273.853 116.535 271.802 116.535C266.675 116.535 262.5 114.802 259.277 111.335C256.104 107.868 254.517 103.278 254.517 97.5654C254.517 95.124 254.932 91.9258 255.762 87.9707C256.641 84.0156 257.983 78.7178 259.79 72.0771C260.083 70.9053 260.4 69.6846 260.742 68.415C261.084 67.0967 261.279 66.3154 261.328 66.0713C259.375 66.0225 257.983 65.6074 257.153 64.8262C256.323 64.0449 255.908 62.7754 255.908 61.0176C255.908 57.9414 257.08 55.0361 259.424 52.3018C261.816 49.5674 264.6 47.8584 267.773 47.1748ZM316.333 118.732C314.136 118.586 312.134 117.585 310.327 115.729C308.521 113.776 307.227 111.677 306.445 109.431C305.713 107.136 305.347 104.182 305.347 100.568C305.347 92.5117 306.836 83.4297 309.814 73.3223C312.842 63.166 316.26 55.8174 320.068 51.2764C321.582 49.3721 323.682 48.4199 326.367 48.4199C329.199 48.4199 331.47 49.7139 333.179 52.3018C334.937 54.8896 335.815 58.2832 335.815 62.4824C335.815 68.6836 334.912 75.959 333.105 84.3086C331.348 92.6094 328.857 101.252 325.635 110.236C324.365 113.85 322.803 116.291 320.947 117.561C319.678 118.342 318.188 118.732 316.479 118.732H316.333ZM325.122 45.124C320.532 44.9775 318.237 42.2187 318.237 36.8477C318.237 34.1621 318.896 31.0615 320.215 27.5459C321.582 23.9814 323.12 21.3447 324.829 19.6357C325.708 18.708 326.587 18.0488 327.466 17.6582C328.394 17.2676 329.565 17.0723 330.981 17.0723C333.423 17.0723 335.205 17.6826 336.328 18.9033C337.5 20.0752 338.086 22.0527 338.086 24.8359C338.086 28.3027 337.476 31.5986 336.255 34.7236C335.083 37.7998 333.496 40.3145 331.494 42.2676C329.492 44.1719 327.441 45.124 325.342 45.124H325.122Z"
                    fill={colorSecondary}
                  />
                  <path
                    d="M527.077 95.2217C529.323 93.708 531.032 92.1943 532.204 90.6807C534.792 87.5068 536.794 83.8691 538.21 79.7676C539.333 77.082 540.212 74.0791 540.847 70.7588C541.481 67.4385 541.799 64.3379 541.799 61.457C541.799 58.7715 541.237 57.4287 540.114 57.4287C538.552 57.4287 536.159 60.8711 532.937 67.7559C531.032 71.9062 529.47 76.0566 528.249 80.207C527.077 84.3086 526.491 87.8486 526.491 90.8271C526.491 91.8525 526.687 93.3174 527.077 95.2217ZM527.224 97.5654C527.761 100.495 529.665 101.96 532.937 101.96C536.599 101.96 541.359 99.8115 547.219 95.5146C550.637 93.0244 552.932 91.7793 554.104 91.7793C555.568 91.7793 556.936 92.1699 558.205 92.9512C559.475 93.7324 560.109 94.5381 560.109 95.3682C560.109 96.2471 559.401 97.3945 557.985 98.8105C555.397 101.398 552.419 103.938 549.05 106.428C545.681 108.869 542.434 110.92 539.309 112.58C536.184 114.191 533.059 115.485 529.934 116.462C526.809 117.39 524.025 117.854 521.584 117.854C515.48 117.854 510.598 116.12 506.936 112.653C503.273 109.138 501.442 104.475 501.442 98.6641C501.442 94.2207 502.395 89.2158 504.299 83.6494C506.252 78.0342 508.864 72.7852 512.136 67.9023C515.993 62.1895 520.729 57.4287 526.345 53.6201C533.278 49.0303 539.919 46.7354 546.267 46.7354C550.856 46.7354 554.445 48.2002 557.033 51.1299C559.67 54.0107 560.988 57.9902 560.988 63.0684C560.988 67.0234 559.938 71.1494 557.839 75.4463C555.788 79.7432 552.736 83.8691 548.684 87.8242C545.363 91.1445 542.092 93.7324 538.869 95.5879C535.695 97.4434 532.912 98.3711 530.52 98.3711C529.445 98.3711 528.347 98.1025 527.224 97.5654Z"
                    fill={colorSecondary}
                  />
                  <path
                    d="M379.701 5.87387C383.953 -1.08256 391.507 -1.98993 396.574 3.84721C401.641 9.68434 402.302 20.0556 398.05 27.012L367.257 77.3949C363.005 84.3513 355.451 85.2587 350.384 79.4216C345.317 73.5844 344.656 63.2132 348.908 56.2568L379.701 5.87387Z"
                    fill={themePrimary}
                  />
                  <path
                    d="M397.205 57.6051C401.456 50.6487 409.011 49.7413 414.078 55.5784C419.145 61.4156 419.806 71.7868 415.554 78.7432L384.76 129.126C380.509 136.083 372.954 136.99 367.887 131.153C362.821 125.316 362.16 114.944 366.411 107.988L397.205 57.6051Z"
                    fill={themePrimary}
                  />
                  <path
                    d="M405.883 51.6492C412.497 51.6492 417.859 59.0108 417.859 68.0918C417.859 77.1727 412.497 84.5343 405.883 84.5343H357.977C351.362 84.5343 346 77.1727 346 68.0918C346 59.0108 351.362 51.6492 357.977 51.6492H405.883Z"
                    fill={themePrimary}
                  />
                  <path
                    d="M459.345 5.87387C463.597 -1.08256 471.151 -1.98993 476.218 3.84721C481.285 9.68434 481.946 20.0556 477.694 27.012L446.901 77.3949C442.649 84.3513 435.095 85.2587 430.028 79.4216C424.961 73.5844 424.3 63.2132 428.551 56.2568L459.345 5.87387Z"
                    fill={themePrimary}
                  />
                  <path
                    d="M476.848 57.6051C481.1 50.6487 488.654 49.7413 493.721 55.5784C498.788 61.4156 499.449 71.7868 495.197 78.7432L464.404 129.126C460.152 136.083 452.598 136.99 447.531 131.153C442.464 125.316 441.803 114.944 446.055 107.988L476.848 57.6051Z"
                    fill={themePrimary}
                  />
                  <path
                    d="M485.526 51.6492C492.141 51.6492 497.503 59.0108 497.503 68.0918C497.503 77.1727 492.141 84.5343 485.526 84.5343H437.62C431.006 84.5343 425.644 77.1727 425.644 68.0918C425.644 59.0108 431.006 51.6492 437.62 51.6492H485.526Z"
                    fill={themePrimary}
                  />
                </svg>
              </Link>
            ) : (
              <Fragment>
                <li className="btn-sm flex a-i-c j-c-s-b f-f-c-n">
                  <NavLink to={`/${i18n.language}/`}>{t("navbar.main")}</NavLink>
                </li>
                <li className="btn-sm flex a-i-c j-c-s-b f-f-c-n">
                  <NavLink to={`/${i18n.language}/features`}>{t("chatMenu.fe")}</NavLink>
                </li>
                <li className="btn-sm flex a-i-c j-c-s-b f-f-c-n">
                  <NavLink to={`/${i18n.language}/faq`}>{t("chatMenu.faq")}</NavLink>
                </li>
                <li className="btn-sm flex a-i-c j-c-s-b f-f-c-n">
                  {!logged ? (
                    <NavLink to={`/${i18n.language}/user/login`}>{t("chatMenu.login")}</NavLink>
                  ) : (
                    <NavLink to={`/${i18n.language}/chat`}>{t("chatMenu.chat")}</NavLink>
                  )}
                </li>
              </Fragment>
            )}
          </ul>
        </div>
        <div className="nav-r-r">
          <ul className="f-w f-h flex j-c-s-a a-i-c">
            <li>
              {logged ? (
                <Button
                  className={width < 600 ? "btn-brgr btn-r no-border btn-pr" : "btn-r btn-pr no-border btn-lang"}
                  onClick={() => dispatch(logout(removeCookies))}
                  aria-label={t("navbar.ariaLabel.logOut")}
                >
                  <span className="flex a-i-c j-c-c">
                    <svg height="24px" width="24px" viewBox="0 0 512.00533 512" xmlns="http://www.w3.org/2000/svg">
                      <path d="m320 277.335938c-11.796875 0-21.332031 9.558593-21.332031 21.332031v85.335937c0 11.753906-9.558594 21.332032-21.335938 21.332032h-64v-320c0-18.21875-11.605469-34.496094-29.054687-40.554688l-6.316406-2.113281h99.371093c11.777344 0 21.335938 9.578125 21.335938 21.335937v64c0 11.773438 9.535156 21.332032 21.332031 21.332032s21.332031-9.558594 21.332031-21.332032v-64c0-35.285156-28.714843-63.99999975-64-63.99999975h-229.332031c-.8125 0-1.492188.36328175-2.28125.46874975-1.027344-.085937-2.007812-.46874975-3.050781-.46874975-23.53125 0-42.667969 19.13281275-42.667969 42.66406275v384c0 18.21875 11.605469 34.496093 29.054688 40.554687l128.386718 42.796875c4.351563 1.34375 8.679688 1.984375 13.226563 1.984375 23.53125 0 42.664062-19.136718 42.664062-42.667968v-21.332032h64c35.285157 0 64-28.714844 64-64v-85.335937c0-11.773438-9.535156-21.332031-21.332031-21.332031zm0 0" />
                      <path d="m505.75 198.253906-85.335938-85.332031c-6.097656-6.101563-15.273437-7.9375-23.25-4.632813-7.957031 3.308594-13.164062 11.09375-13.164062 19.714844v64h-85.332031c-11.777344 0-21.335938 9.554688-21.335938 21.332032 0 11.777343 9.558594 21.332031 21.335938 21.332031h85.332031v64c0 8.621093 5.207031 16.40625 13.164062 19.714843 7.976563 3.304688 17.152344 1.46875 23.25-4.628906l85.335938-85.335937c8.339844-8.339844 8.339844-21.824219 0-30.164063zm0 0" />
                    </svg>
                  </span>
                </Button>
              ) : null}
            </li>
            <li>
              {width < 600 ? (
                <MenuButton setShow={() => dispatch(showMenu(true))} setRef={(ref: any) => dispatch(setMenuButtonRef(ref))} />
              ) : (
                <LanguageButton />
              )}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

function useFocusInFocusOut(elementRef: MutableRefObject<any | null>, focusInAction: any, focusOutAction: any) {
  useEffect(() => {
    function handleFocusIn() {
      if (elementRef.current && elementRef.current === document.activeElement) {
        focusInAction();
      }
    }

    function handleFocusOut() {
      if (elementRef.current && elementRef.current !== document.activeElement) {
        focusOutAction();
      }
    }

    document.addEventListener("focusin", handleFocusIn);
    document.addEventListener("focusout", handleFocusOut);
    return () => {
      document.removeEventListener("focusin", handleFocusIn);
      document.removeEventListener("focusout", handleFocusOut);
    };
  }, [elementRef, focusInAction, focusOutAction]);
}
