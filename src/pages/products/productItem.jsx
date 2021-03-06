/**
 * @desc: 主页面
 * @author: zengtiansheng
 * @update: 2018/5/23
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MarkdownRenderer from 'react-markdown-renderer';
import { getProductItem } from 'src/API/index.js';
import { randomNums } from 'src/utils/index.js';
import productionData from 'src/asses/productionData.json';
import 'src/libs/etalage/etalage.css';
import 'src/libs/etalage/jquery.etalage.min.js';
import './product-item.less';

class ProductItem extends Component {
  state = {
    resData: {
      describe: '',
      detail: '',
      imgUrls: []
    },
    productionItem: {
      describe: '',
      detail: '',
      imgUrls: []
    }
  };
  async getData() {
    const id = this.props.match.params.id;
    const res = await getProductItem(`/issues/${id}`);
    if (res.success) {
      this.setState({ resData: res.data });
    }
  }
  getRandomList() {
    const randomList = [];
    const sets = randomNums(0, productionData.length, 4);
    console.log('---sets--', sets);
    sets.forEach(indexId => {
      let ra = productionData[indexId];
      console.log('indexId-----', indexId);
      ra.indexId = indexId;
      randomList.push(ra);
    });
    return randomList;
  }
  onItemClick(productId) {
    let href = location.href;
    href = href.substring(0, href.lastIndexOf('/products/'));
    window.open(`${href}/products/${productId}`);
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    const id = this.props.match.params.id;
    this.setState({ productionItem: productionData[id] });
  }
  render() {
    const { describe, detail, imgUrls, title } = this.state.productionItem;
    const randomList = this.getRandomList();
    console.log(randomList);

    return (
      <section className="app-product-item">
        <div className="top-guide">
          <Link className="top-guide-link" to="/products/">
            Products
          </Link>{' '}
          » {title}
        </div>
        <div className="product-content f-jb-as">
          <div className="left-content f-js-as">
            <div className="etalage-content">
              <Etalage imgUrls={imgUrls} />
            </div>
            <div className="desc-content">
              <MarkdownRenderer className="markdown-body" markdown={describe} />
            </div>
          </div>
          <div className="right-content">
            <div className="heard-content f-js-ac">
              <img
                className="heard-img"
                src="https://user-images.githubusercontent.com/35425986/49698887-f416be00-fc04-11e8-897c-912ac7c4ae93.png"
                alt=""
              />
              <span className="heard-name">Sales Manager</span>
            </div>
            <p className="p-text">
              <span>Company</span> Fujian XP Industrial Co.,LTD
            </p>
            <p className="p-text">
              <span>Phone</span> +86 15505965690(wechat)
            </p>
            <p className="p-text">
              <span>Email</span>roadstudXP@foxmail.com
            </p>
            <div className="contect-content">
              <a target="_blank" href="https://www.facebook.com/lucy.guo.7965">
                <ion-icon name="logo-facebook" />
              </a>
              <a target="_blank" href="https://twitter.com/LucyRoadstud">
                <ion-icon name="logo-twitter" />
              </a>
            </div>
          </div>
        </div>
        <div className="centet-content f-jb-as">
          <div className="left-content">
            <MarkdownRenderer className="markdown-body" markdown={detail} />
          </div>
          <div className="centet-content-right">
            {randomList.map((item, index) => {
              return <RecommendItem key={index} item={item} itemClick={this.onItemClick.bind(this)} />;
            })}
          </div>
        </div>
      </section>
    );
  }
}
const Etalage = props => {
  const imgUrls = props.imgUrls;
  if (imgUrls.length > 0) {
    setTimeout(() => {
      $('#etalage').etalage({
        thumb_image_width: 250,
        thumb_image_height: 350,
        source_image_width: 800,
        source_image_height: 1000,
        show_hint: true
      });
    });
  }
  return imgUrls.length > 0 ? (
    <ul id="etalage">
      {imgUrls.map((item, index) => {
        return (
          <li key={index}>
            <img className="etalage_thumb_image" src={item} />
            <img
              className="etalage_source_image"
              src={item}
              title="This text area can also be setup to appear at the top of the image.<br>This second line shows that the description can be longer."
            />
          </li>
        );
      })}
    </ul>
  ) : null;
};
const RecommendItem = props => {
  const { imgUrls, title, indexId } = props.item || {};

  return (
    <div className="tj-product-item f-jc-ac-dc" onClick={props.itemClick.bind(null, indexId)}>
      <img className="product-img" src={imgUrls[0]} alt="Solar Road" />
      <div className="prd-d">
        <p className="p-tt ellipsis">{title}</p>
        {/* <div className="span-s">
          <p className="ellipsis"><span>Size:</span> Ø116*25mm</p>
          <p className="ellipsis"><span>Material:</span> PC shell with epoxy filler</p>
          <p className="ellipsis"><span>Weight:</span> about 0.3kg</p>
          <p className="ellipsis"><span>color:</span> white ,red ,yellow ,green,blue</p>
        </div> */}
      </div>
    </div>
  );
};

export default ProductItem;
