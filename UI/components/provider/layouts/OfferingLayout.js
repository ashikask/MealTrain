import classes from "./OfferingLayout.module.scss";
import OfferingList from "./../OfferingsList";
import { useDisclosure } from "@chakra-ui/react";
import { useRef, useEffect } from "react";
import CreateOfferingModal from "./../CreateOfferingModel";
import EditOfferingModal from "./../EditOfferingModal.js";
import { providerOfferingsModalActions } from "./../../../store/provider-offering-modal-slice.js";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineIssuesClose } from "react-icons/ai";
function OfferingLayout() {
  const dispatch = useDispatch();
  const editModalState = useSelector(
    (state) => state.providerOfferingModal.isOpen
  );
  const {
    isOpen: isOpenCreate,
    onOpen: onOpenCreate,
    onClose: onCloseCreate,
  } = useDisclosure();

  const {
    isOpen: isOpenUpdate,
    onOpen: onOpenUpdate,
    onClose: onCloseUpdate,
  } = useDisclosure();

  function onCloseUpdateCustom() {
    dispatch(providerOfferingsModalActions.setIsOpen(false));
    onCloseUpdate();
  }

  useEffect(() => {
    if (editModalState) {
      onOpenUpdate();
    } else if (!editModalState) {
      onCloseUpdate();
    }
  }, [editModalState]);

  const initialRef = useRef(null);

  return (
    <div>
      <div className="grid grid-rows-[50px,1fr] pl-[6%] mt-[1%] w-[95%]">
        <div className="flex flex-row justify-between border-b-[1.75px] border-[#b1b5b6]">
          <div>
            <h1 className="text-[24px] pl-[4px] ">Offerings</h1>
          </div>
        </div>
        <div>
          <OfferingList></OfferingList>
        </div>
      </div>
      <div onClick={onOpenCreate} className={classes.fabContainer}>
        <div className={classes.button + " " + classes.iconbutton}>
          <i className="text-3xl">+</i>
        </div>
      </div>
      <CreateOfferingModal
        isOpen={isOpenCreate}
        initialRef={initialRef}
        onClose={onCloseCreate}
      />
      <EditOfferingModal
        isOpen={isOpenUpdate}
        initialRef={initialRef}
        onClose={onCloseUpdateCustom}
      />
    </div>
  );
}

export default OfferingLayout;



