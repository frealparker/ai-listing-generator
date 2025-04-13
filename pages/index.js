import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await axios.post('/api/generate', { prompt: input });
      setOutput(res.data.listing);
    } catch (error) {
      setOutput("Error generating listing.");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>ListGenius AI - Depop/eBay Listing Generator</h1>
      <textarea
        rows={6}
        cols={80}
        placeholder="Describe your product (e.g., Y2K pink butterfly hoodie)..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ padding: '1rem', marginTop: '1rem', marginBottom: '1rem' }}
      />
      <br />
      <button onClick={handleGenerate} disabled={loading} style={{ padding: '0.5rem 1rem' }}>
        {loading ? 'Generating...' : 'Generate Listing'}
      </button>
      <div style={{ marginTop: '2rem', whiteSpace: 'pre-wrap', background: '#f4f4f4', padding: '1rem' }}>
        {output}
      </div>
    </div>
  );
}
