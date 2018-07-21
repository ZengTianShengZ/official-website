/**
 * @desc: 主页面
 * @author: zengtiansheng
 * @update: 2018/5/23
 */
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {getProducts} from 'src/API/index.js';
import './product-list.less'

class ProductList extends Component {
  state = {
    resData: {
      list: []
    }
  }
  async getData() {
    const res = await getProducts()
    console.log(res);
    if (res.success) {
      this.setState({resData: res.data})
    }
  }
  onItemClick(productId) {
    this.props.history.push('/products/' + productId)
  }
  componentDidMount() {
    window.scrollTo(0, 0)
    this.getData()
  }
  render() {
    const {list} = this.state.resData
    return (
      <section className="app-product-list">
        <div className="top-guide">
          <Link className="top-guide-link" to="/products/">Products</Link>
        </div>
        <ul className="ul-contnet f-js-as">
          {
            list.map((item, index) => {
              return (<ProductItem key={index} item={item} itemClick={this.onItemClick.bind(this)}/>)
            })
          }
        </ul>
      </section>
    )
  }
}

const ProductItem = (props) => {
  const {feature = {}, title, productId, productImgUrl} = props.item || {}
  return (
    <li className="li-item" onClick={props.itemClick.bind(null, productId)}>
      <div className="li-item-content">
        <img className="prod-img" src={productImgUrl} alt="Solar Road" />
        <div className="products-detail">
          <div className="title">{title}</div>
          <div className="details f-js-as-dc">
            <span>Size:{feature.size}</span>
            <span>color:{feature.color}</span>
            <span>Weight:{feature.weight}</span>
          </div>
        </div>
      </div>
    </li>
  )
}

export default ProductList
