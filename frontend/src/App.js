import { Select, MultiSelect } from '@mantine/core';
import { useEffect, useState } from 'react';

function App() {
  const [categoryFilter, setCategoryFilter] = useState('');
  const [tagFilter, setTagFilter] = useState([]);
  const [descFilter, setDescFilter] = useState('');
  const [data, setData] = useState([]);

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [descs, setDescs] = useState('');

  useEffect(() => {
    fetchData();
    fetch('/api/categories/')
      .then((res) => res.json())
      .then((res) => setCategories(res.map((e) => e.name)));
    fetch('/api/tags/')
      .then((res) => res.json())
      .then((res) => setTags(res.map((e) => e.name)));
  }, []);


  useEffect(() => {
    fetchData();
  }, [categoryFilter, tagFilter, descFilter]);

  const fetchData = async () => {
    //get data
    const params = new URLSearchParams();
    if (descFilter) params.append('desc', descFilter);
    if (categoryFilter) params.append('category', categoryFilter);
    tagFilter.forEach((t) => params.append('tags', t));

    const response = await fetch(`/api/listings/?${params.toString()}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const result = await response.json();
    setData(result);
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
          value={categoryFilter}
          onChange={setCategoryFilter}
          label={'Category'}
          data={categories}
        />
        <MultiSelect
          value={tagFilter}
          onChange={setTagFilter}
          label={'Tags'}
          data={tags}
        />
      </div>
    </div>

  );
}

export default App;
