import React from 'react';

export type IPopupList = IPopup[];

export type IPopup = {
  id: string,
  isOpen: boolean,
  children: React.ReactElement
  handleClose?: () => void
};
