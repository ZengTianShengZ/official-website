/**
 * @desc: 主页面
 * @author: zengtiansheng
 * @update: 2018/5/23
 */
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import MarkdownRenderer from 'react-markdown-renderer';
import {getProductItem} from 'src/API/index.js';
import 'src/libs/etalage/etalage.css'
import 'src/libs/etalage/jquery.etalage.min.js'
import './product-item.less'

class Products extends Component {
  state = {
    resData: {
      describe: '',
      detail: '',
      imgUrls: []
    }
  }
  async getData() {
    const id = this.props.match.params.id
    const res = await getProductItem(`/issues/${id}`)
    if (res.success) {
      this.setState({resData: res.data})
    }
  }
  componentDidMount() {
    window.scrollTo(0, 0)
    this.getData()
  }
  render() {
    const list = [1, 2, 3, 4]
    const {describe, detail, imgUrls, title} = this.state.resData

    return (
      <section className="app-product-item">
        <div className="top-guide">
          <Link className="top-guide-link" to="/products/">Products</Link> » {title}
        </div>
        <div className="product-content f-jb-as">
          <div className="left-content f-js-as">
            <div className="etalage-content">
              <Etalage imgUrls={imgUrls}/>
            </div>
            <div className="desc-content">
              <MarkdownRenderer className="markdown-body" markdown={describe}/>
            </div>
          </div>
          <div className="right-content">
            <div className="heard-content f-js-ac">
              <img className="heard-img" src="/image/imgHome/us_img1.png" alt="" />
              <span className="heard-name">Sales Manager</span>
            </div>
            <p className="p-text"><span>Company</span> Fujian XP Industrial Co.,LTD</p>
            <p className="p-text"><span>Phone</span> +86 15505965690(wechat)</p>
            <p className="p-text"><span>Email</span>roadstudXP@foxmail.com</p>
            <div className="contect-content">
              <a target="_blank" href="https://www.facebook.com/lucy.guo.7965"><ion-icon name="logo-facebook"></ion-icon></a>
              <a target="_blank" href="https://twitter.com/LucyRoadstud"><ion-icon name="logo-twitter"></ion-icon></a>
            </div>
          </div>
        </div>
        <div className="centet-content f-jb-as">
          <div className="left-content">
            <MarkdownRenderer className="markdown-body" markdown={detail}/>
          </div>
          <div className="centet-content-right">
            {
              list.map((item, index) => {
                return (<RecommendItem key={index} item={item}/>)
              })
            }
          </div>
        </div>
      </section>
    )
  }
}
const Etalage = (props) => {
  const imgUrls = props.imgUrls
  if (imgUrls.length > 0) {
    setTimeout(() => {
      $('#etalage').etalage({
        thumb_image_width: 250,
        thumb_image_height: 350,
        source_image_width: 800,
        source_image_height: 1000,
        show_hint: true
      });
    })
  }
  return imgUrls.length > 0 ? (
    <ul id="etalage">
      {
        imgUrls.map((item, index) => {
          return (
            <li key={index}>
              <img className="etalage_thumb_image" src={item}/>
              <img className="etalage_source_image" src={item} title="This text area can also be setup to appear at the top of the image.<br>This second line shows that the description can be longer." />
            </li>
          )
        })
      }
    </ul>
  ) : null
}
const RecommendItem = () => {
  return (
    <div className="tj-product-item f-js-as">
      <img className="product-img" src="/image/imgHome/p1.jpg" alt="Solar Road" />
      <div className="prd-d">
        <p className="p-tt">Solar LED Road Stud(LD-RSD-SP)</p>
        <div className="span-s">
          <p className="ellipsis"><span>Size:</span> Ø116*25mm</p>
          <p className="ellipsis"><span>Material:</span> PC shell with epoxy filler</p>
          <p className="ellipsis"><span>Weight:</span> about 0.3kg</p>
          <p className="ellipsis"><span>color:</span> white ,red ,yellow ,green,blue</p>
        </div>
      </div>
    </div>
  )
}

export default Products