import { connect } from 'react-redux';
import * as StoreReview from 'expo-store-review';
import { IStorage } from '../model/IStorage';
import { IUser } from '../model/IUser';
import { appAnalytics } from './Analytics';
import { DateHelper } from '../utils/DateHelper';
import { createUserChangeAction } from '../store/modules/user/UserActionCreator';

interface Props {
  user: IUser
  setReviewRequested: () => void
  setNoNeedToRequestReview: () => void
};

function Component(props: Props) {
  const {
    user: { registeredOn = new Date(), reviewRequested, needToRequestReview },
    setReviewRequested,
    setNoNeedToRequestReview,
  } = props;

  const isTimeToBegging = DateHelper
    .getDiffBetweenInHours(new Date(registeredOn).getTime(), new Date().getTime()) > 48;

  if (!reviewRequested && isTimeToBegging && needToRequestReview) {
    StoreReview.isAvailableAsync()
      .then((isAvailable) => isAvailable && StoreReview.hasAction() || false)
      .then((hasAction) => {
        if (hasAction) {
          appAnalytics.sendEvent(appAnalytics.events.REVIEW_WILL_SHOW);

          StoreReview.requestReview();

          setReviewRequested();
          setNoNeedToRequestReview()
        }
      })
  }
  return null;
}

export const Beggar = connect(
  (state: IStorage) => ({
    user: state.user
  }),
  (dispatch) => ({
    setReviewRequested: () => dispatch(createUserChangeAction({ reviewRequested: true })),
    setNoNeedToRequestReview: () => dispatch(createUserChangeAction({ needToRequestReview: false }))
  })
)(Component)
