/**
 * Converts a given text string to its Unicode bold+italic equivalent.
 * Characters not found in the map will remain unchanged.
 * @param {string} text The input string to convert.
 * @returns {string} The converted string.
 */

// content.js

// --- Unicode Mapping Definitions ---
// These maps contain the Unicode equivalents for bold, italic, and underlined characters.
// They cover common Latin letters (uppercase and lowercase) and digits.


const unicodeBoldMap = {
    'A': '𝗔', 'B': '𝗕', 'C': '𝗖', 'D': '𝗗', 'E': '𝗘', 'F': '𝗙', 'G': '𝗚', 'H': '𝗛', 'I': '𝗜', 'J': '𝗝', 'K': '𝗞', 'L': '𝗟', 'M': '𝗠', 'N': '𝗡', 'O': '𝗢', 'P': '𝗣', 'Q': '𝗤', 'R': '𝗥', 'S': '𝗦', 'T': '𝗧', 'U': '𝗨', 'V': '𝗩', 'W': '𝗪', 'X': '𝗫', 'Y': '𝗬', 'Z': '𝗭',
    'a': '𝗮', 'b': '𝗯', 'c': '𝗰', 'd': '𝗱', 'e': '𝗲', 'f': '𝗳', 'g': '𝗴', 'h': '𝗵', 'i': '𝗶', 'j': '𝗷', 'k': '𝗸', 'l': '𝗹', 'm': '𝗺', 'n': '𝗻', 'o': '𝗼', 'p': '𝗽', 'q': '𝗾', 'r': '𝗿', 's': '𝘀', 't': '𝘁', 'u': '𝘂', 'v': '𝘃', 'w': '𝘄', 'x': '𝘅', 'y': '𝘆', 'z': '𝘇',
    '0': '𝟬', '1': '𝟭', '2': '𝟮', '3': '𝟯', '4': '𝟰', '5': '𝟱', '6': '𝟲', '7': '𝟳', '8': '𝟴', '9': '𝟵'
};

const unicodeItalicMap = {
    'A': '𝘈', 'B': '𝘉', 'C': '𝘊', 'D': '𝘋', 'E': '𝘌', 'F': '𝘍', 'G': '𝘎', 'H': '𝘏', 'I': '𝘐', 'J': '𝘑', 'K': '𝘒', 'L': '𝘓', 'M': '𝘔', 'N': '𝘕', 'O': '𝘖', 'P': '𝘗', 'Q': '𝘘', 'R': '𝘙', 'S': '𝘚', 'T': '𝘛', 'U': '𝘜', 'V': '𝘝', 'W': '𝘞', 'X': '𝘟', 'Y': '𝘠', 'Z': '𝘡',
    'a': '𝘢', 'b': '𝘣', 'c': '𝘤', 'd': '𝘥', 'e': '𝘦', 'f': '𝘧', 'g': '𝘨', 'h': '𝘩', 'i': '𝘪', 'j': '𝘫', 'k': '𝘬', 'l': '𝘭', 'm': '𝘮', 'n': '𝘯', 'o': '𝘰', 'p': '𝘱', 'q': '𝘲', 'r': '𝘳', 's': '𝘴', 't': '𝘵', 'u': '𝘶', 'v': '𝘷', 'w': '𝘸', 'x': '𝘹', 'y': '𝘺', 'z': '𝘻'
    // Note: There are no standard Unicode italic digits. They will remain unchanged.
};

const unicodeMonospaceMap = {
    'A': '𝖠', 'B': '𝖡', 'C': '𝖢', 'D': '𝖣', 'E': '𝖤', 'F': '𝖥', 'G': '𝖦', 'H': '𝖧', 'I': '𝖨', 'J': '𝖩', 'K': '𝖪', 'L': '𝖫', 'M': '𝖬', 'N': '𝖭', 'O': '𝖮', 'P': '𝖯', 'Q': '𝖰', 'R': '𝖱', 'S': '𝖲', 'T': '𝖳', 'U': '𝖴', 'V': '𝖵', 'W': '𝖶', 'X': '𝖷', 'Y': '𝖸', 'Z': '𝖹',
    'a': '𝖺', 'b': '𝖻', 'c': '𝖼', 'd': '𝖽', 'e': '𝖾', 'f': '𝖿', 'g': '𝗀', 'h': '𝗁', 'i': '𝗂', 'j': '𝗃', 'k': '𝗄', 'l': '𝗅', 'm': '𝗆', 'n': '𝗇', 'o': '𝗈', 'p': '𝗉', 'q': '𝗊', 'r': '𝗋', 's': '𝗌', 't': '𝗍', 'u': '𝗎', 'v': '𝗏', 'w': '𝗐', 'x': '𝗑', 'y': '𝗒', 'z': '𝗓',
    '0': '𝟢', '1': '𝟣', '2': '𝟤', '3': '𝟥', '4': '𝟦', '5': '𝟧', '6': '𝟨', '7': '𝟩', '8': '𝟪', '9': '𝟫'
};

