import React from 'react';
import { connect } from 'react-redux';

import { SuperPopup } from '../popup/SuperPopup';

import { IPopupList } from '../../model/IPopupList';
import { IStorage } from '../../model/IStorage';

const mapState = (state: IStorage) => ({
  popupList: state.popupList,
});

interface Props {
  popupList: IPopupList;
};

function PopupList(props: Props): JSX.Element {
  const { popupList } = props;

  let lastOpenPopupIndex = -1;

  for (let i = 0; i < popupList.length; i++) {
    if (popupList[i].isOpen) lastOpenPopupIndex = i;
  }

  return (
    <>
      {popupList.map((popup, index) => (
        <SuperPopup
          key={popup.id}
          hidden={!popup.isOpen}
          handleClose={popup.handleClose}
          fadeShown={lastOpenPopupIndex === index}
        >
          {popup.children}
        </SuperPopup>
      ))}
    </>
  );
}

export const PopupListConnected = connect(mapState)(PopupList);
