import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Paper,
  Divider,
} from '@mui/material';
import { Remove } from '@mui/icons-material';

interface Skill {
  id: number;
  name: string;
}

interface SkillFormProps {
  skills: { [categoryName: string]: { skill: Skill[] } }; // This is the structure from your backend
}

const SkillForm: React.FC<SkillFormProps> = ({ skills }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [newCategory, setNewCategory] = useState<string>('');
  const [skillInput, setSkillInput] = useState<string>('');

  // Convert backend data to a manageable format
  const categories = Object.keys(skills).map((categoryName, idx) => ({
    id: idx + 1,
    name: categoryName,
    skills: skills[categoryName].skill, // Skills for this category
  }));

  const handleAddSkill = () => {
    if (skillInput && selectedCategory) {
      const category = categories.find((cat) => cat.name === selectedCategory);
      if (category) {
        category.skills.push({ id: category.skills.length + 1, name: skillInput });
        setSkillInput(''); // Clear input after adding
      }
    }
  };

  const handleRemoveSkill = (categoryName: string, skillName: string) => {
    const category = categories.find((cat) => cat.name === categoryName);
    if (category) {
      category.skills = category.skills.filter((skill) => skill.name !== skillName);
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Edit Skills
      </Typography>
      <Divider sx={{ marginBottom: '24px'}}/>

      {/* Category Selector */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Select Category</InputLabel>
        <Select 
          size='small'
          value={selectedCategory}
          label="Select Category"
          onChange={(e) => setSelectedCategory(e.target.value as string)}
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.name}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Add New Category */}
      <Box sx={{ display: 'flex', mb: 2 }}>
        <TextField
          size='small'
          label="New Category"
          variant="outlined"
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
        <Box sx={{ mb: 2 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">
              Skills in {selectedCategory}
            </Typography>
            <Box sx={{ display: 'flex', mt: 2 }}>
              <TextField
                size='small'
                label="New Skill"
                variant="outlined"
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
                    <IconButton onClick={() => handleRemoveSkill(selectedCategory, skill.name)}>
                      <Remove />
                    </IconButton>
                  </Box>
                ))}
            </Box>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default SkillForm;
