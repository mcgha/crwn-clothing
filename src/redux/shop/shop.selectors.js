import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';
//we need to memoize the result of the find function so the 
//function doesnt get called again with the same param

//object that maps the string value to the respective id
//where the string value from url param will be the property
// const COLLECTION_ID_MAP = {
//     hats: 1,
//     sneakers: 2,
//     jackets: 3,
//     womens: 4,
//     mens: 5
// };

const selectShop = state => state.shop;

export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
);
//curried function, function that returns a function in this case createSelector
// export const selectCollection = collectionUrlParam =>
//     createSelector(
//         [selectCollections],
//         collections => collections.find(collection => collection.id === COLLECTION_ID_MAP[collectionUrlParam])
// );

export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    collections => collections ? Object.keys(collections).map(key => collections[key]) : []
    //Object.keys will take the object and return the keys as an array that we can then iterate over
)

export const selectCollection = memoize((collectionUrlParam) =>
  createSelector(
    [selectCollections],
    collections => (collections ? collections[collectionUrlParam] : null)
  )
);