// For underline, we use the combining low line character (U+0332) after each character.
const COMBINING_LOW_LINE = '\u0332';

const unicodeUpperMap = {
    'a': 'A', 'b': 'B', 'c': 'C', 'd': 'D', 'e': 'E', 'f': 'F', 'g': 'G', 'h': 'H', 'i': 'I', 'j': 'J', 'k': 'K', 'l': 'L', 'm': 'M', 'n': 'N', 'o': 'O', 'p': 'P', 'q': 'Q', 'r': 'R', 's': 'S', 't': 'T', 'u': 'U', 'v': 'V', 'w': 'W', 'x': 'X', 'y': 'Y', 'z': 'Z',
    '𝗮': '𝗔', '𝗯': '𝗕', '𝗰': '𝗖', '𝗱': '𝗗', '𝗲': '𝗘', '𝗳': '𝗙', '𝗴': '𝗚', '𝗵': '𝗛', '𝗶': '𝗜', '𝗷': '𝗝', '𝗸': '𝗞', '𝗹': '𝗟', '𝗺': '𝗠', '𝗻': '𝗡', '𝗼': '𝗢', '𝗽': '𝗣', '𝗾': '𝗤', '𝗿': '𝗥', '𝘀': '𝗦', '𝘁': '𝗧', '𝘂': '𝗨', '𝘃': '𝗩', '𝘄': '𝗪', '𝘅': '𝗫', '𝘆': '𝗬', '𝘇': '𝗭',
    '𝘢': '𝘈', '𝘣': '𝘉', '𝘤': '𝘊', '𝘥': '𝘋', '𝘦': '𝘌', '𝘧': '𝘍', '𝘨': '𝘎', '𝘩': '𝘏', '𝘪': '𝘐', '𝘫': '𝘑', '𝘬': '𝘒', '𝘭': '𝘓', '𝘮': '𝘔', '𝘯': '𝘕', '𝘰': '𝘖', '𝘱': '𝘗', '𝘲': '𝘘', '𝘳': '𝘙', '𝘴': '𝘚', '𝘵': '𝘛', '𝘶': '𝘜', '𝘷': '𝘝', '𝘸': '𝘞', '𝘹': '𝘟', '𝘺': '𝘠', '𝘻': '𝘡',
    '𝖺': '𝖠', '𝖻': '𝖡', '𝖼': '𝖢', '𝖽': '𝖣', '𝖾': '𝖤', '𝖿': '𝖥', '𝗀': '𝖦', '𝗁': '𝖧', '𝗂': '𝖨', '𝗃': '𝖩', '𝗄': '𝖪', '𝗅': '𝖫', '𝗆': '𝖬', '𝗇': '𝖭', '𝗈': '𝖮', '𝗉': '𝖯', '𝗊': '𝖰', '𝗋': '𝖱', '𝗌': '𝖲', '𝗍': '𝖳', '𝗎': '𝖴', '𝗏': '𝖵', '𝗐': '𝖶', '𝗑': '𝖷', '𝗒': '𝖸', '𝗓': '𝖹'
};

