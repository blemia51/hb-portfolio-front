import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  MenuItem,
  Select,
  Paper,
  Container,
  DialogActions,
} from '@mui/material';
import { Remove } from '@mui/icons-material';

interface Skill {
  id: number;
  name: string;
}

interface SkillFormProps {
  skills: { [categoryName: string]: { skill: Skill[] } }; // This is the structure from your backend
  onUpdateSkill: (skill: Skill) => void
}

const SkillForm: React.FC<SkillFormProps> = ({ skills, onUpdateSkill }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [newCategory, setNewCategory] = useState<string>('');
  const [skillInput, setSkillInput] = useState<string>('');

  // Convert backend data to a manageable format
  const [categories, setCategories] = useState(
    Object.keys(skills).map((categoryName, idx) => ({
      id: idx + 1,
      name: categoryName,
      skills: skills[categoryName].skill, // Skills for this category
    }))
  );


  const handleAddSkill = () => {
    if (skillInput && selectedCategory) {
      setCategories((prevCategories) =>
        prevCategories.map((cat) => {
          if (cat.name === selectedCategory) {
            return {
              ...cat,
              skills: [...cat.skills, { id: cat.skills.length + 1, name: skillInput }],
            };
          }
          return cat;
        })
      );
      setSkillInput(''); // Clear input after adding
    }
  };

  const handleRemoveSkill = (categoryName: string, skillId: number) => {
    setCategories((prevCategories) =>
      prevCategories.map((cat) => {
        if (cat.name === categoryName) {
          return {
            ...cat,
            skills: cat.skills.filter((skill) => skill.id !== skillId),
          };
        }
        return cat;
      })
    );
  };

  console.log('categories', categories)
  return (
    <Container maxWidth="sm" sx={{ width: '86vw' }} >
      <Box sx={{
         mt: 1,
         display: 'flex',
         flexDirection: 'column',
         alignItems: 'center'
       }}
      >
        {/* Category Selector */}
        <Box component="form" sx={{ mt: 1, width: '100%' }}>
          <Select 
            size='small'
            fullWidth
            value={selectedCategory}
            label="Select Category"
            onChange={(e) => setSelectedCategory(e.target.value as string)}
            sx={{ mb: 2 }}
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.name}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </Box>
          
        {/* Add New Category */}
        <Box sx={{ display: 'flex', mb: 2 }}>
          <TextField
            size='small'
            label="New Category"
            variant="outlined"
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            fullWidth
          />
          <Button
            variant="contained"
            sx={{ ml: 2 }}
            onClick={() => console.log('Add Category')}
            disabled={!newCategory.trim()}
          >
            Add
          </Button>
        </Box>
          
        {/* Add Skill to Category */}
        {selectedCategory && (
          <Box sx={{ mb: 2 , }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">
                Skills in {selectedCategory}
              </Typography>
              <Box sx={{ display: 'flex', mt: 2 }}>
                <TextField
                  size='small'
                  label="New Skill"
                  variant="outlined"
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  fullWidth
                />
                <Button
                  variant="contained"
                  sx={{ ml: 2 }}
                  onClick={handleAddSkill}
                  disabled={!skillInput.trim()}
                >
                  Add
                </Button>
              </Box>
                
              {/* List of Skills */}
              <Box sx={{ mt: 2 }}>
                {categories
                  .find((cat) => cat.name === selectedCategory)
                  ?.skills.map((skill) => (
                    <Box
                      key={skill.id}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 1,
                      }}
                    >
                      <Typography>{skill.name}</Typography>
                      <IconButton onClick={() => handleRemoveSkill(selectedCategory, skill.id)}>
                        <Remove />
                      </IconButton>
                    </Box>
                  ))}
              </Box>
            </Paper>
          </Box>
        )}
        <DialogActions>
            <Button  color="secondary">
              Cancel
            </Button>
            <Button color="primary" onClick={() => onUpdateSkill}>
              Update
            </Button>
          </DialogActions>
      </Box>
    </Container>
  );
};

export default SkillForm;
