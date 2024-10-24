import React, { useState } from 'react';
import { Box, Typography, Divider, IconButton, Modal, Dialog, DialogTitle } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useTranslation } from 'react-i18next';
import { useGetSkillsByUserIdQuery, useUpdateSkillMutation } from '../api/skillApi';
import { useGetLanguagesByUserIdQuery } from '../api/languageApi';
import SkillForm from './SkillForm';
import CloseIcon from '@mui/icons-material/Close';

interface SkillsProps {
  isLoggedIn: boolean;
  userId: number;
}

interface Skill {
  id: number;
  name: string;
  category?: {
    id: number;
    name: string;
  }
}

const Skills: React.FC<SkillsProps> = ({ isLoggedIn, userId }) => {
  const { t } = useTranslation();

  const { data: skills = [], error, isLoading } = useGetSkillsByUserIdQuery(userId);
  const { data: languages = [] } = useGetLanguagesByUserIdQuery(userId)
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateSkill] = useUpdateSkillMutation();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading skills</p>;

  const groupByCategory = (skills: Skill[]) => {
    return skills.reduce((acc, skill) => {
      const categoryName = `${skill.category?.name}`
      if (!acc[categoryName]) {
        acc[categoryName] = {
          skill: [] 
        }
      }
      acc[categoryName].skill.push(skill);
      return acc
    }, {} as { [categoryName: string]: {skill: Skill[]}} )
  }

  const groupedSkills = groupByCategory(skills)
  
  console.log('skills', groupedSkills )

  const handleEdit = () => {
    setIsModalOpen(true);
  }

  // Function to handle modal close
  const handleClose = () => {
    setIsModalOpen(false); // Close the modal
  };

  const handleUpdateSkill = async (updatedSkill: Skill) => {
    try {
      await updateSkill(updatedSkill); // Call the mutation to update the skill
    } catch (error) {
      console.error('Error updating skill:', error);
    }
  };


  return (
    <Box
      sx={{
        backgroundColor: '#3c4043',
        padding: 4,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4
      }}
    >
      {/* Title in the Top-Left Corner */}
      <Typography
        variant="h4"
        color="white"
        sx={{
          position: 'absolute',
          top: 8,
          left: 16,
        }}
      >
        {t('skills')}
      </Typography>
      
      <Divider
        sx={{
          marginTop: '30px',
          width: '110%',
          backgroundColor: 'white',
          alignSelf: 'center',
        }}
      />
      {isLoggedIn && (
        <IconButton
          onClick={handleEdit}
          sx={{
            position: 'absolute',
            top: 8,
            right: 16,
            color: 'white',
            backgroundColor: '#282c34'
          }}
        >
          <EditIcon />
        </IconButton>
      )}
      {/* Section Content */}
      <Box sx={{ mt: 4, color: 'white', textAlign: 'left', width: '90%' }}>
        {Object.entries(groupedSkills).map(([category, { skill }]) => (
          <Box key={category}>
            <Typography variant="h6">{category}</Typography>
            <Typography variant="body2">
            {skill.map(s => s.name).join(', ')}
            </Typography>
            <Divider sx={{ my: 2, backgroundColor: 'white' }} />
          </Box>
        ))}
        <Typography variant="h6">{t('Languages')}</Typography>
          {languages.map((language) => (
            <Typography variant="body2" key={language.id}>
                {`${language.name} : ${language.proficiency}`}
            </Typography>
          ))}
      </Box>
     
      {/* Edit Modal */}
      <Dialog open={isModalOpen} onClose={handleClose}>
        <Box
          sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          paddingBottom: 0,
        }}
        >        
          <DialogTitle>{t('Edit Skill')}</DialogTitle>
            <IconButton onClick={handleClose}>
              <CloseIcon   />
            </IconButton>
        </Box>
        <Divider variant='middle' />
        <SkillForm skills={groupedSkills} onUpdateSkill={handleUpdateSkill} />
      </Dialog>
    </Box>
  );
};

export default Skills;