const unicodeLowerMap = {
    'A': 'a', 'B': 'b', 'C': 'c', 'D': 'd', 'E': 'e', 'F': 'f', 'G': 'g', 'H': 'h', 'I': 'i', 'J': 'j', 'K': 'k', 'L': 'l', 'M': 'm', 'N': 'n', 'O': 'o', 'P': 'p', 'Q': 'q', 'R': 'r', 'S': 's', 'T': 't', 'U': 'u', 'V': 'v', 'W': 'w', 'X': 'x', 'Y': 'y', 'Z': 'z',
    '𝗔': '𝗮', '𝗕': '𝗯', '𝗖': '𝗰', '𝗗': '𝗱', '𝗘': '𝗲', '𝗙': '𝗳', '𝗚': '𝗴', '𝗛': '𝗵', '𝗜': '𝗶', '𝗝': '𝗷', '𝗞': '𝗸', '𝗟': '𝗹', '𝗠': '𝗺', '𝗡': '𝗻', '𝗢': '𝗼', '𝗣': '𝗽', '𝗤': '𝗾', '𝗥': '𝗿', '𝗦': '𝘀', '𝗧': '𝘁', '𝗨': '𝘂', '𝗩': '𝘃', '𝗪': '𝘄', '𝗫': '𝘅', '𝗬': '𝘆', '𝗭': '𝘇',
    '𝘈': '𝘢', '𝘉': '𝘣', '𝘊': '𝘤', '𝘋': '𝘥', '𝘌': '𝘦', '𝘍': '𝘧', '𝘎': '𝘨', '𝘏': '𝘩', '𝘐': '𝘪', '𝘑': '𝘫', '𝘒': '𝘬', '𝘓': '𝘭', '𝘔': '𝘮', '𝘕': '𝘯', '𝘖': '𝘰', '𝘗': '𝘱', '𝘘': '𝘲', '𝘙': '𝘳', '𝘚': '𝘴', '𝘛': '𝘵', '𝘜': '𝘶', '𝘝': '𝘷', '𝘞': '𝘸', '𝘟': '𝘹', '𝘠': '𝘺', '𝘡': '𝘻',
    '𝖠': '𝖺', '𝖡': '𝖻', '𝖢': '𝖼', '𝖣': '𝖽', '𝖤': '𝖾', '𝖥': '𝖿', '𝖦': '𝗀', '𝖧': '𝗁', '𝖨': '𝗂', '𝖩': '𝗃', '𝖪': '𝗄', '𝖫': '𝗅', '𝖬': '𝗆', '𝖭': '𝗇', '𝖮': '𝗈', '𝖯': '𝗉', '𝖰': '𝗊', '𝖱': '𝗋', '𝖲': '𝗌', '𝖳': '𝗍', '𝖴': '𝗎', '𝖵': '𝗏', '𝖶': '𝗐', '𝖷': '𝗑', '𝖸': '𝗒', '𝖹': '𝗓'
};

// For bullet points, we use the standard Unicode bullet character.
const UNICODE_BULLET_CIRCLE = '•';
// For hyphen bullet points, we use the standard hyphen character.
const UNICODE_BULLET_HYPHEN = '-';


// --- Helper Functions for Unicode Conversion ---

/**
 * Converts a given text string to its Unicode bold equivalent.
 * Characters not found in the map will remain unchanged.
 * @param {string} text The input string to convert.
 * @returns {string} The converted string.
 */
function convertToBold(text) {
    // Eerst ALLES naar plain tekst converteren
    let plain = convertToPlainText(text);
    // Dan alleen bold toepassen (laatste actie wint)
    return plain.split('\n')
                .map(line => line.trim().length > 0 ? Array.from(line).map(char => unicodeBoldMap[char] || char).join('') : '')
                .filter(line => line.length > 0)
                .join('\n');
}

/**
 * Converts a given text string to its Unicode italic equivalent.
 * Characters not found in the map will remain unchanged.
 * @param {string} text The input string to convert.
 * @returns {string} The converted string.
 */
function convertToItalic(text) {
    // Eerst ALLES naar plain tekst converteren
    let plain = convertToPlainText(text);
    // Dan alleen italic toepassen (laatste actie wint)
    return plain.split('\n')
                .map(line => line.trim().length > 0 ? Array.from(line).map(char => unicodeItalicMap[char] || char).join('') : '')
                .filter(line => line.length > 0)
                .join('\n');
}

/**
 * Converts a given text string to its Unicode underlined equivalent using combining characters.
 * Each character will be followed by the combining low line character.
 * @param {string} text The input string to convert.
 * @returns {string} The converted string.
 */
function convertToUnderline(text) {
    // We iterate over the string using Array.from to correctly handle surrogate pairs (multi-byte characters)
    return text.split('\n')
                .map(line => line.trim().length > 0 ? Array.from(line).map(char => char + COMBINING_LOW_LINE).join('') : '')
                .filter(line => line.length > 0)
                .join('\n');
}

/**
 * Cleans a line from any existing known bullet points (circle or hyphen).
 * @param {string} line The input line to clean.
 * @returns {string} The cleaned line without bullet points.
 */
function cleanLineFromBullets(line) {
    // Verwijder alleen bullets aan het begin van de regel, zonder trim (spaties behouden)
    if (line.startsWith(UNICODE_BULLET_CIRCLE + ' ')) {
        return line.substring((UNICODE_BULLET_CIRCLE + ' ').length);
    }
    if (line.startsWith(UNICODE_BULLET_HYPHEN + ' ')) {
        return line.substring((UNICODE_BULLET_HYPHEN + ' ').length);
    }
    return line;
}

