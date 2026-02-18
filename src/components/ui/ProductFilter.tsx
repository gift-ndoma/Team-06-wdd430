'use client';

import { useState, useMemo } from 'react';
import type { Product } from '@/library/types';
import ProductCard from './ProductCard';
import styles from './ProductFilter.module.css';

function formatPrice(cents: number) {
  return new Intl.NumberFormat('en-NZ', {
    style: 'currency',
    currency: 'NZD',
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

const RATING_OPTIONS = [
  { label: 'Any', value: 0 },
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
  { label: '5', value: 5 },
];

interface ProductFilterProps {
  products: Product[];
}

export default function ProductFilter({ products }: ProductFilterProps) {
  const maxProductPrice = useMemo(
    () => Math.max(...products.map((p) => p.price_cents), 0),
    [products]
  );

  const [maxPrice, setMaxPrice] = useState(() =>
    Math.max(...products.map((p) => p.price_cents), 0)
  );
  const [minRating, setMinRating] = useState(0);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (p.price_cents > maxPrice) return false;
      if (minRating > 0) {
        if (p.rating === null) return false;
        const numericRating = Number(p.rating);
        if (isNaN(numericRating)) return false;
        if (minRating === 5) {
          if (numericRating < 4.5) return false;
        } else {
          if (numericRating < minRating) return false;
        }
      }
      return true;
    });
  }, [products, maxPrice, minRating]);

  function clearFilters() {
    setMaxPrice(maxProductPrice);
    setMinRating(0);
  }

  const hasActiveFilters = maxPrice < maxProductPrice || minRating > 0;

  return (
    <div className={styles.layout}>
      {/* ---- Filter Sidebar ---- */}
      <aside className={styles.sidebar} aria-label="Product filters">
        <div className={styles.sidebarInner}>
          <div className={styles.filterHeader}>
            <h2 className={styles.filterTitle}>Filters</h2>
            {hasActiveFilters && (
              <button className={styles.clearBtn} onClick={clearFilters}>
                Clear all
              </button>
            )}
          </div>

          {/* Price Range */}
          <div className={styles.filterSection}>
            <p className={styles.filterLabel}>Max Price</p>
            <div className={styles.priceDisplay}>
              <span className={styles.priceValue}>{formatPrice(0)}</span>
              <span className={styles.priceValue}>{formatPrice(maxPrice)}</span>
            </div>
            <input
              type="range"
              min={0}
              max={maxProductPrice}
              step={100}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className={styles.rangeInput}
              aria-label="Maximum price filter"
            />
          </div>

          {/* Rating */}
          <div className={styles.filterSection}>
            <p className={styles.filterLabel}>Min Rating</p>
            <div className={styles.ratingOptions} role="group" aria-label="Minimum star rating">
              {RATING_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  className={`${styles.ratingBtn} ${minRating === opt.value ? styles.ratingBtnActive : ''}`}
                  onClick={() => setMinRating(opt.value)}
                  aria-pressed={minRating === opt.value}
                  aria-label={opt.value === 0 ? 'Any rating' : `${opt.value} star${opt.value > 1 ? 's' : ''} and above`}
                >
                  {opt.value === 0 ? (
                    <span>Any</span>
                  ) : (
                    <span className={styles.stars}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <StarIcon key={i} filled={i < opt.value} />
                      ))}
                      {opt.value < 5 && <span className={styles.plusLabel}>+</span>}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* ---- Results ---- */}
      <div className={styles.results}>
        <div className={styles.resultsHeader}>
          <p className={styles.count}>
            {filtered.length} {filtered.length === 1 ? 'product' : 'products'}
            {hasActiveFilters ? ' found' : ''}
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className={styles.empty}>
            <p>No products match your filters.</p>
            <button className={styles.clearBtn} onClick={clearFilters}>
              Clear filters
            </button>
          </div>
        ) : (
          <div className={styles.grid}>
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
