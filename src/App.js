import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Routes, Route } from 'react-router-dom';

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from './utils/firebase/firebase.utils';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';
import { setCurrentUser } from './redux-store/user/user.slice';
import { setCategoriesMap } from './redux-store/categories/categories.slice';
import { getCategoriesAndDocuments } from './utils/firebase/firebase.utils';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      dispatch(setCategoriesMap(categoryMap));
    };
    getCategoriesMap();
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      dispatch(setCurrentUser(user));
    });

    return unsubscribe;
    // eslint-disable-next-line
  }, []);
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='checkout' element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
