import { Select, MultiSelect } from '@mantine/core';
import { useEffect, useState } from 'react';

function App() {
  const [category, setCategory] = useState();
  const [tag, setTag] = useState();
  const [desc, setDesc] = useState('');

  const [data, setData] = useState([]);

  const [error, setError] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      //get data
      const response = await fetch('/api/listings/');
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const result = await response.json();
      setData(result);

      // get cetegory

      // get tag

    } catch (err) {
      setError(String(err));
    }
  };

  return (
    <div style={{
      padding: '10px',
      display: 'flex',
      flexDirection: 'row',
      width: '300px',
    }}>
      <div>
        <Select
          value={category}
          onChange={setCategory}
          label={'Category'}
          data={['']}
        />
      </div>
    </div>

  );
}

export default App;
