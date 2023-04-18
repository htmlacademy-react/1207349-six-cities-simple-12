import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, RequestStatus } from '../../const';
import { DataProcess } from '../../types/state';
import { fetchNearPlacesOffersAction, fetchOffersAction, fetchReviewsAction, publishReviewAction } from '../api-actions';

const initialState: DataProcess = {
  offers: [],
  nearPlacesOffers: [],
  reviews: [],
  isOffersDataLoading: false,
  reviewsPublishStatus: RequestStatus.Idle,
};

export const offersData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersDataLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersDataLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.offers = [];
        state.isOffersDataLoading = false;
      })
      .addCase(fetchNearPlacesOffersAction.fulfilled, (state, action) => {
        state.nearPlacesOffers = action.payload;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(publishReviewAction.pending, (state) => {
        state.reviewsPublishStatus = RequestStatus.Pending;
      })
      .addCase(publishReviewAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.reviewsPublishStatus = RequestStatus.Fulfilled;
      })
      .addCase(publishReviewAction.rejected, (state) => {
        state.reviewsPublishStatus = RequestStatus.Rejected;
      });
  }
});