/**
 * Converts a given text string into a bulleted list using Unicode circle bullet points.
 * Each line in the selected text will be prefixed with a bullet, replacing existing ones.
 * @param {string} text The input string to convert.
 * @returns {string} The converted string with circle bullet points.
 */
function convertToCircleBulletPoints(text) {
    // Split the text by newlines, clean existing bullets, and prefix non-empty lines with a new bullet.
    return text.split('\n')
               .map(line => {
                   const cleanedLine = cleanLineFromBullets(line);
                   // Only add bullet to lines that have actual content (not just whitespace)
                   return cleanedLine.length > 0 && cleanedLine.trim().length > 0 ? `${UNICODE_BULLET_CIRCLE} ${cleanedLine}` : '';
               })
               .filter(line => line.length > 0)
               .join('\n');
}

/**
 * Converts a given text string into a bulleted list using hyphen bullet points.
 * Each line in the selected text will be prefixed with a hyphen, replacing existing ones.
 * @param {string} text The input string to convert.
 * @returns {string} The converted string with hyphen bullet points.
 */
function convertToHyphenBulletPoints(text) {
    // Split the text by newlines, clean existing bullets, and prefix non-empty lines with a new hyphen.
    return text.split('\n')
               .map(line => {
                   const cleanedLine = cleanLineFromBullets(line);
                   // Only add bullet to lines that have actual content (not just whitespace)
                   return cleanedLine.length > 0 && cleanedLine.trim().length > 0 ? `${UNICODE_BULLET_HYPHEN} ${cleanedLine}` : '';
               })
               .filter(line => line.length > 0)
               .join('\n');
}

/**
 * Converts a given text string into a numbered bulleted list (1. ... 2. ...).
 * Each non-empty line in the selected text will be prefixed with its line number.
 * @param {string} text The input string to convert.
 * @returns {string} The converted string with numbered bullet points.
 */
function convertToNumberedBulletPoints(text) {
    const lines = text.split('\n');
    let counter = 1;
    
    return lines.map(line => {
        const cleanedLine = cleanLineFromBullets(line);
        // Only add numbers to lines that have actual content (not just whitespace)
        if (cleanedLine.length > 0 && cleanedLine.trim().length > 0) {
            return `${counter++}. ${cleanedLine}`;
        } else {
            return ''; // Convert empty/whitespace lines to empty strings
        }
    }).filter(line => line.length > 0).join('\n');
}

/**
 * Converts a given text string to its Unicode underlined equivalent using monospace characters.
 * Each character will be replaced by its monospace equivalent followed by the combining low line character.
 * @param {string} text The input string to convert.
 * @returns {string} The converted string.
 */
function convertToMonospaceUnderline(text) {
    // Zet om naar monospace en voeg underline toe
    return Array.from(text).map(char => (unicodeMonospaceMap[char] || char) + COMBINING_LOW_LINE).join('');
}

/**
 * Converts a given text string to its Unicode underlined+bold equivalent.
 * Each character will be replaced by its bold equivalent followed by the combining low line character.
 * @param {string} text The input string to convert.
 * @returns {string} The converted string.
 */
function convertToUnderlineBold(text) {
    // Eerst ALLES naar plain tekst converteren
    let plain = convertToPlainText(text);
    // Apply bold first, then underline
    const boldText = Array.from(plain).map(char => unicodeBoldMap[char] || char).join('');
    return Array.from(boldText).map(char => char + COMBINING_LOW_LINE).join('');
}

/**
 * Converts a given text string to its Unicode underlined+italic equivalent.
 * Each character will be replaced by its italic equivalent followed by the combining low line character.
 * @param {string} text The input string to convert.
 * @returns {string} The converted string.
 */
function convertToUnderlineItalic(text) {
    // Eerst ALLES naar plain tekst converteren
    let plain = convertToPlainText(text);
    // Apply italic first, then underline
    const italicText = Array.from(plain).map(char => unicodeItalicMap[char] || char).join('');
    return Array.from(italicText).map(char => char + COMBINING_LOW_LINE).join('');
}

/**
 * Converts a given text string to its Unicode bold+italic+underlined equivalent.
 * Each character will be replaced by its bold+italic equivalent followed by the combining low line character.
 * @param {string} text The input string to convert.
 * @returns {string} The converted string.
 */
