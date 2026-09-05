// mr.D Smooth Scroller JS
// Created by Carl Durocher - www.carldurocher.com
// Free, just keep my credential in here please.
// Version 1.1.0

(function(window) {
  'use strict';

  /**
   * Polyfill for requestAnimationFrame
   * Ensures compatibility across older browsers
   */
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback) {
      return window.setTimeout(callback, 1000 / 60);
    };
  }

  /**
   * Polyfill for cancelAnimationFrame
   * Ensures compatibility across older browsers
   */
  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
  }

  /**
   * SmoothScroller class
   * Provides smooth scrolling functionality with customizable options
   *
   * @class
   * @param {Object} options - Configuration options
   * @param {number} [options.duration=800] - Duration of smooth scroll animation in milliseconds
   * @param {number} [options.deceleration=0.93] - Deceleration factor (0-1) for scroll velocity
   * @param {number} [options.sensitivity=0.05] - Scroll sensitivity multiplier
   * @param {Function} [options.easing] - Custom easing function
   */
  function SmoothScroller(options) {
    this.options = options || {};
    this.isScrolling = false;
    this.velocity = 0;
    this.deceleration = this.options.deceleration || 0.93;
    this.sensitivity = this.options.sensitivity || 0.05;
    this.duration = this.options.duration || 800;
    this.easing = this.options.easing || this.easeOutQuad;
    this.mediaQuery = this.options.mediaQuery;
    this.animationFrameId = null;
    this.currentScrollY = 0;
    this.init();
  }

  /**
   * Initialize the smooth scroller
   * Sets up event listeners and bindings
   */
  SmoothScroller.prototype.init = function() {
    this.bindEvents();
  };

  /**
   * Bind scroll and navigation events
   * Handles wheel, keyboard, and anchor link navigation
   */
  SmoothScroller.prototype.bindEvents = function() {
    // Handle anchor link navigation
    const anchorLinks = document.querySelectorAll('nav a[href^="#"]');
    anchorLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const targetId = event.currentTarget.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          const targetPosition = targetElement.offsetTop;
          this.smoothScrollTo(targetPosition);
        }
      });
    });

    // Handle mouse wheel events
    window.addEventListener('wheel', (event) => {
      if (innerWidth <= this.mediaQuery) return;

      event.preventDefault();
      this.handleScroll(event.deltaY);
    }, { passive: false });

    // Handle keyboard navigation
    window.addEventListener('keydown', (event) => {
      if (innerWidth <= this.mediaQuery) return;
      let scrollAmount = 0;

      switch(event.key) {
        case 'ArrowUp':
          scrollAmount = -40;
          break;
        case 'ArrowDown':
          scrollAmount = 40;
          break;
        case 'PageUp':
          scrollAmount = -window.innerHeight;
          break;
        case 'PageDown':
          scrollAmount = window.innerHeight;
          break;
        case 'Home':
          event.preventDefault();
          this.smoothScrollTo(0);
          return;
        case 'End':
          event.preventDefault();
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          this.smoothScrollTo(maxScroll);
          return;
        default:
          return;
      }

      event.preventDefault();
      this.handleScroll(scrollAmount);
    }, { passive: false });
  };

  /**
   * Handle scroll event
   * Updates velocity and triggers scroll animation
   *
   * @param {number} delta - Scroll delta value
   */
  SmoothScroller.prototype.handleScroll = function(delta) {
    if (this.isScrolling) {
      // If already scrolling, accumulate velocity
      this.velocity += delta * this.sensitivity;
      return;
    }

    this.currentScrollY = window.pageYOffset;
    this.velocity = delta * this.sensitivity;
    this.isScrolling = true;
    this.animationFrameId = requestAnimationFrame(this.animateScroll.bind(this));
  };

  /**
   * Animate the scroll with velocity-based physics
   * Uses deceleration to create smooth easing effect
   */
  SmoothScroller.prototype.animateScroll = function() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

    if (Math.abs(this.velocity) > 0.05) {
      // Calculate new scroll position
      this.currentScrollY = Math.max(0, Math.min(this.currentScrollY + this.velocity, maxScroll));
      window.scrollTo(0, this.currentScrollY);

      // Apply deceleration
      this.velocity *= this.deceleration;

      // Stop if we hit the boundaries
      if (this.currentScrollY === 0 || this.currentScrollY === maxScroll) {
        this.velocity = 0;
        this.isScrolling = false;
        if (this.animationFrameId) {
          cancelAnimationFrame(this.animationFrameId);
          this.animationFrameId = null;
        }
      } else {
        this.animationFrameId = requestAnimationFrame(this.animateScroll.bind(this));
      }
    } else {
      // Velocity is too small, stop scrolling
      this.isScrolling = false;
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
      }
    }
  };

  /**
   * Smooth scroll to a specific position
   * Uses easing function for smooth animation
   *
   * @param {number} targetY - Target scroll position
   */
  SmoothScroller.prototype.smoothScrollTo = function(targetY) {
    // Cancel any ongoing scroll animation
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    this.isScrolling = false;
    this.velocity = 0;

    const startY = window.pageYOffset;
    const distance = targetY - startY;
    const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();
    const duration = this.duration;
    const easing = this.easing;

    const scroll = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = easing(elapsed, startY, distance, duration);

      window.scrollTo(0, progress);

      if (elapsed < duration) {
        requestAnimationFrame(scroll);
      } else {
        window.scrollTo(0, targetY);
      }
    };

    requestAnimationFrame(scroll);
  };

  /**
   * Ease out quadratic easing function
   * Provides smooth deceleration
   *
   * @param {number} t - Current time
   * @param {number} b - Start value
   * @param {number} c - Change in value
   * @param {number} d - Duration
   * @returns {number} Eased value
   */
  SmoothScroller.prototype.easeOutQuad = function(t, b, c, d) {
    t /= d;
    return -c * t * (t - 2) + b;
  };

  /**
   * Ease in-out quadratic easing function
   * Provides smooth acceleration and deceleration
   *
   * @param {number} t - Current time
   * @param {number} b - Start value
   * @param {number} c - Change in value
   * @param {number} d - Duration
   * @returns {number} Eased value
   */
  SmoothScroller.prototype.easeInOutQuad = function(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  };

  /**
   * Destroy the smooth scroller
   * Removes event listeners and cleans up
   */
  SmoothScroller.prototype.destroy = function() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    this.isScrolling = false;
    this.velocity = 0;
    // Note: In production, you would want to store references to event listeners
    // and remove them here. For simplicity, this basic implementation doesn't do that.
  };

  /**
   * Initialize SmoothScroller when DOM is ready
   */
  document.addEventListener('DOMContentLoaded', () => {
    const bodyElement = document.body;

    // Read configuration from data attributes
    const options = {
      duration: parseInt(bodyElement.getAttribute('data-scroll-duration')) || 800,
      deceleration: parseFloat(bodyElement.getAttribute('data-scroll-deceleration')) || 0.93,
      sensitivity: parseFloat(bodyElement.getAttribute('data-scroll-sensitivity')) || 0.05,
      isScrolling: bodyElement.getAttribute('data-scroll-isScrolling') === 'true',
      velocity: parseFloat(bodyElement.getAttribute('data-scroll-velocity')) || 0,
      mediaQuery: parseFloat(bodyElement.getAttribute('data-scroll-media-query') || 0),
      easing: function(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
      }
    };

    // Create instance
    window.smoothScroller = new SmoothScroller(options);
  });

  // Export to window
  window.SmoothScroller = SmoothScroller;

})(window);
