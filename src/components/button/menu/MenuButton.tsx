import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";
import { Button } from "../Button";
import "./MenuButton.css";

export default function MenuButton({ setRef, setShow }: { setRef: any; setShow: any }) {
  const [t] = useTranslation();

  const menuButtonRef = useRef<any>(null);

  useEffect(() => {
    if (menuButtonRef.current) setRef(menuButtonRef);
  }, [menuButtonRef]);

  return (
    <Button
      className="btn-pr btn-r no-border"
      type="button"
      onClick={() => {
        setShow();
      }}
      ariaLabel={t("navbar.ariaLabel.menuButton")}
      buttonRef={menuButtonRef}
    >
      <span className="btn-brgr flex a-i-c j-c-c">
        <svg width="24px" height="24px" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20 10C20 11.11 19.11 12 18 12H2C1.46957 12 0.960859 11.7893 0.585786 11.4142C0.210714 11.0391 0 10.5304 0 10C0 9.46957 0.210714 8.96086 0.585786 8.58579C0.960859 8.21071 1.46957 8 2 8H11L13.5 10L16 8H18C18.5304 8 19.0391 8.21071 19.4142 8.58579C19.7893 8.96086 20 9.46957 20 10ZM10 0C1 0 1 6 1 6H19C19 6 19 0 10 0ZM1 15C1 16.66 2.34 18 4 18H16C17.66 18 19 16.66 19 15V14H1V15Z"
          />
        </svg>
      </span>
    </Button>
  );
}