function convertToBoldItalicUnderline(text) {
    // Check if text is already bold+italic+underlined - if so, convert to plain
    if (isAllBoldItalicUnderlined(text)) {
        let plain = removeUnderline(text);
        return demapUnicode(plain, unicodeBoldItalicMap);
    }
    // Strip naar plain en pas bold+italic+underline toe
    let plain = demapUnicode(text, unicodeBoldMap);
    plain = demapUnicode(plain, unicodeItalicMap);
    plain = demapUnicode(plain, unicodeBoldItalicMap);
    plain = removeUnderline(plain);
    // Apply bold+italic first, then underline
    const boldItalicText = Array.from(plain).map(char => unicodeBoldItalicMap[char] || char).join('');
    return Array.from(boldItalicText).map(char => char + COMBINING_LOW_LINE).join('');
}

// --- Helper Functions to Remove Unicode Formatting ---

/**
 * Converts any styled text back to plain text by removing all Unicode formatting
 * @param {string} text The input string to convert to plain text
 * @returns {string} Plain text without any Unicode formatting
 */
/**
 * Converts a given text string to uppercase.
 * @param {string} text The input string to convert.
 * @returns {string} The converted uppercase string.
 */
function convertToUppercase(text) {
    return Array.from(text).map(char => unicodeUpperMap[char] || char).join('');
}

/**
 * Converts a given text string to lowercase.
 * @param {string} text The input string to convert.
 * @returns {string} The converted lowercase string.
 */
function convertToLowercase(text) {
    return Array.from(text).map(char => unicodeLowerMap[char] || char).join('');
}

function convertToPlainText(text) {
    // Quick check: als de text geen Unicode formatting karakters bevat, return origineel
    if (!(/[\u0332\u{1D400}-\u{1D7FF}\u{1D800}-\u{1DBFF}\u{1DC00}-\u{1DFFF}\u{1E000}-\u{1EFFF}•-]/u.test(text))) {
        console.log('No Unicode formatting detected, returning original text');
        return text;
    }

    let plain = text;

    // Remove all underlines first
    plain = removeUnderline(plain);
    console.log('After removing underline:', plain);

    // Remove all Unicode styles
    plain = demapUnicode(plain, unicodeBoldMap);
    console.log('After removing bold:', plain);
    plain = demapUnicode(plain, unicodeItalicMap);
    console.log('After removing italic:', plain);
    console.log('After removing bold+italic:', plain);
    plain = demapUnicode(plain, unicodeMonospaceMap);
    console.log('After removing monospace:', plain);

    // Remove bullets
    plain = removeBullets(plain);
    console.log('After removing bullets:', plain);

    return plain;
}

function demapUnicode(text, unicodeMap) {
    // Create a reverse map
    const reverseMap = Object.fromEntries(Object.entries(unicodeMap).map(([k, v]) => [v, k]));
    return Array.from(text).map(char => reverseMap[char] || char).join('');
}

function removeUnderline(text) {
    // Remove combining low line from each character
    return text.replace(/\u0332/g, '');
}

function demapMonospaceUnderline(text) {
    // Verwijder monospace en underline
    // Eerst underline weg, dan monospace terug naar normaal
    const reverseMap = Object.fromEntries(Object.entries(unicodeMonospaceMap).map(([k, v]) => [v, k]));
    let noUnderline = text.replace(/\u0332/g, '');
    return Array.from(noUnderline).map(char => reverseMap[char] || char).join('');
}

function isAllStyled(text, unicodeMap) {
    const unicodeValues = new Set(Object.values(unicodeMap));
    return Array.from(text).every(char => unicodeValues.has(char) || !(/[a-zA-Z]/.test(char)));
}


function isAllBold(text) {
    const unicodeValues = new Set(Object.values(unicodeBoldMap));
    return Array.from(text).every(char => unicodeValues.has(char) || !(/[a-zA-Z]/.test(char)));
}

function isAllItalic(text) {
    const unicodeValues = new Set(Object.values(unicodeItalicMap));
    return Array.from(text).every(char => unicodeValues.has(char) || !(/[a-zA-Z]/.test(char)));
}

function isAllUnderlined(text) {
    // Checks if at least one char is underlined
    return /\u0332/.test(text);
}

