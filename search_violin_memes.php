<?php
/**
 * MicroViolin Meme Search Utility
 * Enterprise-grade meme discovery system for violin content
 *
 * Searches multiple meme suppliers for high-quality tiny violin content
 * because manually finding memes is SO last decade.
 *
 * @package MicroViolin
 * @version 1.0.0
 * @license MIT
 */

// Configuration
$config = [
    'giphy' => [
        'api_key' => 'wkCpp9To16p3yAzF3LmKE7dIwBB8mf5G', // Get free key at developers.giphy.com
        'endpoint' => 'https://api.giphy.com/v1/gifs/search',
        'enabled' => true
    ],
    'tenor' => [
        'api_key' => 'YOUR_TENOR_API_KEY_HERE', // Get free key at tenor.com/gifapi
        'endpoint' => 'https://tenor.googleapis.com/v2/search',
        'enabled' => true
    ],
    'search_terms' => [
        'tiny violin',
        'small violin',
        'worlds smallest violin',
        'violin sad',
        'playing tiny violin',
        'miniature violin',
        'micro violin'
    ],
    'results_per_source' => 20,
    'output_format' => 'json' // Options: json, html, array
];

/**
 * Main search function
 */
function searchViolinMemes($searchTerm = 'tiny violin') {
    global $config;

    $results = [
        'search_term' => $searchTerm,
        'timestamp' => date('Y-m-d H:i:s'),
        'sources' => []
    ];

    // Search Giphy
    if ($config['giphy']['enabled']) {
        echo "🎻 Searching Giphy for '$searchTerm'...\n";
        $giphyResults = searchGiphy($searchTerm);
        $results['sources']['giphy'] = $giphyResults;
    }

    // Search Tenor
    if ($config['tenor']['enabled']) {
        echo "🎻 Searching Tenor for '$searchTerm'...\n";
        $tenorResults = searchTenor($searchTerm);
        $results['sources']['tenor'] = $tenorResults;
    }

    return $results;
}

/**
 * Search Giphy API for violin memes
 */
function searchGiphy($searchTerm) {
    global $config;

    $apiKey = $config['giphy']['api_key'];
    $endpoint = $config['giphy']['endpoint'];
    $limit = $config['results_per_source'];

    if ($apiKey === 'YOUR_GIPHY_API_KEY_HERE') {
        return [
            'error' => 'Giphy API key not configured',
            'message' => 'Get your free API key at https://developers.giphy.com/',
            'memes' => []
        ];
    }

    $url = sprintf(
        '%s?api_key=%s&q=%s&limit=%d&rating=g&lang=en',
        $endpoint,
        urlencode($apiKey),
        urlencode($searchTerm),
        $limit
    );

    $response = makeRequest($url);

    if (!$response) {
        return ['error' => 'Failed to fetch from Giphy', 'memes' => []];
    }

    $data = json_decode($response, true);
    $memes = [];

    if (isset($data['data']) && is_array($data['data'])) {
        foreach ($data['data'] as $gif) {
            $memes[] = [
                'title' => $gif['title'] ?? 'Untitled',
                'url' => $gif['images']['original']['url'] ?? '',
                'preview_url' => $gif['images']['fixed_height']['url'] ?? '',
                'width' => $gif['images']['original']['width'] ?? 0,
                'height' => $gif['images']['original']['height'] ?? 0,
                'source' => 'giphy',
                'id' => $gif['id'] ?? '',
                'rating' => $gif['rating'] ?? 'unknown'
            ];
        }
    }

    return [
        'count' => count($memes),
        'memes' => $memes
    ];
}

/**
 * Search Tenor API for violin memes
 */
function searchTenor($searchTerm) {
    global $config;

    $apiKey = $config['tenor']['api_key'];
    $endpoint = $config['tenor']['endpoint'];
    $limit = $config['results_per_source'];

    if ($apiKey === 'YOUR_TENOR_API_KEY_HERE') {
        return [
            'error' => 'Tenor API key not configured',
            'message' => 'Get your free API key at https://tenor.com/gifapi',
            'memes' => []
        ];
    }

    $url = sprintf(
        '%s?key=%s&q=%s&limit=%d&contentfilter=high&media_filter=gif',
        $endpoint,
        urlencode($apiKey),
        urlencode($searchTerm),
        $limit
    );

    $response = makeRequest($url);

    if (!$response) {
        return ['error' => 'Failed to fetch from Tenor', 'memes' => []];
    }

    $data = json_decode($response, true);
    $memes = [];

    if (isset($data['results']) && is_array($data['results'])) {
        foreach ($data['results'] as $gif) {
            $memes[] = [
                'title' => $gif['content_description'] ?? 'Untitled',
                'url' => $gif['media_formats']['gif']['url'] ?? '',
                'preview_url' => $gif['media_formats']['tinygif']['url'] ?? '',
                'width' => $gif['media_formats']['gif']['dims'][0] ?? 0,
                'height' => $gif['media_formats']['gif']['dims'][1] ?? 0,
                'source' => 'tenor',
                'id' => $gif['id'] ?? '',
                'rating' => 'family-friendly'
            ];
        }
    }

    return [
        'count' => count($memes),
        'memes' => $memes
    ];
}

