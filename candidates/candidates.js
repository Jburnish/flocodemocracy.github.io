/**
 * FloCo Democracy – candidates/candidates.js
 * Client-side live search and race-type filtering for the candidates page.
 * Designed to scale to 80+ candidate cards without a backend.
 */

(function () {
  'use strict';

  var searchInput  = document.getElementById('candidate-search');
  var raceFilter   = document.getElementById('race-filter');
  var grid         = document.getElementById('candidate-grid');
  var noResults    = document.getElementById('no-results');
  var resultsCount = document.getElementById('results-count');
  var clearBtn     = document.getElementById('clear-filters');

  if (!searchInput || !raceFilter || !grid) return;

  /** Returns all candidate <article> elements */
  function getCards() {
    return Array.prototype.slice.call(grid.querySelectorAll('.candidate-card'));
  }

  /** Debounce helper to avoid re-filtering on every keypress */
  function debounce(fn, delay) {
    var timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(fn, delay);
    };
  }

  /** Main filter routine */
  function filterCandidates() {
    var query = searchInput.value.trim().toLowerCase();
    var race  = raceFilter.value;
    var cards = getCards();
    var visible = 0;

    cards.forEach(function (card) {
      var name = (card.getAttribute('data-name') || '').toLowerCase();
      var seat = (card.getAttribute('data-seat') || '').toLowerCase();
      var cardRace = card.getAttribute('data-race') || '';

      var matchesSearch = !query || name.indexOf(query) !== -1 || seat.indexOf(query) !== -1;
      var matchesRace   = !race  || cardRace === race;

      if (matchesSearch && matchesRace) {
        card.hidden = false;
        visible++;
      } else {
        card.hidden = true;
      }
    });

    // Update live region for screen readers
    if (resultsCount) {
      if (query || race) {
        resultsCount.textContent =
          visible === 1
            ? '1 candidate found.'
            : visible + ' candidates found.';
      } else {
        resultsCount.textContent = '';
      }
    }

    // Show / hide "no results" message
    if (noResults) {
      noResults.hidden = visible > 0;
    }
  }

  /** Clear all filters and reset the grid */
  function clearAll() {
    searchInput.value = '';
    raceFilter.value  = '';
    filterCandidates();
    searchInput.focus();
  }

  // Attach event listeners
  searchInput.addEventListener('input', debounce(filterCandidates, 200));
  raceFilter.addEventListener('change', filterCandidates);
  if (clearBtn) {
    clearBtn.addEventListener('click', clearAll);
  }

  // Run once on load to set initial count display
  filterCandidates();
})();
