import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { RootState } from "../../context/rootState.interface";
import { displayChatData } from "../../context/actions/chat";
import { hideModal } from "../../context/actions/error";
import Modal from "../modal/Modal";

export default function ErrorModal() {
  const [t] = useTranslation();

  const showErrorModal = useSelector((state: RootState) => state.error.show);
  const errorText = useSelector((state: RootState) => state.error.errorText);

  const dispatch = useDispatch();

  return (
    <Modal onModalClose={() => dispatch(hideModal())} show={showErrorModal} className="chat error">
      <Modal.Header onCloseModal={() => dispatch(displayChatData(false))} layoutType="grid">
        <h1 className="h5-s">{t("error")}</h1>
      </Modal.Header>
      <Modal.Body className="flex t-c">
        <p className="h6-s">{errorText}</p>
      </Modal.Body>
    </Modal>
  );
}