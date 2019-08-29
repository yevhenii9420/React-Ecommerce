import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { resetFilter, applyFilter } from '../../actions/filterActions';
import { selectMax, selectMin } from '../../selectors/selector';

import PriceRange from './PriceRange';

const Filters = (props) => {
  const { products, filter, isLoading, productsLength, dispatch } = props;
  const max = selectMax(products);
  const min = selectMin(products)
  const [filterField, setFilter] = useState({
    brandFilter: filter.brand,
    minPriceFilter: filter.minPrice,
    maxPriceFilter: filter.maxPrice,
    sortByFilter: filter.sortBy
  })

  const onMinPriceChange = (val) => {
    setFilter({ ...filterField, minPriceFilter: val });
  };

  const onMaxPriceChange = (val) => {
    setFilter({ ...filterField, maxPriceFilter: val });
  };

  const onBrandFilterChange = (e) => {
    const val = e.target.value;

    setFilter({ ...filterField, brandFilter: val });
  };

  const onSortFilterChange = (e) => {
    setFilter({ ...filterField, sortByFilter: e.target.value });
  };


  const onApplyFilter = () => {
    const newFilter = {
      brand: filterField.brandFilter,
      minPrice: filterField.minPriceFilter,
      maxPrice: filterField.maxPriceFilter,
      sortBy: filterField.sortByFilter,
    };

    if (Object.keys(newFilter).some(key => filter[key] !== newFilter[key])) {
      dispatch(applyFilter(newFilter));
      props.history.push('/');
    }
  };

  const onResetFilter = () => {
    if (['brand', 'minPrice', 'maxPrice', 'sortBy'].some(key => !!filter[key])) {
      dispatch(resetFilter());
      props.history.push('/');
    }
  };

  return (
    <div className="filters">
      <div className="filters-field">
        <span>Brand</span>
        <br/>
        <br/>
        {productsLength === 0 && isLoading ? (
          <h5 className="text-subtle">Loading Filter</h5>
        ) : (
          <select 
              className="filters-brand"
              value={filterField.brandFilter}
              disabled={isLoading || productsLength === 0}
              onChange={onBrandFilterChange}
          >
            <option value="">All Brands</option>
            <option value="salt">Salt Maalat</option>
            <option value="betsin">Betsin Maalat</option>
          </select>
        )}
      </div>
      <div className="filters-field">
        <span>Sort By</span>
        <br/>
        <br/>
        <select 
              className="filters-sort-by d-block"
              // value={brandFilter}
              disabled={isLoading || productsLength === 0}
              onChange={onSortFilterChange}
          >
            <option value="">None</option>
            <option value="name-asc">Name Ascending A - Z</option>
            <option value="name-desc">Name Descending Z - A</option>
            <option value="price-desc">Price High - Low</option>
            <option value="price-asc">Price Low - High</option>
          </select>
      </div>
      <div className="filters-field">
        <span>Price Range</span>
        <br/>
        <br/>
        {productsLength === 0 && isLoading ? (
          <h5 className="text-subtle">Loading Filter</h5>
        ) : (
          <PriceRange 
              min={min} 
              max={max} 
              onMaxPriceChange={onMaxPriceChange}
              onMinPriceChange={onMinPriceChange}
              productsLength={productsLength}
          />
        )}
      </div>
      <div className="filters-action">
        <button
            className="filters-button button button-small"
            disabled={isLoading || productsLength === 0}
            onClick={onApplyFilter}
        >
          Apply filters
        </button>
        <button
            className="filters-button button button-border button-small"
            disabled={isLoading || productsLength === 0}
            onClick={onResetFilter}
        >
          Reset filters
        </button>
      </div>
    </div>
  );
};

export default withRouter(Filters);
