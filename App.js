import React from 'react';
import {useState} from 'react'
import { StyleSheet, Text, View,TextInput,TouchableOpacity,FlatList} from 'react-native';
import Constants from 'expo-constants'
import api from './src/services/api'



export default function App() {
  const [loading,setLoading] =  useState(false)
  const [products,setProducts] =  useState([])
  const [arg, setArg] = useState('')

  // função para procurar produtos
  async function handleSearchProducts(e) {
    e.preventDefault()
    setLoading(true)

    if (arg === '') {
      try {
        await api.get('/products').then(response => setProducts(response.data))
        setLoading(false)
      } catch (err) {
        alert(`Erro ao procurar produto : ${err}`)
      }
    } else {
      try {
        await api.get(`products/search/${arg}`).then(response => setProducts(response.data))
        setLoading(false)
      } catch (err) {
        alert(`Erro ao procurar produto : ${err}`)
      }
    }
  }


  return (



    <View style={styles.container}>
      <View style={styles.header}>

        <View style={styles.h1}>
          <Text style={styles.h1TextContainer}>Localizar produtos</Text>
        </View>

        <View style={styles.box}>
          <View style={styles.boxSearch}>
            <TextInput
              style={styles.boxTextSearch}
              placeholder="Digite o produto"
              value={arg}
              onChangeText={text => setArg(text)}
              />
          </View>

          <TouchableOpacity
            style={styles.buttonSearch}
            onPress={handleSearchProducts}
            disabled={loading? true:false}
          >
            <Text style={styles.buttonText}>Buscar</Text>
          </TouchableOpacity>
        </View>
          <View 
          style={styles.productHeader}>
                <Text style={styles.productTextHeader}>Código</Text>
                <Text style={styles.productTextHeader}>Descrição</Text>
                <Text style={styles.productTextHeader}>Coluna</Text>
            </View>
      </View>

      {loading ? <View style = {styles.loading}><Text style={styles.loadingText}>Carregando...</Text></View> :


        <FlatList
          style={styles.productList}
          data={products}
          keyExtractor={product => String(product.sku_product)}
          renderItem={({ item: product }) =>
          (
            <View style={styles.boxProducts}>

              <View style={styles.product}>
                <Text style={styles.productText}>{product.sku_product}</Text>
                <Text style={styles.productText}>{product.desc_product}</Text>
                <Text style={[styles.productText, styles.productCol]}>{product.column_product}</Text>
              </View>

            </View>

          )}
        />
      }
   


    </View>


  );
}






const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'azure',
    paddingTop:Constants.statusBarHeight + 20
  },

  h1:{

  },

  header:{
    
  },
  
  h1TextContainer:{
    marginTop:0,
    fontSize:30,
    textAlign:'center',
    fontWeight:'bold'
  },

  boxSearch:{
    borderStyle:'solid',
    borderWidth:1,
    borderColor:'#000',
    width: 200,
    height:50,
    borderRadius:20,
    marginRight:10
  },

  box:{
    flexDirection:'row',
    marginTop:40,
    justifyContent:'center'
  },

  boxTextSearch:{
    fontSize:20,
    paddingLeft:10,
    paddingRight:10,
    paddingBottom:5,
    paddingTop:8,
    alignItems:'center'
  },

  buttonSearch:{
    width:100,
    height:50,
    backgroundColor:'red',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:20
  },

  buttonText:{
    fontSize:20,
    color: '#fff'
  },


  productHeader:{
    marginTop:40,
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-around',
    
  },
  productList:{
    marginTop:20,
    width:'100%'
  
  },

  productTextHeader:{
    fontSize : 20,
    textAlign:'center'
  },

  product:{
    width:'90%',
    marginTop:20,
    flexDirection:'row',
    alignSelf:'center',
    justifyContent:'center',
    alignItems:'center',
    borderBottomColor:'#000',
    borderBottomWidth:1,
    

  },

  productText:{
    width:'30%',
    fontSize:18,
    marginRight:10,
    marginLeft:10,
    textAlign:'center'
    
  },


  productCol:{
    color:'red',
    fontWeight:'bold',
    fontSize:20
  },

  loading:{
    marginTop:100,
    flexDirection:'row',
    alignSelf:'center',
    justifyContent:'center',
    alignItems:'center'
  },

  loadingText:{
    fontSize:30,
    color:'red',
    fontWeight:'bold'
  }
});
