import { takeLatest, call, put } from 'redux-saga/effects';
//put is the saga effect for creating actions, like 'dispatch'
import { firestore, convertCollectionSnapshotTopMap } from '../../firebase/firebase.utils';

import {
    fetchCollectionSuccess,
    fetchCollectionsFailure
} from './shop.actions'

import ShopActionTypes from './shop.types';

export function* fetchCollectionsAsync() {

    try {
        const collectionRef = firestore.collection('collections');
        //the yielded value will return in a promise form
        const snapshot = yield collectionRef.get();
        // similar to async await
        // call is the effect inside generator function
        // yield in case the call takes longer than expected, yield also makes testing easier
        const collectionsMap = yield call(convertCollectionSnapshotTopMap, snapshot);
        yield put(fetchCollectionSuccess(collectionsMap))
    } catch (error) {
        yield put(fetchCollectionsFailure(error.message))
    }
}

export function* fetchCollectionsStart() {
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsAsync 
    );
}