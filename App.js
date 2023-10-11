import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';
import Header from './components/Header';
import Formulario from './components/Form';
import Cotizacion from './components/Cotizacion';
import axios from 'axios';

function App() {
  const [moneda, guardarMoneda] = useState('');
  const [criptomoneda, guardarCriptomoneda] = useState('');
  const [consultarAPI, guardarConsultarAPI] = useState(false);
  const [resultado, guardarResultado] = useState({});
  const [cargando, guardarCargando] = useState(false);

  useEffect(() => {
    const cotizarCriptomoneda = async () => {
      if (consultarAPI) {
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
        const resultado = await axios.get(url);

        guardarCargando(true);

        guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
        guardarConsultarAPI(false);
        guardarCargando(false);
      }
    };
    cotizarCriptomoneda();
  }, [consultarAPI]);

  const componente = cargando ? (
    <ActivityIndicator size="large" color="#5E49E2" />
  ) : (
    <Cotizacion resultado={resultado} />
  );

  return (
    <>
      <ScrollView>
        <Header></Header>
        <View style={styles.imageContainer}>
          <Image
            source={require('./assets/img/cryptomonedas.png')}
            style={styles.image}></Image>
        </View>
        <View style={styles.content}>
          <Formulario
            moneda={moneda}
            criptomoneda={criptomoneda}
            guardarMoneda={guardarMoneda}
            guardarCriptomoneda={guardarCriptomoneda}
            guardarConsultarAPI={guardarConsultarAPI}
          />
          <View style={{marginTop: 40}}>{componente}</View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  imageContainer: {},
  image: {
    width: '100%',
    height: 150,
    marginHorizontal: '2.5%',
  },
  content: {
    marginHorizontal: '2.5%',
  },
});

export default App;