function isAllMonospaceUnderlined(text) {
    // Check of alle stylable chars monospace+underline zijn
    const monospaceSet = new Set(Object.values(unicodeMonospaceMap));
    // Check: elk stylable char is monospace gevolgd door underline
    let arr = Array.from(text);
    for (let i = 0; i < arr.length - 1; i++) {
        if (monospaceSet.has(arr[i]) && arr[i + 1] === COMBINING_LOW_LINE) {
            i++; // skip underline
        } else if (monospaceSet.has(arr[i])) {
            return false;
        }
    }
    return /\u0332/.test(text);
}

function isAllUnderlineBold(text) {
    // Check if all stylable chars are bold+underlined
    const boldSet = new Set(Object.values(unicodeBoldMap));
    let arr = Array.from(text);
    for (let i = 0; i < arr.length - 1; i++) {
        if (/[a-zA-Z0-9]/.test(arr[i])) { // Only check stylable chars
            if (boldSet.has(arr[i]) && arr[i + 1] === COMBINING_LOW_LINE) {
                i++; // skip underline
            } else {
                return false;
            }
        }
    }
    return /\u0332/.test(text) && arr.some(char => boldSet.has(char));
}

function isAllUnderlineItalic(text) {
    // Check if all stylable chars are italic+underlined
    const italicSet = new Set(Object.values(unicodeItalicMap));
    let arr = Array.from(text);
    for (let i = 0; i < arr.length - 1; i++) {
        if (/[a-zA-Z]/.test(arr[i])) { // Only check stylable chars (no italic digits)
            if (italicSet.has(arr[i]) && arr[i + 1] === COMBINING_LOW_LINE) {
                i++; // skip underline
            } else {
                return false;
            }
        }
        
    }
    return /\u0332/.test(text) && arr.some(char => italicSet.has(char));
}


function isAllCircleBulleted(text) {
    // Checks if all non-empty lines start with the bullet
    return text.split('\n').filter(line => line.trim().length > 0).every(line => line.trim().startsWith(UNICODE_BULLET_CIRCLE));
}

function isAllHyphenBulleted(text) {
    return text.split('\n').filter(line => line.trim().length > 0).every(line => line.trim().startsWith(UNICODE_BULLET_HYPHEN));
}

function removeBullets(text) {
    // Quick check: als er geen bullets in de tekst staan, return de originele tekst
    if (!text.includes(UNICODE_BULLET_CIRCLE) && !text.includes(UNICODE_BULLET_HYPHEN)) {
        return text;
    }
    
    // Remove both bullet types from all lines, maar behoud lege regels exact zoals ze waren
    // (dus: geen filter op lege regels, alleen bullets strippen)
    return text.split('\n').map(line => {
        // Alleen bullets strippen, geen trim zodat spaties aan het begin behouden blijven
        if (line.startsWith(UNICODE_BULLET_CIRCLE + ' ')) {
            return line.substring((UNICODE_BULLET_CIRCLE + ' ').length);
        }
        if (line.startsWith(UNICODE_BULLET_HYPHEN + ' ')) {
            return line.substring((UNICODE_BULLET_HYPHEN + ' ').length);
        }
        return line;
    }).join('\n');
}

// --- Main Logic for LinkedIn Post Field Detection and Event Handling ---

/**
 * Finds the active LinkedIn post input field.
 * LinkedIn uses contenteditable divs for their post composer.
 * This function tries to find the most likely element.
 * @returns {HTMLElement|null} The contenteditable element or null if not found.
 */
function getLinkedInPostInputField() {
    // Look for the main contenteditable div used for creating posts.
    // LinkedIn often uses specific data attributes or aria-labels for these fields.
    // This function tries to find the most likely element.
    // @returns {HTMLElement|null} The contenteditable element or null if not found.

    // Prioritize a robust selector for the main post composer.
    let postField = document.querySelector('div[role="textbox"][aria-label*="post"], div[data-placeholder*="What do you want to talk about"], div.editor-content__content, div.ql-editor');

    // If a specific post field is not found, check for any active contenteditable element
    // that might be the target, but be more cautious.
    if (!postField) {
        postField = document.activeElement;
        if (postField && postField.isContentEditable) {
            // Further check if it's likely a post field and not just any editable element.
            // This is a heuristic and might need adjustment if LinkedIn's DOM changes.
            const parentComposer = postField.closest('.share-box__inner, .feed-shared-composer__container, .msg-form__contenteditable');
            if (parentComposer) {
                return postField;
            }
        }
        return null; // Not a recognized LinkedIn post field
    }

    return postField;
}

// Keyboard shortcuts have been removed

// --- Fixed Toolbar Implementation ---

