import React, { Component } from 'react'
import ProductContainer from './containers/ProductContainer'
import SearchBar from './SearchBar'

// const staticProducts = [
//   {
//     productName: 'Oranges',
//     productPrice: 15,
//     productImage: "https://s2uqdnlqz93lrjbq205ld0eu-wpengine.netdna-ssl.com/wp-content/uploads/2016/08/LilSnappers_Cara.png"
//   },
//   {
//     productName: 'Bananas',
//     productPrice: 10,
//     productImage: "https://cdn1.medicalnewstoday.com/content/images/headlines/271/271157/bananas.jpg"
//   },
//   {
//     productName: 'Berries',
//     productPrice: 20
//   },
//   {
//     productName: 'Apples',
//     productPrice: 20
//   },
// ]

class App extends React.Component{
  constructor(){
    super()
    this.state = {
        dynamicProducts: [],
        searchString:"This is from App.js",
        cart: []
    }
  }

  updateSearchString(searchStringAsAnInput){
    this.setState({
        searchString: searchStringAsAnInput
    })
  }

  handleAddToCart(newProduct){
    console.log("This is the message from App and this is the product that is clicked",newProduct)
    // var cart = []
    // cart.push("item")
  /*  let existingCart = this.state.cart
    existingCart.push(newProduct)

    this.setState({
      cart: existingCart
    }) */

    let newCart = [...this.state.cart,newProduct]
    this.setState({
      cart: newCart
    })

}

  render(){
    return(
      <div className='App'>
          <SearchBar searchString={this.state.searchString} cart={this.state.cart} thisIsFunctionAsProp_updateSearchString={(searchStringInput)=>this.updateSearchString(searchStringInput)}/>
          <ProductContainer cart={this.state.cart} products = {this.state.dynamicProducts}  handleAddToCartInProductContainer = {(product)=>this.handleAddToCart(product)}/>
      </div>
    );
  }

  componentDidMount (){
    let self = this
    fetch('https://api.myjson.com/bins/19ht6u')
    .then(function(response){
        console.log("This is the Data from the API", response)
        return response.json()
    })
    .then(function(jsonResponse){
      self.setState({
        dynamicProducts: jsonResponse
      })
        console.log("This is the JSON response", jsonResponse)
    })
    .catch(function(error){
        console.log(error)
    })

  }
}

export default App
