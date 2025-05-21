import { useState } from 'react';
import { FaUpload, FaFileAlt, FaCheck, FaTimes } from 'react-icons/fa';
import { parseCSVFile, validateCSVData } from '@/lib/csvUtils';

const CSVImport = ({ onImport, dataType, schema }) => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setError(null);
    setIsLoading(true);

    try {
      // Parse the CSV file
      const data = await parseCSVFile(selectedFile);
      
      // Validate the data against the schema
      if (schema) {
        const validation = validateCSVData(data, schema);
        if (!validation.isValid) {
          setError(validation.errors.join('\n'));
          setPreview(null);
          setIsLoading(false);
          return;
        }
      }
      
      // Set preview data (first 5 rows)
      setPreview(data.slice(0, 5));
      setIsLoading(false);
    } catch (err) {
      setError('Error parsing CSV file: ' + err.message);
      setPreview(null);
      setIsLoading(false);
    }
  };

  const handleImport = async () => {
    if (!file) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await parseCSVFile(file);
      
      // Validate the data against the schema
      if (schema) {
        const validation = validateCSVData(data, schema);
        if (!validation.isValid) {
          setError(validation.errors.join('\n'));
          setIsLoading(false);
          return;
        }
      }
      
      // Call the onImport callback with the parsed data
      onImport(data, dataType);
      setIsLoading(false);
    } catch (err) {
      setError('Error importing CSV file: ' + err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="status-window mb-6">
      <h3 className="status-window-title mb-4">Import {dataType} Data</h3>
      
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-text-muted">
          Upload CSV File
        </label>
        <div className="flex items-center">
          <label className="flex items-center justify-center px-4 py-2 border border-primary/30 rounded-md cursor-pointer hover:bg-background-light transition-colors">
            <FaUpload className="mr-2" />
            <span>Choose File</span>
            <input
              type="file"
              accept=".csv"
              className="hidden"
              onChange={handleFileChange}
              disabled={isLoading}
            />
          </label>
          {file && (
            <div className="ml-3 flex items-center text-sm text-text-muted">
              <FaFileAlt className="mr-1" />
              <span>{file.name}</span>
            </div>
          )}
        </div>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-accent-dark/20 border border-accent-dark rounded-md text-sm">
          <div className="flex items-start">
            <FaTimes className="text-accent mt-1 mr-2 flex-shrink-0" />
            <pre className="whitespace-pre-wrap">{error}</pre>
          </div>
        </div>
      )}
      
      {preview && preview.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-text-muted mb-2">Preview (first 5 rows):</h4>
          <div className="bg-background-dark p-3 rounded-md overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  {Object.keys(preview[0]).map((key) => (
                    <th key={key} className="text-left p-2 text-text-glow">{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {preview.map((row, index) => (
                  <tr key={index} className="border-t border-primary/10">
                    {Object.values(row).map((value, i) => (
                      <td key={i} className="p-2">{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      <div className="flex justify-end">
        <button
          onClick={handleImport}
          disabled={!file || isLoading || error}
          className={`flex items-center px-4 py-2 rounded-md ${
            !file || isLoading || error
              ? 'bg-background-light text-text-muted cursor-not-allowed'
              : 'bg-primary hover:bg-primary-dark text-white cursor-pointer'
          } transition-colors`}
        >
          {isLoading ? (
            <>
              <span className="animate-pulse mr-2">Processing...</span>
            </>
          ) : (
            <>
              <FaCheck className="mr-2" />
              <span>Import Data</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CSVImport;