// Create and inject the toolbar CSS
function injectToolbarCSS() {
    const style = document.createElement('style');
    style.textContent = `
        .linkedin-formatter-toolbar {
            background: #f8f9fa;
            border: 1px solid #e0e0e0;
            border-bottom: 2px solid #0077b5;
            border-radius: 6px 6px 0 0;
            padding: 8px 12px;
            display: flex;
            align-items: center;
            gap: 6px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
            margin-bottom: 18px;
            z-index: 100;
            position: relative;
        }
        
        .linkedin-formatter-toolbar button {
            background: #ffffff;
            border: 1px solid #d0d0d0;
            border-radius: 4px;
            width: 36px;
            height: 32px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 14px;
            font-weight: bold;
            color: #333;
            transition: all 0.2s ease;
            margin: 0 1px;
        }
        
        .linkedin-formatter-toolbar button:hover {
            background: #e8f4fd;
            border-color: #0077b5;
            color: #0077b5;
        }
        
        .linkedin-formatter-toolbar button:active {
            background: #d0e8f7;
            transform: translateY(1px);
        }
        
        .linkedin-formatter-toolbar button.active {
            background: #0077b5;
            color: white;
            border-color: #005582;
            box-shadow: 0 2px 4px rgba(0, 119, 181, 0.3);
        }
        
        .linkedin-formatter-toolbar .separator {
            width: 1px;
            height: 20px;
            background: #d0d0d0;
            margin: 0 4px;
        }
        
        .linkedin-formatter-toolbar .toolbar-label {
            font-size: 12px;
            color: #666;
            margin-right: 8px;
            font-weight: 500;
        }
        
        /* Make the LinkedIn text area blend with our toolbar */
        .linkedin-text-area-with-toolbar {
            border-radius: 0 0 6px 6px !important;
            border-top: none !important;
        }
    `;
    document.head.appendChild(style);
}

// Create the toolbar element
function createToolbar() {
    const toolbar = document.createElement('div');
    toolbar.className = 'linkedin-formatter-toolbar';
    toolbar.innerHTML = `
        <button data-action="bold" title="Bold" style="font-family: serif;">𝗕</button>
        <button data-action="italic" title="Italic" style="font-family: serif;">𝘐</button>
        <button data-action="underline" title="Underline" style="text-decoration: underline;">U</button>
        <div class="separator"></div>
        <button data-action="bold-underline" title="Bold+Underline" style="font-family: serif; text-decoration: underline;">𝗕</button>
        <button data-action="italic-underline" title="Italic+Underline" style="font-family: serif; text-decoration: underline;">𝘐</button>
        <div class="separator"></div>
        <button data-action="bullet-circle" title="Circle Bullets" style="font-size: 16px;">•</button>
        <button data-action="bullet-hyphen" title="Hyphen Bullets" style="font-size: 16px;">-</button>
        <button data-action="bullet-numbered" title="Numbered Bullets" style="font-size: 16px;">1.</button>
        <div class="separator"></div>
        <button data-action="uppercase" title="UPPERCASE" style="font-size: 14px;">AA</button>
        <button data-action="lowercase" title="lowercase" style="font-size: 14px;">aa</button>
        <div style="flex: 1;"></div>
        <button data-action="clear-formatting" title="Verwijder opmaak (Clear formatting)" style="font-size: 15px;">✖️</button>
    `;
    
    // Add click handlers
    toolbar.addEventListener('click', handleToolbarClick);
    
    return toolbar;
}


// WeakMap: textarea => toolbar
const textAreaToolbarMap = new WeakMap();
let observedTextAreas = new Set();