/**
 * Make HTTP request with cURL
 */
function makeRequest($url) {
    $ch = curl_init();

    curl_setopt_array($ch, [
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_SSL_VERIFYPEER => true,
        CURLOPT_USERAGENT => 'MicroViolin-MemeSearchBot/1.0'
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    if (curl_errno($ch)) {
        echo "❌ cURL Error: " . curl_error($ch) . "\n";
        curl_close($ch);
        return false;
    }

    curl_close($ch);

    if ($httpCode !== 200) {
        echo "❌ HTTP Error: $httpCode\n";
        return false;
    }

    return $response;
}

/**
 * Format results for output
 */
function formatResults($results, $format = 'json') {
    switch ($format) {
        case 'json':
            return json_encode($results, JSON_PRETTY_PRINT);

        case 'html':
            return formatAsHTML($results);

        case 'array':
            return $results;

        case 'urls':
            return extractURLs($results);

        default:
            return json_encode($results, JSON_PRETTY_PRINT);
    }
}

/**
 * Format results as HTML
 */
function formatAsHTML($results) {
    $html = '<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Violin Meme Search Results</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        h1 {
            color: white;
            text-align: center;
        }
        .source-section {
            background: white;
            border-radius: 10px;
            padding: 20px;
            margin: 20px 0;
        }
        .meme-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 15px;
            margin-top: 20px;
        }
        .meme-card {
            border: 2px solid #667eea;
            border-radius: 8px;
            padding: 10px;
            text-align: center;
        }
        .meme-card img {
            max-width: 100%;
            height: auto;
            border-radius: 5px;
        }
        .meme-url {
            font-size: 0.8em;
            word-break: break-all;
            margin-top: 10px;
            color: #666;
        }
        .copy-btn {
            background: #667eea;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 3px;
            cursor: pointer;
            margin-top: 5px;
        }
        .copy-btn:hover {
            background: #764ba2;
        }
        .stats {
            background: #f0f0f0;
            padding: 10px;
            border-radius: 5px;
            margin-bottom: 15px;
        }
    </style>
</head>
<body>
    <h1>🎻 Violin Meme Search Results 🎻</h1>
    <div style="background: white; padding: 15px; border-radius: 10px; margin-bottom: 20px;">
        <p><strong>Search Term:</strong> ' . htmlspecialchars($results['search_term']) . '</p>
        <p><strong>Timestamp:</strong> ' . htmlspecialchars($results['timestamp']) . '</p>
    </div>';

    foreach ($results['sources'] as $sourceName => $sourceData) {
        $html .= '<div class="source-section">';
        $html .= '<h2>' . ucfirst($sourceName) . '</h2>';

        if (isset($sourceData['error'])) {
            $html .= '<div class="stats">';
            $html .= '<p style="color: red;">❌ ' . htmlspecialchars($sourceData['error']) . '</p>';
            if (isset($sourceData['message'])) {
                $html .= '<p>' . htmlspecialchars($sourceData['message']) . '</p>';
            }
            $html .= '</div>';
        } else {
            $html .= '<div class="stats">';
            $html .= '<p><strong>Results Found:</strong> ' . $sourceData['count'] . '</p>';
            $html .= '</div>';

            if ($sourceData['count'] > 0) {
                $html .= '<div class="meme-grid">';

                foreach ($sourceData['memes'] as $meme) {
                    $html .= '<div class="meme-card">';
                    $html .= '<img src="' . htmlspecialchars($meme['preview_url']) . '" alt="' . htmlspecialchars($meme['title']) . '">';
                    $html .= '<p><strong>' . htmlspecialchars(substr($meme['title'], 0, 50)) . '</strong></p>';
                    $html .= '<div class="meme-url">' . htmlspecialchars($meme['url']) . '</div>';
                    $html .= '<button class="copy-btn" onclick="copyToClipboard(\'' . htmlspecialchars($meme['url'], ENT_QUOTES) . '\')">Copy URL</button>';
                    $html .= '</div>';
                }

                $html .= '</div>';
            }
        }

        $html .= '</div>';
    }

    $html .= '
    <script>
        function copyToClipboard(text) {
            navigator.clipboard.writeText(text).then(() => {
                alert("URL copied to clipboard!");
            }).catch(err => {
                console.error("Failed to copy:", err);
            });
        }
    </script>
</body>
</html>';

    return $html;
}

/**
 * Extract just the URLs from results
 */
