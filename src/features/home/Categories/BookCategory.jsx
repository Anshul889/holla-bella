import React, { Component } from "react";
import styles from "./BookCategory.module.css";
import { Link } from "react-router-dom";
import { getBooksForHomepage } from "./booksActions";
import { connect } from "react-redux";
import { Placeholder } from "semantic-ui-react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

const mapState = state => ({
  books: state.books,
  booksloading: state.async.loading
});

const actions = {
  getBooksForHomepage
};

class BookCategory extends Component {
  async componentDidMount() {
    if (this.props.books && this.props.books.length === 0) {
      this.props.getBooksForHomepage();
    }
  }

  render() {
    const { books } = this.props;
    if (books.length === 0) {
      return (
        <div className={styles.container}>
          <h2>Books</h2>
          <div className={styles.inner}>
            <div className={styles.product}>
              <div className={styles.image}>
                <Placeholder>
                  <Placeholder.Image />
                </Placeholder>
              </div>
            </div>
            <div className={styles.product}>
              <div className={styles.image}>
                <Placeholder>
                  <Placeholder.Image />
                </Placeholder>
              </div>
            </div>
            <div className={styles.product}>
              <div className={styles.image}>
                <Placeholder>
                  <Placeholder.Image />
                </Placeholder>
              </div>
            </div>
            <div className={styles.product}>
              <div className={styles.image}>
                <Placeholder>
                  <Placeholder.Image />
                </Placeholder>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className={styles.container}>
        <h2>Books</h2>
        <div className={styles.inner}>
          {books &&
            books.map(product => (
              <div className={styles.product} key={product.id}>
                <div className={styles.image}>
                  <Link to={`/product/${product.id}`}>
                    {/* <img src={product.photoURL} alt={product.description} /> */}
                    <LazyLoadImage
                      alt={product.description}
                      src={product.photoURL}
                      width="100%"
                      effect="blur"
                    />
                  </Link>
                </div>
                <div className={styles.content}>
                  <h3>
                    <Link to={`/product/${product.id}`}>{product.title}</Link>
                  </h3>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default connect(
  mapState,
  actions
)(BookCategory);
