import React from 'react';
import { connect } from 'react-redux';

import { IPopup, IPopupList } from '../../model/IPopupList';
import { IStorage } from '../../model/IStorage';

import {
  createAddPopupToPopupList, createEmergePopupToPopupList,
} from '../../store/modules/popup-list/popup-list';

const mapState = (state: IStorage) => ({
  popupList: state.popupList,
});

const mapDispatch = (dispatch) => ({
  addPopupToList: (popup: IPopup) => dispatch(createAddPopupToPopupList(popup)),
  emergePopupToList: (popup: IPopup) => dispatch(createEmergePopupToPopupList(popup)),
});

interface Props {
  id: string,
  children: React.ReactElement,
  isOpen: boolean,
  popupList: IPopupList,
  handleClose: () => void,
  addPopupToList: (popup: IPopup) => void,
  emergePopupToList: (popup: IPopup) => void,
};

class PopupIntegrator extends React.Component<Props> {
  componentDidMount = (): void => {
    const { isOpen } = this.props;

    if (isOpen) {
      this.handleOpenPopup();
    }
  };

  componentDidUpdate(prevProps: Readonly<Props>): void {
    const { isOpen } = this.props;

    if (!prevProps.isOpen && isOpen) {
      this.handleOpenPopup();
    }
  }

  handleOpenPopup = () => {
    const {
      id,
      isOpen,
      children,
      popupList,
      handleClose,
      addPopupToList,
      emergePopupToList,
    } = this.props;

    if (popupList.find(((popup) => popup.id === id))) {
      emergePopupToList({ children, id, isOpen: true, handleClose });
    } else {
      addPopupToList({ isOpen, id, children, handleClose })
    }
  }

  render() {
    return null;
  }
}

export const PopupIntegratorConnected = connect(mapState, mapDispatch)(PopupIntegrator);
