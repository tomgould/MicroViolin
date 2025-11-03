# 🎻 MicroViolin Meme Search Tool

Enterprise-grade PHP utility for discovering violin memes across multiple platforms.

## Features

- 🔍 Multi-source search (Giphy, Tenor)
- 📊 Multiple output formats (JSON, HTML, URLs, JavaScript)
- 🎯 Batch searching with automatic deduplication
- 💾 Automatic result caching and saving
- 🌐 Web interface support
- 📋 One-click URL copying in HTML output

## Requirements

- PHP 7.4 or higher
- cURL extension enabled
- API keys (free):
  - [Giphy Developer Account](https://developers.giphy.com/)
  - [Tenor API Account](https://tenor.com/gifapi)

## Setup

### 1. Get API Keys

**Giphy:**
1. Go to https://developers.giphy.com/
2. Create an account
3. Create a new app
4. Copy your API key

**Tenor:**
1. Go to https://tenor.com/gifapi
2. Sign up for API access
3. Copy your API key

### 2. Configure the Script

Edit `search_violin_memes.php` and add your API keys:

```php
$config = [
    'giphy' => [
        'api_key' => 'YOUR_ACTUAL_GIPHY_KEY_HERE',
        // ...
    ],
    'tenor' => [
        'api_key' => 'YOUR_ACTUAL_TENOR_KEY_HERE',
        // ...
    ],
    // ...
];
```

## Usage

### Basic Search (CLI)

```bash
# Search with default term "tiny violin"
php search_violin_memes.php

# Search with custom term
php search_violin_memes.php "miniature violin"

# Get results as URLs only
php search_violin_memes.php "tiny violin" urls

# Generate JavaScript array
php search_violin_memes.php "tiny violin" js

# Generate HTML report
php search_violin_memes.php "tiny violin" html
```

### Batch Search

Search multiple terms at once and deduplicate results:

```bash
php batch_search_violins.php
```

This will:
- Search 10 different violin-related terms
- Remove duplicates
- Generate consolidated results
- Create JavaScript array ready for MicroViolin.js
- Generate HTML report with all unique memes

### Web Interface

1. Upload scripts to your web server
2. Access via URL:
   ```
   http://yourserver.com/search_violin_memes.php?search=tiny+violin
   ```

## Output Formats

### JSON (Default)
```bash
php search_violin_memes.php "tiny violin" json
```
Creates: `violin_search_results.json`

### HTML
```bash
php search_violin_memes.php "tiny violin" html
```
Creates: `violin_search_results.html` - Interactive gallery with copy buttons

### URLs Only
```bash
php search_violin_memes.php "tiny violin" urls
```
Outputs plain text list of URLs

### JavaScript Array
```bash
php search_violin_memes.php "tiny violin" js
```
Creates: `new_violins.js` - Ready to paste into MicroViolin.js

## Adding Results to MicroViolin.js

After running the search:

1. Run JavaScript output format:
   ```bash
   php search_violin_memes.php "tiny violin" js
   ```

2. Open `new_violins.js`

3. Copy the URLs from the array

4. Paste into the `violinMemes` array in `MicroViolin.js`:
   ```javascript
   const violinMemes = [
       // ... existing violins ...
       'https://your.new.violin.url/here.gif',
       // ... more new violins ...
   ];
   ```

## Batch Search Output

The batch search creates three files:

- `batch_search_results.json` - Full detailed results
- `batch_violins.js` - JavaScript array of all unique URLs
- `batch_search_results.html` - Visual gallery of all memes

## API Rate Limits

### Giphy
- **Free tier:** 42 requests per hour, 1000 per day
- **SDK Key:** 1000 requests per day

### Tenor
- **Free tier:** Generous limits, check their docs

**Pro Tip:** The batch search includes automatic 2-second delays between requests to be nice to the APIs.

## Troubleshooting

### "No API keys configured"
- Make sure you've replaced `YOUR_GIPHY_API_KEY_HERE` with your actual API key

### "Failed to fetch from [source]"
- Check your internet connection
- Verify API key is valid
- Check if you've hit rate limits
- Ensure cURL extension is enabled: `php -m | grep curl`

### cURL not found
```bash
# Ubuntu/Debian
sudo apt-get install php-curl

# CentOS/RHEL
sudo yum install php-curl

# macOS (with Homebrew)
brew install php
```

### Empty results
- Try different search terms
- Check if API keys are valid
- Verify APIs are accessible from your server

## Advanced Usage

### Custom Search Terms

Edit the `$config` array in `search_violin_memes.php`:

```php
'search_terms' => [
    'tiny violin',
    'your custom term here',
    'another term',
],
```

### Adjust Results Per Source

```php
'results_per_source' => 50, // Default is 20
```

### Enable/Disable Sources

```php
'giphy' => [
    'api_key' => '...',
    'enabled' => false, // Disable Giphy
],
```

## Script Functions

### `searchViolinMemes($searchTerm)`
Main search function that queries all enabled sources

### `searchGiphy($searchTerm)`
Searches Giphy API specifically

### `searchTenor($searchTerm)`
Searches Tenor API specifically

### `formatResults($results, $format)`
Formats results as JSON, HTML, or plain URLs

### `generateJavaScriptArray($results)`
Creates JavaScript code ready to paste

## Security Notes

- Never commit API keys to version control
- Use environment variables for production:
  ```php
  'api_key' => getenv('GIPHY_API_KEY'),
  ```
- Keep API keys private
- Consider rate limiting for web interface

## Example Workflow

```bash
# 1. Run batch search
php batch_search_violins.php

# 2. Review results
open batch_search_results.html

# 3. Copy good URLs from batch_violins.js

# 4. Update MicroViolin.js with new memes

# 5. Test your updated library
open index.html
```

## Contributing

Found a better meme source? PRs welcome!

## License

MIT - Same as MicroViolin.js

---

**Made with 🎻 and questionable API usage**