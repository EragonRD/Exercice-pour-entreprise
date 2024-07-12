import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';



interface RowData {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface EditFormProps {
  row: Partial<RowData>;
  onSave: (row: RowData) => void;
  onCancel: () => void;
}

const EditForm: React.FC<EditFormProps> = ({ row, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Partial<RowData>>(row);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(formData as RowData);
  };

  return (
    <tr>
      <td>
        <input style={{backgroundColor: "white"}} type="number" name="userId" value={formData.userId} onChange={handleChange} />
      </td>
      <td>
        <input style={{backgroundColor: "white"}} type="number" name="id"  value={formData.id} onChange={handleChange}  />
      </td>
      <td>
        <input style={{backgroundColor: "white"}} type="text"name="title" value={formData.title} onChange={handleChange} />
      </td>
      <td>
        <input style={{backgroundColor: "white"}}  type="checkbox" name="completed" checked={formData.completed} onChange={handleChange} />
      </td>
      <td>
        <Box sx={{ display: 'flex', gap: 1 }}>
        
        <Button 
        size="sm"
        variant="plain"
        color="neutral"
        onClick={(e: React.MouseEvent<HTMLFormElement>) => handleSubmit(e)}>
        Save
        </Button>
        
          <Button size="sm" variant="soft" color="danger" onClick={onCancel}>
            Cancel
          </Button>
        </Box>
      </td>
    </tr>
  );
};

export default function Tableau() {
  const [rows, setRows] = useState<RowData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingRow, setEditingRow] = useState<RowData | null>(null);
  const [newRow, setNewRow] = useState<Partial<RowData>>({});

  useEffect(() => {
    // Récupérer les données depuis l'API lorsque le composant est monté
    axios.get<RowData[]>('https://jsonplaceholder.typicode.com/posts/')
      .then(response => {
        setRows(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setError('Failed to fetch data from API');
        setLoading(false);
      });
  }, []);

  const handleDelete = (id: number) => {
    setRows(rows.filter(row => row.id !== id));
  };

  const handleEdit = (row: RowData) => {
    setEditingRow(row);
  };

  const handleSave = (updatedRow: RowData) => {
    setRows(rows.map(row => row.id === updatedRow.id ? updatedRow : row));
    setEditingRow(null);
  };

  const handleCancel = () => {
    setEditingRow(null);
  };

  const handleAdd = () => {
    setNewRow({ id: Date.now(), userId: 0, title: '', completed: false });
  };

  const handleAddSave = (newRow: RowData) => {
    setRows([...rows, newRow]);
    setNewRow({});
  };

  const handleAddCancel = () => {
    setNewRow({});
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Box sx={{ width: '100%' }}>
    
      <Sheet
        variant="outlined"
        sx={{
          '--TableCell-height': '40px',
          // the number is the amount of the header rows.
          '--TableHeader-height': 'calc(1 * var(--TableCell-height))',
          '--Table-firstColumnWidth': '80px',
          '--Table-lastColumnWidth': '144px',
          // background needs to have transparency to show the scrolling shadows
          '--TableRow-stripeBackground': 'rgba(0 0 0 / 0.04)',
          '--TableRow-hoverBackground': 'rgba(0 0 0 / 0.08)',
          overflow: 'auto',
          background: (
            theme,
          ) => `linear-gradient(to right, ${theme.vars.palette.background.surface} 30%, rgba(255, 255, 255, 0)),
            linear-gradient(to right, rgba(255, 255, 255, 0), ${theme.vars.palette.background.surface} 70%) 0 100%,
            radial-gradient(
              farthest-side at 0 50%,
              rgba(0, 0, 0, 0.12),
              rgba(0, 0, 0, 0)
            ),
            radial-gradient(
                farthest-side at 100% 50%,
                rgba(0, 0, 0, 0.12),
                rgba(0, 0, 0, 0)
              )
              0 100%`,
          backgroundSize:
            '40px calc(100% - var(--TableCell-height)), 40px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height))',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'local, local, scroll, scroll',
          backgroundPosition:
            'var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height), var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height)',
          backgroundColor: 'background.surface',
        }}
      >
        <Table
          borderAxis="bothBetween"
          stripe="odd"
          hoverRow
          sx={{
            '& tr > *:first-of-type': {
              position: 'sticky',
              left: 0,
              boxShadow: '1px 0 var(--TableCell-borderColor)',
              bgcolor: 'background.surface',
            },
            '& tr > *:last-child': {
              position: 'sticky',
              right: 0,
              bgcolor: 'var(--TableCell-headBackground)',
            },
          }}
        >
          <thead>
            <tr>
              <th style={{ width: 200 }}>User ID</th>
              <th style={{ width: 200 }}>ID</th>
              <th style={{ width: 200 }}>Title</th>
              <th style={{ width: 200 }}>Completed</th>
              <th
                aria-label="last"
                style={{ width: 'var(--Table-lastColumnWidth)' }}
              />
            </tr>
          </thead>
          <tbody>
            {newRow && (
              <EditForm row={newRow} onSave={handleAddSave} onCancel={handleAddCancel} />
            )}
            {rows.map((row) => (
              <React.Fragment key={row.id}>
                {editingRow && editingRow.id === row.id ? (
                  <EditForm row={editingRow} onSave={handleSave} onCancel={handleCancel} />
                ) : (
                  <tr>
                    <td>{row.userId}</td>
                    <td>{row.id}</td>
                    <td>{row.title}</td>
                    <td>{row.completed ? 'Yes' : 'No'}</td>
                    <td>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button size="sm" variant="plain" color="neutral" onClick={() => handleEdit(row)}>
                          Edit
                        </Button>
                        <Button size="sm" variant="soft" color="danger" onClick={() => handleDelete(row.id)}>
                          Delete
                        </Button>
                      </Box>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </Table>
      </Sheet>
     
    </Box>
  );
}