// Handle toolbar button clicks
function handleToolbarClick(event) {
    if (event.target.tagName !== 'BUTTON') return;
    const action = event.target.dataset.action;
    if (!action) return;

    const toolbar = event.currentTarget;
    const textArea = toolbar.nextElementSibling;
    if (!textArea || !textArea.isContentEditable) {
        console.log('Toolbar target textarea not found');
        return;
    }

    textArea.focus();

    setTimeout(() => {
        const selection = window.getSelection();
        if (selection.rangeCount === 0 || selection.isCollapsed) {
            console.log('No text selected');
            return;
        }

        const range = selection.getRangeAt(0);
        if (!textArea.contains(range.commonAncestorContainer)) {
            console.log('Selection is not within the target textarea');
            return;
        }

        let transformFunction;
        switch (action) {
            case 'bold': transformFunction = convertToBold; break;
            case 'italic': transformFunction = convertToItalic; break;
            case 'underline': transformFunction = (text) => convertToMonospaceUnderline(convertToPlainText(text)); break;
            case 'bold-underline': transformFunction = convertToUnderlineBold; break;
            case 'italic-underline': transformFunction = convertToUnderlineItalic; break;
            case 'bullet-circle': transformFunction = convertToCircleBulletPoints; break;
            case 'bullet-hyphen': transformFunction = convertToHyphenBulletPoints; break;
            case 'bullet-numbered': transformFunction = convertToNumberedBulletPoints; break;
            case 'uppercase': transformFunction = convertToUppercase; break;
            case 'lowercase': transformFunction = convertToLowercase; break;
            case 'clear-formatting': transformFunction = convertToPlainText; break;
            default: return; // Unknown action
        }

        try {
            const fragment = range.extractContents();
            transformTextNodes(fragment, transformFunction);
            const newRange = document.createRange();

            // Insert the transformed content and re-select it
            range.insertNode(fragment);
            const lastChild = range.startContainer.childNodes[range.startOffset - 1];
            if (lastChild) {
                newRange.selectNodeContents(lastChild);
                selection.removeAllRanges();
                selection.addRange(newRange);
            }

        } catch (e) {
            console.error("Error executing text transformation:", e);
        }
    }, 10);
}

/**
 * Recursively traverses a DOM node and applies a transformation function to all text nodes.
 * @param {Node} node The node to traverse (e.g., a DocumentFragment).
 * @param {Function} transform The function to apply to each text node's content.
 */
function transformTextNodes(node, transform) {
    if (node.nodeType === Node.TEXT_NODE) {
        node.textContent = transform(node.textContent);
    } else {
        // Use a static copy of child nodes for iteration as the list may change
        const children = Array.from(node.childNodes);
        for (const child of children) {
            transformTextNodes(child, transform);
        }
    }
}

// Add toolbar to a LinkedIn text area
function addToolbarToTextArea(textArea) {
    if (observedTextAreas.has(textArea)) return;
    observedTextAreas.add(textArea);
    // Create toolbar
    const toolbar = createToolbar();
    textAreaToolbarMap.set(textArea, toolbar);
    // Only insert toolbar if parentNode exists (avoid error)
    if (textArea.parentNode) {
        textArea.parentNode.insertBefore(toolbar, textArea);
    } else {
        return;
    }
    textArea.classList.add('linkedin-text-area-with-toolbar');
}

// Update toolbar button states for a specific text area
function updateToolbarForTextArea(textArea) {
    // Functionaliteit uitgeschakeld - geen active states meer
    return;
}

// Update button active states based on selected text
function updateToolbarButtonStates(selectedText, toolbar) {
    // Functionaliteit uitgeschakeld - geen active states meer
    return;
}
// Info popup functionality has been removed

// Find and add toolbars to LinkedIn text areas
function findAndAddToolbars() {
    // Hoofd-post composer: breder selecteren
    const textAreas = document.querySelectorAll('div[role="textbox"][aria-label*="post"], div[data-placeholder*="What do you want to talk about"]');
    textAreas.forEach(textArea => {
        if (!observedTextAreas.has(textArea)) {
            addToolbarToTextArea(textArea);
        }
    });
}

// Initialize toolbar functionality
function initToolbar() {
    injectToolbarCSS();
    
    // Add toolbars to bestaande nieuwe post text area
    findAndAddToolbars();

    // Observeer alleen nieuwe post composers (brede selector)
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    // Hoofd-post composer: breder selecteren
                    if (node.matches && node.matches('div[role="textbox"][aria-label*="post"], div[data-placeholder*="What do you want to talk about"]')) {
                        addToolbarToTextArea(node);
                    } else if (node.querySelectorAll) {
                        const textAreas = node.querySelectorAll('div[role="textbox"][aria-label*="post"], div[data-placeholder*="What do you want to talk about"]');
                        textAreas.forEach(textArea => addToolbarToTextArea(textArea));
                    }
                }
            });
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Periodiek checken alleen voor nieuwe post composer
    setInterval(findAndAddToolbars, 2000);
}

// --- Synchronisatie na keyboard shortcuts ---
// Functionaliteit uitgeschakeld - geen toolbar state updates meer
function updateToolbarForActiveSelection() {
    return;
}

// Voeg een globale selectionchange listener toe (uitgeschakeld)
// document.addEventListener('selectionchange', () => {
//     setTimeout(updateToolbarForActiveSelection, 10);
// });

initToolbar();
console.log("LinkedIn Unicode Formatter content script loaded.");