function extractURLs($results) {
    $urls = [];

    foreach ($results['sources'] as $sourceName => $sourceData) {
        if (isset($sourceData['memes']) && is_array($sourceData['memes'])) {
            foreach ($sourceData['memes'] as $meme) {
                if (!empty($meme['url'])) {
                    $urls[] = $meme['url'];
                }
            }
        }
    }

    return implode("\n", $urls);
}

/**
 * Generate JavaScript array for MicroViolin.js
 */
function generateJavaScriptArray($results) {
    $urls = [];

    foreach ($results['sources'] as $sourceName => $sourceData) {
        if (isset($sourceData['memes']) && is_array($sourceData['memes'])) {
            foreach ($sourceData['memes'] as $meme) {
                if (!empty($meme['url'])) {
                    $urls[] = "    '" . addslashes($meme['url']) . "'";
                }
            }
        }
    }

    $js = "// Add these to the violinMemes array in MicroViolin.js\n";
    $js .= "const newViolins = [\n";
    $js .= implode(",\n", $urls);
    $js .= "\n];";

    return $js;
}

/**
 * Save results to file
 */
function saveResults($results, $filename = 'violin_search_results.json') {
    $json = json_encode($results, JSON_PRETTY_PRINT);
    file_put_contents($filename, $json);
    echo "✅ Results saved to $filename\n";
}

// ============================================================================
// CLI Execution
// ============================================================================

if (php_sapi_name() === 'cli') {
    echo "\n";
    echo "╔════════════════════════════════════════════════════════════╗\n";
    echo "║        🎻 MicroViolin Meme Search Utility 🎻             ║\n";
    echo "║    Enterprise-Grade Violin Meme Discovery System          ║\n";
    echo "╚════════════════════════════════════════════════════════════╝\n";
    echo "\n";

    // Check for API keys
    if ($config['giphy']['api_key'] === 'YOUR_GIPHY_API_KEY_HERE' &&
        $config['tenor']['api_key'] === 'YOUR_TENOR_API_KEY_HERE') {
        echo "⚠️  WARNING: No API keys configured!\n";
        echo "\n";
        echo "To use this script, you need API keys:\n";
        echo "1. Giphy: https://developers.giphy.com/\n";
        echo "2. Tenor: https://tenor.com/gifapi\n";
        echo "\n";
        echo "Edit this script and add your API keys to the \$config array.\n";
        echo "\n";
        exit(1);
    }

    // Parse command line arguments
    $searchTerm = $argv[1] ?? 'tiny violin';
    $outputFormat = $argv[2] ?? 'json';

    echo "🔍 Search Term: $searchTerm\n";
    echo "📊 Output Format: $outputFormat\n";
    echo "\n";

    // Perform search
    $results = searchViolinMemes($searchTerm);

    // Display results
    echo "\n";
    echo "╔════════════════════════════════════════════════════════════╗\n";
    echo "║                    SEARCH RESULTS                          ║\n";
    echo "╚════════════════════════════════════════════════════════════╝\n";
    echo "\n";

    $totalMemes = 0;
    foreach ($results['sources'] as $sourceName => $sourceData) {
        if (!isset($sourceData['error'])) {
            $count = $sourceData['count'] ?? 0;
            $totalMemes += $count;
            echo "✅ " . ucfirst($sourceName) . ": $count memes found\n";
        } else {
            echo "❌ " . ucfirst($sourceName) . ": " . $sourceData['error'] . "\n";
        }
    }

    echo "\n";
    echo "🎻 Total Memes Found: $totalMemes\n";
    echo "\n";

    // Output results
    if ($outputFormat === 'html') {
        $filename = 'violin_search_results.html';
        file_put_contents($filename, formatResults($results, 'html'));
        echo "✅ HTML results saved to $filename\n";
        echo "   Open in browser to view: file://" . realpath($filename) . "\n";
    } elseif ($outputFormat === 'urls') {
        echo "\n";
        echo "📋 URLs Only:\n";
        echo "─────────────────────────────────────────────────────────\n";
        echo formatResults($results, 'urls');
        echo "\n";
    } elseif ($outputFormat === 'js') {
        echo "\n";
        echo generateJavaScriptArray($results);
        echo "\n";

        // Also save to file
        file_put_contents('new_violins.js', generateJavaScriptArray($results));
        echo "\n✅ JavaScript array saved to new_violins.js\n";
    } else {
        // JSON output
        echo "\n";
        echo formatResults($results, 'json');
        echo "\n";

        // Save to file
        saveResults($results);
    }

    echo "\n";
    echo "🎉 Search complete!\n";
    echo "\n";
}

// ============================================================================
// Web Execution (Optional)
// ============================================================================

if (php_sapi_name() !== 'cli' && isset($_GET['search'])) {
    header('Content-Type: text/html; charset=utf-8');

    $searchTerm = $_GET['search'] ?? 'tiny violin';
    $results = searchViolinMemes($searchTerm);

    echo formatResults($results, 'html');
}

