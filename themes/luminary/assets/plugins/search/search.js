(function () {
  'use strict';

  var summaryInclude = 60;
  var fuseOptions = {
    shouldSort: true,
    includeMatches: true,
    threshold: 0.0,
    tokenize: true,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
      { name: 'title', weight: 0.8 },
      { name: 'contents', weight: 0.5 },
      { name: 'tags', weight: 0.3 },
      { name: 'categories', weight: 0.3 }
    ]
  };

  function initSearch() {
    var searchQuery = param('s');
    var searchInput = document.getElementById('search-query');
    var resultsContainer = document.getElementById('search-results');
    var resultTemplate = document.getElementById('search-result-template');

    if (searchInput && searchQuery) {
      searchInput.value = searchQuery;
    }

    if (!searchQuery || !resultsContainer || !resultTemplate || !window.indexURL || typeof Fuse === 'undefined') {
      return;
    }

    executeSearch(searchQuery, resultsContainer, resultTemplate.innerHTML);
  }

  function executeSearch(searchQuery, resultsContainer, templateDefinition) {
    fetch(window.indexURL)
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Search index request failed: ' + response.status);
        }
        return response.json();
      })
      .then(function (pages) {
        var fuse = new Fuse(pages, fuseOptions);
        var result = fuse.search(searchQuery);
        resultsContainer.innerHTML = '';

        if (result.length > 0) {
          populateResults(result, searchQuery, resultsContainer, templateDefinition);
        } else {
          resultsContainer.innerHTML = '<div class="search-empty"><h3>No Search Found</h3></div>';
        }
      })
      .catch(function () {
        resultsContainer.innerHTML = '<div class="search-empty"><h3>Search is unavailable right now</h3></div>';
      });
  }

  function populateResults(result, searchQuery, resultsContainer, templateDefinition) {
    result.forEach(function (value, key) {
      var contents = value.item.contents || '';
      var snippet = '';
      var snippetHighlights = [];

      if (fuseOptions.tokenize) {
        snippetHighlights.push(searchQuery);
      } else if (value.matches) {
        value.matches.forEach(function (mvalue) {
          if (mvalue.key === 'tags' || mvalue.key === 'categories') {
            snippetHighlights.push(mvalue.value);
          } else if (mvalue.key === 'contents') {
            var start = mvalue.indices[0][0] - summaryInclude > 0 ? mvalue.indices[0][0] - summaryInclude : 0;
            var end = mvalue.indices[0][1] + summaryInclude < contents.length ? mvalue.indices[0][1] + summaryInclude : contents.length;
            snippet += contents.substring(start, end);
            snippetHighlights.push(mvalue.value.substring(mvalue.indices[0][0], mvalue.indices[0][1] - mvalue.indices[0][0] + 1));
          }
        });
      }

      if (snippet.length < 1) {
        snippet += contents.substring(0, summaryInclude * 2);
      }

      resultsContainer.insertAdjacentHTML('beforeend', render(templateDefinition, {
        key: key,
        title: value.item.title,
        link: value.item.permalink,
        tags: value.item.tags,
        categories: value.item.categories,
        snippet: snippet
      }));

      var summary = document.getElementById('summary-' + key);
      if (summary && window.Mark) {
        snippetHighlights.forEach(function (snipvalue) {
          new Mark(summary).mark(snipvalue);
        });
      }
    });
  }

  function param(name) {
    return new URLSearchParams(window.location.search).get(name) || '';
  }

  function render(templateString, data) {
    var conditionalMatches, conditionalPattern, copy;
    conditionalPattern = /\$\{\s*isset ([a-zA-Z]*) \s*\}(.*)\$\{\s*end\s*}/g;
    copy = templateString;
    while ((conditionalMatches = conditionalPattern.exec(templateString)) !== null) {
      if (data[conditionalMatches[1]]) {
        copy = copy.replace(conditionalMatches[0], conditionalMatches[2]);
      } else {
        copy = copy.replace(conditionalMatches[0], '');
      }
    }
    templateString = copy;

    Object.keys(data).forEach(function (key) {
      var find = '\\$\\{\\s*' + key + '\\s*\\}';
      var re = new RegExp(find, 'g');
      templateString = templateString.replace(re, data[key] || '');
    });

    return templateString;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSearch);
  } else {
    initSearch();
  }
})();
