/**
 * Utility functions for handling CSV file operations
 */

/**
 * Convert an array of objects to a CSV string
 * @param {Array} data - Array of objects to convert
 * @param {Array} headers - Optional array of headers (if not provided, will use keys from first object)
 * @returns {string} CSV string
 */
export const objectsToCSV = (data, headers = null) => {
  if (!data || data.length === 0) {
    return '';
  }

  // If headers not provided, use keys from first object
  const csvHeaders = headers || Object.keys(data[0]);

  // Create header row
  const headerRow = csvHeaders.join(',');

  // Create data rows
  const rows = data.map(item => {
    return csvHeaders.map(header => {
      // Handle values that need quotes (commas, quotes, newlines)
      let value = item[header] === undefined ? '' : String(item[header]);

      // Escape quotes by doubling them and wrap in quotes if needed
      if (value.includes(',') || value.includes('"') || value.includes('\n')) {
        value = '"' + value.replace(/"/g, '""') + '"';
      }

      return value;
    }).join(',');
  });

  // Combine header and data rows
  return [headerRow, ...rows].join('\n');
};

/**
 * Download data as a CSV file
 * @param {Array} data - Array of objects to convert to CSV
 * @param {string} filename - Name of the file to download
 * @param {Array} headers - Optional array of headers
 */
export const downloadCSV = (data, filename, headers = null) => {
  const csvString = objectsToCSV(data, headers);
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });

  // Create download link
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Parse a CSV string into an array of objects
 * @param {string} csvString - The CSV string to parse
 * @param {Object} options - Parsing options
 * @param {string} options.delimiter - The delimiter character (default: ',')
 * @param {boolean} options.hasHeader - Whether the CSV has a header row (default: true)
 * @returns {Array} Array of objects where keys are from the header row
 */
export const parseCSV = (csvString, options = {}) => {
  const { delimiter = ',', hasHeader = true } = options;

  // Split the CSV string into rows
  const rows = csvString.split(/\r?\n/).filter(row => row.trim() !== '');

  if (rows.length === 0) {
    return [];
  }

  // If there's a header row, use it for keys
  const headers = hasHeader
    ? rows[0].split(delimiter).map(header => header.trim())
    : [];

  // Start from index 1 if there's a header, otherwise from 0
  const startIndex = hasHeader ? 1 : 0;

  // Parse each row into an object
  return rows.slice(startIndex).map(row => {
    const values = row.split(delimiter).map(value => value.trim());

    if (hasHeader) {
      // Create an object with keys from headers
      return headers.reduce((obj, header, index) => {
        // Handle the case where values might be fewer than headers
        obj[header] = index < values.length ? values[index] : '';
        return obj;
      }, {});
    } else {
      // Return array of values if no header
      return values;
    }
  });
};

/**
 * Parse a CSV file into an array of objects
 * @param {File} file - The CSV file to parse
 * @param {Object} options - Parsing options
 * @returns {Promise<Array>} Promise resolving to array of objects
 */
export const parseCSVFile = (file, options = {}) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const csvString = event.target.result;
        const data = parseCSV(csvString, options);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsText(file);
  });
};

/**
 * Validate CSV data against expected schema
 * @param {Array} data - Parsed CSV data
 * @param {Object} schema - Schema definition with field names and types
 * @returns {Object} Validation result with isValid flag and errors array
 */
export const validateCSVData = (data, schema) => {
  const errors = [];

  // Check if data is empty
  if (!data || data.length === 0) {
    return { isValid: false, errors: ['CSV data is empty'] };
  }

  // Check each row against the schema
  data.forEach((row, rowIndex) => {
    // Check required fields
    Object.entries(schema).forEach(([field, config]) => {
      if (config.required && (!(field in row) || row[field] === '')) {
        errors.push(`Row ${rowIndex + 1}: Missing required field "${field}"`);
      }

      // Type validation
      if (field in row && row[field] !== '') {
        const value = row[field];

        switch (config.type) {
          case 'number':
            if (isNaN(Number(value))) {
              errors.push(`Row ${rowIndex + 1}: Field "${field}" should be a number, got "${value}"`);
            }
            break;
          case 'date':
            if (isNaN(Date.parse(value))) {
              errors.push(`Row ${rowIndex + 1}: Field "${field}" should be a valid date, got "${value}"`);
            }
            break;
          // Add more type validations as needed
        }
      }
    });
  });

  return {
    isValid: errors.length === 0,
    errors
  };
};
