import React, { useRef, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Main } from './views/Main';
import { SnackbarProvider } from 'notistack';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { initData } from './redux/actions';


const App : React.FC = () => {
  const dispatch = useDispatch()
  const notistackRef = useRef<any>(null)
  const onClickDismiss = (key:string) => () => { 
    if (notistackRef) {
      notistackRef.current.closeSnackbar(key);
    }
  }
  useEffect(()=>{
    dispatch(initData())
  }, [])
  return (
    <div className="App">
      <SnackbarProvider
      ref={notistackRef}
      action={(key: string) => (
        <Button style={{color:"white"}} onClick={onClickDismiss(key)}>
          好的
        </Button>
      )}
      >
        <Main />
      </SnackbarProvider>
      
    </div>
  );
}

export default App;
