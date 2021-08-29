import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import reportWebVitals from './reportWebVitals';
import { Toaster } from 'react-hot-toast';
import { PersistGate } from "redux-persist/lib/integration/react";
const App = React.lazy(() => import(/* webpackChunkName: "App" */ './App'));

const Main = () => {
  return (
    <Provider store={store}>
       <PersistGate loading={null} persistor={persistor}>
      <Suspense fallback={<div className="loading" />}>
      <React.StrictMode>
        <App />
        </React.StrictMode>
        <Toaster />
      </Suspense>
      </PersistGate>
    </Provider>
  );
};

ReactDOM.render(<Main />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
