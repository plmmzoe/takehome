import { Select, MultiSelect, TextInput, Title, Table, Badge } from '@mantine/core';
import { useEffect, useState } from 'react';

function App() {
  const [categoryFilter, setCategoryFilter] = useState('');
  const [tagFilter, setTagFilter] = useState([]);
  const [descFilter, setDescFilter] = useState('');
  const [data, setData] = useState([]);

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

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
    <div style={{ padding: '12px' }}>
      <Title order={5}>Filters</Title>
      <div style={{
        padding: '10px',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        columnGap: '4px'
      }}>
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
          clearable
        />
        <TextInput
          value={descFilter}
          onChange={(e) => setDescFilter(e.currentTarget.value)}
          label={'Description'}
        />
      </div>
      <Title order={5}>Results</Title>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Category</Table.Th>
            <Table.Th>Tags</Table.Th>
            <Table.Th>Description</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.map((dataRow) => (
            <Table.Tr key={dataRow.id}>
              <Table.Td>{dataRow.name}</Table.Td>
              <Table.Td>{dataRow.category.name}</Table.Td>
              <Table.Td>{dataRow.tags
                .map((t) => t.name)
                .map((t) =>
                  <Badge
                    id={t}
                    variant={'outline'}
                    style={{ marginRight: '2px' }}>{t}</Badge>)
              }</Table.Td>
              <Table.Td>{dataRow.description}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  );
}

export default App;
