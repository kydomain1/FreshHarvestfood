# 🔍 Search Feature Documentation

## Overview

FreshHarvestfood includes a powerful, dedicated search page that allows users to find articles quickly and efficiently.

## Features

### 1. **Dedicated Search Page** (`search.html`)

Instead of filtering on the homepage, searches redirect to a full-featured search results page.

**Benefits:**
- Better user experience with dedicated space for results
- URL-based search queries (shareable links)
- More room for advanced filtering options
- Cleaner homepage design

### 2. **URL Parameter Support**

Search queries are passed via URL parameters, making results shareable.

**Example:**
```
search.html?q=skincare
```

This means users can:
- Share specific search results
- Bookmark searches
- Navigate back/forward through search history

### 3. **Multi-Filter Search**

Users can combine multiple filters:

#### Search Query
- Searches through article titles, excerpts, and categories
- Case-insensitive matching
- Real-time results

#### Category Filter
- All Categories
- Fashion & Accessories
- Health & Beauty
- Home & Garden
- Travel & Accommodation
- Finance & Insurance
- Food & Beverage

#### Sorting Options
- **Relevance**: Title matches appear first, then content matches
- **Newest First**: Most recent articles first
- **Oldest First**: Oldest articles first
- **Title (A-Z)**: Alphabetical by title

### 4. **Visual Search Enhancement**

#### Keyword Highlighting
Search terms are highlighted in results with a soft pink background, making it easy to see why an article matched.

#### Results Count
Clear display of how many results were found for the search query.

#### No Results Handling
When no results are found, users see:
- Friendly message
- Helpful suggestions to refine search
- Link back to homepage
- Cute icon animation

### 5. **Responsive Design**

The search page is fully responsive:
- **Desktop**: Full sidebar filters, large search bar
- **Tablet**: Adapted layout with collapsible filters
- **Mobile**: Stacked layout, simplified filters

## How It Works

### From Homepage

1. User enters search query in homepage search bar
2. Clicks search button or presses Enter
3. Redirected to `search.html?q=[query]`
4. Results displayed instantly

### On Search Page

1. Page reads URL parameter on load
2. Displays initial results
3. User can refine with:
   - New search query
   - Category filters
   - Sort options
4. Results update instantly without page reload

## Technical Implementation

### Files Involved

- **search.html**: Search results page structure
- **search-page.js**: Search logic and filtering
- **styles.css**: Shared styles
- **index.html**: Modified search bar (form submission)
- **script.js**: Updated to remove search logic from homepage

### JavaScript Functions

```javascript
// Main search function
performSearch()
  - Filters articles by category and query
  - Calls sortResults() and displayResults()

// Sort results
sortResults(results, sortType, query)
  - Sorts by relevance, date, or title

// Display results
displayResults(results, query)
  - Generates HTML for results
  - Shows/hides no results message
  - Highlights search terms

// Highlight search terms
highlightText(text, query)
  - Wraps matched terms in <mark> tags
```

### Data Structure

All articles are stored in a JavaScript array:

```javascript
{
  id: 1,
  title: "Article Title",
  excerpt: "Article excerpt...",
  category: "fashion",
  categoryName: "Fashion & Accessories",
  date: "2025-01-15",
  dateFormatted: "January 15, 2025",
  image: "image-url",
  url: "article1.html"
}
```

## User Experience Flow

```
Homepage
  └─> Enter search query
      └─> Press Enter/Click Search
          └─> Redirect to search.html?q=query
              └─> Show results
                  ├─> Filter by category (optional)
                  ├─> Change sort order (optional)
                  ├─> Refine search query (optional)
                  └─> Click article to read
```

## SEO Benefits

1. **URL Parameters**: Search queries in URL are crawlable
2. **Unique Page**: Each search has a unique URL
3. **Meta Tags**: Can add search-specific meta tags
4. **Structured Data**: Can add SearchAction schema

## Future Enhancements

Possible improvements:
- Search suggestions/autocomplete
- Recent searches history
- Popular searches display
- Filter by date range
- Save search preferences
- Export search results

## Best Practices

1. **Keep queries short**: Most relevant results with 1-3 keywords
2. **Use category filters**: Narrow down results when searching broad terms
3. **Try different sort orders**: Different sorts reveal different matches
4. **Check spelling**: Search is literal, so typos won't match

## Analytics Tracking

To track searches, add analytics code to `search-page.js`:

```javascript
// Example with Google Analytics
function trackSearch(query, resultsCount) {
  gtag('event', 'search', {
    search_term: query,
    results_count: resultsCount
  });
}
```

## Accessibility

The search page includes:
- Semantic HTML structure
- ARIA labels for screen readers
- Keyboard navigation support
- High contrast for readability
- Focus indicators on interactive elements

---

**Last Updated**: November 4, 2025  
**Version**: 1.0

